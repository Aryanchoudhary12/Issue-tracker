"use client";
export const dynamic = "force-dynamic";
import { createIssueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Callout, TextArea } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import z from "zod";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useState } from "react";
import Spinner from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { InfoIcon, PencilIcon } from "lucide-react";
type IssueForm = z.infer<typeof createIssueSchema>;

interface EditIssueFormProps {
  issue: {
    id: number;
    title: string;
    description: string;
  };
}

export default function EditIssueForm({ issue }: EditIssueFormProps) {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: issue.title,
      description: issue.description,
    },
  });

  const onSubmit = async (data: IssueForm) => {
    try {
      setSubmitting(true);
      await axios.patch(`/api/issues/${issue.id}`, data);
      router.push("/issues");
    } catch (error) {
      console.error("Error updating issue:", error);
      setError("Something went wrong!");
      setSubmitting(false);
    }
  };

  return (
    <div>
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
        <PencilIcon className="stroke-white p-2 h-10 w-10 rounded-md bg-teal-200/20" />
        <div>
          <h1 className="font-bold text-2xl font-roboto">EDIT ISSUES</h1>
          <hr className="border-none h-1 w-32 bg-muted mb-1 rounded-2xl" />
        </div>
      </div>
      <p className="text-base font-poppins mb-3">
        Edit issue by filling the form and then clicking the Submit new issue
        button.
      </p>
      <form
        className="flex flex-col items-start max-sm:w-11/12 sm:w-9/12 lg:w-6/12 gap-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField.Root
          placeholder="Title"
          color="indigo"
          {...register("title")}
          className="w-full"
        >
          <TextField.Slot />
        </TextField.Root>

        {errors.title && <p className="text-red-400">{errors.title.message}</p>}

        <TextArea
          placeholder="Description"
          color="indigo"
          {...register("description")}
          className="w-full"
        >
        </TextArea>
        {errors.description && (
          <p className="text-red-400">{errors.description.message}</p>
        )}

        <Button type="submit" disabled={submitting}>
          Edit Issue{submitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}
