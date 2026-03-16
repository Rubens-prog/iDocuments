import { useState } from "react";
import {
  Box,
  Text,
  Input,
  Field,
  Stack,
  Button,
  NativeSelect,
  Textarea,
  FileUpload,
  InputGroup,
  CloseButton,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LuFileUp } from "react-icons/lu";
import { useCreateInconsistency } from "@services/inconsistencies/hooks/useCreateInconsistency";
import { useGetCategories } from "@services/categories/hooks/useGetCategories";

interface FormDataProps {
  name: string;
  email: string;
  category_id: string;
  description: string;
  file: File;
}

const schema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().required("Email é obrigatório").email("Email inválido"),
  category_id: yup.string().required("Categoria é obrigatório"),
  description: yup.string().required("Descrição é obrigatório"),
  file: yup.mixed<File>().required("Arquivo é obrigatório"),
});

export function UserForm() {
  const { mutate, isPending } = useCreateInconsistency();
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategories();

  const [resetInput, setResetInput] = useState(1);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      category_id: "",
      description: "",
      file: undefined,
    },
  });

  async function onSubmit(data: FormDataProps) {
    const { name, email, file, category_id, description } = data;

    mutate({
      name,
      email,
      description,
      category_id: Number(category_id),
      file,
    });

    reset();
    setResetInput((prev) => prev + 1);
  }

  return (
    <Box
      maxW="500px"
      mx="auto"
      mt="8"
      p="6"
      borderWidth="1px"
      borderRadius="lg"
    >
      <Text fontSize="2xl" mb="6" fontWeight="bold">
        Formulário de Inconsistência
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="4" align="flex-start">
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Field.Root invalid={!!errors.name}>
                <Field.Label>Nome</Field.Label>
                <Input onChange={onChange} value={value} />
                <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
              </Field.Root>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Field.Root invalid={!!errors.email}>
                <Field.Label>Email</Field.Label>
                <Input onChange={onChange} value={value} />
                <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
              </Field.Root>
            )}
          />

          <Controller
            name="category_id"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Field.Root
                disabled={isLoadingCategories}
                invalid={!!errors.category_id}
              >
                <Field.Label>Categoria</Field.Label>
                <NativeSelect.Root>
                  <NativeSelect.Field onChange={onChange} value={value}>
                    <option value="">Selecione</option>
                    {categories?.map((el) => (
                      <option value={el.id}>{el.name}</option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
                <Field.ErrorText>{errors.category_id?.message}</Field.ErrorText>
              </Field.Root>
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Field.Root invalid={!!errors.description}>
                <Field.Label>Descrição</Field.Label>
                <Textarea onChange={onChange} value={value} />

                <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
              </Field.Root>
            )}
          />

          <Controller
            name="file"
            control={control}
            render={({ field: { onChange } }) => (
              <Field.Root key={resetInput} invalid={!!errors.file}>
                <FileUpload.Root invalid={!!errors.file} gap="1">
                  <FileUpload.HiddenInput
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;
                      onChange(file);
                    }}
                    accept=".pdf,.rtf"
                  />
                  <FileUpload.Label>Upload file</FileUpload.Label>
                  <InputGroup
                    startElement={<LuFileUp />}
                    endElement={
                      <FileUpload.ClearTrigger asChild>
                        <CloseButton
                          me="-1"
                          size="xs"
                          variant="plain"
                          focusVisibleRing="inside"
                          focusRingWidth="2px"
                          pointerEvents="auto"
                        />
                      </FileUpload.ClearTrigger>
                    }
                  >
                    <Input asChild>
                      <FileUpload.Trigger>
                        <FileUpload.FileText
                          fallback="Selecione um arquivo"
                          lineClamp={1}
                        />
                      </FileUpload.Trigger>
                    </Input>
                  </InputGroup>
                </FileUpload.Root>
                <Field.ErrorText>{errors.file?.message}</Field.ErrorText>
              </Field.Root>
            )}
          />

          <Button type="submit" loading={isPending}>
            Enviar
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
