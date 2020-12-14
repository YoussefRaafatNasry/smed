import {
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

export const SampleTable: React.FC = () => {
  return (
    <Box>
      <Table size="sm" my={6}>
        <Thead>
          <Tr>
            <Th>Worker No.</Th>
            <Th>Task No.</Th>
            <Th>Task Name</Th>
            <Th>Start Time</Th>
            <Th>End Time</Th>
            <Th>Category</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>1</Td>
            <Td>Some Task</Td>
            <Td>00:00:00</Td>
            <Td>00:01:20</Td>
            <Td>Chore</Td>
          </Tr>
          <Tr>
            <Td>...</Td>
            <Td>...</Td>
            <Td>...</Td>
            <Td>...</Td>
            <Td>...</Td>
            <Td>...</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};
