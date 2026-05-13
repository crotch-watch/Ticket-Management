import { useState } from "react"

import type { TicketInputs } from "../../Pages/CreateTicket/CreateTicket.types"

export const INITIAL_INPUTS: TicketInputs = {
  title: "",
  description: "",
  domain: "Engineering",
  status: "Open",
  priority: "Low"
} as const

export type OnChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement
>

export const useTicketForm = () => {
  const [inputs, setInputs] = useState(INITIAL_INPUTS)

  const updateFormOnChange = ({
    event,
    name
  }: {
    event: OnChangeEvent
    name: keyof TicketInputs
  }) => {
    setInputs((prev) => {
      return { ...prev, [name]: event.target.value }
    })
  }

  const addInputs = (newInputs: TicketInputs) => {
    setInputs(newInputs)
  }

  const clearInputs = () => {
    setInputs(INITIAL_INPUTS)
  }

  return { inputs, updateFormOnChange, clearInputs, addInputs }
}
