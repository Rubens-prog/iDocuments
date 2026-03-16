import { List } from "@pages/Private/List";
import { Single } from "@pages/Private/Single";
import { UserForm } from "@pages/Public/Form";
import { NotFound } from "@pages/Public/NotFound";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./protected.routes";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserForm />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <List />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/single/:id"
        element={
          <ProtectedRoute>
            <Single />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
