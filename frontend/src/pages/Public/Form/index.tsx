import { useGetCategories } from "@services/categories/hooks/useGetCategories";
import { Button, Text } from "@chakra-ui/react";

export function UserForm() {
  const { data } = useGetCategories();

  return (
    <>
      <h1>Hello World</h1>
      <Button onClick={() => console.log("some data =>", data)}>
        <Text>Hello</Text>
      </Button>
    </>
  );
}
