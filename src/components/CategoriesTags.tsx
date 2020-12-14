import React from "react";
import { HStack, Tag, Text } from "@chakra-ui/react";

interface CategoriesBadgesProps {
  colorsMap: Map<string, string>;
}

export const CategoriesTags: React.FC<CategoriesBadgesProps> = ({
  colorsMap,
}) => {
  const categories = Array.from(colorsMap, ([name, color]) => ({
    name,
    color,
  })).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <HStack spacing={4} p={6}>
      <Text fontSize="lg" textTransform="uppercase">
        Categories:
      </Text>
      {categories.map((c) => (
        <Tag size="md" key={c.name} bgColor={c.color}>
          {c.name}
        </Tag>
      ))}
    </HStack>
  );
};
