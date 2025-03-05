import Image from "next/image";
import Link from "next/link";
import { CartIcon } from "./CartIcon";
import { Search } from "lucide-react"; 

export default function Navbar() {
  return (
    <nav className="w-full p-4 border-b shadow-sm bg-black text-white flex justify-between items-center">
      <div className="flex items-center">
        <Image src="/brazil-flag.svg" alt="Bandeira do Brasil" width={30} height={20} />
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Image src="/logo-white.png" alt="Ocean Life Store" width={60} height={50} />
      </div>

      <div className="flex items-center gap-4">
        <Link href="/login" className="flex items-center gap-1 text-sm hover:underline">
          <Search size={16} />
          LOGIN/CADASTRO
        </Link>
        <CartIcon />
      </div>
    </nav>
  );
}
