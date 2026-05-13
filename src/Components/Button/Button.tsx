import type { ComponentPropsWithoutRef } from "react"

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  edit: "bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-400",
  warn: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
  secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300"
} as const

const sizes = {
  normal: "px-4 py-2 text-md",
  small: "px-3 py-1.5 text-sm"
} as const

type ButtonProps = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
} & ComponentPropsWithoutRef<"button">

export const Button = ({
  className = "",
  variant = "primary",
  size = "normal",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`rounded-sm cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
