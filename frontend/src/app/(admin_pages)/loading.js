export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Page Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="h-7 w-56 rounded-md bg-gray-200" />
          <div className="h-4 w-72 rounded-md bg-gray-200" />
        </div>

        <div className="h-11 w-36 rounded-xl bg-gray-200" />
      </div>

      {/* Table Skeleton */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-6 border-b border-gray-100 px-6 py-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-4 w-16 rounded-md bg-gray-200"
            />
          ))}
        </div>

        {/* Table Rows */}
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-6 items-center gap-6 border-b border-gray-100 px-6 py-4 last:border-b-0"
          >
            <div className="h-16 w-16 rounded-xl bg-gray-200" />

            <div className="h-4 w-24 rounded-md bg-gray-200" />

            <div className="h-4 w-20 rounded-md bg-gray-200" />

            <div className="h-7 w-16 rounded-full bg-gray-200" />

            <div className="h-8 w-16 rounded-full bg-gray-200" />

            <div className="h-5 w-20 rounded-md bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}