# Development

```
bun run dev
cloudflared tunnel --url http://localhost:5173
```

# Production

```
 fly launch --ha=false
  fly secrets set DETA_API_KEY=
 fly deploy --ha=false

```

# Demo

https://youtube.com/shorts/rLQVEkH2yro?feature=share