import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamObject({
    model: "anthropic/claude-sonnet-4.5",
    output: "enum",
    enum: ["true", "false"],
    prompt: `Classify this statement as true or false: ${context}`,
  });

  return result.toTextStreamResponse();
}
