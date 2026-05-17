import React from "react"

import {
  INITIAL_INPUTS,
  type OnChangeEvent
} from "../../Hooks/useTicketForm/useTicketForm.hook"

import type { TicketInputs } from "../../Pages/CreateTicket/CreateTicket.types"
import type { TicketUpdatePayload } from "../../Types/TickerReducer.types"
import type { Ticket, TicketState } from "../../Types/Ticket.types"
import { INITIAL_TICKET_STATE } from "../../Hooks/useTicket/useTicket.hook"

export type Context = {
  state: {
    ticketsState: TicketState
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
    updateFilters: (event: OnChangeEvent) => void
    exitEditingMode: () => void
    clearInputs: () => void
  }
}

export const context = React.createContext<Context>({
  state: {
    ticketsState: INITIAL_TICKET_STATE,
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
    addEditingId: () => {},
    updateFilters: () => {},
    exitEditingMode: () => {},
    clearInputs: () => {}
  }
})
