"use client";
import { useCart } from "@/lib/providers/cart";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const { toast } = useToast();
  const router    = useRouter();

  const handleConfirm = async () => {
    try {
      const payload = {
        items: items.map((i) => ({
          product_id: i.id,
          quantity:   i.qty,
        })),
      };
      const { data } = await api.post("/api/orders/", payload);

      toast({ title: "Pedido realizado com sucesso!" });
      clear();                 
      router.push(`/orders/${data.guid}`);
    } catch (err: any) {
      toast({
        title: "Erro ao finalizar",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  return (
    <main className="max-w-xl mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Resumo</h1>

      {items.map((i) => (
        <div key={i.id} className="flex justify-between">
          <span>{i.name} × {i.qty}</span>
          <span>R$ {(i.price * i.qty).toFixed(2)}</span>
        </div>
      ))}

      <div className="text-right font-semibold text-lg">
        Total: R$ {total.toFixed(2)}
      </div>

      <Button className="w-full" onClick={handleConfirm}>
        Confirmar pedido
      </Button>
    </main>
  );
}
