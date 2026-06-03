import type { Ticket, TicketFilters } from "../Tickets.types"

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
