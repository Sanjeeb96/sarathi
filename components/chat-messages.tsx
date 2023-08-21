"use client";

import { Sarathi } from "@prisma/client";
import { ChatMessage, ChatMessageProps } from "./chat-message";
import { ElementRef, useEffect, useRef, useState } from "react";

interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
  sarathi: Sarathi;
}

export const ChatMessages = ({
  messages = [],
  isLoading,
  sarathi,
}: ChatMessagesProps) => {
  const scrollRef = useRef<ElementRef<"div">>(null);

  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);
  return (
    <div className="flex-1 overflow-y-auto pr-4 ">
      <ChatMessage
        isLoading={fakeLoading}
        src={sarathi.src}
        role="system"
        content={`Hello, I am ${sarathi.name}, ${sarathi.description}`}
      />

      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          role={message.role}
          content={message.content}
          src={sarathi.src}
        />
      ))}

      {isLoading && <ChatMessage role="system" src={sarathi.src} isLoading />}

      <div ref={scrollRef} />
    </div>
  );
};
