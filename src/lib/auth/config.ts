import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import { adminEmailSet, env } from "@/env";
import { supabase } from "@/lib/auth/supabase";

type SupabaseUser = {
  id?: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
  };
};

export const authConfig = {
  providers: [
    Credentials({
      name: "Supabase",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "").toLowerCase().trim();
        const password = String(credentials?.password ?? "");

        if (!email || !password) {
          return null;
        }

        if (adminEmailSet.size > 0 && !adminEmailSet.has(email)) {
          return null;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error || !data.user) {
          return null;
        }

        const user = data.user as SupabaseUser;

        return {
          id: user.id ?? email,
          email,
          name: user.user_metadata?.full_name ?? email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/dashboard/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.email) {
        session.user.email = String(token.email);
      }
      return session;
    },
  },
  trustHost: true,
  secret: env.AUTH_SECRET,
} satisfies NextAuthConfig;
