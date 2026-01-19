import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

// Creating a polymorphic component - a wrapper component whose wrapped component/s are not known in advance:

// React's built-in ElementType type restricts the type to a valid JSX element (div, main, aside, etc.) or an existing React functional component (like Button). The "T" type parameter is used as the identifier and placeholder for the type of the incoming argument of the "asElement" prop:
type ContainerProps<T extends ElementType> = {
  asElement?: T;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;
// The ComponentPropsWithoutRef<T> type doesn't just accept JSX element identifiers as argument for its type parameter, but also React functional components.

export default function Container<C extends ElementType>({
  asElement,
  children,
  ...props
}: ContainerProps<C>) {
  const Component = asElement || "div";
  return <Component {...props}>{children}</Component>;
}
