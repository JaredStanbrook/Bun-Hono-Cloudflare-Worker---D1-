import { sqliteTable as table } from "drizzle-orm/sqlite-core";
import { text, integer, index } from "drizzle-orm/sqlite-core";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const employee = table("employee", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name"),
    employeeid: text("employee_id")
});
/*
    (employee) => {
        return {
            userIdIndex: index("name_idx").on(employee.userId),
        };
    }
);
*/
export const insertEmployeeSchema = createInsertSchema(employee, {
    name: z.string(),
    employeeid: z.string()
});

export const selectEmployeeSchema = createSelectSchema(employee);

//rename (employee + Employee)