import type { TicketActions } from "../../Types/TickerReducer.types"
import type { Ticket } from "../../Types/Ticket.types"

export const ticketReducer = (state: Array<Ticket>, action: TicketActions) => {
  const { type, payload } = action

  switch (type) {
    case "CREATE": {
      const alreadyExists = state.some((ticket) => ticket.id === payload.id)

      if (alreadyExists) return state
      else return [payload, ...state]
    }

    case "EDIT": {
      return state.map((ticket) => {
        if (payload.id === ticket.id) return { ...ticket, ...payload.changes }
        else return ticket
      })
    }

    case "DELETE": {
      return state.filter((ticket) => ticket.id !== payload)
    }

    default:
      return state
  }
}
