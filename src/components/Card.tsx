import { createSignal } from "solid-js";
import { patchUserName } from "../api/apiClient";
import "./Card.scss";

export default function Card({ user }: {user: any}) {
  const [name, setName] = createSignal(user.name);
  const [isEditing, setIsEditing] = createSignal(false);

  const handleBlur = async () => {
    setIsEditing(false);
    if (name() !== user.name) {
      try {
        await patchUserName(user.id, name());
      } catch (error) {
        console.error("Неудачный PATCH user name:", error);
      }
    }
  };

  return (
     <div class="card-container">

      <p class="text-sm text-gray-400 mt-1">Ожидаю сообщений</p>
      <div class="flex justify-between items-start">
        <div class="flex-1 min-w-0">
            {isEditing() ? (
            <input
                type="text"
                class="border rounded p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={name()}
                onInput={(e) => setName(e.target.value)}
                onBlur={handleBlur}
                autofocus
            />
            ) : (
            <h2
                class="text-lg font-semibold cursor-pointer truncate"
                onClick={() => setIsEditing(true)}
            >
                {name()}
            </h2>
            )}
        </div>
            <span class="card-status">Активен</span>
        </div>  

      <div class="flex justify-between items-center mt-4">
        <div class="text-center">
          <p class="text-sm text-gray-400">Сообщений</p>
          <p class="text-base font-semibold">289</p>
        </div>
        <div class="text-center">
          <p class="text-sm text-gray-400">Рейтинг</p>
          <p class="text-base font-semibold">270</p>
        </div>
        <div class="text-center">
          <p class="text-sm text-gray-400">Оформлено</p>
          <p class="text-base font-semibold">96%</p>
        </div>
      </div>

      <hr class="my-3" />

      <div class="flex justify-between items-center mb-2">
        <button class="btn-setup">
          Настройка чат-бота
        </button>
      </div>

      <hr class="my-3" />
      <div class="flex items-center gap-2 flex-wrap text-sm text-gray-600">
        <span class="flex items-center gap-1">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png"
            alt="Telegram"
            class="w-4 h-4"
          />
          Telegram
        </span>
        <span class="flex items-center gap-1">
          <img
            src="https://cdn-icons-png.flaticon.com/512/732/732221.png"
            alt="Bitrix24"
            class="w-4 h-4"
          />
          Bitrix24
        </span>
        <span class="flex items-center gap-1">
          <img
            src="https://cdn-icons-png.flaticon.com/512/145/145813.png"
            alt="VKontakte"
            class="w-4 h-4"
          />
          VKontakte
        </span>
      </div>
    </div>
  )
}
