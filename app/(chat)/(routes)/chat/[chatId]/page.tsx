import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface ChatIdPageProps {
  params: {
    chatId: string;
  };
}

const ChatIdPage = async ({ params }: ChatIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const sarathi = await prismadb.sarathi.findUnique({
    where: {
      id: params.chatId,
    },

    include: {
      messages: {},
    },
  });

  return <div className="">Hello Chat Bros</div>;
};

export default ChatIdPage;
