import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type ComponentPropsWithoutRef,
  type FormEvent,
} from "react";

// A type for the API to be exposed:
export type FormApi = {
  clear: () => void;
};

// A wrapper form component that wraps around form input fields and contains the logic for handling form submissions:
type FormProps = ComponentPropsWithoutRef<"form"> & {
  onSave: (value: unknown) => void;
};
// The data extracted from the form needs to be passed to the component that will work with the data. So, the ComponentPropsWithoutRef<T> type needs to be merged with a custom props object to add more props to the wrapper form component. The "value" parameter of the onSave function-type prop should be of type "unknown" because the shape and structure of the form data is not known in advance.

const Form = forwardRef<FormApi, FormProps>(function (
  { onSave, children, ...props },
  ref,
) {
  // The component's internal ref to reference the target JSX element for external operations performed using the exposed API:
  const form = useRef<HTMLFormElement>(null);

  // We can expose a callable API from the component, that can be accessed by assigning a ref to the component instance. The API will allow interaction with the component from the outside. The useImperativeHandle() hook is used for it:
  useImperativeHandle(ref, () => ({
    clear() {
      form.current?.reset(); // optional chaining because the "form" ref could be null
    },
  }));
  // The hook accepts a ref as the first argument. In this use case, the ref is obtained from the use of the forwardRef() function. The second argument is a callback function that returns an object containing all the functions that we want to expose as API to the external code.

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    onSave(data);

    form.current?.reset();
  }

  return (
    <form onSubmit={handleSubmit} {...props} ref={form}>
      {children}
    </form>
  );
});

export default Form;
