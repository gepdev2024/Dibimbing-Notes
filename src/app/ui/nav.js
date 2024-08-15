import { Flex, Image, Text, Link } from "@chakra-ui/react";

export default function Nav() {
  return (
    <Flex
      align="center"
      fontWeight="bold"
      paddingTop={5}
      justifyContent="space-between"
      maxW="1366px"
      px={5}
      mx="auto"
      mb={4}
    >
      <Link
      href="/"
      _hover={{ textDecoration: "none" }}
      >
        <Text fontSize="2xl" textAlign="center">
          Aplikasi Catatan
        </Text>
      </Link>
      <Link href="/">
        <Image src="logo-dibimbing.svg" alt="Logo" height={35} />
      </Link>
    </Flex>
  );
}
