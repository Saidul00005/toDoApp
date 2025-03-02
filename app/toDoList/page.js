'use client'
import ToDoItem from '@/components/toDoList/toDoItem'
import { useDispatch, useSelector } from 'react-redux'
import { fetchToDos, selectToDos, selectLoading, selectError, searchToDos, selectHasMore, selectCurrentPage, resetSearchResults, resetToDoItems, selectIsLoadingMore, selectIsSearchLoading } from '@/app/redux/slices/toDoSlice'
import { Divider, Input, Button, Select, SelectItem } from "@nextui-org/react"; // Added Select and SelectItem import
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from 'react'
import { useRouter } from "next/navigation"
import ToDoListLoadingSkeleton from '@/app/toDoList/component/TodoListLoadingSkeleton';


// const Loading = () => (
//   <div className="flex flex-col items-center justify-center h-[50vh]">
//     <p className="text-md md:text-lg font-normal text-gray-500 dark:text-gray-400">
//       Loading your to-do list...
//     </p>
//   </div>
// )

const ErrorMessage = ({ error }) => (
  <div className="flex flex-col items-center justify-center h-[50vh]">
    <p className="text-md md:text-lg font-normal text-red-500">
      Error: {error}
    </p>
  </div>
)

const Page = () => {
  const router = useRouter()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/")
    },
  });

  const searchInputRef = useRef(null);
  const hasMore = useSelector(selectHasMore);
  const currentPage = useSelector(selectCurrentPage);
  const dispatch = useDispatch()
  const toDos = useSelector(selectToDos)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const searchResults = useSelector((state) => state.toDos.searchResults);
  const isLoadingMore = useSelector(selectIsLoadingMore);
  const isSearchLoading = useSelector(selectIsSearchLoading);
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [sortOption, setSortOption] = useState('creationDate');

  useEffect(() => {
    if (status === 'authenticated' && toDos.length === 0 && !searchInputRef.current?.value) {
      dispatch(fetchToDos({ page: currentPage }));
    }
  }, [status, toDos.length, currentPage, dispatch]);

  const handleLoadMore = () => {
    dispatch(fetchToDos({ page: currentPage + 1 }));
  };

  const handleSearch = async () => {
    const query = searchInputRef.current.value;
    if (query) {
      setIsSearching(true);
      dispatch(resetToDoItems());
      dispatch(searchToDos(query));
    }
  };

  const handleClearSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
    setSearchValue('');
    setIsSearching(false);
    dispatch(resetSearchResults());
    dispatch(fetchToDos({ page: 1 }));
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  if (error) {
    return <ErrorMessage error={error} />
  }

  const displayToDos = isSearching ? searchResults : toDos;

  const sortTodos = (todos) => {
    const todosToSort = [...todos];

    switch (sortOption) {
      case 'completed':
        // Sort by status (completed first)
        return todosToSort.sort((a, b) => {
          // First compare by status
          if (a.toDoStatus === 'Completed' && b.toDoStatus !== 'Completed') return -1;
          if (a.toDoStatus !== 'Completed' && b.toDoStatus === 'Completed') return 1;
          // Then by creation date for same status
          return new Date(b.toDoCreationDate) - new Date(a.toDoCreationDate);
        });
      case 'pending':
        // Sort by status (pending first)
        return todosToSort.sort((a, b) => {
          // First compare by status
          if (a.toDoStatus !== 'Completed' && b.toDoStatus === 'Completed') return -1;
          if (a.toDoStatus === 'Completed' && b.toDoStatus !== 'Completed') return 1;
          // Then by creation date for same status
          return new Date(b.toDoCreationDate) - new Date(a.toDoCreationDate);
        });
      case 'creationDate':
      default:
        // Default sort by creation date
        return todosToSort.sort(
          (a, b) => new Date(b.toDoCreationDate) - new Date(a.toDoCreationDate)
        );
    }
  };

  const filteredToDos = sortTodos(displayToDos);

  const groupedToDos = filteredToDos.reduce((groups, toDo) => {
    const date = new Date(toDo.toDoCreationDate).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(toDo);

    return groups;
  }, {})

  const formatDateWithSuffix = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-GB', { month: 'long' });
    const year = date.getFullYear();

    const getDayWithSuffix = (day) => {
      if (day > 3 && day < 21) return `${day}th`; // 4-20th
      switch (day % 10) {
        case 1: return `${day}st`; // 1st
        case 2: return `${day}nd`; // 2nd
        case 3: return `${day}rd`; // 3rd
        default: return `${day}th`; // 4th, 5th, etc.
      }
    };

    return `${getDayWithSuffix(day)} ${month}, ${year}`;
  };


  return (
    <>
      <div className='flex flex-col items-center justify-center mx-4 my-4 gap-4'>
        <h1 className="mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-green-600 from-sky-400">To Do</span> Lists
        </h1>
        <p className="text-md md:text-lg font-normal text-gray-500 dark:text-gray-400">
          Venture through your tasks today, Dreams and goals to light the way.
        </p>

        <div className="flex gap-2 w-full max-w-md">
          <Input
            className="flex-grow"
            variant="bordered"
            placeholder="Search todo name"
            type='text'
            ref={searchInputRef}
            value={searchValue}
            onInput={(e) => setSearchValue(e.target.value)}
          />
          <Button
            color="primary"
            onClick={handleSearch}
            disabled={isSearchLoading}
            isLoading={isSearchLoading}
          >
            Search
          </Button>
          {isSearching && (
            <Button
              color="danger"
              variant="flat"
              onClick={handleClearSearch}
            >
              Clear
            </Button>
          )}
        </div>

        {/* Added sort dropdown */}
        <div className="w-full max-w-md">
          <Select
            label="Sort by"
            placeholder="Select a sort option"
            value={sortOption}
            onChange={handleSortChange}
            variant="bordered"
          >
            <SelectItem key="creationDate" value="creationDate">
              Creation Date
            </SelectItem>
            <SelectItem key="completed" value="completed">
              Completed First
            </SelectItem>
            <SelectItem key="pending" value="pending">
              Pending First
            </SelectItem>
          </Select>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <ToDoListLoadingSkeleton />
        ) : (
          Object.keys(groupedToDos).length > 0 ? (
            Object.keys(groupedToDos).map((date, index) => (
              <div key={index} className="pt-2">
                <Divider className="my-1" />
                <h5 className="text-sm font-semibold text-center">{formatDateWithSuffix(date)}</h5>
                <Divider className="my-1" />
                <div className="grid grid-cols-1 items-center justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
                  {groupedToDos[date].map((toDo, index) => (
                    // Pass additional className based on task status
                    <ToDoItem
                      key={index}
                      id={toDo._id}
                      name={toDo.toDoName}
                      description={toDo.toDoDescription}
                      status={toDo.toDoStatus}
                      act={toDo.toDoACT}
                      creationDate={toDo.toDoCreationDate}
                      editionDate={toDo.toDoEditionDate}
                      className={toDo.toDoStatus === 'completed' ? 'completed-task' : 'pending-task'}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <p className="text-md font-normal text-gray-500 dark:text-gray-400">
                No to-do available.
              </p>
            </div>
          )
        )}

        {!isSearching && hasMore && (
          <div className="mt-4 flex justify-center">
            <Button
              color="success"
              variant="ghost"
              onClick={handleLoadMore}
              disabled={!hasMore || isLoadingMore}
              isLoading={isLoadingMore}
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;