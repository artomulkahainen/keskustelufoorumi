import { Hono } from "hono";
import { Post } from "./models/Post.model.ts";

export const app = new Hono();

app.get("/health", async (c) => {
  return c.json({ status: "ok" });
});


const POSTS_ENDPOINT = '/posts'
app.post(POSTS_ENDPOINT, async (c) => {
  const body = await c.req.json();
  const user = body.user;
  const content = body.content;

  const newPost = await Post.create({createdBy: user, content});
  return c.json(newPost);
});

