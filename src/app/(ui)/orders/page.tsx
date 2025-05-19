import api from "@/lib/axios";
import { cookies } from "next/headers";

async function fetchOrders() {
  const token = (await cookies()).get("access")?.value;
  if (!token) return [];

  const { data } = await api.get("/api/orders/", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return Array.isArray(data) ? data : data.results ?? [];
}

export default async function OrdersPage() {
  const orders = await fetchOrders();

  return (
    <main className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Meus pedidos</h1>

      {orders.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((o: any) => (
            <li key={o.guid} className="flex justify-between border p-4 rounded-md">
              <span>#{o.guid.slice(0, 8)}</span>
              <span>R$ {Number(o.total).toFixed(2)}</span>
              <a href={`/orders/${o.guid}`} className="text-blue-600">Detalhes</a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
