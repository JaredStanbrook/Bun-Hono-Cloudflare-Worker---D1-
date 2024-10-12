import { createMiddleware } from "hono/factory";
import { drizzle } from "drizzle-orm/d1";
//import { z } from "zod";

export type Bindings = {
    DB: D1Database;
};

export type CustomContext = {
    db: ReturnType<typeof drizzle>;
};

export const dbMiddleware = createMiddleware<{ Bindings: Env; Variables: CustomContext }>(
    async (c, next) => {
        const db = drizzle(c.env.DB);
        c.set("db", db);
        await next();
    }
);
