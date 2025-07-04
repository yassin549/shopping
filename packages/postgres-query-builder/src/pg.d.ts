import 'pg';

declare module 'pg' {
  interface PoolClient {
    INTRANSACTION?: boolean;
    COMMITTED?: boolean;
  }
}
