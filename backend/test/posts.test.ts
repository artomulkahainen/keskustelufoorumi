import { describe, it, expect, vi, beforeEach } from "vitest";

const mockCreate = vi.hoisted(() => vi.fn());

vi.mock("../src/models/Post.model.ts", () => ({
  Post: {
    create: mockCreate,
  },
}));

import { app } from "../src/app.ts";

describe("POST /posts", () => {
  beforeEach(() => {
    mockCreate.mockReset();
  });

  it("returns created post and calls Post.create with body fields", async () => {
    const created = {
      id: "550e8400-e29b-41d4-a716-446655440000",
      content: "hello",
      createdBy: "alice",
      createdAt: new Date("2026-01-01T12:00:00.000Z"),
    };
    mockCreate.mockResolvedValueOnce(created);

    const res = await app.request("http://localhost/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: "alice", content: "hello" }),
    });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      id: created.id,
      content: "hello",
      createdBy: "alice",
      createdAt: "2026-01-01T12:00:00.000Z",
    });
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledWith({
      createdBy: "alice",
      content: "hello",
    });
  });
});
