'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { useUser } from '@/context/userContext';
import axiosInstance from '@/utils/axiosInstance';
import { API_PATH } from '@/utils/apiPath';
import { Session } from '@/types';
import toast from 'react-hot-toast';
import SpinnerLoader from '@/components/Loader/SpinnerLoader';
import Modal from '@/components/Modal';
import Input from '@/components/Inputs/Input';
import SummaryCard from '@/components/Cards/SummaryCard';
import DeleteAlertContent from '@/components/DeleteAlertContent';
import Navbar from '@/components/layouts/Navbar';
import { CARD_BG } from '@/utils/data';
import { LuPlus, LuBookOpen, LuClock, LuTrash2 } from 'react-icons/lu';

interface CreateSessionFormData {
  role: string;
  experience: string;
  topicsToFocus: string;
  description: string;
}

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();

  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<CreateSessionFormData>({
    role: '',
    experience: '',
    topicsToFocus: '',
    description: ''
  });
  const [openDeleteAlert, setOpenDeleteAlert] = useState<{ open: boolean; data: Session | null }>({ open: false, data: null });
  const [creating, setCreating] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/login');
    }
  }, [user, userLoading, router]);

  // Fetch sessions
  useEffect(() => {
    if (user) {
      fetchSessions();
    }
  }, [user]);

  const fetchSessions = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get(API_PATH.SESSION.GET_ALL);

      // The backend returns { success: true, sessions: [...] }
      const sessionsData = response.data?.sessions || [];

      if (Array.isArray(sessionsData)) {
        setSessions(sessionsData);
      } else {
        setSessions([]);
        console.warn('Sessions data is not an array:', sessionsData);
      }
    } catch (error: any) {
      console.error('Error fetching sessions:', error);
      setSessions([]); // Ensure sessions is always an array
      toast.error('Failed to load sessions');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (key: string, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleCreateSession = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const { role, experience, topicsToFocus, description } = formData;

    if (!role || !experience || !topicsToFocus || !description) {
      setError("Please fill all the fields");
      return;
    }

    setError("");
    setCreating(true);

    try {
      // First, generate AI questions
      const aiResponse = await axiosInstance.post(API_PATH.AI.GENERATE_QUESTIONS, {
        role,
        experience,
        topicsToFocus,
        numberOfQuestions: 10,
      });

      const generatedQuestions = aiResponse.data.data;

      // Then create session with generated questions
      const response = await axiosInstance.post(API_PATH.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });

      if (response.data?.session?._id) {
        // Navigate to the interview prep page
        router.push(`/interview-prep/${response.data.session._id}`);
      }
    } catch (error: any) {
      console.error('Error creating session:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong while creating session");
      }
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteSession = async (sessionId: string): Promise<void> => {
    if (!confirm('Are you sure you want to delete this session?')) return;

    try {
      await axiosInstance.delete(API_PATH.SESSION.DELETE(sessionId));
      setSessions(prev => prev.filter(session => session._id !== sessionId));
      toast.success('Session deleted successfully');
    } catch (error: any) {
      console.error('Error deleting session:', error);
      toast.error('Failed to delete session');
    }
  };

  const handleSessionClick = (sessionId: string): void => {
    router.push(`/interview-prep/${sessionId}`);
  };

  if (userLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SpinnerLoader size="large" />
      </div>
    );
  }

  return (
    <>
    <div className='px-4 pt-6 border-b border-gray-100 shadow-sm'>
      <Navbar />
      </div>
    <div className="min-h-screen px-4 bg-gradient-to-br from-sky-100 via-white to-blue-100">
      
      {/* Header */}
      
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">Dashboard</h1>
              <p className="text-gray-600 mt-1">Your interview prep sessions!</p>
            </div>
           
          </div>
        </div>
      

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <SpinnerLoader size="large" />
          </div>
        ) : !Array.isArray(sessions) || sessions.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 border border-purple-100">
              <LuBookOpen className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Sessions Yet</h3>
              <p className="text-gray-600 mb-6">Create your first interview prep session to get started!</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
              >
                Create Session
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
            {Array.isArray(sessions) && sessions.map((session, index) => (
              <div key={session._id} className="transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl rounded-2xl">
                <SummaryCard
                  colors={CARD_BG[index % CARD_BG.length]}
                  role={(session as any).role || (session as any).title || ''}
                  topicsToFocus={(session as any).topicsToFocus || []}
                  experience={(session as any).experience || ''}
                  questions={(session as any).questions || []}
                  description={(session as any).description || ''}
                  lastUpdated={session?.updatedAt ? new Date(session.updatedAt).toLocaleDateString() : ''}
                  onDelete={() => setOpenDeleteAlert({ open: true, data: session })}
                  onSelect={() => handleSessionClick(session._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Session Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setFormData({ role: '', experience: '', topicsToFocus: '', description: '' });
          setError('');
        }}
        hideHeader
      >
        <div className="w-[80vw] md:w-[50vw] p-4 flex flex-col justify-center">
          <div className="mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight relative inline-block">
              Start a New Interview Prep Session
              <span className="absolute left-0 -bottom-1 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
            </h3>
            <p className="text-sm md:text-base text-gray-600 mt-1 leading-snug max-w-xl">
              Fill out a few quick details and unlock your personalized set of interview questions.
            </p>
          </div>

          <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
            <Input
              label="Role"
              type="text"
              placeholder="Enter your role"
              value={formData.role}
              onChange={(value) => handleInputChange("role", value)}
              required
              disabled={creating}
            />

            <Input
              label="Years of Experience"
              type="number"
              placeholder="Enter your experience"
              value={formData.experience}
              onChange={(value) => handleInputChange("experience", value)}
              required
              disabled={creating}
            />

            <Input
              label="Topics to Focus"
              type="text"
              placeholder="Enter topics to focus Ex: React, Node.js, MongoDB"
              value={formData.topicsToFocus}
              onChange={(value) => handleInputChange("topicsToFocus", value)}
              required
              disabled={creating}
            />

            <Input
              label="Description"
              type="text"
              placeholder="Enter description"
              value={formData.description}
              onChange={(value) => handleInputChange("description", value)}
              required
              disabled={creating}
            />

            {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
              disabled={creating}
            >
              {creating ? <SpinnerLoader size="small" color="text-white" /> : "Create Session"}
            </button>
          </form>
        </div>
      </Modal>
      {/* Delete Session Modal */}
      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete Session"
      >
        <div className="w-full md:w-[30vw] p-4">
          <DeleteAlertContent
            content="Are you sure you want to delete this session? This action cannot be undone."
            onConfirm={() => {
              if (openDeleteAlert.data?._id) {
                handleDeleteSession(openDeleteAlert.data._id);
              }
              setOpenDeleteAlert({ open: false, data: null });
            }}
            onClose={() => setOpenDeleteAlert({ open: false, data: null })}
          />
        </div>
      </Modal>

{/* Floating New Session Button */}
<div className="fixed bottom-6 right-6 z-50">
  <button
    onClick={() => setShowCreateModal(true)}
    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 
               text-white px-5 py-3 rounded-full font-semibold shadow-lg 
               hover:from-purple-700 hover:to-pink-700 hover:scale-105 
               transition-all duration-300"
  >
    <LuPlus className="w-5 h-5" />
    <span className="hidden sm:inline">New Session</span>
  </button>
</div>

    </div>
    </>
  );
};

export default DashboardPage;
