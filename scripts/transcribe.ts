import "dotenv/config";
import { experimental_transcribe as transcribe } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { readFile } from "fs/promises";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});
async function main() {
  console.log("helloo");
  const transcript = await transcribe({
    model: openai.transcription("whisper-1"),
    audio: await readFile("audio/audio2.mp3"),
  });

  console.log("Transcript:");
  console.log(transcript.text);
}

main().catch((err) => {
  console.error("Transcription error:", err);
  process.exit(1);
});
