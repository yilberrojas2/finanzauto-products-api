// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";

// interface Product {
//   id: string;
//   name: string;
//   price: number;
// }

// export default function ProductsPage() {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const pageSize = 10;

//   const loadProducts = () => {
//     api
//       .get("/Product", { params: { page, pageSize } })
//       .then((res) => {
//         setProducts(res.data.items);
//         setTotal(res.data.total);
//       })
//       .catch(() => alert("Error cargando productos"));
//   };

//   useEffect(loadProducts, [page]);

//   const deleteProduct = async (id: string) => {
//     if (!confirm("¿Eliminar producto?")) return;
//     await api.delete(`/Product/${id}`);
//     loadProducts();
//   };

//   const totalPages = Math.ceil(total / pageSize);

//   return (
//     <div style={{ maxWidth: 900, margin: "40px auto" }}>
//       <h2>Productos</h2>

//       <button onClick={() => navigate("/products/new")}>
//         ➕ Crear producto
//       </button>

//       {products.length === 0 ? (
//         <p>No hay productos</p>
//       ) : (
//         <ul>
//           {products.map((p) => (
//             <li key={p.id}>
//               {p.name} - ${p.price}
//               <button onClick={() => navigate(`/products/edit/${p.id}`)}>
//                 ✏
//               </button>
//               <button onClick={() => deleteProduct(p.id)}>🗑</button>
//             </li>
//           ))}
//         </ul>
//       )}

//       <div style={{ marginTop: 20 }}>
//         <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
//           Anterior
//         </button>

//         <span style={{ margin: "0 10px" }}>
//           Página {page} de {totalPages}
//         </span>

//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage((p) => p + 1)}
//         >
//           Siguiente
//         </button>
//       </div>

//       <button
//         style={{ marginTop: 20 }}
//         onClick={() => {
//           localStorage.removeItem("token");
//           navigate("/login");
//         }}
//       >
//         Cerrar sesión
//       </button>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  Plus,
  Pencil,
  Trash2,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Package,
  Search,
  MoreVertical,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
}

export default function ProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/Product", { params: { page, pageSize } });
      setProducts(res.data.items);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Error cargando productos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page]);

  const deleteProduct = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) return;
    try {
      await api.delete(`/Product/${id}`);
      loadProducts();
    } catch (err) {
      alert("No se pudo eliminar el producto");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAVBAR SUPERIOR */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center shadow-md">
              <Package className="text-white" size={18} />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight uppercase">
              Finanzauto
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* HEADER DE SECCIÓN */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Inventario de Productos
            </h2>
            <p className="text-slate-500 text-sm">
              Gestiona el catálogo de soluciones financieras y vehículos.
            </p>
          </div>

          <button
            onClick={() => navigate("/products/new")}
            className="flex items-center justify-center gap-2 bg-emerald-900 hover:bg-emerald-950 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
          >
            <Plus size={20} />
            Nuevo Producto
          </button>
        </div>

        {/* CONTENEDOR DE TABLA */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
              <p className="mt-4 text-slate-500 text-sm animate-pulse">
                Cargando catálogo...
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <Package className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-500 font-medium">
                No se encontraron productos registrados.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Nombre del Producto
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Precio Unitario
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      ID Referencia
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {p.name}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          ${p.price.toLocaleString("es-CO")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400 font-mono">
                        {p.id.slice(0, 8)}...
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => navigate(`/products/edit/${p.id}`)}
                            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                            title="Editar"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Eliminar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* PAGINACIÓN */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Mostrando{" "}
              <span className="font-semibold text-slate-900">
                {products.length}
              </span>{" "}
              de <span className="font-semibold text-slate-900">{total}</span>{" "}
              productos
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="text-sm font-medium text-slate-700 mx-2">
                Página {page} de {totalPages}
              </div>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
