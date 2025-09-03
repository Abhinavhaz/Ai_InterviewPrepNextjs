// User types
export interface User {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
  token: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

// Session types
export interface Session {
  _id: string;
  title: string;
  description?: string;
  userId: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

// Question types
export interface Question {
  _id: string;
  sessionId: string;
  question: string;
  answer?: string;
  explanation?: string;
  isPinned: boolean;
  note?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: string;
  createdAt: string;
  updatedAt: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Context types
export interface UserContextType {
  user: User | null;
  loading: boolean;
  updateUser: (userData: User) => void;
  clearUser: () => void;
}

// Component prop types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'left' | 'right';
}

// API Path types
export interface ApiPaths {
  AUTH: {
    REGISTER: string;
    LOGIN: string;
    GET_PROFILE: string;
  };
  IMAGE: {
    UPLOAD_IMAGE: string;
  };
  AI: {
    GENERATE_QUESTIONS: string;
    GENERATE_EXPLANATION: string;
  };
  SESSION: {
    CREATE: string;
    GET_ALL: string;
    GET_ONE: (id: string) => string;
    DELETE: (id: string) => string;
  };
  QUESTION: {
    ADD_TO_SESSION: string;
    PIN: (id: string) => string;
    UPDATE_NOTE: (id: string) => string;
  };
}

// Form types
export interface SessionFormData {
  title: string;
  description?: string;
}

export interface QuestionFormData {
  sessionId: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  count: number;
}
