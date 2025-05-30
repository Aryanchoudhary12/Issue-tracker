import { prisma } from '@/prisma/client'
import { Table } from '@radix-ui/themes';
import React from 'react'
import Issueinterface from '@/app/issues/component/issueinterface';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
const LatestIssues = async () => {
    const session = await getServerSession(authOptions);
    const issues = await prisma.issue.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        where: {
            userId: session?.user?.id ?? undefined
        },
        take: 5
    });
  return (
    <Table.Root variant="surface" className="w-full">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
        </Table.Row>
        </Table.Header>
        <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <a href={`/issues/${issue.id}`} className="hover:text-cyan-400 transition-colors">
                {issue.title}
              </a>
            </Table.Cell>
            <Table.Cell><Issueinterface status={issue.status} /></Table.Cell>
            <Table.Cell>{new Date(issue.createdAt).toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default LatestIssues