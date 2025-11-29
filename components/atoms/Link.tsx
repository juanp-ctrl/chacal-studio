import * as React from "react"
import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const linkVariants = cva(
  "font-medium underline-offset-4 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded-sm",
  {
    variants: {
      variant: {
        default: "text-primary hover:text-primary/80",
        muted: "text-muted-foreground hover:text-foreground",
        accent: "text-accent hover:text-accent/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  href: string
  external?: boolean
}

const CustomLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, href, external, ...props }, ref) => {
    if (external) {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(linkVariants({ variant, className }))}
          {...props}
        />
      )
    }
    return (
      <Link
        ref={ref} // Next.js 13+ Link doesn't strictly need ref forwarding like this but it's good practice for composition
        href={href}
        className={cn(linkVariants({ variant, className }))}
        {...props}
      />
    )
  }
)
CustomLink.displayName = "Link"

export { CustomLink as Link, linkVariants }

