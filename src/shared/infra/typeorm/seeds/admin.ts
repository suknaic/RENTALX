import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import createConnection from '../index';

async function Create() {
  const connection = await createConnection('localhost');
  const id = uuidv4();
  const password = await hash('admin', 8);

  await connection.query(
    `INSERT INTO USERS(id, name , email, password, driver_license, "isAdmin", created_at)
    values('${id}', 'admin', 'admin@rentalx.com.br', '${password}', 'ABCD-1234', true, 'now()')`
  );

  await connection.close();
}

Create().then(() => console.log('Seed User Admin Create'));
