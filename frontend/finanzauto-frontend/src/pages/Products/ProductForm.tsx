import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  // Cargar categorías y producto (si es edición)
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

    const payload = {
      name,
      price,
      categoryId,
    };

    try {
      isEdit
        ? await api.put(`/Product/${id}`, payload)
        : await api.post("/Product", payload);

      navigate("/products");
    } catch {
      setErrors(["Error guardando el producto"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2>{isEdit ? "✏ Editar producto" : "➕ Crear producto"}</h2>

      {errors.length > 0 && (
        <ul style={{ color: "red" }}>
          {errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}

      <form onSubmit={submit}>
        <div>
          <label>Nombre</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label>Precio</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Categoría</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>

        <button type="button" onClick={() => navigate("/products")}>
          Cancelar
        </button>
      </form>
    </div>
  );
}
