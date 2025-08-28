import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Inputs";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATH } from "../../Utils/apiPath";
const CreateSessionForm = () => {
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: "",

    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleChnage = (key, value) => {
        setFormData((prevData) => ({ ...prevData, [key]: value }))
    }

    const handleCreateSession = async (e) => {
        e.preventDefault()

        const { role, experience, topicsToFocus, description } = formData;

        if (!role || !experience || !topicsToFocus || !description) {
            setError("Please fill all the fields")
            return;
        }
        setError("")
        setIsLoading(true)


        try {
            const aiResponse = await axiosInstance.post(
                API_PATH.AI.GENERATE_QUESTIONS, {
                role,
                experience,
                topicsToFocus,
                numberOfQuestions: 10,
            })
            const generatedQuestions = aiResponse.data.data;

            const response = await axiosInstance.post(API_PATH.SESSION.CREATE, {
                ...formData,
                questions: generatedQuestions,
            })

            if (response.data?.session?._id) {
                navigate(`/interview-prep/${response.data.session._id}`);
            }
        } catch (error) {
           if(error.response && error.response.data && error.response.data.message){
            setError(error.response.data.message);
          }else{
            setError("Something went wrong handleCreateSession");
          }
        }finally{
            setIsLoading(false)
        }

    }

    return (
        <div className="w-[80vw] md:w-[50vw] p-4 flex flex-col justify-center">
  <div className="mb-4"> {/* reduced margin-bottom */}
    <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight relative inline-block">
      Start a New Interview Prep Session
      <span className="absolute left-0 -bottom-1 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
    </h3>
    <p className="text-sm md:text-base text-gray-600 mt-1 leading-snug max-w-xl">
      Fill out a few quick details and unlock your personalized set of interview questions.
    </p>
  </div>

  <form onSubmit={handleCreateSession} className="flex flex-col gap-3"> {/* slightly tighter gap */}
    <Input
      label="Role"
      type="text"
      placeholder="Enter your role"
      value={formData.role}
      onChange={(target) => handleChnage("role", target)}
    />

    <Input
      label="Years of Experience"
      type="number"
      placeholder="Enter your experience"
      value={formData.experience}
      onChange={(target )=> handleChnage("experience",target)}
    />

    <Input
      label="Topics to Focus"
      type="text"
      placeholder="Enter topics to focus Ex: React, Node.js, MongoDB"
      value={formData.topicsToFocus}
      onChange={(target ) => handleChnage("topicsToFocus", target)}
    />

    <Input
      label="Description"
      type="text"
      placeholder="Enter description"
      value={formData.description}
      onChange={(target ) => handleChnage("description", target)}
    />

    {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

    <button
      type="submit"
      className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
      disabled={isLoading}
    >
      {isLoading ? <SpinnerLoader /> : "Create Session"}
    </button>
  </form>
</div>

    )
}
export default CreateSessionForm