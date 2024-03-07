import { FormHelperText, ListItemButton, ListItemDecorator } from "@mui/joy";

import Add from "@mui/icons-material/Add";
import Button from "@mui/joy/Button";
import DialogContent from "@mui/joy/DialogContent";
import DialogTitle from "@mui/joy/DialogTitle";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import { InfoOutlined } from "@mui/icons-material";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import { addGroup } from "../../services/api";
import { useForm } from "@tanstack/react-form";
import { useRouteContext } from "@tanstack/react-router";
import { useState } from "react";


export default function CreateTodo() {
  const [open, setOpen] = useState(false);
  const { user } = useRouteContext({ strict: false });
  const { Provider, Field, handleSubmit, useStore } = useForm({
    defaultValues: {
      name: "",
    },
    onSubmit: async ({ value }) => {
      console.log("user", user, value.name);
      await addGroup({ group: [value.name], user });
      setOpen(false);
    },
  });
  return (
    <>
      <ListItemButton
        variant="outlined"
        color="neutral"
        onClick={() => setOpen(true)}>
        <ListItemDecorator>
          <Add />
        </ListItemDecorator>
        New ToDo-List
      </ListItemButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Create a new ToDo-List</DialogTitle>
          <DialogContent>Give the List a Proper Name</DialogContent>
          <Provider>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                void handleSubmit();
              }}>
              <Stack spacing={2}>
                <Field
                  name="name"
                  validators={{
                    onSubmit: ({ value }) => {
                      if (value.length < 3) {
                        return "Name must be at least 3 characters long";
                      }
                    },
                  }}>
                  {({ state, handleChange, handleBlur }) => (
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
                <Button type="submit">Submit</Button>
              </Stack>
            </form>
          </Provider>
        </ModalDialog>
      </Modal>
    </>
  );
}
