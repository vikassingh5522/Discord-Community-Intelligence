

# Discord Community Intelligence

A full-stack Discord analytics platform that transforms raw Discord server activity into meaningful insights for gaming and creator communities. The system includes a Discord bot + API layer, a Node.js analytics engine, and a React dashboard with real-time visualizations.

> Live demo, screenshots and diagram placeholders are included below — add your images to `/docs/images` and update the paths.

---

## 🚀 Project Status

**In Progress** — core analytics, backend APIs, and frontend dashboard are implemented. Bonus features (raid detection, event tracking, automated health scoring) included.

---

## 🔗 Repository

[https://github.com/vikassingh5522/Discord-Community-Intelligence.git](https://github.com/vikassingh5522/Discord-Community-Intelligence.git)

---

## 🎯 Key Features

**Core**

* Discord OAuth2 bot + user authentication
* Bot permission & server invite management
* Message frequency analysis
* Channel activity heatmaps
* Member growth tracking & retention
* Role distribution insights
* Emoji & meme trending detection
* Link sharing analysis
* Voice channel metrics
* Engagement scoring
* Toxicity detection (Perspective API)
* Moderator effectiveness metrics

**Bonus**

* Raid detection alerts
* Event success tracking
* Custom bot commands
* Automated community health score

---

## 🧭 Architecture / Data Flow (summary)

1. **Discord Server Events** (messages, reactions, voice events, joins/leaves) → captured by the Discord Bot + Webhooks.
2. **Bot + API Layer (Node.js / Express / Discord.js)** → authenticates (OAuth2), manages permissions and ingests events.
3. **Analytics Engine** → processes events to generate metrics: message frequency, heatmaps, growth trends, emoji/meme detection, toxicity scoring (Perspective API).
4. **Redis** → caches high-volume message data for fast retrieval.
5. **PostgreSQL** → stores historical analytics and aggregated metrics.
6. **React Dashboard** → displays charts, heatmaps, summaries and health score; receives real-time updates via webhooks.

*See `docs/diagram.png` (recommended) for the full data flow diagram.*

---

## 🧰 Tech Stack

* Backend: Node.js, Express, Discord.js
* Frontend: React, Tailwind CSS, Recharts
* Database: PostgreSQL
* Cache: Redis
* ML/Toxicity: Perspective API (or equivalent)
* Deployment: Docker-ready (recommended)

---

## 📁 Repository Structure (suggested)

```
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── data/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── README.md
├── docs/
│   ├── diagram.png
│   ├── screenshots/
│   └── Discord_Community_Intelligence_Documentation.docx
├── .gitignore
└── README.md
```

---

## ⚙️ Setup & Run (Development)

> These steps assume you have Node.js, npm/yarn, PostgreSQL, and Redis installed.

### Backend

1. `cd backend`
2. `cp .env.example .env` and fill in the values:

   ```
   PORT=5000
   DATABASE_URL=postgres://user:password@localhost:5432/dbname
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your_jwt_secret
   DISCORD_CLIENT_ID=your_discord_client_id
   DISCORD_CLIENT_SECRET=your_discord_client_secret
   DISCORD_BOT_TOKEN=your_bot_token
   PERSPECTIVE_API_KEY=your_perspective_api_key
   ```
3. `npm install`
4. `npm run dev` (or `npm start`)

### Frontend

1. `cd frontend`
2. `npm install`
3. Create `.env` if required (e.g., `VITE_API_URL=http://localhost:5000`)
4. `npm run dev` (or `npm start`)

---

## 🧾 API Endpoints (summary)

> Most endpoints require `Authorization: Bearer <JWT>` (after login).

**Auth**

* `POST /api/auth/register` — Register user
* `POST /api/auth/login` — Login and receive JWT
* `GET /api/auth/me` — Get current user profile

**Analytics**

* `GET /api/analytics/summary` — Overview: total users, messages, top channel/user
* `GET /api/analytics/growth` — Growth metrics & weekly/monthly stats
* `GET /api/analytics/active-users` — Active users, DAU/MAU, heatmap
* `GET /api/analytics/channels` — Most active channels
* `GET /api/analytics/trending-topics` — Top words, hashtags
* `GET /api/analytics/message-activity` — Messages per day/hour
* `GET /api/analytics/by-channel/:channelId` — Channel-specific analytics

---

## 🔒 Privacy & Data Handling

* The bot respects server privacy and permission scopes — only reads from channels/servers where it is authorized.
* Sensitive data (tokens, keys) should only be stored in server environment variables.
* Provide options to anonymize or delete user-level data on request.

---

## 📄 Documentation & Deliverables

* Project documentation (Word): `docs/Discord_Community_Intelligence_Documentation.docx`
* Data flow diagram: `docs/diagram.png` (add the high-res diagram here)
* Demo server: (link placeholder) — add demo invite URL here
* Video walkthrough: (link placeholder) — add your YouTube/Loom URL here

---

## ✅ Quick LinkedIn Post (copy & paste)

> Short enhanced post with tags:

🎸 Built **Discord Community Intelligence** — a full-stack analytics platform that turns Discord server activity into actionable insights for gaming & creator communities.
🔗 [https://github.com/vikassingh5522/Discord-Community-Intelligence.git](https://github.com/vikassingh5522/Discord-Community-Intelligence.git)

Tech: Node.js, Express, Discord.js, PostgreSQL, Redis, React, Tailwind, Recharts, Perspective API.
Special thanks & tags: @Discord @DiscordDevelopers @DiscordEngineering

#Discord #Analytics #FullStack #NodeJS #React #MachineLearning #DeveloperTools

---

## 🧪 Testing

* Use Postman to test API endpoints (see examples in `docs/postman_collection.json` – optional).
* Add unit tests with Jest (backend) and React Testing Library (frontend).

---

## 🛠️ Deployment Tips

* Build frontend and serve via CDN or static site hosting (Netlify, Vercel).
* Containerize backend with Docker; use managed PostgreSQL and Redis for production.
* Use GitHub Actions for CI/CD: run tests, lint, and deploy.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit changes (`git commit -m "feat: ..."`), push (`git push`)
4. Open a pull request

Please follow conventional commits and run `npm run lint`/`npm test` before PR.

---

## 📞 Contact

* GitHub: [https://github.com/vikassingh5522](https://github.com/vikassingh5522)
* LinkedIn [post text included above — feel free to tag me in posts for feedback.](https://www.linkedin.com/in/vikas-singh-1b5682232/recent-activity/all/)

---

## 📜 License


```
MIT License
Copyright (c) 2025 <Vikas Singh>
```

---


