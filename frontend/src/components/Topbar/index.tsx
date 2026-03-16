import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  Dialog,
  CloseButton,
  Portal,
  useDialog,
  Input,
  Field,
  VStack,
} from "@chakra-ui/react";
import { isAuthenticated } from "@storage/auth-storage";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLogin } from "@services/auth/hooks/useLogin";
import { useLogout } from "@services/auth/hooks/useLogout";

interface FormDataProps {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().required("Email é obrigatório").email("Email inválido"),
  password: yup.string().required("Senha é obrigatório"),
});

export function Topbar() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useLogin();
  const { mutate: mutateLogout, isPending: isPendingLogout } = useLogout();

  const dialog = useDialog();
  const logoutDialog = useDialog();

  const navigate = useNavigate();

  function handleLogin(data: FormDataProps) {
    mutate(data, {
      onSuccess: () => {
        navigate("/admin");
      },
      onSettled: () => {
        reset();
        dialog.setOpen(false);
      },
    });
  }

  function Logout() {
    mutateLogout(undefined, {
      onSuccess: () => {
        logoutDialog.setOpen(false);
        navigate("/");
      },
    });
  }

  function handleNavigate() {
    navigate("/admin");
  }

  return (
    <>
      <Box
        as="header"
        px="6"
        py="4"
        borderBottomWidth="1px"
        borderColor="gray.200"
      >
        <Flex align="center" justify="space-between" maxW="1200px" mx="auto">
          <Text fontSize="lg" fontWeight="bold">
            IDocuments
          </Text>

          <HStack gap={"6"}>
            {isAuthenticated() ? (
              <>
                <Button variant={"plain"} size="sm" onClick={handleNavigate}>
                  Documentos
                </Button>
                <Button size="sm" onClick={() => logoutDialog.setOpen(true)}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" onClick={() => dialog.setOpen(true)}>
                  Login
                </Button>
              </>
            )}
          </HStack>
        </Flex>
      </Box>

      {/* MODAL LOGOUT*/}
      <Dialog.RootProvider value={logoutDialog}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Logout</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <p>
                  Você tem certeza de que deseja sair? Você precisará fazer
                  login novamente para acessar
                </p>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancelar</Button>
                </Dialog.ActionTrigger>
                <Button loading={isPendingLogout} onClick={Logout}>
                  Sair
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>

      {/* MODAL LOGIN*/}
      <Dialog.RootProvider value={dialog}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Faça o Login abaixo</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <VStack gap="4">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Field.Root invalid={!!errors.email}>
                        <Field.Label>Email</Field.Label>
                        <Input onChange={onChange} value={value} />
                        <Field.ErrorText>
                          {errors.email?.message}
                        </Field.ErrorText>
                      </Field.Root>
                    )}
                  />

                  <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Field.Root invalid={!!errors.password}>
                        <Field.Label>Senha</Field.Label>
                        <Input
                          type="password"
                          onChange={onChange}
                          value={value}
                        />
                        <Field.ErrorText>
                          {errors.password?.message}
                        </Field.ErrorText>
                      </Field.Root>
                    )}
                  />
                </VStack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button loading={isPending} onClick={handleSubmit(handleLogin)}>
                  Enviar
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>
    </>
  );
}
