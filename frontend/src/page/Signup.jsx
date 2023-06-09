import { Link } from "preact-router/match";
import { classNames } from "primereact/utils";
import { useAuth } from "../utils/AuthContext";
import { useEffect, useState } from "preact/hooks";
import { Controller, useForm } from "react-hook-form";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";

const Signup = () => {
  const { signup, doUserAuth } = useAuth();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // redirect to home if already logged in
    doUserAuth();
  }, []);

  const defaultValues = { usernames: "", passwords: "" };
  const form = useForm({ defaultValues });
  const errors = form.formState.errors;

  const onSubmit = (data) => {
    setLoading(true);
    signup(data.usernames, data.passwords);

    setTimeout(() => {
      setLoading(false);
    }, 3000);

    form.reset();
  };

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className="p-error">{errors[name].message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  return (
    <div className="card flex justify-content-center">
      <Card title="Signup" className="w-4">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-column gap-2"
        >
          <Controller
            name="usernames"
            control={form.control}
            rules={{ required: "Username is required." }}
            render={({ field, fieldState }) => (
              <>
                <label
                  htmlFor={field.name}
                  className={classNames({ "p-error": errors.value })}
                >
                  Username
                </label>
                <InputText
                  id={field.name}
                  {...field}
                  inputRef={field.ref}
                  className={classNames({ "p-invalid": fieldState.error })}
                />
                {getFormErrorMessage(field.name)}
              </>
            )}
          />
          <Controller
            name="passwords"
            control={form.control}
            rules={{ required: "Password is required." }}
            render={({ field, fieldState }) => (
              <>
                <label
                  htmlFor={field.name}
                  className={classNames({ "p-error": errors.value })}
                >
                  Password
                </label>
                <Password
                  id={field.name}
                  {...field}
                  inputRef={field.ref}
                  className={classNames({ "p-invalid": fieldState.error })}
                  //feedback={false}
                  header={header}
                  footer={footer}
                />
                {getFormErrorMessage(field.name)}
              </>
            )}
          />
          <Button
            label="Submit"
            type="submit"
            icon="pi pi-check"
            loading={loading}
          />
        </form>

        <div className="p-text-center">
          <Link href="/">Login</Link>
        </div>
      </Card>
    </div>
  );
};

export default Signup;

const header = <div className="font-bold mb-3">Pick a password</div>;
const footer = (
  <>
    <Divider />
    <p className="mt-2">Suggestions</p>
    <ul className="pl-2 ml-2 mt-0 line-height-3">
      <li>At least one lowercase</li>
      <li>At least one uppercase</li>
      <li>At least one numeric</li>
      <li>Minimum 8 characters</li>
    </ul>
  </>
);
