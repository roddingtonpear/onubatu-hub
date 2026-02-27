# 🥁 OnuBatú Hub

WhatsApp chat organizer and archive for the OnuBatú batucada group.

Upload WhatsApp chat exports → auto-organized, searchable, beautiful.

## Features

- **Upload** WhatsApp chat exports (.txt)
- **Dashboard** with stats, charts, activity overview
- **Messages** browser with filters (sender, type, tags, important)
- **Members** overview with activity stats
- **Full-text search** in Spanish
- **Auto-tagging** of rhythms (avenida, merengue, reggae, etc.), instruments, events
- **Important message detection** (urgente, importante, cancelado, etc.)

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS + Recharts
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **Hosting:** Railway

## Architecture (Telegram-ready)

Built modular so you can add:
1. **Telegram viewer bot** — browse archive via Telegram
2. **Telegram input** — full group switch, live message ingestion
3. Same database, same organization logic, just new input/output

---

## Local Development

### Prerequisites
- Node.js 18+
- PostgreSQL running locally

### Setup

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/onubatu-hub.git
cd onubatu-hub

# Server
cd server
cp .env.example .env
# Edit .env with your PostgreSQL connection string
npm install
npm run migrate
cd ..

# Client
cd client
npm install
cd ..

# Run both
npm install
npm run dev
```

App runs at http://localhost:5173

---

## Deploy to Railway

### 1. Create GitHub repo

```bash
git init
git add .
git commit -m "Initial commit - OnuBatú Hub"
gh repo create onubatu-hub --public --push
```

### 2. Railway setup

1. Go to [railway.app](https://railway.app) → New Project
2. Choose **Deploy from GitHub repo** → select `onubatu-hub`
3. Add a **PostgreSQL** plugin (click + New → Database → PostgreSQL)
4. Railway auto-sets `DATABASE_URL`
5. Add variable: `NODE_ENV=production`
6. Deploy!

### 3. Custom domain (optional)

Railway gives you a `.railway.app` URL automatically.
You can add a custom domain in Settings → Networking.

---

## WhatsApp Export Instructions

1. Open the OnuBatú group chat
2. Tap the group name at the top
3. Scroll down → **Export Chat**
4. Choose **Without Media** (for now)
5. Save/share the .txt file
6. Upload to OnuBatú Hub

---

## Future: Telegram Integration

### Mode 2: Telegram as viewer
Add a Telegram bot that queries the same PostgreSQL database.
Group members can `/search ensayo` or `/recent` via Telegram.

### Mode 3: Full Telegram switch
Bot joins the Telegram group, reads messages live via Bot API.
No more manual exports needed.

Both modes reuse the existing database schema and API.

---

*Built with ❤️ for the OnuBatú batucada family*
