import { prisma } from "@/prisma/client";
import delay from "delay";
import { Button, Flex, Table } from "@radix-ui/themes";
import Issueinterface from "./component/issueinterface";
import Link from "next/link";
import IssueFilter from "./component/issuefilter";
import { Status } from "@prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
export default async function IssuesPage() {
  const session = await getServerSession(authOptions);
  console.log("session", session?.user.id);
  const issues = await prisma.issue.findMany({
    where: {
      userId: session?.user?.id ?? undefined,
    },
  });
  await delay(2000);
  return (
    <div className="flex flex-col items-start justify-start p-4">
      <h1 className="font-bold text-3xl">ISSUES</h1>
      <hr className="border-none h-1 w-24 bg-muted mb-1" />
      <p className="text-base font-medium mb-3">
        Monitor and manage all your issues in one centralized location.
        <br />
        Add new issue by clicking on "go to new issue" button.
      </p>
      <Flex gap={"3"}>
        <IssueFilter />
        <Link href="/issues/new">
          <Button>Go to New Issue</Button>
        </Link>
      </Flex>
      <Table.Root variant="surface" className="mt-3 max-w-11/12">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link
                  className="hover:text-cyan-400 transition-colors"
                  href={`/issues/${issue.id}`}
                >
                  {issue.title}
                </Link>
              </Table.Cell>
              <Table.Cell>{issue.description}</Table.Cell>
              <Table.Cell>
                <Issueinterface status={issue.status} />
              </Table.Cell>
              <Table.Cell>
                {new Date(issue.createdAt).toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
