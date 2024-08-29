import { User, UserEvent, ensureSeqInitialized } from '../database';

export default defineEventHandler(async (event) => {
  await ensureSeqInitialized();

  const users = await User.findAll();
  const updatedUsers = [];

  for (const user of users) {
    const userEvents = await UserEvent.findAll({ where: { userId: user.id } });
    updatedUsers.push({ ...user.dataValues, events: userEvents });
  }

  return { status: 200, body: updatedUsers };
});
