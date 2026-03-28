import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { sequelize } from "./config/db.ts";
import { Post } from "./models/Post.model.ts";

const app = new Hono();

app.get("/health", async (c) => {
  return c.json({ status: "ok" });
});

// handle app launch
(async () => {
  {
    try {
      await sequelize.authenticate();
      console.log("authenctiacted");
      await sequelize.sync({ alter: true });
      console.log("Database synchronized");
      console.log(process.env.DB_NAME);

      const server = serve(
        {
          fetch: app.fetch,
          port: 3001,
        },
        (info) => {
          console.log(`Server is running on http://localhost:${info.port}`);
        },
      );
    } catch (err) {
      console.error("Failed to start application:", err);
      process.exit(1);
    }
  }
})();
