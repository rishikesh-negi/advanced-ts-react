import type { ComponentPropsWithoutRef, FC, FormEvent } from "react";

// A wrapper form component that wraps around form input fields and contains the logic for handling form submissions:
type FormProps = ComponentPropsWithoutRef<"form"> & {
  onSave: (value: unknown) => void;
};
// The data extracted from the form needs to be passed to the component that will work with the data. So, the ComponentPropsWithoutRef<T> type needs to be merged with a custom props object to add more props to the wrapper form component. The "value" parameter of the onSave function-type prop should be of type "unknown" because the shape and structure of the form data is not known in advance.

const Form: FC<FormProps> = function ({ onSave, children, ...props }) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    onSave(data);
  }

  return (
    <form onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
};

export default Form;
