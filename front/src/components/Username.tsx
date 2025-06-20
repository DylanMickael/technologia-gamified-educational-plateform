import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "lucide-react";
import axios from "axios";
import { clearUser } from "../store/authSlice";
import type { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { api } from "../hooks/api";

export default function Username() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("user:" + user);
  const handleLogout = async () => {
    try {
      await axios.post(
        `${api}/auth/logout/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.accesstoken}`,
          },
        }
      );

      dispatch(clearUser());
      navigate("/login"); // ou la page d’accueil
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
    }
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 p-2 bg-white rounded-xl shadow border border-gray-200">
      <span className="text-gray-800 font-medium">{user.name}</span>
      <button
        onClick={handleLogout}
        className="p-1 rounded hover:bg-red-100 text-red-600"
        title="Se déconnecter"
      >
        <LogOut size={18} />
      </button>
    </div>
  );
}
