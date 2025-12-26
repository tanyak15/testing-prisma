import { createOpenAI } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { notificationSchema } from "./schema";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // <- must be set
});
export async function POST(req: Request) {
  const context = await req.json();

  const result = streamObject({
    model: openai("chstgpt-4o-mini"),
    schema: notificationSchema,
    prompt:
      `Generate 3 notifications for a messages app in this context:` + context,
  });

  return result.toTextStreamResponse();
}
