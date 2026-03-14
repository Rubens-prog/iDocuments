import { Topbar } from "./components/Topbar";
import { UserForm } from "./pages/Public/Form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

function App() {
  const queryCliet = new QueryClient();

  return (
    <>
      <ChakraProvider value={defaultSystem}>
        <QueryClientProvider client={queryCliet}>
          <Topbar />
          <UserForm />
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
