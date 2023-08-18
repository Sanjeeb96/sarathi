"use client";

import { useRouter } from "next/navigation";

import { ChatHeader } from "@/components/chat-header";
import { Message, Sarathi } from "@prisma/client";
import { FormEvent, useState } from "react";

import { useCompletion } from "ai/react";
import { ChatForm } from "@/components/chat-form";
import { ChatMessages } from "@/components/chat-messages";
import { ChatMessageProps } from "@/components/chat-message";

interface ChatClientProps {
  sarathi: Sarathi & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export const ChatClient = ({ sarathi }: ChatClientProps) => {
  const router = useRouter();

  const [messages, setMessages] = useState<ChatMessageProps[]>(
    sarathi.messages
  );

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${sarathi.id}`,
      onFinish(prompt, completion) {
        const systemMessage: ChatMessageProps = {
          role: "system",
          content: completion,
        };
        setMessages((current) => [...current, systemMessage]);
        setInput("");

        router.refresh();
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: "user",
      content: input,
    };

    setMessages((current) => [...current, userMessage]);

    handleSubmit(e);
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader sarathi={sarathi} />

      <ChatMessages
        sarathi={sarathi}
        isLoading={isLoading}
        messages={messages}
      />
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};
