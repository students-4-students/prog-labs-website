import { User, UserEvent, getOrInitializePostgres } from '../database';

interface S4SUserEventHeaders extends Headers {
  'x-user-id': string;
}

export default defineEventHandler(async (event) => {
  const Postgres = await getOrInitializePostgres();

  const userId = (event.headers as S4SUserEventHeaders)['x-user-id'];
  const query = getQuery(event);

  if (!userId)
    return { status: 400, body: 'Missing user ID, please call /get-id' };
  if (isNaN(parseInt(userId))) return { status: 400, body: 'Invalid user ID' };
  if (!query.eventName?.toString())
    return { status: 400, body: 'Missing event name' };
  if (!query.language?.toString())
    return { status: 400, body: 'Missing language' };

  const user = await Postgres.getRepository(User).findOne({
    where: { id: parseInt(userId) },
  });

  if (!user) return { status: 404, body: 'User not found' };

  // create a new user
  const userEvent = new UserEvent();
  userEvent.userId = parseInt(userId);
  userEvent.eventName = query.eventName?.toString()!;
  userEvent.language = query.language?.toString()!;
  userEvent.rating = parseInt(query.rating?.toString() || '-1');
  userEvent.createdAt = new Date();

  await Postgres.getRepository(UserEvent).save(userEvent);

  return { status: 200, body: { id: userEvent.id } };
});
