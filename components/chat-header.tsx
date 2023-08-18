"use client";

import axios from "axios";

import { Message, Sarathi } from "@prisma/client";
import {
  ChevronLeft,
  Edit,
  MessageSquare,
  MoreVertical,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { BotAvatar } from "./bot-avatar";
import { useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useToast } from "./ui/use-toast";

interface ChatHeaderProps {
  sarathi: Sarathi & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export const ChatHeader = ({ sarathi }: ChatHeaderProps) => {
  const router = useRouter();
  const { user } = useUser();

  const { toast } = useToast();

  const onDelete = async () => {
    try {
      await axios.delete(`/api/sarathi/${sarathi.id}`);

      toast({
        description: "Sarathi Deleted Successfully",
        variant: "default",
      });

      router.refresh();
      router.push("/");
    } catch (error) {
      toast({
        description: "Something went Wrong",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
      <div className="flex gap-x-2 items-center">
        <Button
          onClick={() => {
            router.back();
          }}
          size="icon"
          variant="ghost"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <BotAvatar src={sarathi.src} />
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold">{sarathi.name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <MessageSquare className="w-3 h-3 mr-1" />
              {sarathi._count.messages}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Created by {sarathi.userName}
          </p>
        </div>
      </div>

      {user?.id === sarathi.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVertical className="" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => router.push(`/sarathi/${sarathi.id}`)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem onClick={onDelete}>
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
