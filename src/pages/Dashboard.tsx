import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading
} from "@chakra-ui/react";
import { CSVReader } from "react-papaparse";
import { Link } from "react-router-dom";
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
            <span>Drop CSV file here.</span>
          </CSVReader>
        </Box>

        <Flex>
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
        </Flex>
      </Flex>
    </Center>
  );
};
