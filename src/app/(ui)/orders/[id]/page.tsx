import api from "@/lib/axios";
import { cookies } from "next/headers";

export default async function OrderDetail({ params }: { params: { id: string } }) {
  const token = (await cookies()).get("token")?.value;
  const { data: order } = await api.get(`/api/orders/${params.id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return (
    <main className="max-w-xl mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">Pedido #{order.guid.slice(0, 8)}</h1>
      {order.items.map((it: any) => (
        <div key={it.id} className="flex justify-between">
          <span>{it.product.name} × {it.quantity}</span>
          <span>R$ {(it.unit_price * it.quantity).toFixed(2)}</span>
        </div>
      ))}
      <div className="text-right font-semibold text-lg">
        Total: R$ {order.total.toFixed(2)}
      </div>
      <p className="text-sm text-gray-500">Status: {order.status}</p>
    </main>
  );
}
