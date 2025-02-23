import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="w-full p-4 border-b shadow-sm flex justify-between items-center">
      <h1 className="text-xl font-bold">🌊 Ocean Life Store</h1>
      <div className="flex gap-4">
        <Button variant="outline">Login</Button>
        <Button>Cadastre-se</Button>
      </div>
    </nav>
  );
}
