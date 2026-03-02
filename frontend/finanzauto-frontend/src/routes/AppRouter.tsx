import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";
import ProductForm from "../pages/Products/ProductForm";
import { AuthGuard } from "../auth/AuthGuard";

export const AppRouter = () => (
  <Routes>
    {/* Login */}
    <Route path="/login" element={<LoginPage />} />

    {/* Listado de productos */}
    <Route
      path="/products"
      element={
        <AuthGuard>
          <ProductsPage />
        </AuthGuard>
      }
    />

    {/* Crear producto */}
    <Route
      path="/products/new"
      element={
        <AuthGuard>
          <ProductForm />
        </AuthGuard>
      }
    />

    {/* Editar producto */}
    <Route
      path="/products/edit/:id"
      element={
        <AuthGuard>
          <ProductForm />
        </AuthGuard>
      }
    />

    {/* Redirección por defecto */}
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);
