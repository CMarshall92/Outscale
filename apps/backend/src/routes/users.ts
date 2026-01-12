import { type FastifyInstance } from 'fastify'
import { prisma } from '@outscale/database';

interface ICreateUsers {
  userId: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
}

const USER_CREATE_ENDPOINT = '/users/create:';

export async function users(fastify: FastifyInstance) {
  fastify.post<{ Body: ICreateUsers }>('/create', async (request, reply) => {
    const { userId, firstName, lastName, emailAddress } = request.body;

    if (!userId) {
      console.log(`${USER_CREATE_ENDPOINT} No clerk userId provided: ${userId}`);
      return reply.code(201).send({ ok: false, message: 'No clerk userId provided' });
    }

    if (!firstName) {
      console.log(`${USER_CREATE_ENDPOINT} No first name provided: ${firstName}`);
      return reply.code(201).send({ ok: false, message: 'No first name provided' });
    }

    if (!lastName) {
      console.log(`${USER_CREATE_ENDPOINT} No last name provided: ${lastName}`);
      return reply.code(201).send({ ok: false, message: 'No last name provided' });
    }

    if (!emailAddress) {
      console.log(`${USER_CREATE_ENDPOINT} No email address provided: ${emailAddress}`);
      return reply.code(201).send({ ok: false, message: 'No email address provided' });
    }

    try {
      const user = {
        clerkId: userId,
        firstName: firstName,
        lastName: lastName,
        email: emailAddress
      }

      await prisma.user.create({ data: user });

      console.log(`${USER_CREATE_ENDPOINT} Created user: ${userId}`);
      return reply.code(201).send({ ok: true, message: 'User created successfully', data: user });
    } catch (err) {
      console.log(JSON.stringify({
        message: `${USER_CREATE_ENDPOINT} Failed to create user: ${userId}`,
        error: err
      }));

      return reply.code(500).send({ ok: false, message: err });
    }
  });
}
