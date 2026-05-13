import type { ComponentPropsWithoutRef } from "react"

type THProps = ComponentPropsWithoutRef<"th">

export const TH = ({ children, ...props }: THProps) => {
  return (
    <th
      className={`px-4 py-3 text-left text-sm font-semibold text-gray-700 ${props.className}`}
      {...props}
    >
      {children}
    </th>
  )
}
