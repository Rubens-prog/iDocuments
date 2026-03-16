import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  DataList,
  Input,
  InputGroup,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useGetInconsistencies } from "@services/inconsistencies/hooks/useGetInconsistencies";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export function List() {
  const [inputSearch, setInputSearch] = useState<string>("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  function handleNavigate(id: string) {
    navigate(`/admin/single/${id}`);
  }

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useGetInconsistencies(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(inputSearch);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputSearch]);

  return (
    <Box maxW={"1000px"} mx={"auto"} mt="8">
      <InputGroup flex="1" mb={"8"} endElement={<LuSearch />}>
        <Input
          placeholder="Filtre por nome ou email..."
          onChange={(e) => setInputSearch(e.target.value)}
        />
      </InputGroup>

      <Stack gap="4" border={"gray"}>
        {isLoading ? (
          <Box w={"fit-content"} mx={"auto"}>
            <Spinner></Spinner>
          </Box>
        ) : (
          <>
            {data?.pages.map((page) =>
              page.data.map((el) => (
                <Card.Root
                  p={"4"}
                  cursor={"pointer"}
                  onClick={() => handleNavigate(`${el.id}`)}
                  key={el.id}
                >
                  <DataList.Root size="md">
                    <DataList.Item>
                      <DataList.ItemLabel>Nome</DataList.ItemLabel>
                      <DataList.ItemValue>{el.name}</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.ItemLabel>Descrição</DataList.ItemLabel>
                      <DataList.ItemValue>{el.description}</DataList.ItemValue>
                    </DataList.Item>
                  </DataList.Root>
                </Card.Root>
              )),
            )}
          </>
        )}
      </Stack>

      <Box maxW={"fit-content"} mx={"auto"} my="8">
        {hasNextPage && (
          <Box mx="auto" my="8">
            <Button
              loading={isFetchingNextPage}
              onClick={() => fetchNextPage()}
            >
              Ver mais resultados
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
