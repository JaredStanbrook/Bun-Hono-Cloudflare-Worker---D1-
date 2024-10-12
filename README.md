# Framework
Update:
```bash
frontend/api.ts, server/sharedTypes.ts, server/routes, server/db/schema, drizzle.config.ts, wrangler.toml
```

Local development Server:
```bash
1. Install dependencies
    bun install
2. Create drizzle tables!
    bun run generate
3. To be safe!
    bun run type-check
4. Seed local wrangler database!
    bunx wrangler d1 execute <Datebase-Binding> --local --file ./drizzle/<sql-file> e.g. <./drizzle/0000_shiny_quasimodo.sql>
5. Run it!
    bun dev 
```

Local development Frontend:
```bash
1. Get to frontend dir!
    cd frontend
2. Install dependencies
    bun install
3. Run vite server!
    bun dev
```

For Production!
```bash
1. Get to frontend dir!
    cd frontend
2. Build Dist!
    bun run build
```