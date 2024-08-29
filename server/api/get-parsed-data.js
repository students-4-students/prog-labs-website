import { User, UserEvent, ensureSeqInitialized } from '../database';

export default defineEventHandler(async (event) => {
  await ensureSeqInitialized();

  const users = await User.findAll();
  const updatedUsers = [];

  for (const user of users) {
    const userEvents = await UserEvent.findAll({ where: { userId: user.id } });
    updatedUsers.push({ ...user.dataValues, events: userEvents });
  }

  // range from
  const series = new Array(3).fill(null).map((_, i) => i + 1);
  const exercises = new Array(8).fill(null).map((_, i) => i + 1);
  const languages = ['cpp', 'python', 'java'];

  // chaque event_name est composé de la façon : end-3-2 avec end-serieid-episodeid

  // je veux un tableau avec, pour chaque exo,
});
