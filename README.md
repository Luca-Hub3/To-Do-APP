# 📝 To-Do App

Un'applicazione moderna e completa per la gestione delle attività (To-Do) costruita con Next.js, React e TypeScript. Include un pannello amministrativo avanzato per la gestione degli utenti e delle statistiche.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Caratteristiche

### 🎯 Funzionalità Principali

- **Gestione Task Completa**
  - Crea, modifica ed elimina task
  - Organizza i task in liste personalizzate
  - Priorità (Alta, Media, Bassa)
  - Date di scadenza
  - Ricerca avanzata dei task

- **Interfaccia Utente Moderna**
  - Design responsive (mobile-first)
  - Tema chiaro/scuro con supporto per preferenze di sistema
  - Animazioni fluide e transizioni
  - UI component library (shadcn/ui)

- **Persistenza Dati**
  - Salvataggio automatico in LocalStorage
  - Export/Import dei task in formato JSON
  - Backup e ripristino dati

- **Pannello Amministrativo**
  - Dashboard con statistiche
  - Gestione utenti
  - Impostazioni avanzate
  - Sistema di autenticazione sicuro

## 🚀 Inizio Rapido

### Prerequisiti

- Node.js 18+ 
- pnpm (o npm/yarn)

### Installazione

1. **Clona il repository**
   ```bash
   git clone https://github.com/Luca-Hub3/To-Do-APP.git
   cd To-Do-APP
   ```

2. **Installa le dipendenze**
   ```bash
   pnpm install
   # oppure
   npm install
   ```

3. **Avvia il server di sviluppo**
   ```bash
   pnpm dev
   # oppure
   npm run dev
   ```

4. **Apri il browser**
   Naviga su [http://localhost:3000](http://localhost:3000)

## 📦 Script Disponibili

```bash
# Sviluppo
pnpm dev          # Avvia il server di sviluppo

# Build
pnpm build        # Crea la build di produzione
pnpm start        # Avvia il server di produzione

# Qualità del codice
pnpm lint         # Esegue il linter
```

## 🏗️ Struttura del Progetto

```
to-do-app/
├── app/                    # App Router di Next.js
│   ├── admin/             # Pannello amministrativo
│   │   ├── login/        # Pagina di login admin
│   │   ├── overview/     # Dashboard admin
│   │   ├── users/        # Gestione utenti
│   │   ├── stats/        # Statistiche
│   │   └── settings/     # Impostazioni admin
│   ├── layout.tsx        # Layout principale
│   └── page.tsx          # Homepage
├── components/            # Componenti React
│   ├── admin/           # Componenti admin
│   ├── ui/              # Componenti UI (shadcn/ui)
│   ├── task-board.tsx   # Board principale dei task
│   ├── task-item.tsx    # Singolo task
│   ├── sidebar.tsx      # Sidebar navigazione
│   └── navbar.tsx       # Navbar principale
├── hooks/               # Custom React hooks
│   └── use-admin-auth.ts # Hook autenticazione admin
├── lib/                 # Utilities
│   └── utils.ts         # Funzioni helper
├── public/              # File statici
└── styles/              # Stili globali
```

## 🔐 Accesso Admin

Per accedere al pannello amministrativo:

1. Vai su `/admin/login`
2. Password di default: `admin123`

> ⚠️ **Nota**: Cambia la password in produzione modificando il file `hooks/use-admin-auth.ts`

## 🛠️ Tecnologie Utilizzate

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework
- **Linguaggio**: [TypeScript](https://www.typescriptlang.org/) - Tipizzazione statica
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - Componenti basati su Radix UI
- **Icons**: [Lucide React](https://lucide.dev/) - Icone moderne
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) - Validazione form
- **Charts**: [Recharts](https://recharts.org/) - Grafici per statistiche
- **Themes**: [next-themes](https://github.com/pacocoursey/next-themes) - Gestione temi

## 📱 Responsive Design

L'applicazione è completamente responsive e ottimizzata per:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1440px+)

## 🎨 Tema

L'applicazione supporta:
- ☀️ Tema chiaro
- 🌙 Tema scuro
- 🔄 Rilevamento automatico preferenze sistema

## 📄 Licenza

Questo progetto è privato e non è disponibile per uso pubblico.

## 👤 Autore

**Luca-Hub3**

- GitHub: [@Luca-Hub3](https://github.com/Luca-Hub3)

---

⭐ Se ti piace questo progetto, lascia una stella su GitHub!

