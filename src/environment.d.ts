declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DEV_MODE: '0' | '1' | undefined,
      BOT_TOKEN: string,
      WEBHOOK_URL: string,
      PORT: number,
      PGUSER: string,
      PGHOST: string,
      PGPASSWORD: string,
      PGDATABASE: string,
      PGPORT: number
    }
  }
}

export { }
