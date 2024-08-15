"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  Flex,
  IconButton,
  Spinner,
  Stack
} from "@chakra-ui/react";
import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";

const NoteDetail = () => {
  const { id } = useParams(); // Use useParams to access route parameters
  const router = useRouter(); // Use useRouter for redirection
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/notes/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setNote(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this note?")) {
      try {
        const res = await fetch(`/api/notes/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          alert("Note deleted successfully");
          router.push("/"); // Redirect to the notes list after successful deletion
        } else {
          alert("Failed to delete note");
        }
      } catch (error) {
        console.error("Error deleting note:", error);
        alert("An error occurred while deleting the note");
      }
    }
  };

  if (loading) return (
    <Flex justify="center" align="center" height="100vh">
      <Spinner size="xl" />
    </Flex>
  );

  if (!note) return <p>Note not found</p>;

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
          onClick={() => router.push(`/`)}
          variant="ghost"
          aria-label="Back"
        />
        <Text
          fontSize="3xl"
          fontWeight="bold"
          color="teal.500"
          textAlign="center"
        >
          {note.title}
        </Text>
      </Box>
      <Text mb={2} color="gray.600">
       Ditambahkan pada: {new Date(note.createdat).toLocaleString("id-ID")}
      </Text>
      <Text mb={4}>{note.body}</Text>
      <Stack direction="row" spacing={4}>
        <Button
          colorScheme="blue"
          onClick={() => router.push(`/${id}/edit`)}
          width='full'
        >
          Edit
        </Button>
        <Button colorScheme="red" onClick={handleDelete} width='full'>
          Hapus
        </Button>
      </Stack>
    </Box>
  );
};

export default NoteDetail;
