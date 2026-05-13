type FieldGroupProps = {
  children: React.ReactNode
}

export const FieldGroup = ({ children }: FieldGroupProps) => {
  return <div className="flex flex-col gap-1.5">{children}</div>
}
