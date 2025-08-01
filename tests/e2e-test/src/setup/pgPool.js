import {Pool} from 'pg';

let pool;

export function getPgClient() {
    if (!pool) {
        pool = new Pool({
            user: 'byk',
            host: 'localhost',
            database: 'centops_db',
            password: '01234',
            port: 9053,
        });

        console.log('[pgPool.js] PG pool is set up and ready');
    }

    return pool;
}
