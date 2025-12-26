// "use client";

// import { experimental_useObject as useObject } from "@ai-sdk/react";
// import { notificationSchema } from "./api/notifications/schema";

// export default function Page() {
//   const { object, submit } = useObject({
//     api: "/api/notifications",
//     schema: notificationSchema,
//   });

//   return (
//     <>
//       <button onClick={() => submit("Messages during finals week.")}>
//         Generate notifications
//       </button>

//       {object?.notifications?.map((notification, index) => (
//         <div key={index}>
//           <p>{notification?.name}</p>
//           <p>{notification?.message}</p>
//         </div>
//       ))}
//     </>
//   );
// }

"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import type { MyUIMessage } from "@/ai/types";
import { DefaultChatTransport } from "ai";

export default function Chat() {
  const [input, setInput] = useState("");

  const { messages, sendMessage } = useChat<MyUIMessage>({
    transport: new DefaultChatTransport({
      api: "/api/chat", // ✅ valid here
    }),
    onData: (dataPart) => {
      // ✅ still goes on useChat options
      if (dataPart.type === "data-notification") {
        console.log("Notification:", dataPart.data.message);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <>
      {messages?.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}

          {/* Render weather data */}
          {message.parts
            .filter((part) => part.type === "data-weather")
            .map((part, index) => (
              <span key={index} className="weather-update">
                {part.data.status === "loading" ? (
                  <>Getting weather for {part.data.city}...</>
                ) : (
                  <>
                    Weather in {part.data.city}: {part.data.weather}
                  </>
                )}
              </span>
            ))}

          {/* Render text content */}
          {message.parts
            .filter((part) => part.type === "text")
            .map((part, index) => (
              <div key={index}>{part.text}</div>
            ))}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about the weather..."
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
