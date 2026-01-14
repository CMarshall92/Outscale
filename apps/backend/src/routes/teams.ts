import { type FastifyInstance } from 'fastify'
import { generateOtpCode } from '../lib/numbers';
import { prisma } from '@outscale/database';
import { ErrorResponse } from '../lib/ErrorResponse';
import { SuccessResponse } from '../lib/SuccessResponse';

interface IQueryStringTeams {
  userId: string;
}

interface ICreateTeamBody {
  userId: string;
  name: string;
  description: string;
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

    const userJoinedTeams = await prisma.team.findMany({
      where: {
        users: {
          some: {
            clerkId: userId,
          },
        },
      },
    });

    return { 
      message: 'success', 
      ok: true,
      data: userJoinedTeams?.[0] || null, 
    };
  });

  fastify.post<{ Body: ICreateTeamBody }>('/create', async (request, reply) => {
    const { userId, name, description } = request.body;
    console.log(`POST_CREATE_TEAM: Creating team for userId: ${userId}`);

    if (!userId) {
      console.log(`POST_CREATE_TEAM: Missing userId in request`);
      return reply
        .code(400)
        .send(ErrorResponse({ message: 'userId is required' }));
    }

    const referenceCode = generateOtpCode(6);

    const newTeam = await prisma.team.create({
      data: {
        name,
        description,
        referenceCode,
        users: {
          connect: {
            clerkId: userId,
          },
        },
      },
    });

    return SuccessResponse({ 
      message: 'success',
      data: newTeam
    });
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
