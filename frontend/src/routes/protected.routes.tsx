import { isAuthenticated } from "@storage/auth-storage";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export function ProtectedRoute(props: Props) {
  const { children } = props;

  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
}
