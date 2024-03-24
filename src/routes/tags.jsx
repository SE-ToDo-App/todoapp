import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalDialog,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import { addTag, deleteTag } from "../services/tagApi";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

import DeleteIcon from "@mui/icons-material/Delete";
import { HexColorPicker } from "react-colorful";
import { InfoOutlined } from "@mui/icons-material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { createFileRoute } from "@tanstack/react-router";
import { styled } from "@mui/joy/styles";
import { tagQueryOptions } from "../services/tagApi";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

export const Route = createFileRoute("/tags")({
  loader: async ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(tagQueryOptions());
  },
  component: Tags,
});

const Item = styled(Sheet)(({ theme }) => ({
  ...theme.typography["body-sm"],
  textAlign: "center",
  fontWeight: theme.fontWeight.md,
  color: theme.vars.palette.text.secondary,
  border: "1px solid",
  borderColor: theme.palette.divider,
  padding: theme.spacing(1),
  borderRadius: theme.radius.md,
}));

export default function AlertDialogModal({ id }) {
  const [open, setOpen] = useState(false);
  const { queryClient } = Route.useRouteContext();

  const { mutateAsync } = useMutation({
    mutationFn: ({ id }) => deleteTag({ id }),
    onSuccess: () => queryClient.invalidateQueries(tagQueryOptions().queryKey),
  });
  const handleDelete = async () => {
    await mutateAsync({ id });
    setOpen(false);
  };
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <DeleteIcon />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to delete the tag {name}?
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={handleDelete}>
              Delete Tag
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
}

function Tags() {
  const [open, setOpen] = useState(false);

  const { data: tags } = useSuspenseQuery(tagQueryOptions());
  const { queryClient } = Route.useRouteContext();
  const { mutateAsync } = useMutation({
    mutationFn: ({ name, color }) => addTag({ name, color }),
    onSuccess: () => queryClient.invalidateQueries(tagQueryOptions().queryKey),
  });

  console.log("tags", tags);

  const { Provider, Field, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      color: "#000000",
    },
    onSubmit: async ({ value: { name, color } }) => {
      await mutateAsync({ name, color });
      setOpen(false);
    },
  });

  return (
    <Box
      width="100%"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h1">Tags</Typography>
      <Stack spacing={2} sx={{ width: "100%", alignItems: "center" }}>
        {tags?.length > 0 ? (
          tags.map(([id, tag]) => (
            <Item
              key={id}
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                maxWidth: "400px",
                justifyContent: "center",
              }}>
              <LocalOfferIcon
                style={{ color: tag.color, marginRight: "10px" }}
              />
              {tag.name}
              <Box flexGrow={1} />
              <AlertDialogModal id={id} />
            </Item>
          ))
        ) : (
          <Typography>No Tags</Typography>
        )}
      </Stack>
      <Button onClick={() => setOpen(true)}>Add Tag</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Create a new Tag</DialogTitle>
          <DialogContent>Give the Tag a name and Choose a Color</DialogContent>
          <Provider>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                void handleSubmit();
              }}>
              <Field
                name="name"
                validators={{
                  onSubmit: ({ value }) => {
                    if (value.length < 3) {
                      return "Name must be at least 3 characters long";
                    }
                  },
                }}>
                {({ state, handleBlur, handleChange }) => (
                  <FormControl error={state.meta.errors.length > 0}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      autoFocus
                      required
                      defaultValue={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                    />
                    <FormHelperText>
                      {state.meta.errors.length > 0 ? (
                        <>
                          <InfoOutlined />
                          {state.meta.errors[0]}
                        </>
                      ) : (
                        ""
                      )}
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>
              <Field
                name="color"
                validators={{
                  onSubmit: ({ value }) => {
                    if (value.length < 1) {
                      return "Name must be set";
                    }
                  },
                }}>
                {({ state, handleChange, handleBlur }) => (
                  <div>
                    <label>Color</label>
                    <HexColorPicker
                      defaultValue={state.value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                )}
              </Field>
              <button type="submit">Add</button>
            </form>
          </Provider>
        </ModalDialog>
      </Modal>
    </Box>
  );
}
