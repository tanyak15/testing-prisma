"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { z } from "zod";

export default function ClassifyPage() {
  const { object, submit, isLoading } = useObject({
    api: "/api/classify",
    schema: z.object({ enum: z.enum(["true", "false"]) }),
  });

  return (
    <>
      <button onClick={() => submit("The earth is flat")} disabled={isLoading}>
        Classify statement
      </button>

      {object && <div>Classification: {object.enum}</div>}
    </>
  );
}
