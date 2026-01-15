import type { ComponentPropsWithoutRef, FC } from "react";

/*
// APPROACH - 1 -------------------------------------------:
// Using discriminated unions with a variation of React's built-in ComponentProps<T> utility type:
type ButtonProps = {
  elem: "button";
} & ComponentPropsWithoutRef<"button">;

type AnchorProps = {
  elem: "anchor";
} & ComponentPropsWithoutRef<"a">;

// This approach compells us to add the "elem" prop to every "Button" component instance to specify whether the Button component instance is a button or an anchor element. We can avoid this by using any built-in prop that's unique to either of the two HTML elements as the discriminitator in the conditionals inside the component logic, along with a type predicate (the isAnchorProps function below, in this case).
*/

// Type predicate:
function isAnchorProps(props: ButtonProps | AnchorProps): props is AnchorProps {
  return "href" in props;
}

/*
// APPROACH - 2 -------------------------------------------:
type ButtonProps = ComponentPropsWithoutRef<"button">;
type AnchorProps = ComponentPropsWithoutRef<"a">;

// The "props is AnchorProps" predicate allows us to tell TS that the function returns a Boolean value, which, if true, means that the "props" object belongs to an anchor element.

// As a downside of this approach, we can now add a button elements attributes/props to anchor elements and vice versa, because TS sees the Buton instance's props type as (ButtonProps | AnchorProps). Without a discriminator, TS doesn't know if the component instance is a "button" or an "anchor" JSX element. For instance, we can add the "target" attribute/prop to a button-type Button instance, or the "disabled" attribute/prop to an anchor-type Button instance. In other words, TS sees the combined union of AnchorProps and ButtonProps as the correct type for the props object of a Button component instance.

// To mitigate this caveat:
*/

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  href?: never;
  disabled?: boolean;
};
type AnchorProps = ComponentPropsWithoutRef<"a"> & {
  href?: string;
  disabled?: boolean;
};
// This helps TS understand that if a Button component instance contains the "href" attribute, it is a string because the attribute can "never" be set on a ButtonProps type. So, if we use the "href" attribute in a Button instance, TS will know that it is an anchor and won't let us use the "disabled" attribute in that instance. However, the absence of the "href" prop will not help TS magically understand that the Button instance is a button element, because the "href" attribute is optional in anchor elements

const Button: FC<ButtonProps | AnchorProps> = function (props) {
  if (isAnchorProps(props)) {
    return <a className="button" {...props}></a>;
  }

  return <button className="button" {...props}></button>;
};

export default Button;
