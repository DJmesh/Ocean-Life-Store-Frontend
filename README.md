# 🌊 Ocean Life Store - Frontend

Este projeto faz parte da disciplina de **Desenvolvimento Web** e tem como objetivo criar um **e-commerce sustentável** focado na preservação dos oceanos e proteção da vida marinha. Ele está alinhado com a **ODS 14 - Vida na Água**, promovendo conscientização e incentivando práticas responsáveis.

---

## 🚀 Tecnologias Utilizadas

- **Frontend**: [Next.js](https://nextjs.org/) com [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Django REST Framework](https://www.django-rest-framework.org/)
- **Gerenciamento de Estado**: (Pode ser adicionado posteriormente, ex: Redux, Zustand)
- **Deploy**: (Pode ser configurado para Vercel, Netlify ou Docker)
- **Banco de Dados**: (A definir, possivelmente PostgreSQL)

---

## 📥 Como Instalar o Node.js e Next.js

### 1 **Instalar o Node.js**
Para rodar o **Next.js**, primeiro você precisa do **Node.js** instalado.  

🔗 Baixe a versão mais recente do **Node.js** no site oficial:  
👉 [https://nodejs.org/](https://nodejs.org/)  

Após a instalação, verifique se o Node.js foi instalado corretamente com o comando:  
```sh
node -v
```

## 📂 Estrutura do Projeto
```bash
Ocean-Life-Store-Frontend/
│── .next/ # Build do Next.js
│── node_modules/ # Dependências do projeto
│── public/ # Arquivos estáticos (imagens, ícones, fontes, etc.)
│── src/ # Diretório principal
│   ├── app/ # Páginas e layout principal
│   │   ├── (auth)/ # Fluxo de autenticação
│   │   │   ├── choose-login/
│   │   │   ├── signin/
│   │   │   ├── signup/
│   │   ├── (ui)/ # Páginas principais do site
│   │   │   ├── home/
│   │   │   ├── plan-subscription/
│   │   │   ├── store/
│   │   │   ├── profile/
│   │   │   ├── search/
│   │   ├── layout.tsx # Layout base da aplicação
│   │   ├── page.tsx # Página principal
│   │   ├── globals.css # Estilos globais
│   ├── components/ # Componentes reutilizáveis
│   ├── data/ # Dados estáticos e mocks
│   ├── hooks/ # Hooks personalizados
│   ├── lib/ # Bibliotecas auxiliares
│   ├── services/ # Comunicação com APIs externas
│   ├── types/ # Definições de tipos TypeScript
│   ├── utils/ # Funções utilitárias
│── .env # Variáveis de ambiente
│── .eslint.json # Configuração do ESLint
│── .gitignore # Arquivos ignorados pelo Git
│── Dockerfile # Configuração do Docker
│── docker-compose.yml # Arquivo de configuração Docker Compose
│── next.config.mjs # Configuração do Next.js
│── package.json # Dependências do projeto
│── tailwind.config.ts # Configuração do TailwindCSS
│── tsconfig.json # Configuração do TypeScript
```

## 🔨 Como Configurar o Projeto

### 1️⃣ **Criar o projeto Next.js com TypeScript**
```sh
npx create-next-app@latest ocean-life-store-frontend --typescript
```
### 1️⃣ **Criar o projeto Next.js com TypeScript**

### ⚙️ Escolhas feitas na configuração do projeto
```sh
1️⃣ Would you like to use ESLint? → Yes ✅
✔️ Escolhido Yes para garantir boas práticas no código, evitando erros e inconsistências.

2️⃣ Would you like to use Tailwind CSS? → Yes ✅
✔️ Escolhido Yes para utilizar Tailwind CSS, um framework moderno para estilização.

3️⃣ Would you like your code inside a src/ directory? → Yes ✅
✔️ Escolhido Yes para manter um projeto organizado dentro da pasta src/.

4️⃣ Would you like to use App Router? (recommended) → Yes ✅
✔️ Escolhido Yes para utilizar o novo sistema de roteamento do Next.js baseado em app/, mais moderno e otimizado.

5️⃣ Would you like to use Turbopack for next dev? → Yes ✅
✔️ Escolhido Yes para usar o Turbopack, que acelera o tempo de desenvolvimento, tornando a aplicação mais rápida.

6️⃣ Would you like to customize the import alias (@/* by default)? → Yes ✅
✔️ Escolhido Yes para definir o alias @/*, facilitando os imports dentro do projeto.

7️⃣ What import alias would you like configured? → @/
✔️ Isso permite importar arquivos sem precisar de caminhos relativos complexos, por exemplo:
```
Sem alias (@/*):
```sh
import Button from '../../components/Button';
import useAuth from '../../hooks/useAuth';
```
 Com alias (@/*):
```sh
import Button from '@/components/Button';
import useAuth from '@/hooks/useAuth';
```

### 3️⃣ **Criar o projeto Next.js com TypeScript**
Edite tailwind.config.ts:
```sh
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```
```sh
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4️⃣ **Criar o projeto Next.js com TypeScript**
```sh
npm run dev
```