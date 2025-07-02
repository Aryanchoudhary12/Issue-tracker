import { prisma } from "@/prisma/client";
import { Box, Button, Card, Flex} from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import Issueinterface from "../component/issueinterface";
import delay from "delay";
import { Pencil } from "lucide-react";
import Link from "next/link";
import DeleteIssue from "@/components/ui/DeleteIssue";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
interface Props {
  params: Promise<{
    id: string;
  }>;
}
async function IssueDetailPage(context: Props) {
  const session = await getServerSession(authOptions);
  const {id} = await context.params
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  if (!issue) {
    notFound();
  }
  await delay(300);
  return (
    <div className="flex flex-col  p-4 gap-3 mt-4">
      <Box className="space-y-3 w-10/12 ">
        <h1 className="text-5xl font-semibold font-poppins">{issue?.title}</h1>
        <Flex gap="3" align="center" justify="between" className="mt-3">
          <Issueinterface status={issue.status} />
          <p className="text-white/50 text-base font-roboto">
            {issue?.createdAt.toDateString()}
          </p>
        </Flex>
        <hr className="h-0 border-2 rounded-xl"/>
        <Card variant="surface">{issue?.description}</Card>
      </Box>
      {session && (
        <div className=" flex flex-row gap-3 w-fit mt-4">
          <Link href={`/issues/${issue.id}/edit`}>
            <Button variant="outline" color="iris">
              <Pencil className="h-4 w-4 -mr-1" />
              Edit Issue
            </Button>
          </Link>
          <DeleteIssue issue={{ id: issue.id }} />
        </div>
      )}
    </div>
  );
}

export default IssueDetailPage;
