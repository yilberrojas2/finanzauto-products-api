import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../api/axios";

interface Category {
  id: string;
  name: string;
}

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/Category").then((res) => setCategories(res.data));

    if (isEdit) {
      api.get(`/Product/${id}`).then((res) => {
        setName(res.data.name);
        setPrice(res.data.price);
        setCategoryId(res.data.categoryId);
      });
    }
  }, [id, isEdit]);

  const validate = () => {
    const errs: string[] = [];
    if (!name.trim()) errs.push("El nombre es obligatorio");
    if (price <= 0) errs.push("El precio debe ser mayor a 0");
    if (!categoryId) errs.push("Debe seleccionar una categoría");
    setErrors(errs);
    return errs.length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    if (!validate()) return;

    setLoading(true);

    const payload = { name, price, categoryId };

    try {
      isEdit
        ? await api.put(`/Product/${id}`, payload)
        : await api.post("/Product", payload);

      navigate("/products");
    } catch {
      setErrors(["Ocurrió un error guardando el producto"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-200 via-white to-emerald-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-xl bg-gray-50 rounded-2xl shadow-xl p-10 border border-emerald-200"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
          {isEdit ? "Editar Producto" : "Crear Producto"}
        </h2>

        <p className="text-center text-gray-500 text-sm mb-8">
          Complete la información del producto
        </p>

        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm"
          >
            {errors.map((e) => (
              <div key={e}>• {e}</div>
            ))}
          </motion.div>
        )}

        <form onSubmit={submit} className="space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del producto
            </label>
            <input
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
              placeholder="Ej: Crédito Vehicular"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio
            </label>
            <input
              type="number"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
              placeholder="Ej: 2500000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition bg-white"
            >
              <option value="">Seleccione una categoría</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Botones */}
          <div className="flex justify-between items-center pt-6">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="text-gray-500 hover:text-gray-700 transition text-sm"
            >
              Cancelar
            </button>

            <button
              disabled={loading}
              className="relative bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 flex items-center gap-2"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
