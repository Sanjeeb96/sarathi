import prismadb from "@/lib/prismadb";
import { SarathiForm } from "./components/sarathi-form";

interface SarathiIdPageProps {
  params: {
    sarathiId: string;
  };
}

const SarathiIdPage = async ({ params }: SarathiIdPageProps) => {
  //TODO Check Subscription

  const sarathi = await prismadb.sarathi.findUnique({
    where: {
      id: params.sarathiId,
    },
  });

  const categories = await prismadb.category.findMany();
  return <SarathiForm initialData={sarathi} categories={categories} />;
};

export default SarathiIdPage;
