import { User, getOrInitializePostgres } from '../database';

export default defineEventHandler(async (event) => {
  const Postgres = await getOrInitializePostgres();

  const user = new User();
  await Postgres.getRepository(User).save(user);

  const id = user.id;

  return { status: 200, body: { id } };
});
