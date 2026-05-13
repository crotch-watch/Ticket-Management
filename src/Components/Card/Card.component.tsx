import type { ComponentPropsWithoutRef } from "react"

type CardProps = {
  children: React.ReactNode
  background?: string
} & ComponentPropsWithoutRef<"div">

export const Card = ({
  children,
  className = "",
  background = "bg-white",
  ...props
}: CardProps) => {
  return (
    <div
      {...props}
      className={`rounded-xl border border-gray-200 p-5 shadow-sm flex-1 ${background} ${className}`}
    >
      {children}
    </div>
  )
}
