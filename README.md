## 9. Frontend README

### `frontend/README.md`

````md
# SocialCrew AI Frontend

Next.js App Router frontend for the SocialCrew AI two-agent demo.

## Features

- Topic input and generation flow
- Live backend status badge in the top-right
- Status turns green when backend is reachable
- Status turns orange when backend is sleeping or unavailable
- Backend dashboard page at `/backend`
- Dark neon UI without changing the original theme direction

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS

## Routes

- `/` → main app
- `/backend` → backend dashboard

## Environment variables

### Local

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```
````
