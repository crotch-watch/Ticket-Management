import type { Ticket } from "../../Types/Ticket.types"

export type TicketInputs = Pick<
  Ticket,
  "title" | "description" | "domain" | "priority" | "status"
>
