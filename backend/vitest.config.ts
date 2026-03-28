import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["test/**/*.test.ts"],
    env: {
      DB_USER: "postgres",
      DB_PASSWORD: "testdb",
      DB_HOST: "localhost",
      DB_PORT: "5432",
      DB_NAME: "keskustelufoorumidb",
    },
  },
});
