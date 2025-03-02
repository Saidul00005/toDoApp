import { Divider, Skeleton } from "@nextui-org/react";

const ToDoListLoadingSkeleton = () => {
  // Create arrays to simulate multiple skeleton items
  const dates = [1, 2, 3]; // Three date groups
  const todoItems = [1, 2, 3, 4]; // Four todo items per date

  return (
    <div className="p-6">
      {/* Header skeleton */}
      <div className="flex flex-col items-center justify-center mx-4 mb-8">
        <Skeleton className="h-8 w-64 rounded-lg mb-4" />
        <Skeleton className="h-5 w-96 rounded-lg mb-6" />
        <Skeleton className="h-12 w-full max-w-md rounded-lg" />
      </div>

      {/* Todo group skeletons */}
      {dates.map((date) => (
        <div key={date} className="pt-2 mb-8">
          <Divider className="my-1" />
          <div className="flex justify-center my-2">
            <Skeleton className="h-6 w-32 rounded-lg" />
          </div>
          <Divider className="my-1" />

          <div className="grid grid-cols-1 items-center justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
            {todoItems.map((item) => (
              <div key={item} className="w-full max-w-xs">
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 w-full h-48 flex flex-col">
                  <Skeleton className="h-6 w-3/4 rounded-lg mb-2" />
                  <Skeleton className="h-4 w-1/3 rounded-lg mb-3" />
                  <Skeleton className="h-20 w-full rounded-lg mb-3" />
                  <div className="flex justify-between mt-auto">
                    <Skeleton className="h-8 w-20 rounded-lg" />
                    <Skeleton className="h-8 w-20 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Load more button skeleton */}
      <div className="mt-4 flex justify-center">
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
    </div>
  );
};

export default ToDoListLoadingSkeleton;