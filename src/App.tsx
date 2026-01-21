import { useRef } from "react";
import Button from "./components/Button";
import Container from "./components/Container";
import InputWithRef from "./components/InputWithRef";
import Form, { type FormApi } from "./components/FormWithExposedAPI";

function App() {
  // We should provide the type argument to useRef to indicate that the ref will eventually be the "input" HTML element:
  const inputRef = useRef<HTMLInputElement>(null);

  // The ref to connect a component instance with the API it exposes to use the exposed API:
  const formWithApiRef = useRef<FormApi>(null);

  // In this function, we have to deal with the fact that the type of "data" is not known. But, "data" is unknown only in the Form component. We do know the shape of the data here, because this is where the input fields of Form are known. So, here we need to convince TS that we know the type of "data". So, we can use the "as" assertion:
  function handleSave(data: unknown) {
    const extractedData = data as { name: string; age: string };
    // Important to remember: Even if we set the "type" attribute of an input field to number, the data type of its value will still be string, which is why the "age" property is set to the type of "string" in the above assertion.

    console.log(extractedData);

    formWithApiRef?.current?.clear();
  }

  return (
    <main>
      <p>
        <Button>A Button</Button>
      </p>
      <p>
        <Button href="https://google.com">A Link</Button>
      </p>

      <Container asElement={Button}>Hi</Container>

      <InputWithRef label="Test" id="test-ref-forwarding" ref={inputRef} />

      <Form onSave={handleSave} ref={formWithApiRef}>
        <InputWithRef type="text" label="Name" id="name" />
        <InputWithRef type="number" label="Age" id="age" />
        <p>
          <Button>Save</Button>
        </p>
      </Form>
    </main>
  );
}

export default App;
