import { type FastifyInstance } from 'fastify'
import { prisma } from '@outscale/database';
import { google } from 'googleapis';

interface IConnectGoogle {
  userId: string;
  refreshToken: string;
}

export async function connections(fastify: FastifyInstance) {
  fastify.post<{ Body: IConnectGoogle }>('/google/connect', async (request, reply) => {
    const { refreshToken, userId } = request.body;

    try {
      if (refreshToken) {
        await prisma.user.update({
          where: { clerkId: userId },
          data: {
            connections: {
              create: {
                provider: 'oauth_google',
                refreshToken: refreshToken,
              },
            },
          },
        });

        console.log('Saved refresh token for user:', userId);
        return { success: true };
      }

      return reply.code(400).send({ error: 'No refresh token provided' });
    } catch (err) {
      console.error('Token exchange failed', err);
      return reply.code(500).send({ error: 'Failed to exchange token' });
    }
  });
}
