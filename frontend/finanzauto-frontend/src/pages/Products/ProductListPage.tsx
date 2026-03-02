import { useEffect, useState } from "react";
import api from "../../api/axios";

export const ProductListPage = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    api.get("/Product?Page=1&PageSize=20").then((res) => {
      setProducts(res.data.items);
    });
  }, []);

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name} - ${p.price}
        </li>
      ))}
    </ul>
  );
};
