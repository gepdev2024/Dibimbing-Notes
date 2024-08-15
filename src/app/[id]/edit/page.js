"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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
  Spinner,
  Flex,
  Stack,
  background,
  IconButton
} from "@chakra-ui/react";

const EditNote = () => {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [initialTitle, setInitialTitle] = useState("");
  const [initialBody, setInitialBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (id) {
      fetch(`/api/notes/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setTitle(data.title);
            setBody(data.body);
            setInitialTitle(data.title); // Store the initial title
            setInitialBody(data.body); // Store the initial body
          } else {
            toast({
              title: "Note not found.",
              description: "The note you are trying to edit doesn't exist.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            router.push("/");
          }
        })
        .catch((err) => {
          console.error(err);
          toast({
            title: "Error loading note.",
            description: "An error occurred while loading the note.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, router, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });

      if (res.ok) {
        toast({
          position: "top",
          title: "Telah diubah.",
          description: "Catatan berhasil diperbarui.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.push("/");
      } else {
        toast({
          position: "top",
          title: "Gagal diubah.",
          description: "Catatan gagal diperbarui.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating note:", error);
      toast({
        title: "An error occurred.",
        description: "An error occurred while updating the note.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleReset = () => {
    setTitle(initialTitle);
    setBody(initialBody);
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

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
          Ubah Catatan
        </Text>
      </Box>

      <form onSubmit={handleSubmit}>
        <FormControl id="title" mb={6} isRequired>
          <FormLabel fontSize="lg">Judul</FormLabel>
          <Input
            type="text"
            placeholder="Enter note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            focusBorderColor="teal.400"
          />
        </FormControl>
        <FormControl id="body" mb={6} isRequired>
          <FormLabel fontSize="lg">Isi</FormLabel>
          <Textarea
            placeholder="Enter note body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            focusBorderColor="teal.400"
            rows={6}
          />
        </FormControl>
        <Stack direction="row" spacing={4}>
          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            isLoading={updating}
            loadingText="Ubah..."
          >
            Ubah
          </Button>
          <Button
            onClick={handleReset}
            colorScheme="gray"
            width="full"
            disabled={updating}
          >
            Reset
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default EditNote;
