import { Box, Button, Card, DataList, Spinner, Stack } from "@chakra-ui/react";
import { downloadPDF } from "@services/inconsistencies";
import { useFindInconsistency } from "@services/inconsistencies/hooks/useFindInconsistency";
import { useNavigate, useParams } from "react-router-dom";

export function Single() {
  const navigate = useNavigate();
  const { id } = useParams();

  function handleNavigate() {
    navigate("/admin");
  }

  const { data, isLoading } = useFindInconsistency(Number(id));

  async function handleDownload() {
    const res = await downloadPDF(Number(id));

    const url = window.URL.createObjectURL(res.data);
    const link = document.createElement("a");

    link.href = url;
    link.download = data?.file_path.split("/")[1] ?? "arquivo.pdf";

    link.click();
  }

  return (
    <Box maxW={"1000px"} mx={"auto"} mt="8">
      <Stack gap="4" border={"gray"}>
        {isLoading && (
          <Box w={"fit-content"} mx="auto">
            <Spinner />
          </Box>
        )}
        {data && (
          <Card.Root p={"4"}>
            <DataList.Root size="md">
              <DataList.Item>
                <DataList.ItemLabel>Nome</DataList.ItemLabel>
                <DataList.ItemValue>{data.name}</DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel>Email</DataList.ItemLabel>
                <DataList.ItemValue>{data.email}</DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel>Descrição</DataList.ItemLabel>
                <DataList.ItemValue>{data.description}</DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel>Download</DataList.ItemLabel>
                <Button w="fit-content  " onClick={handleDownload}>
                  Baixar
                </Button>
              </DataList.Item>
            </DataList.Root>
          </Card.Root>
        )}
      </Stack>

      <Box maxW={"fit-content"} mx={"auto"} my="8">
        <Button onClick={handleNavigate}>Voltar</Button>
      </Box>
    </Box>
  );
}
