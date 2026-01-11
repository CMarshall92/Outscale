import { type FastifyInstance } from 'fastify'
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
      
      // IMPORTANT: tokens.refresh_token is only sent the VERY FIRST time.
      if (tokens.refresh_token) {
        // SAVE tokens.refresh_token to your database linked to the userId
        // await db.user.update({ where: { id: userId }, data: { googleRefreshToken: tokens.refresh_token } });
        console.log('Saved refresh token for user:', userId);
      }

      return { success: true };
    } catch (err) {
      console.error('Token exchange failed', err);
      return reply.code(500).send({ error: 'Failed to exchange token' });
    }
  });
}
