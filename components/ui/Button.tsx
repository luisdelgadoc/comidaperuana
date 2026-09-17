import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

const baseClasses =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-medium transition-colors duration-200";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-coral text-ivory hover:bg-coral-dark",
  secondary: "bg-ink text-ivory hover:bg-ink/90",
};

type CommonProps = {
  variant?: ButtonVariant;
  children: ReactNode;
};

type LinkButtonProps = CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "children"
  >;

type NativeButtonProps = CommonProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    "children"
  >;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

export function Button({ variant = "primary", children, ...props }: ButtonProps) {
  const className = `${baseClasses} ${variantClasses[variant]}`;

  if (props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} {...(props as NativeButtonProps)}>
      {children}
    </button>
  );
}
