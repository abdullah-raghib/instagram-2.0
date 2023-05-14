import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    username?: string;
    uid: string;
  }
}

export default NextAuth;