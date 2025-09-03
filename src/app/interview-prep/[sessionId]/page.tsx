'use client';

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "@/components/Loader/SpinnerLoader";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATH } from "@/utils/apiPath";
import Drawer from "@/components/Drawer";
import RoleInfoHeader from "@/components/RoleInfoHeader";
import QuestionCard from "@/components/Cards/QuestionCard";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import SkeletonLoader from "@/components/Loader/SkeletonLoader";
import { Session, Question } from "@/types";

interface InterviewPrepPageProps {}

const InterviewPrepPage: React.FC<InterviewPrepPageProps> = () => {
  const params = useParams();
  const sessionId = params.sessionId as string;

  const [sessionData, setSessionData] = useState<Session | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState<boolean>(false);
  const [explanation, setExplanation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState<boolean>(false);

  // Fetch session details
  const fetchSessionsDetailsById = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get(API_PATH.SESSION.GET_ONE(sessionId));
      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.log("Error fetching session details", error);
    }
  };

  const generateConceptExplanation = async (question: string): Promise<void> => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATH.AI.GENERATE_EXPLANATION,
        { question }
      );

      if (response.data?.data) {
        setExplanation(response.data.data);
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg("Failed to generate explanation");
      console.log("Error generating explanation", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle pin
  const toggleQuestionPinStatus = async (questionId: string): Promise<void> => {
    try {
      const response = await axiosInstance.put(API_PATH.QUESTION.PIN(questionId));
      if (response.data && response.data.question) {
        fetchSessionsDetailsById();
      }
    } catch (error) {
      console.log("Error toggling question pin status", error);
    }
  };

  // Load more questions
  const uploadMoreQuestions = async (): Promise<void> => {
    try {
      setIsUpdateLoader(true);
      const aiResponse = await axiosInstance.post(API_PATH.AI.GENERATE_QUESTIONS, {
        role: sessionData?.role,
        experience: sessionData?.experience,
        topicsToFocus: sessionData?.topicsToFocus || "general",
        numberOfQuestions: 10,
      });

      const generatedQuestions = aiResponse.data.data;
      const response = await axiosInstance.post(API_PATH.QUESTION.ADD_TO_SESSION, {
        sessionId,
        questions: generatedQuestions,
      });

      if (response.data) {
        toast.success("Questions added successfully");
        fetchSessionsDetailsById();
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Something went wrong");
      }
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (!sessionId) return;
    fetchSessionsDetailsById();
  }, [sessionId]);

  if (!sessionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SpinnerLoader size="large" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ''}
        topicsToFocus={sessionData?.topicsToFocus || ''}
        experience={String(sessionData?.experience || '')}
        questions={sessionData?.questions?.length || 0}
        description={sessionData?.description || ''}
        lastUpdated={sessionData?.updatedAt ? moment(sessionData?.updatedAt).format('DD MMM YYYY') : ''}
      />

      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
        <h2 className="text-lg font-semibold text-black mb-5">Interview Q&A</h2>

        <div className="grid grid-cols-12 gap-4">
          <div className={`col-span-12 ${openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"}`}>
            <AnimatePresence>
              {sessionData?.questions?.map((data: Question, index: number) => (
                <motion.div
                  key={data._id || index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 100,
                    delay: index * 0.1,
                    damping: 16,
                  }}
                  layout
                  layoutId={`question-${data._id || index}`}
                  className="mb-4"
                >
                  <QuestionCard
                    index={index}
                    question={data?.question}
                    answer={data?.answer || ''}
                    isPinned={Boolean(data?.isPinned)}
                    onPinned={() => toggleQuestionPinStatus(data._id as string)}
                    onLearnMore={() => generateConceptExplanation(String(data.question))}
                  />

                  {!isLoading && sessionData?.questions?.length === index + 1 && (
                    <div className="flex items-center justify-center mt-5">
                      <button
                        className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer disabled:opacity-50"
                        onClick={uploadMoreQuestions}
                        disabled={isUpdateLoader || isLoading}
                      >
                        {isUpdateLoader ? (
                          <SpinnerLoader size="small" />
                        ) : (
                          <LuListCollapse className="text-lg" />
                        )}
                        Load More
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Drawer for explanations */}
        <Drawer
          isOpen={openLearnMoreDrawer}
          onClose={() => setOpenLearnMoreDrawer(false)}
          title={!isLoading && (explanation as any)?.title}
        >
          {errorMsg && (
            <p className="flex gap-2 text-sm text-amber-600 font-medium">
              <LuCircleAlert className="mt-1" /> {errorMsg}
            </p>
          )}
          {isLoading && <SkeletonLoader lines={6} />}
          {!isLoading && explanation && (
            <div className="prose prose-sm max-w-none">
              <div dangerouslySetInnerHTML={{ __html: (explanation as any)?.explanation || String(explanation) }} />
            </div>
          )}
        </Drawer>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrepPage;
