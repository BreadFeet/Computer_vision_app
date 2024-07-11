"use client";

import { useSearchParams } from "next/navigation";
import { useChat } from "ai/react";
import { useEffect, useRef }  from "react";

export default function Description() {
  const { messages, isLoading, append, input, handleSubmit, handleInputChange} = useChat();

  // To get pushed parameter from computer-vision
  const searchParams = useSearchParams();
  const desc = searchParams.get('desc');

  // For auto-scrolling
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);


  return (
    <div className="flex flex-col w-full h-screen max-w-md py-24 mx-auto stretch">
      <div className="overflow-auto mb-8 w-full"  ref={messagesContainerRef}>
        {messages.map(m => (
          <div
            key={m.id}
            className={`whitespace-pre-wrap ${
              m.role === "user"
                ? "bg-green-700 p-3 m-2 rounded-lg"
                : "bg-slate-700 p-3 m-2 rounded-lg text-white"
            }`}
          >
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}
      {isLoading && (
        <div className="flex justify-end pr-4">
          <span className="animate-bounce"> ... </span>
        </div>
      )}
      </div>

      <div className="fixed bottom-0 w-full max-w-md">
        {messages.length == 0 && (
          <div className="flex flex-col justify-center mb-2 items-center">
            <button
              className="bg-blue-500 p-2 text-white rounded shadow-x1"
              onClick={() => append({
                role: "user",
                content: `Write a story based on ${desc}`
              })}
            >
              Start Conversation
            </button>
          </div>
        )}

        {messages.length > 0 && (
          <form onSubmit={handleSubmit} className="flex justify-center">
           <input
             className="w-[95%]  p-2 mb-8 border border-gray-300 rounded shadow-x1 text-black"
             disabled={isLoading}
             value={input}
             placeholder="Chat with the AI"
             onChange={handleInputChange}
           />
          </form>
        )}
      </div>



    </div>
  );
}