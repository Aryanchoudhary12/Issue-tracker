import { prisma } from "@/prisma/client";
import { Box, Button, Card, Flex, Heading } from "@radix-ui/themes";
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
  params: { id: string };
}
async function IssueDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id, 10),
    },
  });
  if (!issue) {
    notFound();
  }
  await delay(300);
  return (
    <div className="grid sm:grid-rows-2 md:grid-cols-6 p-4 gap-3">
      <Box className="col-span-4 space-y-3 max-sm:w-10/12 sm:w-10/12 md:w-full">
        <Heading>{issue?.title}</Heading>
        <Flex gap="3" align="center" className="mt-3">
          <Issueinterface status={issue.status} />
          <p className="text-white/50 text-sm">
            {issue?.createdAt.toDateString()}
          </p>
        </Flex>

        <Card variant="surface">{issue?.description}</Card>
      </Box>
      {session && (
        <div className="col-span-2 flex flex-row md:flex-col gap-3 w-fit">
          <Link href={`/issues/${issue.id}/edit`}>
            <Button variant="outline" color="iris">
              <Pencil className="h-4 w-4 -mr-1" />
              Edit Isssue
            </Button>
          </Link>
          <DeleteIssue issue={{ id: issue.id }} />
        </div>
      )}
    </div>
  );
}

export default IssueDetailPage;
