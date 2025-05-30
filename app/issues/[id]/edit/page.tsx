import { prisma } from "@/prisma/client";
import EditIssueForm from "./editIssueForm";
interface Props {
  params: {
    id: string;
  };
}

export default async function EditIssuePage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id, 10) },
  });

  if (!issue) return <div>Issue not found</div>;

  return (
    <div className="p-4">
      <EditIssueForm issue={issue} />
    </div>
  );
}
