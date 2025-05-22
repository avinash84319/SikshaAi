// hooks/useAuth.js
import { useContext } from "react";
import AuthContext from "../components/Auth/AuthContext";

export const useAuth = () => useContext(AuthContext);
