# Marketplace Tool

Инструмент для обработки заказов с маркетплейсов Rozetka и Epicentr

## 🚀 Технологии

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Zustand (управление состоянием)
- NextAuth.js (аутентификация)
- Shadcn (компоненты)
- Grammy (Telegram Bot API)

## 📦 Установка

1. Клонируйте репозиторий:

```bash
git clone [url-репозитория]
```

2. Установите зависимости:

```bash
npm install
```

3. Создайте файл `.env.local` на основе `.env` и заполните необходимые переменные окружения.

## 🛠️ Доступные скрипты

- `npm run dev` - запуск в режиме разработки
- `npm run build` - сборка для продакшена
- `npm run start` - запуск продакшен версии
- `npm run lint` - проверка кода линтером

## 🔧 Конфигурация

Проект использует:

- ESLint для линтинга
- Prettier для форматирования кода
- Tailwind CSS для стилизации
- TypeScript для типизации

## 📁 Структура проекта

```
├── src/              # Исходный код
├── public/           # Статические файлы
├── .next/            # Сборка Next.js
├── node_modules/     # Зависимости
├── .env              # Шаблон переменных окружения
├── .env.local        # Локальные переменные окружения
├── next.config.mjs   # Конфигурация Next.js
├── tsconfig.json     # Конфигурация TypeScript
└── package.json      # Зависимости и скрипты
```

## 🔐 Переменные окружения

Создайте файл `.env.local` со следующими переменными:

```
# Аутентификация
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Telegram Bot
TELEGRAM_BOT_TOKEN=
```
