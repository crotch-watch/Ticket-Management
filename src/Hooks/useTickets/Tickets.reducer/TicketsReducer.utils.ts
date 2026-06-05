import { filter, type NonEmptyList } from "../../../Types/List.types"
import type { Ticket, TicketFilters } from "../Tickets.types"
import type { ApplyViewInvariantsTo } from "./Reducer.types"

export function applyFilters(ticket: Ticket, filters: TicketFilters) {
    const { searchTerm, domain, priority, status } = filters

    const normalizedSearch = searchTerm.trim().toLowerCase()

    const hasSearchTerm =
        normalizedSearch === "" ||
        Object.values(ticket).some(value => value != null && value.toString().toLowerCase().includes(normalizedSearch))

    const hasSpecifiedDomain = domain === "All Domains" || ticket.domain === domain

    const hasSpecifiedPriority = priority === "All Priorities" || ticket.priority === priority

    const hasSpecifiedStatus = status === "All Statuses" || ticket.status === status

    return hasSearchTerm && hasSpecifiedDomain && hasSpecifiedPriority && hasSpecifiedStatus
}

export const applyViewInvariantsTo: ApplyViewInvariantsTo = state => {
    return ({ tickets, filteredTickets }) => {
        return {
            ...state,
            mode: "viewing",
            data: tickets,
            view: {
                ...state.view,
                filteredTickets,
                ticketsBeingEdited: []
            }
        }
    }
}

export const deduplicateTickets = (tickets: NonEmptyList<Ticket>) => {
    const lookup = new Set<Ticket["id"]>()

    const deduped = filter(tickets, ({ id: ticketID }) => {
        if (lookup.has(ticketID)) return false
        else {
            lookup.add(ticketID)
            return true
        }
    })

    return deduped as unknown as NonEmptyList<Ticket>
}
