import pg from 'pg';

const db = new pg.Client({
  application_name: 'domainatorbot'
});

await db.connect();

export default db
