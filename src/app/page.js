"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  SimpleGrid,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Spinner,
  Input
} from "@chakra-ui/react";
import { AddIcon, WarningIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false); // Manage deletion loading state
  const [search, setSearch] = useState(""); // Search state
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
        setFilteredNotes(data); // Initialize filtered notes
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch notes");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (search) {
      setFilteredNotes(
        notes.filter((note) =>
          note.title.toLowerCase().includes(search.toLowerCase()) ||
          note.body.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredNotes(notes);
    }
  }, [search, notes]);

  const handleDelete = async () => {
    setDeleting(true); // Start loading
    try {
      const res = await fetch(`/api/notes/${noteToDelete}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note.id !== noteToDelete)
        );
        onConfirmClose(); // Close confirmation dialog
        toast({
          title: "Telah dihapus.",
          description: "Catatan berhasil dihapus.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Gagal dihapus.",
          description: "Catatan gagal dihapus.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast({
        title: "An error occurred.",
        description: "An error occurred while deleting the note.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setDeleting(false); // End loading
    }
  };

  const handleCardClick = (id) => {
    router.push(`/${id}`);
  };

  const openConfirmDialog = (id) => {
    setNoteToDelete(id);
    onConfirmOpen();
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <Box maxW="1366px" px={5} mx="auto">
      <Flex mb={4} align="center" justifyContent={"space-between"}>
        <Button as={Link} href="/add" colorScheme="teal">
          Tambah Catatan
          <AddIcon ms={2} />
        </Button>
        <Input
          placeholder="Cari catatan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          borderWidth={2}
          borderColor="teal.600"
          opacity={0.7}
          width="24%"
        />
      </Flex>

      {filteredNotes.length === 0 ? (
        <Flex alignItems="center" justify="center" minHeight="70vh">
          <Text fontSize={20} color='gray' px={50} py={2} borderRadius='3px' border='2px dashed gray'>
            Tidak ada catatan
          </Text>
        </Flex>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
          {filteredNotes.map((note) => (
            <Box
              key={note.id}
              p={4}
              borderWidth={2}
              borderRadius="md"
              cursor="pointer"
              onClick={() => handleCardClick(note.id)}
              _hover={{
                bg: "gray.100",
                boxShadow: "lg",
                transform: "scale(1.005)",
                border: "solid teal 1px",
              }}
              transition="all 0.2s"
            >
              <Flex justifyContent='space-between'>
                <Text fontSize="lg" fontWeight="bold">
                  {note.title}
                </Text>
                <Text mt={2} color="gray.600" fontSize={12}>
                  {new Date(note.createdat).toLocaleString("id-ID")}
                </Text>
              </Flex>
              <Text mt={2}>{note.body.substring(0, 100)}...</Text>
              <Flex mt={2} gap={2} justifyContent='flex-end'>
                <Button
                  h={33}
                  colorScheme="blue"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    router.push(`/${note.id}/edit`);
                  }}
                >
                  Ubah
                </Button>
                <Button
                  h={33}
                  colorScheme="red"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    openConfirmDialog(note.id);
                  }}
                >
                  Hapus
                </Button>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      )}

      {/* Confirmation Dialog */}
      <AlertDialog motionPreset='slideInBottom' isOpen={isConfirmOpen} onClose={onConfirmClose}>
        <AlertDialogOverlay>
          <AlertDialogContent
            borderRadius="md"
            bg="gray.50"
            borderColor="teal.500"
            borderWidth="2px"
          >
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              color="teal.600"
            >
              <WarningIcon boxSize={6} color="teal.600" mr={2} />
              Konfirmasi Untuk Menghapus
            </AlertDialogHeader>
            <AlertDialogBody color="gray.700">
              Apakah Anda yakin ingin menghapus catatan ini? Tindakan ini
              tidak dapat dibatalkan!
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="blue" onClick={onConfirmClose}>
                Batal
              </Button>
              <Button colorScheme="red" ml={3} onClick={handleDelete} isLoading={deleting}>
                Hapus
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default NotesList;
