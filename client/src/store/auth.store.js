import { create } from "zustand";
import api from "../utils/api";
import { toast } from "react-toastify";


const useAuthstore = create((set, get) => ({
  authUser: null,
  authStatus: false,
  isLoading: false,
  notification: "",
  isAnyMessage: false,

  // Sign Up
  createAccount: async (name, email, password) => {
    try {
      set({ isLoading: true });

      console.log(name, email,password)
      const response = await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        set({
          authUser: response.data.data, // adjust if your backend returns different structure
          authStatus: true,
        });
        toast.success("Account created successfully");
        return true
      }
    } catch (error) {
      toast.error(error.response.data.error);
      return false
    } finally {
      set({ isLoading: false });
    }
  },

  // Login
  loginUser: async (email, password) => {
    try {
      set({ isLoading: true });

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 201) {
        set({
          authUser: response.data.data, // backend should return user data
          authStatus: true,
        });
        
        toast.success("Login successfully");
        return true;
      }
    } catch (error) {
    
       toast.error(error.response.data.error);
       return false;
    } finally {
      set({ isLoading: false });
    }
  },

  //get current user
  getUser : async() =>{
    try {
        const res = await api.get("/auth/get");
        set({authStatus: true, authUser: res.data.data});
    } catch (error) {
        console.log("Failed to fetch user ", error)
    }
  },

  // Optional: Logout function
  logoutUser: async () => {
    try {
      await api.get("/auth/logout");
      toast.success("logout successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error while logout");
    } finally {
      set({
        authUser: null,
        authStatus: false,
      });
    }
  },

  setIsLoading: (state) =>{
    set({isLoading: state});
  }

  
}));

export default useAuthstore;
