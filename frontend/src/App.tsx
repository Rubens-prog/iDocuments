import { Topbar } from "./components/Topbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { AppRoutes } from "@routes/app.routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  const queryCliet = new QueryClient();

  return (
    <>
      <ChakraProvider value={defaultSystem}>
        <QueryClientProvider client={queryCliet}>
          <BrowserRouter>
            <Topbar />
            <AppRoutes />
          </BrowserRouter>
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
