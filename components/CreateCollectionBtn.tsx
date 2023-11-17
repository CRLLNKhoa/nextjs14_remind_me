"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  createCollectionSchemaType,
  createCollectionSchema,
} from "@/schemas/createCollection";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CollectionColor, CollectionColors } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { createCollection } from "@/actions/collection";
import { toast } from "./ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function CreateCollectionBtn() {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setOpen(open);
  const router = useRouter();

  const openChangeWrapper = (open: boolean) => {
    form.reset();
    handleOpenChange(open);
  };

  const form = useForm<createCollectionSchemaType>({
    resolver: zodResolver(createCollectionSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: createCollectionSchemaType) => {
    try {
      await createCollection(data);
      toast({
        title: "Tạo công việc thành công!",
        description: "Công việc đã được lưu vào account của bạn.",
      });
      // Close the sheet
      openChangeWrapper(false);
      router.refresh();
    } catch (error) {
      toast({
        title: "Tạo công việc không thành công!",
        description: "Công việc chưa được lưu vào account của bạn.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Sheet
        open={open}
        onOpenChange={openChangeWrapper}
      >
        <SheetTrigger asChild>
          <div
            className="
    w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px]"
          >
            <Button
              variant={"outline"}
              className="dark:text-white w-full dark:bg-neutral-950 bg-white"
            >
              <span className="font-bold bg-gradient-to-r from-red-500 to-orange-500 hover:to-orange-800 bg-clip-text text-transparent">
                Tạo công việc
              </span>
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="mb-4">
            <SheetTitle>Tạo công việc mới</SheetTitle>
            <SheetDescription>
              Công việc là nhóm các nhiệm vụ của bạn
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập tên..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Màu thẻ:</FormLabel>
                    <FormControl>
                      <Select onValueChange={(color) => field.onChange(color)}>
                        <SelectTrigger
                          className={cn(
                            "h-8 w-full capitalize",
                            CollectionColors[field.value as CollectionColor]
                          )}
                        >
                          <SelectValue
                            placeholder="Màu"
                            className="w-full h-8"
                          />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {Object.keys(CollectionColors).map((color) => (
                            <SelectItem
                              key={color}
                              value={color}
                              className={cn(
                                "w-full h-8 rounded-md my-1 focus:font-bold focus:ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white focus:px-8 cursor-pointer capitalize duration-700",
                                CollectionColors[color as CollectionColor]
                              )}
                            >
                              {color}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <div className="flex flex-col gap-3 mt-4">
            <Separator />
            <Button
              disabled={form.formState.isSubmitting}
              variant={"outline"}
              className={cn(
                form.watch("color") &&
                  CollectionColors[form.getValues("color") as CollectionColor]
              )}
              onClick={form.handleSubmit(onSubmit)}
            >
              Tạo mới
              {form.formState.isSubmitting && (
                <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
