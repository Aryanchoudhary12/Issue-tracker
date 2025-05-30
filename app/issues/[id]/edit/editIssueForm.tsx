"use client";
import { createIssueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Callout } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useState } from "react";
import Spinner from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { InfoIcon } from "lucide-react";
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
    control,
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

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              {...field}
              placeholder="Description"
              className="w-full"
            />
          )}
        />
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
