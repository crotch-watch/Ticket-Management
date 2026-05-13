import type { ComponentPropsWithoutRef } from "react"

type TagProps = ComponentPropsWithoutRef<"span">

export const Tag = ({ children, className, ...props }: TagProps) => {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
