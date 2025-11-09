import { Navigate } from "react-router-dom";
import { auth } from "./firebase.js";

export default function ProtectedRoute({ children }) {
  const user = auth.currentUser;

  // If not logged in, redirect to login page
  if (!user) return <Navigate to="/" replace />;

  return children;
}
