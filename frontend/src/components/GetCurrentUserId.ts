import axios from "axios";

const token = localStorage.getItem("webshop");
export const getCurrentUserId = () => {
  return axios.get("/auth/currentuserid", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
