import { type FastifyInstance } from 'fastify'

interface IQueryStringTeams {
  userId: string;
}

interface ICreateTeamBody {
  userId: string;
}

interface IJoinTeamBody {
  userId: string;
}

export async function teams(fastify: FastifyInstance) {
  fastify.get<{ Querystring: IQueryStringTeams }>('/', async (request, reply) => {
    const { userId } = request.query;
    console.log(`GET_TEAMS: Fetching teams for userId: ${userId}`);

    if (!userId) {
      console.log(`GET_TEAMS: Missing userId in request`);
      return reply
        .code(400)
        .send({ error: 'userId is required' });
    }

    return { 
      message: 'success', 
      ok: true,
      data: [], 
    };
  });

  fastify.post<{ Body: ICreateTeamBody }>('/create', async (request, reply) => {
    const { userId } = request.body;
    console.log(`POST_CREATE_TEAM: Creating team for userId: ${userId}`);

    if (!userId) {
      console.log(`POST_CREATE_TEAM: Missing userId in request`);
      return reply
        .code(400)
        .send({ error: 'userId is required' });
    }

    return { 
      message: 'success', 
      ok: true,
      data: null,
    };
  });

  fastify.post<{ Body: IJoinTeamBody }>('/join', async (request, reply) => {
    const { userId } = request.body;
    console.log(`POST_JOIN_TEAM: Joining team for userId: ${userId}`);

    if (!userId) {
      console.log(`POST_JOIN_TEAM: Missing userId in request`);
      return reply
        .code(400)
        .send({ error: 'userId is required' });
    }

    return { 
      message: 'success', 
      ok: true,
      data: null,
    };
  });
}
