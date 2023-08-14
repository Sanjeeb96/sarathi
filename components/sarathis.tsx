import { Sarathi } from "@prisma/client";
import Image from "next/image";
import { Card } from "./ui/card";
import Link from "next/link";

interface SarathiProps {
  data: (Sarathi & {
    _count: {
      messages: number;
    };
  })[];
}

export const Sarathis = ({ data }: SarathiProps) => {
  if (data.length === 0) {
    return (
      <div className="pt-10 flex flex-col items-center justify-center space-y-3">
        <div className="relative h-20 w-20">
          <Image src="/empty.png" fill className="greyscale" alt="Empty" />
        </div>

        <p className="text-sm text-muted-foreground">No Sarathi Found.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-10">
      {data.map((item) => (
        <Card
          key={item.id}
          className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0"
        >
          <Link href={`/chat/${item.id}`}></Link>
        </Card>
      ))}
    </div>
  );
};
