import { forwardRef, type ComponentPropsWithoutRef } from "react";

// If we want to use refs, simply intersecting the props type with ComponentPropsWithRef<T> and passing a ref, created with useRef(), as the "ref" prop in the component call won't work. Instead, we need to keep using ComponentPropsWithoutRef<T> and wrap the functional component with React's forwardRef() function:
type InputWithRefProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<"input">;

// When wrapped with the forwardRef() function, the functional component can access a "ref" parameter in addition to the props object. That parameter is the ref that can be forwarded to the target JSX element inside the component body.
// The "ref" parameter is of the type React.ForwardedRef<unknown>. So, it is a generic type that expects some type information about the value it will accept.
// The forwardRef() function is also a generic function to which we optionally (but usually) pass some type information about the value the ref will be assigned to. In this case, since the "ref" prop is expected to be assigned to an HTMLInputElement type, that's exactly the type we should pass into forwardRef<T>. The generic function also expects a second type argument - the type of the props object that the components receives, which is InputWithRefsProps, in this case. Therefore, we can get rid of the type annotation for the props object, because internally, the second type argument passed to forwardRef<T, U> will be assumed for the props object:
const InputWithRef = forwardRef<HTMLInputElement, InputWithRefProps>(function (
  { label, id },
  ref,
) {
  return (
    <p>
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} name={id} ref={ref} />
    </p>
  );
});

export default InputWithRef;
