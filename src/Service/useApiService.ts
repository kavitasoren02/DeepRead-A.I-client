import { settings } from "../config/config";

export const LOGIN = "api/auth/login";
export const LOGOUT = "api/auth/logout";
export const REGISTER ="api/auth/register";
export const GETUSERINFO ="api/auth/info";
export const UPLOADFILE = "api/file/upload";
export const CHATSUMMARY = "/api/chat/summary";

// History 
export const GROUPED_HOSTORY = "/api/history";
export const GET_HISTORY = '/api/chat'

// Audio Chat
export const AUDIO_CHAT = '/api/audio_summary'
export const AUDIO_PATH = `${settings.BACKEND_URL}api/audio_files`

// Contact 
export const CONTACT = "/api/send/message"