import { Card } from "../Card/Card.component"
import { Select } from "../Select/Select.component"

export const Filters = () => {
  return (
    <Card>
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search tickets"
          className="h-10 min-w-55 rounded-lg border border-gray-300 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Select>
          <option>All Domains</option>
          <option>Engineering</option>
          <option>DevOps</option>
          <option>HR</option>
          <option>IT</option>
          <option>Finance</option>
        </Select>

        <Select>
          <option>All Priorities</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </Select>

        <Select>
          <option>All Statuses</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Closed</option>
        </Select>
      </div>
    </Card>
  )
}
