import { User, UserEvent, getOrInitializePostgres } from '../database';

export default defineEventHandler(async (event) => {
  const Postgres = await getOrInitializePostgres();

  const users = await Postgres.getRepository(User).find();

  for (const user of users) {
    const userEvents = await Postgres.getRepository(UserEvent).find({
      where: { userId: user.id },
    });

    user.events = userEvents;
  }

  return { status: 200, body: users };
});
