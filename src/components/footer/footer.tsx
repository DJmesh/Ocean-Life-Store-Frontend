export default function Footer() {
    return (
      <footer className="bg-black text-white p-6 text-center">
        <div className="container mx-auto">
          <p className="text-lg font-bold">Ocean Life Store</p>
          <p className="text-sm mt-2">
            &copy; {new Date().getFullYear()} Ocean Life Store. Todos os direitos reservados.
          </p>
          <p className="text-sm mt-2">Contato: suporte@oceanlifestore.com | (11) 99999-9999</p>
          <p className="text-sm mt-2">Endereço: Rua das Ondas, 123 - Sorocaba, SP</p>
        </div>
      </footer>
    );
  }
  