import { Client, Entity, Schema, Repository, EntityId } from 'redis-om'

const client = new Client();

async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
  }
}

class User extends Entity {}
const schema = new Schema(User, {
  username: { type: "string" },
  score: { type: "number" },
});

export default async function handler(req, res) {
  await connect();
  const repository = client.fetchRepository(schema).createIndex();
  const users = await repository.search().return.all()
  const scores = users.map((user) => {
    return {
      username: user.username,
      score: user.score,
    };
  });
  res.status(200).json(scores);
}
