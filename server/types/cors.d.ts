// Minimal ambient module declaration for `cors` to satisfy TypeScript
// If you later install `@types/cors`, you can remove this file.
declare module 'cors' {
  import { RequestHandler } from 'express';
  function cors(options?: any): RequestHandler;
  namespace cors {}
  export = cors;
}
