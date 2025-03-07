import { createQuery } from "@tanstack/solid-query";
import { fetchUsers } from "../api/apiClient";
import { Show, createSignal, createMemo, onMount, onCleanup } from "solid-js";
import Card from "./Card";
import Loader from "./Loader";

export default function CardList() {
  const query = createQuery(() => ["users"], fetchUsers);

  const [pageSize, setPageSize] = createSignal(4);
  const [currentPage, setCurrentPage] = createSignal(1);

  const totalItems = createMemo(() => query.data?.length ?? 0);

  const totalPages = createMemo(() => Math.ceil(totalItems() / pageSize()));

  const currentItems = createMemo(() => {
    const startIndex = (currentPage() - 1) * pageSize();
    const endIndex = startIndex + pageSize();
    return query.data?.slice(startIndex, endIndex);
  });

  const handlePrev = () => {
    if (currentPage() > 1) {
      setCurrentPage(currentPage() - 1);
    }
  };

  const handleNext = () => {
    if (currentPage() < totalPages()) {
      setCurrentPage(currentPage() + 1);
    }
  };

  const handlePageSizeChange = (e: { currentTarget: { value: any; }; }) => {
    setPageSize(Number(e.currentTarget.value));
    setCurrentPage(1);
  };

  const refetchData = async () => {
    await query.refetch();
  };

  onMount(() => {
    const intervalId = setInterval(() => {
        refetchData();
    }, 600000);
    onCleanup(() => clearInterval(intervalId));
  });

  return (
    <div class="bg-[#dee6fa] min-h-screen p-10">
      <Show when={!query.isLoading} fallback={<Loader />}>
        <div class="text-2xl font-bold mb-4 text-center">
          <button class="px-6 py-3 bg-blue-500 text-white rounded-lg" 
                  onClick={refetchData}
          >
                    Refetch data
          </button>
        </div>

        <div class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span class="mr-2">Items per page:</span>
            <select
              class="border p-1 rounded"
              value={pageSize()}
              onChange={handlePageSizeChange}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="12">12</option>
            </select>
          </div>

          <div class="flex items-center gap-4">
            <button
              class="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
              onClick={handlePrev}
              disabled={currentPage() === 1}
            >
              Prev
            </button>
            <span>
              Page {currentPage()} of {totalPages()}
            </span>
            <button
              class="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
              onClick={handleNext}
              disabled={currentPage() === totalPages() || totalPages() === 0}
            >
              Next
            </button>
          </div>
        </div>

        <div class="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))]">
          {currentItems()?.map((user: unknown) => (
            <Card user={user} />
          ))}
        </div>
      </Show>
    </div>
  );
}
