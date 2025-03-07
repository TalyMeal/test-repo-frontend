export const Error = ({ error, reset }: { error: any, reset: () => void }) => {
  console.log(error);
  alert(`Все пропало: ${error.toString()}`)
  return (
    <div class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          Все пропало: {error.toString()}!
        </div>
        <div class="pt-10">
          <button
            onClick={reset}
            class="px-6 py-3 bg-blue-500 text-white rounded-lg"
          >
            Но надежда есть
          </button>
        </div>
      </div>
    </div>
  );
}
