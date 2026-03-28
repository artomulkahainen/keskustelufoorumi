import { serve } from "@hono/node-server";
import { app } from "./app.ts";
import { sequelize } from "./config/db.ts";

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
          port: 8080,
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
