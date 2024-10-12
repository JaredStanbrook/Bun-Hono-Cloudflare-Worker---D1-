import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: [
    "./server/db/schema/employee.ts",    // Examplezzz!!!!
    "./server/db/schema/department.ts",  // Add your additional schemas here
    "./server/db/schema/project.ts"      // Add more as needed
  ],
  dialect: 'sqlite'
});