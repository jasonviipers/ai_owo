import { betterAuth } from 'better-auth';
import { cookies } from 'next/headers';
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from '../db';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	account: {
		accountLinking: {
			trustedProviders: ['google', 'github'],
		},
	},
	socialProviders: {
		/*
		  * We're using Google and Github as our social provider, 
		  * make sure you have set your environment variables
		  */
		github: {
			clientId: process.env.AUTH_GITHUB_ID ?? "",
			clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
		},
		google: {
			clientId: process.env.AUTH_GOOGLE_ID ?? "",
			clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
		},
	},
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60 // 5 minutes
		},
		expiresIn: 60 * 60 * 24 * 7, // 7 days
		updateAge: 60 * 30, // Refresh every 30 minutes
		freshAge: 60 * 5, // Refresh every 5 minutes
	},
	cookies: {
		get: async () => {
			const cookieStore = await cookies();
			return cookieStore.getAll();
		},
	},
	rateLimit: {
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100, // 10 requests per day
		customRules: {
			'/api/auth/callback/github': {
				max: 5, // 5 requests per minute
				window: 60, // 1 minute
			},
		},
	},
	plugins: [nextCookies()],
});
