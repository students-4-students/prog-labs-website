import { User, ensureSeqInitialized } from '../database';

export default defineEventHandler(async (event) => {
  await ensureSeqInitialized();

  const user = User.build();
  await user.save();

  const id = user.id;

  return { status: 200, body: { id } };
});
