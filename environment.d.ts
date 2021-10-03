declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOSTNAME: string;
      PORT: string;
      HOST: string;
      GQL_PATH: string;
      NEXT_PUBLIC_GQL_ENDPOINT: string;
      RESULT_LIMIT: string;
    }
  }
}

// converting into a module by adding an empty export statement
export {};
