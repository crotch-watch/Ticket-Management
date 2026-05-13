import type { ComponentPropsWithoutRef } from "react"

export const Select = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"select">) => {
  return (
    <select
      className={`h-8 rounded-lg border border-gray-300 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}
