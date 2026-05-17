import { useNavigate } from "react-router"

import { Button } from "../../Components/Button/Button"
import { Summary } from "../../Components/Summary/Summar.component"
import { TicketTable } from "../../Components/Table/Table.component"
import { CallToAction } from "../../Components/CallToAction/CTA.component"

import { useTicketContext } from "../../Hooks/useTicketContext/useTicketContext.hook"

import { Filters } from "../../Components/Filters/Filters.component"
import { useEffect } from "react"
import { NoFilterResults } from "../../Components/NoFilteredResults/NoFilteredResults.component"

export default function TickeTDashboard() {
  const navigateTo = useNavigate()

  const {
    state: {
      ticketsState: { tickets, filteredTickets }
    },
    setters: { exitEditingMode }
  } = useTicketContext()

  useEffect(() => {
    return () => exitEditingMode()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const stats = { open: 0, progress: 0, total: 0, critical: 0 }

  tickets.forEach((ticket) => {
    if (ticket.priority === "Critical") stats.critical++
    if (ticket.status === "Open") stats.open++
    if (ticket.status === "In Progress") stats.progress++
  })

  const noTickets = tickets.length === 0

  const content = noTickets ? (
    <CallToAction onAction={() => navigateTo("/ticket-form")} />
  ) : (
    <TicketTable tickets={filteredTickets} />
  )

  const noFilteredValueExists =
    tickets.length > 0 && filteredTickets.length === 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">
              Ticket Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Manage and track internal tickets
            </p>
          </div>

          {tickets.length > 0 ? (
            <Button onClick={() => navigateTo("/ticket-form")}>
              Create Ticket
            </Button>
          ) : null}
        </div>

        {/* Summary Cards */}
        <div className="flex gap-2">
          <Summary label="Total Tickets" value={tickets.length.toString()} />
          <Summary label="Open" value={stats.open.toString()} />
          <Summary label="In Progress" value={stats.progress.toString()} />
          <Summary label="Critical" value={stats.critical.toString()} />
        </div>

        <Filters />

        {noFilteredValueExists ? <NoFilterResults /> : content}
      </div>
    </div>
  )
}
