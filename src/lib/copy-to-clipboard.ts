import { toast } from "react-toastify";

export const copyToClipboard = async (text: string) => {
  if (!text) {
    toast.error("Нет текста для копирования");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    toast.success("Шаблон скопирован в буфер обмена");
  } catch (error) {
    console.error(error);
    toast.error("Ошибка копирования");
  }
};
