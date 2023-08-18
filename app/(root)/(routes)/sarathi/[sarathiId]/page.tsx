import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";

import { SarathiForm } from "./components/sarathi-form";

interface SarathiIdPageProps {
  params: {
    sarathiId: string;
  };
}

const SarathiIdPage = async ({ params }: SarathiIdPageProps) => {
  const { userId } = auth();
  //TODO Check Subscription

  if (!userId) {
    return redirectToSignIn();
  }

  const sarathi = await prismadb.sarathi.findUnique({
    where: {
      id: params.sarathiId,
    },
  });

  const categories = await prismadb.category.findMany();
  return <SarathiForm initialData={sarathi} categories={categories} />;
};

export default SarathiIdPage;
