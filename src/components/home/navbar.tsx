"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/providers/auth";
import { CartIcon } from "./CartIcon";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Settings, User } from "lucide-react";


export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full p-4 border-b shadow-sm bg-black text-white flex justify-between items-center">
      <div className="flex items-center">
        <Image src="/brazil-flag.svg" alt="Bandeira do Brasil" width={30} height={20} />
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Image src="/logo-white.png" alt="Ocean Life Store" width={60} height={50} />
      </div>
      <div className="flex items-center gap-4">
        {!user ? (
          <Link href="/signin" className="flex items-center gap-1 text-sm hover:underline">
            LOGIN / CADASTRO
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-teal-700 text-white">
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{user.username}</span>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem disabled>
                <User className="mr-2 h-4 w-4" />
                Perfil (em breve)
              </DropdownMenuItem>

              <DropdownMenuItem disabled>
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={logout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <CartIcon />
      </div>
    </nav>
  );
}
