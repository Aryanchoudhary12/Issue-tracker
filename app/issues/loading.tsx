import { Button, Flex, Link, Table, TextField } from "@radix-ui/themes";
import { TriangleAlert } from "lucide-react";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function Loading() {
  const issues = [1, 2, 3, 4];
  return (
    <div className="flex flex-col items-start justify-start p-4 mt-10">
      <div className="flex gap-2 items-center mb-2">
        <TriangleAlert className="stroke-secondary p-2 h-10 w-10 rounded-md bg-red-600/20" />
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
        <TextField.Root size="3" placeholder="Search the docs…" />
        <Link href="/issues/new">
          <Button>Go to New Issue</Button>
        </Link>
      </Flex>
      <Table.Root variant="surface" className="mt-3 w-full">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export default Loading;
