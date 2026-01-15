import type { ComponentPropsWithoutRef, FC } from "react";

// If we want our props object to include any attribute/prop usable in the "label" or "input" element, it's not practical to add and type every single one of them in our props object. Instead, we type the custom props the component should receive and intersect it with React's built-in ComponentProps<T> type or one of its variations:
type InputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<"input">;
// The ComponentPropsWithRef<T> type adds a "ref" prop to the props object - the ComponentPropsWithoutRef<T> does not. The added "ref" prop only works if we're forwarding refs to the component. These utility types accept a string containing the name of an HTML element as an input for their type parameter.

const Input: FC<InputProps> = function ({ label, id }) {
  return (
    <p>
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} />
    </p>
  );
};

export default Input;
