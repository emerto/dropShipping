import { create } from "zustand";

export interface UserStore {
  userStore: {
    address: string | null;
    avatar_url: string | null;
    balance: number | null;
    email: string | null;
    first_name: string | null;
    id: string;
    last_name: string | null;
    phone_number: string | null;
    updated_at: string | null;
    username: string | null;
  };
}

export const useAuthStore = create<UserStore>((set) => ({
  userStore: {
    address: null,
    avatar_url: null,
    balance: null,
    email: null,
    first_name: null,
    id: "",
    last_name: null,
    phone_number: null,
    updated_at: null,
    username: null,
  },
}));
