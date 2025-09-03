import { ApiPaths } from '@/types';

// Use environment variable for API URL, fallback to local development
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/";

export const API_PATH: ApiPaths = {
  AUTH: {
    REGISTER: `api/auth/register`,
    LOGIN: `api/auth/login`,
    GET_PROFILE: `api/auth/profile`,
  },

  IMAGE: {
    UPLOAD_IMAGE: `api/auth/upload-image`,
  },

  AI: {
    GENERATE_QUESTIONS: `api/ai/generate-questions`,
    GENERATE_EXPLANATION: `api/ai/generate-explanation`,
  },

  SESSION: {
    CREATE: `api/sessions/create`,
    GET_ALL: `api/sessions/my-sessions`,
    GET_ONE: (id: string) => `api/sessions/get/${id}`,
    DELETE: (id: string) => `api/sessions/delete/${id}`,
  },

  QUESTION: {
    ADD_TO_SESSION: `api/questions/add`,
    PIN: (id: string) => `api/questions/${id}/pin`,
    UPDATE_NOTE: (id: string) => `api/questions/${id}/note`,
  },
};
