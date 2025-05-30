import { Button, Link, Table, Text } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function Loading() {
  const issues = [1, 2, 3, 4];
  return (
    <div className="flex flex-col items-start justify-start p-4">
      <h1 className="font-bold text-3xl">ISSUES</h1>
      <hr className="border-none h-1 w-24 bg-muted mb-1" />
      <Text className="text-base font-medium mb-3">
        Monitor and manage all your issues in one centralized location.
        <br />
        Add new issue by clicking on "go to new issue" button.
      </Text>
      <Link href="/issues/new">
        <Button>Go to New Issue</Button>
      </Link>
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
