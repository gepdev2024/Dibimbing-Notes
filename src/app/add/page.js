"use client"; // Ensure this component is treated as a client component

import { useRouter } from "next/navigation"; // Import useRouter
import { useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  useToast,
  IconButton
} from "@chakra-ui/react";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize useRouter
  const toast = useToast(); // Initialize useToast

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });

      if (res.ok) {
        toast({
          title: "Berhasil ditambah.",
          description: "Catatan berhasil ditambah.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setTitle("");
        setBody("");
        router.push("/");
      } else {
        toast({
          title: "Failed to add note.",
          description: "There was an issue adding your note. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error("Error adding note:", error);
      toast({
        title: "An error occurred.",
        description: "An error occurred while adding the note.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      p={6}
      maxW="600px"
      mx="auto"
      mt={8}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
    >
<Box position="relative" mb={6}>
        <IconButton
          icon={<ArrowBackIcon />}
          position="absolute"
          right={0}
          top={0}
          fontSize={25}
          onClick={() => router.back()}
          variant="ghost"
          aria-label="Back"
        />
        <Text
          fontSize="3xl"
          fontWeight="bold"
          color="teal.500"
          textAlign="center"
        >
          Tambah Catatan
        </Text>
      </Box>
      <form onSubmit={handleSubmit}>
        <FormControl id="title" mb={4} isRequired>
          <FormLabel>Judul</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl id="body" mb={4} isRequired>
          <FormLabel>Isi</FormLabel>
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </FormControl>
        <Button
          type="submit"
          colorScheme="teal"
          isLoading={loading}
          loadingText="Simpan..."
        >
          Simpan
        </Button>
      </form>
    </Box>
  );
};

export default AddNote;
