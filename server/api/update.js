import { User, UserEvent, ensureSeqInitialized } from '../database';

export default defineEventHandler(async (event) => {
  await ensureSeqInitialized();

  const query = getQuery(event);

  if (!query.userId?.toString())
    return { status: 400, body: 'Missing user ID, please call /get-id' };
  if (isNaN(parseInt(query.userId.toString())))
    return { status: 400, body: 'Invalid user ID' };
  if (!query.eventName?.toString())
    return { status: 400, body: 'Missing event name' };
  if (!query.language?.toString())
    return { status: 400, body: 'Missing language' };

  const userId = query.userId.toString();

  const user = await User.findOne({ where: { id: parseInt(userId) } });

  if (!user) return { status: 404, body: 'User not found' };

  // create a new user
  const userEvent = UserEvent.build({
    userId: user.id,
    eventName: query.eventName?.toString(),
    language: query.language?.toString(),
    rating: parseInt(query.rating?.toString() || '-1'),
    createdAt: new Date(),
    reviewContent: query.reviewContent?.toString() || null,
  });

  userEvent.save();

  return { status: 200, body: { id: userEvent.id } };
});
