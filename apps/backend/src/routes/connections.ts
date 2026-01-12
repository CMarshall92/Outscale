import { type FastifyInstance } from 'fastify'
import { prisma } from '@outscale/database';
import { google } from 'googleapis';

interface IConnectGoogle {
  userId: string;
  serverAuthCode: string;
}

export async function connections(fastify: FastifyInstance) {
  fastify.post<{ Body: IConnectGoogle }>('/google/connect', async (request, reply) => {
    const { serverAuthCode, userId } = request.body;

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'postmessage' // Special redirect URI for server-side exchange
    );

    try {
      const { tokens } = await oauth2Client.getToken(serverAuthCode);
      
      if (tokens.refresh_token) {
        await prisma.user.upsert({
          where: { clerkId: userId },
          update: {
            connections: {
              create: {
                provider: 'oauth_google',
                refreshToken: tokens.refresh_token,
              },
            },
          },
          create: {
            clerkId: userId,
            connections: {
              create: {
                provider: 'oauth_google',
                refreshToken: tokens.refresh_token,
              },
            },
          },
        });

        console.log('Saved refresh token for user:', userId);
      }

      return { success: true };
    } catch (err) {
      console.error('Token exchange failed', err);
      return reply.code(500).send({ error: 'Failed to exchange token' });
    }
  });
}
