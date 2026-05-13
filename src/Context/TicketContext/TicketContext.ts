import React from "react"

import {
  INITIAL_INPUTS,
  type OnChangeEvent
} from "../../Hooks/useTicketForm/useTicketForm.hook"

import type { TicketInputs } from "../../Pages/CreateTicket/CreateTicket.types"
import type { TicketUpdatePayload } from "../../Types/TickerReducer.types"
import type { Ticket } from "../../Types/Ticket.types"

export type Context = {
  state: {
    tickets: Array<Ticket>
    formInputs: TicketInputs
    mode: "viewing" | "editing"
    editingId: Ticket["id"]
  }
  setters: {
    editTicket: (dataToUpdate: TicketUpdatePayload) => void
    deleteTicket: (id: Ticket["id"]) => void
    handleFormCreation: (e: React.SubmitEvent<HTMLFormElement>) => void
    handleInputChange: (event: OnChangeEvent) => void
    enterEditingMode: (id: Ticket["id"]) => void
    saveTicketChanges: (payload: TicketUpdatePayload) => void
    addEditingId: (id: Ticket["id"]) => void
  }
}

export const context = React.createContext<Context>({
  state: {
    tickets: [],
    formInputs: INITIAL_INPUTS,
    mode: "viewing",
    editingId: ""
  },
  setters: {
    editTicket: () => {},
    deleteTicket: () => {},
    handleFormCreation: () => {},
    handleInputChange: () => {},
    enterEditingMode: () => {},
    saveTicketChanges: () => {},
    addEditingId: () => {}
  }
})
