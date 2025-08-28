import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../Utils/data";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATH } from "../../Utils/apiPath";
import moment from "moment";
import SummaryCard from "../../components/Cards/SummaryCard";
import Modal from "../../components/Modal";
import CreateSessionForm from "./CreateSessionForm";
import DeleteAlertContent from "../../components/DeleteAlertContent";

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.SESSION.GET_ALL);
      setSessions(response.data.sessions);
      console.log("Sessions", response.data.sessions);
    } catch (error) {
      console.log("Error fetching sessions", error);
    }
  };

  const deleteSession = async (sessionDelete) => {
    try {
      await axiosInstance.delete(API_PATH.SESSION.DELETE(sessionDelete?._id));
      toast.success("Session deleted successfully");
      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSessions();
    } catch (error) {
      console.log("Error deleting session", error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      {/* Background with gradient flavor */}
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-blue-100">
        <div className="container mx-auto pt-10 px-6 lg:px-12">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-700 via-sky-600 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">
                Interview Prep Sessions
              </h1>
              <p className="text-gray-600 text-base mt-3 max-w-lg leading-relaxed">
                Organize, practice, and improve your interview skills with
                personalized sessions designed just for you.
              </p>
            </div>
          </div>

          {/* Grid of Sessions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
            {sessions?.map((data, index) => (
              <div
                key={data?._id}
                className="transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl rounded-2xl"
              >
                <SummaryCard
                  colors={CARD_BG[index % CARD_BG.length].bgcolor}
                  role={data?.role || ""}
                  topicsToFocus={data?.topicsToFocus || []}
                  experience={data?.experience || ""}
                  questions={data?.questions || []}
                  description={data?.description || ""}
                  lastUpdated={
                    data?.updatedAt
                      ? moment(data?.updatedAt).format("DD MMM YYYY")
                      : ""
                  }
                  onDelete={() => setOpenDeleteAlert({ open: true, data })}
                  onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                  onEdit={() => navigate(`/session/${data?._id}`)}
                />
              </div>
            ))}

            {/* Empty state */}
          {sessions?.length === 0 && (
  <div className="w-full min-h-[60vh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 text-center">
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 w-full max-w-full sm:max-w-md md:max-w-lg rounded-xl border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-all duration-300">
      <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 mb-6">
        No sessions yet. Let’s start your journey 🚀
      </p>
      <button
        onClick={() => setOpenCreateModal(true)}
        className="flex items-center gap-2 px-4 sm:px-6 md:px-7 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-indigo-600 to-sky-500 rounded-full font-semibold text-white text-sm sm:text-base md:text-base shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
      >
        <LuPlus className="text-base sm:text-lg md:text-xl" /> Create Session
      </button>
    </div>
  </div>
)}



          </div>

          {/* Floating Add Button */}
          <button
  className="flex items-center justify-center gap-2 font-semibold text-white rounded-full shadow-lg 
             fixed bottom-4 sm:bottom-6 md:bottom-10 right-4 sm:right-6 md:right-8
             h-7 sm:h-10 md:h-10 px-2 sm:px-5 md:px-4
             text-xs sm:text-sm md:text-base
             bg-sky-400
             hover:from-pink-500 hover:via-red-500 hover:to-orange-500
             transition-all duration-300 transform hover:scale-105"
  onClick={() => setOpenCreateModal(true)}
>
  <LuPlus className="text-sm sm:text-base md:text-lg" /> New Session
</button>

        </div>

        {/* Create Session Modal */}
        <Modal
          isOpen={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
          hideHeader
        >
          <div className="p-6 bg-white rounded-xl">
            <CreateSessionForm />
          </div>
        </Modal>

        {/* Delete Session Modal */}
        <Modal
          isOpen={openDeleteAlert?.open}
          onClose={() => setOpenDeleteAlert({ open: false, data: null })}
          title="Delete Session"
        >
          <div className="w-full md:w-[30vw]">
            <DeleteAlertContent
              content="Are you sure you want to delete this session? This action cannot be undone."
              onConfirm={() => deleteSession(openDeleteAlert.data)}
              onClose={() => setOpenDeleteAlert({ open: false, data: null })}
            />
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
