import { create } from "zustand";

const userInformation = create((set) => ({
  uesrname: "",
  email: "",
  userId: "",
  accessToken: "",
  refreshToken: "",
}));
