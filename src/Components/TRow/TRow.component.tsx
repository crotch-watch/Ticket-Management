import { useContext } from "react"

import { TD } from "../TD/TD.component"
import { Tag } from "../Tag/Tag.component"
import { Button } from "../Button/Button"

import { context } from "../../Context/TicketContext/TicketContext"

import type { Ticket } from "../../Types/Ticket.types"
import { Select } from "../Select/Select.component"

const statusStyles = {
  Open: "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Closed: "bg-green-100 text-green-800"
}

const priorityStyles = {
  Low: "bg-gray-100 text-gray-700",
  Medium: "bg-blue-100 text-blue-700",
  High: "bg-orange-100 text-orange-700",
  Critical: "bg-red-100 text-red-700"
}

export const TicketRow = ({ ticket }: { ticket: Ticket }) => {
  const {
    state: { mode, formInputs, editingId },
    setters: {
      deleteTicket,
      enterEditingMode,
      handleInputChange,
      saveTicketChanges
    }
  } = useContext(context)

  return (
    <tr className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
      <TD>
        <p className="font-medium text-gray-900">{ticket.title}</p>
      </TD>
      <TD>{ticket.domain}</TD>
      <TD>
        {mode === "editing" && ticket.id === editingId ? (
          <Select
            id="form-ticket-priority"
            name="priority"
            className="w-25 p-0"
            value={formInputs.priority}
            onChange={handleInputChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </Select>
        ) : (
          <Tag
            className={
              priorityStyles[ticket.priority as keyof typeof priorityStyles]
            }
          >
            {ticket.priority}
          </Tag>
        )}
      </TD>
      <TD>
        {mode === "editing" && ticket.id == editingId ? (
          <Select
            id="form-ticket-status"
            name="status"
            className="w-25"
            value={formInputs.status}
            onChange={handleInputChange}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </Select>
        ) : (
          <Tag
            className={statusStyles[ticket.status as keyof typeof statusStyles]}
          >
            {ticket.status}
          </Tag>
        )}
      </TD>
      <TD>{ticket.createdAt.toLocaleDateString()}</TD>
      <TD>
        <div className="flex gap-2">
          {mode === "viewing" || ticket.id !== editingId ? (
            <Button
              size="small"
              variant="edit"
              onClick={() => enterEditingMode(ticket.id)}
            >
              Edit
            </Button>
          ) : null}
          {mode === "editing" && ticket.id === editingId ? (
            <Button
              variant="success"
              size="small"
              onClick={() =>
                saveTicketChanges({
                  id: ticket.id,
                  changes: {
                    status: formInputs.status,
                    priority: formInputs.priority
                  }
                })
              }
            >
              Save
            </Button>
          ) : null}
          <Button
            size="small"
            variant="warn"
            onClick={() => deleteTicket(ticket.id)}
          >
            Delete
          </Button>
        </div>
      </TD>
    </tr>
  )
}
