import { Card, Flex, Text } from '@radix-ui/themes';
import React from 'react'
interface Props{
    open: number;
    inProgress: number;
    closed: number;
}
const IssueSummary = ({ open, inProgress, closed }: Props) => {
    const statuses = [
        { label: 'Open', value: open },
        { label: 'In Progress', value: inProgress },
        { label: 'Closed', value: closed }
    ];
  return (
    <div className="flex flex-wrap justify-center items-center mb-8">
        {statuses.map((status) => (
            <Card key={status.label} className="m-3 w-40 p-4 flex flex-col justify-start items-start" variant='classic'>
                <Flex direction="column" align="center" gap="2" className="sm:flex-row sm:justify-between sm:w-full">
                    <Text className="text-sm sm:text-base ">{status.label}</Text>
                    <Text className="text-lg sm:text-base font-bold" size={"6"}>{status.value}</Text>
                </Flex>

            </Card>
        ))}

    </div>
  )
}

export default IssueSummary