"use client";
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import { DeleteIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
interface Props {
  issue: {
    id: number;
  };
}

function DeleteIssue({ issue }: Props) {
  const router = useRouter();
  const [Error, setError] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);


  interface DeleteIssueResponse {
    ok: boolean;
    status: number;
  }

  async function ondeleteIssue(issueId: number): Promise<void> {
    try {
      setSubmitting(true);
      const response: DeleteIssueResponse = await fetch(`/api/issues/${issueId}`, {
        method: "DELETE",
      });
      router.push("/issues");
      console.log("Issue deleted successfully:", response);
      router.refresh();
    } catch (error: unknown) {
      console.error("Error deleting issue:", error);
      setSubmitting(false);
      setError("Something went wrong while deleting the issue.");
    }
  }
  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button variant="outline">
            {" "}
            <Trash2Icon className="h-4 w-4 -mr-1 stroke-3" />
            Delete Issue
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Conformation Delete Issue</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>
          <Flex gap={"3"} justify="end" className="mt-4">
            <AlertDialog.Cancel>
              <Button variant="outline">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={() => ondeleteIssue(issue.id)}
                disabled={submitting}
              >
                <DeleteIcon className="h-4 w-4 -mr-1 stroke-3" />
                Delete
                {submitting && <Spinner className="ml-2" />}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root>
        {Error && (
          <AlertDialog.Content>
            <AlertDialog.Title>Error while deleting</AlertDialog.Title>
            <AlertDialog.Description>{Error}</AlertDialog.Description>
            <AlertDialog.Action>
              <Button variant="outline" onClick={() => setError("")}>
                Close
              </Button>
            </AlertDialog.Action>
          </AlertDialog.Content>
        )}
      </AlertDialog.Root>
    </div>
  );
}

export default DeleteIssue;
