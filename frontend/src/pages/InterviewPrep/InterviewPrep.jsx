import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "./RoleInfoHeader";
import QuestionCard from "../../components/Cards/QuestionCard";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATH } from "../../Utils/apiPath";
import Drawer from "../../components/Drawer";
import AIResponsePreview from "./AIResponsePreview";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session details
  const fetchSessionsDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.SESSION.GET_ONE(sessionId));
      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.log("Error fetching session details", error);
    }
  };


  const generateConceptExplanation = async (question) => {
  try {
    setErrorMsg("");
    setExplanation(null);

    setIsLoading(true);
    setOpenLearnMoreDrawer(true);

    const response = await axiosInstance.post(
      API_PATH.AI.GENERATE_EXPLANATION,
      { question }
    );

    console.log("generateConceptExplanation", response.data.data); // 👈 log the real payload

    if (response.data?.data) {
      setExplanation(response.data.data); // 👈 store only the inner data
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
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.put(API_PATH.QUESTION.PIN(questionId));
      if (response.data && response.data.question) {
        fetchSessionsDetailsById();
      }
      console.log("toggleQuestionPinStatus", response.data);
    } catch (error) {
      console.log("Error toggling question pin status", error);
    }
  };

  // Load more questions
  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);
      const aiResponse = await axiosInstance.post(API_PATH.AI.GENERATE_QUESTIONS, {
        role: sessionData?.role,
        experience: sessionData?.experience,
       topicsToFocus: sessionData?.topicsToFocus || "general",
        numberOfQuestions: 10,
      });
      console.log("aiResponse", aiResponse.data);

      // should be array like [{question, answer}]
      const generatedQuestions = aiResponse.data.data; 
      const response = await axiosInstance.post(API_PATH.QUESTION.ADD_TO_SESSION, {
        sessionId,
        questions: generatedQuestions,
      });

      if (response.data) {
        toast.success("Questions added successfully");
        fetchSessionsDetailsById();
      }
    } catch (error) {
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

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || ""}
        questions={sessionData?.questions?.length || ""}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData?.updatedAt).format("DD MMM YYYY")
            : ""
        }
      />

      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
        <h2 className="text-lg font-semibold text-black">Interview Q&A</h2>

        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div
            className={`col-span-12 ${
              openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}
          >
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => (
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
                >
                  <>
                    <QuestionCard
                     index={index}
                      question={data?.question}
                      answer={data?.answer}
                      isPinned={data?.isPinned}
                      onPinned={() => toggleQuestionPinStatus(data._id)}
                      onLearnMore={() => generateConceptExplanation(data.question)}
                    />

                    {!isLoading &&
                      sessionData?.questions?.length === index + 1 && (
                        <div className="flex items-center justify-center mt-5">
                          <button
                            className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
                            onClick={uploadMoreQuestions}
                            disabled={isUpdateLoader || isLoading}
                          >
                            {isUpdateLoader ? (
                              <SpinnerLoader />
                            ) : (
                              <LuListCollapse className="text-lg" />
                            )}
                            Load More
                          </button>
                        </div>
                      )}
                  </>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <Drawer
            isOpen={openLearnMoreDrawer}
            onClose={() => setOpenLearnMoreDrawer(false)}
            title={!isLoading && explanation?.title}
          >
            {errorMsg && (
              <p className="flex gap-2 text-sm text-amber-600 font-medium">
                <LuCircleAlert className="mt-1" /> {errorMsg}
              </p>
            )}
            {isLoading && <SkeletonLoader />}
            {!isLoading && explanation && (
              <AIResponsePreview content={explanation?.explanation} />
            )}
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
