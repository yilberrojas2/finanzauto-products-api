// import { Routes, Route } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import ProductsPage from "./pages/ProductsPage";
// import ProtectedRoute from "./auth/ProtectedRoute";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/login" element={<LoginPage />} />

//       <Route
//         path="/products"
//         element={
//           <ProtectedRoute>
//             <ProductsPage />
//           </ProtectedRoute>
//         }
//       />

//       <Route path="*" element={<LoginPage />} />
//     </Routes>
//   );
// }
import { AppRouter } from "./routes/AppRouter";

export default function App() {
  return <AppRouter />;
}
