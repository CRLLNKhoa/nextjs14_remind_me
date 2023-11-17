"use client";
import { Collection, Task } from "@prisma/client";
import React, { useMemo, useState, useTransition } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CollectionColor, CollectionColors } from "@/lib/constants";
import { CaretDownIcon, CaretUpIcon, TrashIcon } from "@radix-ui/react-icons";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import PlusIcon from "./icons/PlusIcon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { deleteCollection } from "@/actions/collection";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import CreateTaskDialog from "./CreateTaskDialog";
import TaskCard from "./TaskCard";

interface Props {
  collection: Collection & { tasks: Task[] };
}

export default function CollectionCard({ collection }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const [isLoading, startTransition] = useTransition();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const tasks = collection.tasks;

  const removeCollection = async () => {
    try {
      await deleteCollection(collection.id);
      toast({
        title: "Xóa thành công!",
        description: `Công việc #${collection.id} đã bị xóa ra khỏi account của bạn [${collection.userId}].`,
      });
      router.refresh();
    } catch (e) {
      toast({
        title: "Xóa không thành công!",
        description: "Có lỗi xảy ra!",
        variant: "destructive",
      });
    }
  };

  const tasksDone = useMemo(() => {
    return collection.tasks.filter((task) => task.done).length;
  }, [collection.tasks]);

  const totalTasks = collection.tasks.length;

  const progress = totalTasks === 0 ? 0 : (tasksDone / totalTasks) * 100;

  return (
    <>
      <CreateTaskDialog
        open={showCreateModal}
        setOpen={setShowCreateModal}
        collection={collection}
      />
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <CollapsibleTrigger asChild>
          <Button
            variant={"ghost"}
            className={cn(
              "flex w-full justify-between p-6",
              CollectionColors[collection.color as CollectionColor],
              isOpen && "rounded-ee-none rounded-es-none"
            )}
          >
            <span className="text-white font-bold">{collection.name}</span>
            {!isOpen && <CaretDownIcon className="h-6 w-6" />}
            {isOpen && <CaretUpIcon className="h-6 w-6" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg">
          {tasks.length === 0 && (
            <Button
              variant={"ghost"}
              className="flex items-center justify-center gap-1 p-8 py-12 rounded-none"
              onClick={() => setShowCreateModal(true)}
            >
              <p>Chưa có nhiệm vụ nào:</p>
              <span
                className={cn(
                  "text-sm bg-clip-text text-transparent",
                  CollectionColors[collection.color as CollectionColor]
                )}
              >
                Thêm nhiệm vụ
              </span>
            </Button>
          )}
          {tasks.length > 0 && (
            <>
              <Progress
                className="rounded-none"
                value={progress}
              />
              <div className="p-4 flex flex-col gap-2">
                {tasks.map((task) => (
                   <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </>
          )}
          <Separator />
          <footer
            className="h-[40px] px-4 p-[4px] text-xs text-neutral-500
           flex justify-between items-center"
          >
            <p>Tạo ngày: {collection.createdAt.toLocaleDateString("en-GB")}</p>
            {isLoading && <div>Đang xóa...</div>}
            {!isLoading && (
              <div>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={() => setShowCreateModal(true)}
                >
                  <PlusIcon />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                    >
                      <TrashIcon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>
                      Bạn có chắc chắn xóa không?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Hành động này không thể hoàn tác! Nó sẽ xóa công việc và
                      tất cả các nhiệm vụ.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Trở lại</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          startTransition(removeCollection);
                        }}
                      >
                        Xóa
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </footer>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
