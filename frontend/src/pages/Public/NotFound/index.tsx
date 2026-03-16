import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();

  function handleNavigation() {
    navigate("/");
  }
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <VStack gap={6} textAlign="center">
        <Heading fontSize="6xl">404</Heading>

        <Heading size="lg">Página não encontrada</Heading>

        <Text color="gray.500" maxW="400px">
          A página que você está tentando acessar não existe ou foi movida.
        </Text>

        <Button colorScheme="blue" onClick={handleNavigation}>
          Voltar para início
        </Button>
      </VStack>
    </Box>
  );
}
