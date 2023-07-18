// src/interfaces/AuthContextValue.ts
export interface AuthContextValue {
  userId: string | null;
  setUserId: (userId: string | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}