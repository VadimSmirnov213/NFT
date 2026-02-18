# NFT билеты для событий (VK Mini App + Web2 API + Web3 ERC-721)

Этот репозиторий — прототип системы **NFT‑билетов на мероприятия**:

- **Организатор** создаёт событие и деплоит ERC‑721 контракт с whitelist адресов гостей.
- **Гости** “забирают” (claim) свой NFT‑билет через MetaMask.
- **Backend** хранит карточки событий/минтов и сохраняет metadata JSON в статическую папку.

## Структура репозитория

- `Front/` — **VK Mini App** (React + VKUI + VK Bridge) + `ethers` для Web3 и `axios` для API.
- `web2-api/` — **Web2 API** на AdonisJS (TypeScript): события, NFT‑минты, storage metadata.
- `web3/` — Hardhat‑проект: контракт ERC‑721 (OpenZeppelin), конфиг, артефакты, тест‑каркас.

## Архитектура и общий флоу

### 1) Создание события (организатор)

1. Во фронте (панель `Creator`) организатор вводит:
   - название/описание/дату события
   - whitelist Ethereum‑адресов гостей
   - флаг “Опубликовать событие”
2. Фронт деплоит смарт‑контракт `WhitelistNFT` (ERC‑721) через `ethers.ContractFactory` (ABI/bytecode берутся из `Front/src/data/WhitelistNFT.json`).
3. После деплоя фронт создаёт запись события в Web2 API (`POST /v1/events/create`) и сохраняет `contract_id` (адрес контракта).

### 2) Получение билета (гость)

1. На главном экране (`Home`) фронт загружает список событий (`POST /v1/events/getAll`).
2. Гость нажимает “Забрать” (компонент `ClaimCard`):
   - вызывается `claimNFT()` у контракта
   - при успешной транзакции фронт отправляет запись о минте в Web2 API (`POST /v1/nfts/create`)
3. Backend сохраняет запись в таблицу `nfts` и (планируется) кладёт metadata в `web2-api/public/metadata/<event_id>/<token_id>.json`.

### 3) Проверка билета

Экран `Customer` показывает “мои билеты” по данным из Web2 API (`POST /v1/user/getAllNfts`).
Текущий прототип “Проверить” в карточке ведёт на etherscan контракта (без on-chain валидации в приложении).

## Компоненты по папкам

### `web3/` (смарт‑контракт + Hardhat)

- Контракт: `web3/contracts/VKEvent.sol` (по факту **`WhitelistNFT`**)
  - whitelist адресов
  - `published` флаг (claim доступен только после публикации)
  - `claimNFT()` — минтит один токен
  - tokenURI строится из `baseURI + "/<eventId>/<tokenId>.json"`
- Конфиг Hardhat: `web3/hardhat.config.js`
- Тесты: `web3/test/VKEvent.test.js` (каркас)

> Примечание: `web3/scripts/deploy.js` выглядит неактуальным/черновым: там упоминается `Token` и используется `deployer` без объявления. В текущем флоу деплой делается с фронта.

### `web2-api/` (AdonisJS API)

#### Роуты
Все роуты под префиксом `/v1` (см. `web2-api/start/routes.ts`):

- `POST /v1/events/create` — создать событие
- `POST /v1/events/get/:eventId` — получить событие по id
- `POST /v1/events/getAll` — список событий (пагинация)
- `POST /v1/nfts/create` — записать факт минта (и metadata)
- `POST /v1/nfts/get/:nftId` — получить запись NFT по id
- `POST /v1/user/getAllEvents` — события организатора по `owner_adress`
- `POST /v1/user/getAllNfts` — NFT пользователя по `owner_adress` (кошелёк)

#### Данные (БД)
Миграции в `web2-api/database/migrations/`:

- `events`: данные события + `contract_id` (адрес контракта)
- `nfts`: `owner_wallet`, `token_id`, `event_id`, `metadata` (JSON)
- `metadata`: отдельная таблица под метадату (в прототипе не подключена роутами)

#### Static
В `web2-api/config/static.ts` включена раздача `web2-api/public/` как статики.
Пример файла есть в `web2-api/public/metadata/1/1.json`.

#### Окружение / БД
`web2-api/config/database.ts` поддерживает `sqlite` и `mysql`.
Правила env в `web2-api/env.ts` (ключевые):

- `DB_CONNECTION` — `sqlite` или `mysql`
- `HOST`, `PORT`
- `APP_KEY`
- `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DB_NAME`
- `DOMAIN_APP`

> Важно: `web2-api/config/cors.ts` сейчас `enabled: false` (если фронт и API будут на разных доменах, потребуется включить CORS).

### `Front/` (VK Mini App)

Ключевые файлы:

- `Front/src/App.js` — роутинг по панелям: `Home`, `Creator`, `Customer`, `CreatorSecond`.
- `Front/src/components/WalletConnect/WalletConnect.js` — подключение MetaMask.
- `Front/src/panels/Creator.js` — деплой контракта + создание события в API.
- `Front/src/components/ClaimCard/ClaimCard.js` — `claimNFT()` + запись минта в API.
- `Front/vk-hosting-config.json` — конфиг деплоя в VK Mini Apps.

Запуск фронта:

```bash
cd Front
npm i
npm start
```

Фронт поднимается на `https://localhost:10888`

## Быстрый старт (dev)

Ниже — ориентир для локального запуска. В проекте есть зашитые URL на ngrok — их нужно заменить на свой домен/API (см. “Известные проблемы”).

### 1) Web2 API

```bash
cd web2-api
npm i
# дальше нужен .env под AdonisJS (APP_KEY, DB_CONNECTION и т.д.)
npm run dev
```

### 2) Web3 (Hardhat)

```bash
cd web3
yarn
# тесты/компиляция при необходимости
# yarn hardhat test
```

### 3) Front (VK Mini App)

```bash
cd Front
npm i
npm start
```
