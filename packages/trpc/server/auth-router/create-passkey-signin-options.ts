import { createPasskeySigninOptions } from '@documenso/lib/server-only/auth/create-passkey-signin-options';
import { nanoid } from '@documenso/lib/universal/id';
import { env } from '@documenso/lib/utils/env';
import { TRPCError } from '@trpc/server';

import { procedure } from '../trpc';
import {
  ZCreatePasskeySigninOptionsRequestSchema,
  ZCreatePasskeySigninOptionsResponseSchema,
} from './create-passkey-signin-options.types';

export const createPasskeySigninOptionsRoute = procedure
  .input(ZCreatePasskeySigninOptionsRequestSchema)
  .output(ZCreatePasskeySigninOptionsResponseSchema)
  .mutation(async () => {
    if (env('NEXT_PUBLIC_DISABLE_PASSKEY_SIGNIN') === 'true') {
      throw new TRPCError({ code: 'FORBIDDEN' });
    }

    const sessionIdToken = nanoid(16);

    const [sessionId] = decodeURI(sessionIdToken).split('|');

    const options = await createPasskeySigninOptions({ sessionId });

    return {
      options,
      sessionId,
    };
  });
