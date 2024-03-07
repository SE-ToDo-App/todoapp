import { createFileRoute } from '@tanstack/react-router'
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  Sheet,
} from "@mui/joy";

import { InfoOutlined } from "@mui/icons-material";
import { registerWithEmailAndPassword } from "../services/auth/email_login";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute('/register')({
  component: Register,
})


function Register() {
  const navigate = useNavigate();
  const { Provider, Field, handleSubmit, useStore } = useForm({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
    },
    validators: {
      onSubmit: ({ value }) => {
        if (value.password !== value.passwordConfirm) {
          return "Passwords do not match";
        }
      },
    },
    onSubmit: async ({ value }) => {
      registerWithEmailAndPassword(
        value.name,
        value.email,
        value.password
      ).then(() => {
        navigate("/");
      });
    },
  });

  const formErrors = useStore((state) => state.errors);
  return (
    <Sheet variant="soft" sx={{ p: 2, gap: 2 }}>
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
            {({ state, handleChange, handleBlur }) => (
              <FormControl error={state.meta.errors.length > 0}>
                <Input
                  fullWidth
                  type="text"
                  variant="outlined"
                  defaultValue={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  placeholder="Enter your name"
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
            name="email"
            validators={{
              onSubmit: ({ value }) => {
                if (!value.includes("@")) {
                  return "Invalid e-mail address";
                }
              },
            }}>
            {({ state, handleChange, handleBlur }) => (
              <FormControl error={state.meta.errors.length > 0}>
                <Input
                  fullWidth
                  type="text"
                  variant="outlined"
                  defaultValue={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  placeholder="E-mail Address"
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
            name="password"
            validators={{
              onSubmit: ({ value }) => {
                if (value.length < 6) {
                  return "Password must be at least 6 characters long";
                }
              },
            }}>
            {({ state, handleChange, handleBlur }) => (
              <FormControl error={state.meta.errors.length > 0}>
                <Input
                  fullWidth
                  type="password"
                  variant="outlined"
                  defaultValue={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  placeholder="Password"
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
            name="passwordConfirm">
            {({ state, handleChange, handleBlur }) => (
              <FormControl error={formErrors.length > 0}>
                <Input
                  fullWidth
                  type="password"
                  variant="outlined"
                  defaultValue={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  placeholder="Confirm Password"
                />
                <FormHelperText>
                  {formErrors.length > 0 ? (
                    <>
                      <InfoOutlined />
                      {formErrors[0]}
                    </>
                  ) : (
                    ""
                  )}
                </FormHelperText>
              </FormControl>
            )}
          </Field>
          <Button type="submit" variant="contained">
            Register
          </Button>
        </form>
      </Provider>
    </Sheet>
  );
}
