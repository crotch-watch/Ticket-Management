import { TH } from "../TH/TH.component"
import { TicketRow } from "../TRow/TRow.component"

import type { Ticket } from "../../Types/Ticket.types"

type TicketTableProps = {
  tickets: Ticket[]
}

export const TicketTable = ({ tickets }: TicketTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <TH>Title</TH>
            <TH>Domain</TH>
            <TH>Priority</TH>
            <TH>Status</TH>
            <TH>Created</TH>
            <TH>Actions</TH>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <TicketRow key={ticket.id} ticket={ticket} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
