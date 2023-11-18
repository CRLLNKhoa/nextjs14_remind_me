import CollectionCard from "@/components/CollectionCard";
import CreateCollectionBtn from "@/components/CreateCollectionBtn";
import SadFace from "@/components/icons/SadFace";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { prisma } from "@/lib/prisma";
import { wait } from "@/lib/wait";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense>
        <WelcomMsg />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex h-full w-full justify-center gap-2 items-center font-mono">
            <p className="text-3xl animate-bounce">🌀</p>
            <p className="text-xl animate-bounce">Đang tải dữ liệu của bạn!</p>
          </div>
        }
      >
        <CollectionList />
      </Suspense>
    </>
  );
}

async function WelcomMsg() {
  const user = await currentUser();
  if (!user) {
    return <div>error</div>;
  }

  return (
    <div className="flex w-full mb-4">
      <h1 className="text-xl font-bold">
        Xin chào! {user.firstName} {user.lastName}
      </h1>
    </div>
  );
}

async function CollectionList() {
  const user = await currentUser();
  const collections = await prisma.collection.findMany({
    include: {
      tasks: true,
    },
    where: {
      userId: user?.id,
    },
  });

  if (collections.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <Alert>
          <SadFace />
          <AlertTitle>Chưa có công việc nào!</AlertTitle>
          <AlertDescription>Tạo công việc để bắt đầu</AlertDescription>
        </Alert>
        <CreateCollectionBtn />
      </div>
    );
  }

  return (
    <>
      <CreateCollectionBtn />
      <div className="flex flex-col gap-4 mt-6">
        {collections.map((collection) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
          />
        ))}
      </div>
    </>
  );
}
