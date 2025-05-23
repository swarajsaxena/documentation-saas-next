import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default:
          'border text-light border-primary-500 bg-gradient-to-b from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 dark:bg-destructive/60',
        outline:
          'border bg-light shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        lg: 'rounded-md px-4 py-2 has-[>svg]:px-4',
        default: 'px-3 py-1.5 text-sm has-[>svg]:px-3',
        sm: 'rounded-md gap-1.5 px-2 py-0.5 text-xs has-[>svg]:px-2.5 rounded-sm',
        icon_lg: 'p-2',
        icon_default: 'p-1',
        icon_sm: 'p-0.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <img
        src="/button-pattern.svg"
        className="absolute top-1/2 left-1/2 w-32 -translate-x-1/2 -translate-y-1/2"
        alt="icon"
      />
      {props.children}
    </Comp>
  )
}

export { Button, buttonVariants }
