import { useContext } from "react"

import { context } from "../../Context/TicketContext/TicketContext"

export const useTicketContext = () => {
  const ctx = useContext(context)

  if (!ctx) {
    console.warn("useTicketContext must be used within a TicketContextProvider")
  }

  return ctx
}
