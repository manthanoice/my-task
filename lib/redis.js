import { Client, Entity, Schema, Repository, EntityId } from 'redis-om'

const client = new Client()

async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL)
    }
}

class User extends Entity {}
let schema = new Schema(
    User,
    {
        username: {type: 'string'},
        score: {type: 'string'}
    },
    {
        dataStructure: 'JSON'
    }
)

var testing = {}

export async function createUser(data) {
    await connect()
    const repository = client.fetchRepository(schema)
    const user = repository.createEntity(data)
    testing.id = await repository.save(user)
    return testing.id
}

export async function updateUser(newScore) {
    await connect()
    const repository = client.fetchRepository(schema)
    let the_data = await repository.fetch(testing.id)
    the_data.score = newScore
    the_data = await repository.save(the_data)
}