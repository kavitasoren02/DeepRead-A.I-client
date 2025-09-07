import type { ReactNode } from "react";

export interface User {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  mobile: number;
}

export interface UserInfoResponse{
  msg: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  msg: string;
}
export interface LogoutResponse {
  msg: string;  
}

export interface AuthContextType {
  user: User | null | undefined;
  handleLogin: (payload: LoginRequest) => Promise<any>;
  handleLogout: () => Promise<void>;
  loadingAuth: boolean;
  setLoadingAuth: React.Dispatch<React.SetStateAction<boolean>>;
  fetchUser: () => Promise<void>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<number>>;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface NoAuthRouteProps {
  children: ReactNode;
}

export interface ProtectedRouteProps {
  children: ReactNode;
}

export interface LabelProps{
  htmlFor?: string;
  text?: string;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  label?: string;
  error?: string;  
}

export interface UserRegistration {
  email: string,
  first_name: string;
  last_name: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  password: string;
}
export interface RegisterResponse {
  msg: string;
}

export interface UploadResponse {
  message: string;
  user_id: string;
  session_id:string;
  filename: string;
  extracted_text: string;
}

export interface MessageProps {
  message: string;
  audioPath?: string;
  isPlaying: boolean;
}

export interface ChatInputProps {
  session_Id: string;
  onSendMessage: (userMessage: string, botMessage: string) => void;
}

export interface ChatResponseProps {
  message: string;
  summary: string;
}

export interface ButtonProps {
  active: boolean;
  onClick: () => void;
 children: ReactNode;

}

export interface InitialChatProps {
  buttons?: {
    label: string;
    icon?: string;
    active: boolean;
    onClick: () => void;
  }[];
}

export interface GroupedHistory {
  _id?: string;
  sessionId: string;
  userId: string;
  message: string;
  isAIgenerated: boolean;
  audioPath: string;
  timeStamp: string;
} 

export interface GroupedHistoryResponse {
  chat: GroupedHistory;
  sessionId: string;
}

export interface ChatHistory {
  sessionId: string;
  userId: string;
  message: string;
  isAIgenerated: boolean;
  audioPath?: string;
  timeStamp: string;
}

export interface AudioResponse extends GroupedHistory {

}