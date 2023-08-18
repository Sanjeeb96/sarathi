"use client";

import { ChatHeader } from "@/components/chat-header";
import { Message, Sarathi } from "@prisma/client";

interface ChatClientProps {
  sarathi: Sarathi & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export const ChatClient = ({ sarathi }: ChatClientProps) => {
  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader sarathi={sarathi} />
    </div>
  );
};
