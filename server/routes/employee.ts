import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { dbMiddleware } from "../db";
import type { CustomContext } from "../db";

import { employee as employeeTable, insertEmployeeSchema } from "../db/schema/employee";
import { eq, desc, sum, and } from "drizzle-orm";

import { createEmployeeSchema } from "../sharedTypes";

export const employeeRoute = new Hono<{ Bindings: Env; Variables: CustomContext }>()
    .use("*", dbMiddleware)
    .get("/", async (c) => {
        const employee = await c.var.db.select().from(employeeTable);
        c.status(200);
        return c.json({ employee: employee });
    })

    .post("/", zValidator("json", createEmployeeSchema), async (c) => {
        const employee = await c.req.valid("json");
        const validatedEmployee = insertEmployeeSchema.parse({
            ...employee,
          });
        const result = await c.var.db
            .insert(employeeTable)
            .values(validatedEmployee)
            .returning()
            .then((res) => res[0]);

        c.status(201);
        return c.json(result);
    })
    .delete("/:id{[0-9]+}", async (c) => {
        const employee = await c.var.db.delete(employeeTable);
        c.status(201);
        return c.json({ employee: employee });
    });
    
//rename (employee + Employee)