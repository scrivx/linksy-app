# API Service

This is the backend service for the Linksy URL shortener.

## Setup

```sh
# from repository root
pnpm install
```

### Running in development

```sh
pnpm --filter api dev
```

### Building for production

```sh
pnpm --filter api build
pnpm --filter api start
```

## Notes

- The server listens on port 3000 by default.
- Add environment variables in an `.env` file if required.
