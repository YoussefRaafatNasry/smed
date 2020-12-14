import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { CSVReader } from "react-papaparse";
import { Link } from "react-router-dom";
import { SampleTable } from "../components/SampleTable";
import { Record } from "../models/Record";

interface DashboardProps {
  handleOnDrop: (records: Record[]) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ handleOnDrop }) => {
  return (
    <Center height="100vh">
      <Flex flexDirection="column" textAlign="center">
        <Heading size="2xl">SMED</Heading>

        <Box my={6}>
          <CSVReader addRemoveButton onDrop={handleOnDrop}>
            <Text>Drop CSV file here.</Text>
          </CSVReader>
        </Box>

        <SampleTable />

        <Center>
          <Link to="/task">
            <Button m={2} colorScheme="pink">
              Task Timeline
            </Button>
          </Link>

          <Link to="/worker">
            <Button m={2} colorScheme="purple">
              Worker Timeline
            </Button>
          </Link>
        </Center>
      </Flex>
    </Center>
  );
};
