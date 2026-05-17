import { useTicketContext } from "../../Hooks/useTicketContext/useTicketContext.hook"
import { Card } from "../Card/Card.component"
import { Select } from "../Select/Select.component"

export const Filters = () => {
  const {
    state: {
      ticketsState: { filters }
    },
    setters: { updateFilters }
  } = useTicketContext()
  return (
    <Card>
      <div className="flex flex-wrap gap-3">
        <input
          name="search"
          onChange={updateFilters}
          placeholder="Search tickets"
          className="h-10 min-w-55 rounded-lg border border-gray-300 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Select onChange={updateFilters} name="domain" value={filters.domain}>
          <option value="All Domains">All Domains</option>
          <option value="Engineering">Engineering</option>
          <option value="DevOps">DevOps</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
        </Select>

        <Select
          onChange={updateFilters}
          name="priority"
          value={filters.priority}
        >
          <option value="All Priorities">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </Select>

        <Select onChange={updateFilters} name="status" value={filters.status}>
          <option value="All Statuses">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </Select>
      </div>
    </Card>
  )
}
