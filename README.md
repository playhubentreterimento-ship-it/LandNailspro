# NailGestão PRO 1.1 — Landing Page

> Landing page de alta conversão para o **NailGestão PRO 1.1**, um SaaS de gestão editorial para nail designers, manicures e salões de unhas.

---

## 💅 Conceito Visual & Design System

A página adota estética editorial de luxo feminino: claridade, tons marfim e rosé, detalhes em dourado champagne e mockups nítidos em HTML/CSS:
- **Fundo Principal:** Marfim quente `#FBF6F2`
- **Fundos Alternados:** Blush `#F6E4E4` e Rosé claro `#F1D3D6`
- **Ameixa Profundo:** `#2B1220` (tipografia e fundo contrastante da seção de lembretes)
- **Marca:** Magenta `#D6246E` com CTAs em degradê `#E0307A → #C21463`
- **Dourado Champagne:** Gradiente `#B98A2F → #E3C176 → #B98A2F`
- **Tipografia:** Fraunces (serifada de títulos) & Plus Jakarta Sans (UI e corpo)

---

## 🚀 Tecnologias

- **React 18** + **Vite 7** + **TypeScript**
- **Tailwind CSS** (design tokens customizados, vidro fosco, sombras em camadas)
- **Framer Motion** (text reveal, parallax, contadores e storytelling ligado ao scroll)
- **Lucide React** (ícones em traço fino)

---

## 🛠️ Como Executar Localmente

### 1. Clonar o repositório
```bash
git clone <url-do-repositorio>
cd nailgestao-pro
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Rodar em ambiente de desenvolvimento
```bash
npm run dev
```
Abra `http://localhost:5173` no seu navegador.

### 4. Build de produção
```bash
npm run build
```

---

## 📁 Estrutura do Projeto

```
nailgestao-pro/
├── public/                     # Assets estáticos e favicon
├── src/
│   ├── components/
│   │   ├── ui/                 # Botões magnéticos, cards de vidro, cursor reativo, iPhone frame
│   │   └── sections/           # Todas as 18 seções narrativas da landing page
│   ├── data/                   # Textos, planos, preços e FAQs editáveis
│   ├── hooks/                  # Hooks customizados de mouse e scroll
│   ├── styles/                 # Tailwind CSS e utilitários de vidro/grão
│   ├── App.tsx
│   └── main.tsx
├── tailwind.config.js
└── vite.config.ts
```

---

## 📄 Licença & Direitos

© 2026 NailGestão. Todos os direitos reservados.
