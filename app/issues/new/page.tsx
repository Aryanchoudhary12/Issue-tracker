"use client";
export const dynamic = "force-dynamic";
import React, { useState } from "react";
import { TextField, Button, Text, TextArea } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Callout } from "@radix-ui/themes";
import { InfoIcon, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import z from "zod";
import Spinner from "@/components/ui/spinner";
function New() {
  type IssueForm = z.infer<typeof createIssueSchema>;
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  return (
    <div className="flex flex-col p-4 h-full">
      {error && (
        <Callout.Root
          className="max-sm:w-11/12 sm:w-9/12 lg:w-6/12 mb-4"
          variant="surface"
        >
          <Callout.Icon>
            <InfoIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <div className="flex gap-2 items-center mb-2 mt-10">
        <Plus className="stroke-white p-2 h-10 w-10 rounded-md bg-teal-200/20" />
        <div>
          <h1 className="font-bold text-2xl font-roboto">ADD ISSUES</h1>
          <hr className="border-none h-1 w-32 bg-muted mb-1 rounded-2xl" />
        </div>
      </div>
      <p className="text-base font-poppins mb-3">
        Add new issue by filling the form and then clicking the Submit new issue
        button.
      </p>
      <form
        className="flex flex-col items-start max-sm:w-11/12 sm:w-9/12 lg:w-6/12 gap-y-3 "
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
            setSubmitting(true);
          } catch (error) {
            console.error("Error creating issue:", error);
            setError("Something went wrong!");
            setSubmitting(false);
          }
        })}
      >
        <TextField.Root
          placeholder="Title"
          color="indigo"
          {...register("title")}
          className="w-full"
        >
          <TextField.Slot />
        </TextField.Root>
        {errors.title && (
          <Text color="red" typeof="p">
            {errors.title.message}
          </Text>
        )}
        <TextArea
          placeholder="Description"
          color="indigo"
          {...register("description")}
          className="w-full"
        ></TextArea>
        {errors.description && (
          <Text color="red" typeof="p">
            {errors.description.message}
          </Text>
        )}
        <Button type="submit" disabled={submitting}>
          Submit new issue{submitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}

export default New;
