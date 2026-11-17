import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { connectDb } from '@/src/lib/db';
import { User } from '@/src/models/user';
import { verifyPassword } from '@/src/lib/password';
import { loginSchema } from '@/src/lib/validation/auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(raw) {
        const parsed = loginSchema.safeParse(raw);
        if (!parsed.success) return null;

        await connectDb();
        const user = await User.findOne({ email: parsed.data.email });
        if (!user) return null;

        const ok = await verifyPassword(parsed.data.password, user.passwordHash);
        if (!ok) return null;

        return { id: user._id.toString(), email: user.email };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (token.id) session.user.id = token.id as string;
      return session;
    },
  },
});