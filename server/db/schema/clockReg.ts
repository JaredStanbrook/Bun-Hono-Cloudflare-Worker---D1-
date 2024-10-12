import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import { text, integer, index } from "drizzle-orm/sqlite-core";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const clockReg = table("clockReg", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    staffId: text("staff_id").notNull(),
    clockedIn: integer('boolean').notNull(),
    date: integer('timestamp').notNull(),
    time: text("time") // Optional, so no need for .notNull()
});
/*
    (employee) => {
        return {
            userIdIndex: index("name_idx").on(employee.userId),
        };
    }
);
*/
export const insertClockRegSchema = createInsertSchema(clockReg, {
    staffId: z.string(),
    clockedIn: z.string(),
    date: z.string(),
    time: z.string()
});

export const selectClockRegSchema = createSelectSchema(clockReg);
