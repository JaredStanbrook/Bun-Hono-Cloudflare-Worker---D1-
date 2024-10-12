import { insertEmployeeSchema } from "./db/schema/employee";

import { z } from "zod";

export const createEmployeeSchema = insertEmployeeSchema.omit({
    id: true,
});

export type CreateEmployee = z.infer<typeof createEmployeeSchema>;

//rename (employee + Employee)