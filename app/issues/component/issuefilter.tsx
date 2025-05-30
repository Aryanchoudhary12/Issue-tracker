"use client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";
import { Status } from "@prisma/client";
const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];
function IssueFilter() {
  const router = useRouter();
  return (
    <Select.Root
      onValueChange={(status) => {
        router.push(`/issues/?status=${status}`);
        console.log("Selected status:", status);
      }}
    >
      <Select.Trigger placeholder="Filter by status"></Select.Trigger>
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || "All"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

export default IssueFilter;
