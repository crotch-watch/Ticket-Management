import type { ComponentPropsWithoutRef } from "react"

export const Input = ({ ...props }: ComponentPropsWithoutRef<"input">) => {
  return (
    <input
      className="w-full rounded-lg border border-gray-300 p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      {...props}
    />
  )
}
