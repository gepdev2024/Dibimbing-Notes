import Image from "next/image";
import styles from "./page.module.css";
import { Box, Button } from "@chakra-ui/react";

export default function Page() {
  return (
    <Box p={4}>
      <Button colorScheme="teal">Welcome to Chakra-UI in Next.js</Button>
    </Box>
  );
}
