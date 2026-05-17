export const NoFilterResults = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">No tickets found</h2>

      <p className="mt-2 text-sm text-gray-500">
        Try changing the selected filters.
      </p>
    </div>
  )
}
