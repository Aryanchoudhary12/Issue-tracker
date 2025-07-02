"use client";
import { Button, Flex, Table, TextField } from "@radix-ui/themes";
import Issueinterface from "./component/issueinterface";
import Link from "next/link";
import { useState } from "react";
import { TriangleAlert } from "lucide-react";
type Status = "OPEN" | "IN_PROGRESS" | "CLOSED";
type Issue = {
  id: number;
  title: string;
  description: string;
  status: Status;
  createdAt: string | Date;
};

interface IssueDetailProps {
  issues: Issue[];
}
export default function IssuesPage({ issues }: IssueDetailProps) {
  const [searchQuery, setQuery] = useState("");
  const Filtered = issues.filter((issue) => {
    return issue.title.toLowerCase().includes(searchQuery.toLowerCase() || "");
  });
  return (
    <div className="flex flex-col items-start justify-start p-4 mt-10">
      <div className="flex gap-2 items-center mb-2">
        <TriangleAlert className="stroke-secondary p-2 h-10 w-10 rounded-md bg-red-600/20"/>
        <div>
          <h1 className="font-bold text-3xl font-roboto">ISSUES</h1>
          <hr className="border-none h-1 w-20 bg-muted mb-1 rounded-2xl" />
        </div>
      </div>
      <p className="text-base font-poppins mb-3">
        Monitor and manage all your issues in one centralized location.
        <br />
        Add new issue by clicking on &quot;go to new issue&quot; button.
      </p>
      <Flex gap={"3"} align={"center"}>
        <TextField.Root
          size="3"
          placeholder="Search the docs…"
          onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
        />
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
          {Filtered.map((issue) => (
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
