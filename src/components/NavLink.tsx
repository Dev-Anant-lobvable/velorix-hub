import { forwardRef } from "react";
import { Link, useLocation } from "@/lib/router-compat";
import { cn } from "@/lib/utils";

type LinkProps = React.ComponentPropsWithoutRef<typeof Link>;

interface NavLinkCompatProps extends Omit<LinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
  end?: boolean;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, end, to, ...props }, ref) => {
    const { pathname } = useLocation();
    const target = typeof to === "string" ? to : "";
    const isActive = end
      ? pathname === target
      : pathname === target || (target !== "/" && pathname.startsWith(`${target}/`));

    return (
      <Link
        ref={ref}
        to={to}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
