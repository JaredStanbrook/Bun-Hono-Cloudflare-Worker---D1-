import { Hono } from "hono";
import { logger } from "hono/logger";
import { employeeRoute } from "./routes/employee";
//import { authRoute } from "./routes/auth"

const app = new Hono();
app.use("*", logger());

const apiRoutes = app.basePath("/api").route("/employee", employeeRoute); //.route("/", authRoute)

export default app;
export type ApiRoutes = typeof apiRoutes;
