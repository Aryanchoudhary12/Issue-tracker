import { prisma } from "@/prisma/client";
import EditIssueForm from "./editIssueForm";
interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditIssuePage(context: Props) {
  const { id } = await context.params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!issue) return <div>Issue not found</div>;

  return (
    <div className="p-4">
      <EditIssueForm issue={issue} />
    </div>
  );
}
