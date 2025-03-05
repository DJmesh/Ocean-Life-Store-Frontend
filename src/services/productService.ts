import api from "@/lib/axios";

/**
 * Busca os produtos do endpoint público.
 * @returns Uma promise com os dados dos produtos.
 */
export const getProducts = async () => {
  const response = await api.get("/api/products/");
  return response.data;
};
