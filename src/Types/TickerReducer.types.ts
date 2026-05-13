import type { Ticket } from "./Ticket.types"

export type TicketUpdatePayload = {
  id: Ticket["id"]
  changes: { status: Ticket["status"] } | { priority: Ticket["priority"] }
}

export type TicketActions =
  | {
      type: "CREATE"
      payload: Ticket
    }
  | {
      type: "EDIT"
      payload: TicketUpdatePayload
    }
  | {
      type: "DELETE"
      payload: Ticket["id"]
    }
