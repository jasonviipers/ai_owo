import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';
import { createInsertSchema } from 'drizzle-zod';
import { pgTable, text, timestamp, boolean, jsonb, pgEnum, json, decimal, uniqueIndex, integer, date, uuid } from "drizzle-orm/pg-core"
import { relations } from 'drizzle-orm';

// Enums
export const attendedTypeEnum = pgEnum('AttendedTypeEnum', [
	'REGISTERED',
	'ATTENDED',
	'ADDED_TO_CART',
	'FOLLOW_UP',
	'BREAKOUT_ROOM',
	'CONVERTED',
]);

export const ctaTypeEnum = pgEnum('CtaTypeEnum', [
	'BUY_NOW',
	'BOOK_A_CALL',
]);

export const webinarStatusEnum = pgEnum('WebinarStatusEnum', [
	'SCHEDULED',
	'WAITING_ROOM',
	'LIVE',
	'ENDED',
	'CANCELLED',
]);

export const callStatusEnum = pgEnum('CallStatusEnum', [
	'PENDING',
	'IN_PROGRESS',
	'COMPLETED',
]);
export const user = pgTable("user", {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	role: text('role'),
	banned: boolean('banned'),
	banReason: text('ban_reason'),
	banExpires: timestamp('ban_expires'),
	stripeConnectId: text('stripe_connect_id'),
	subscription: boolean('subscription').notNull().default(false),
	stripeCustomerId: text('stripe_customer_id'),
});
export type User = typeof user.$inferSelect;
export const session = pgTable("session", {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	impersonatedBy: text('impersonated_by')
});

export const account = pgTable("account", {
	id: text('id').primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at'),
	updatedAt: timestamp('updated_at')
});

export const attendees = pgTable('attendees', {
	id: text('id').$defaultFn(createId).primaryKey(),
	email: text('email').unique().notNull(),
	name: text('name').notNull(),
	callStatus: callStatusEnum('call_status').notNull().default('PENDING'),
	// webinarId: text('webinar_id').notNull().references(() => webinar.id, { onDelete: 'cascade' }),
	// userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
});

export const insertAttendees = createInsertSchema(attendees)
	.omit({ id: true, createdAt: true, updatedAt: true })
	.extend({
		email: z.string().email(),
		name: z.string(),
		callStatus: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
	});
export type InsertAttendees = z.infer<typeof insertAttendees>;
export type Attendees = typeof attendees.$inferSelect;

export const webinars = pgTable('webinars', {
	id: text('id').$defaultFn(createId).primaryKey(),
	title: text('title').notNull(),
	description: text('description'),
	startTime: timestamp('startTime').notNull(),
	endTime: timestamp('endTime'),
	duration: integer('duration').default(0).notNull(),
	webinarStatus: webinarStatusEnum('webinarStatus').default('SCHEDULED').notNull(),
	presenterId: uuid('presenterId').notNull(),
	tags: text('tags').array(),
	ctaLabel: text('ctaLabel'),
	ctaType: ctaTypeEnum('ctaType').notNull(),
	ctaUrl: text('ctaUrl'),
	couponCode: text('couponCode'),
	couponEnabled: boolean('couponEnabled').default(false).notNull(),
	couponExpiry: timestamp('couponExpiry'),
	lockChat: boolean('lockChat').default(false).notNull(),
	stripeProductId: text('stripeProductId'),
	aiAgentId: uuid('aiAgentId'),
	priceId: text('priceId'),
	recordingUrl: text('recordingUrl'),
	thumbnail: text('thumbnail'),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	updatedAt: timestamp('updatedAt').defaultNow().notNull(),
	deletedAt: timestamp('deletedAt'),
	attendeeId: uuid('attendeeId'),
	userId: text('userId').references(() => user.id, { onDelete: 'cascade' }),
});
export const insertWebinars = createInsertSchema(webinars)
	.omit({ id: true, createdAt: true, updatedAt: true })
	.extend({
		title: z.string(),
		description: z.string().optional(),
		startTime: z.date().min(new Date()),
		endTime: z.date().optional(),
		duration: z.number().min(0),
		webinarStatus: z.enum(['SCHEDULED', 'WAITING_ROOM', 'LIVE', 'ENDED', 'CANCELLED']),
		presenterId: z.string().min(1),
		tags: z.string().array().optional(),
		ctaLabel: z.string().optional(),
		ctaType: z.enum(['BUY_NOW', 'BOOK_A_CALL']),
		ctaUrl: z.string().optional(),
		couponCode: z.string().optional(),
		couponEnabled: z.boolean().default(false),
		couponExpiry: z.date().optional(),
		lockChat: z.boolean().default(false),
		stripeProductId: z.string().optional(),
		aiAgentId: z.string().optional(),
		priceId: z.string().optional(),
		recordingUrl: z.string().optional(),
		thumbnail: z.string().optional(),
		userId: z.string().min(1),
		attendeeId: z.string().optional(),
	});
export type InsertWebinars = z.infer<typeof insertWebinars>;
export type Webinars = typeof webinars.$inferSelect;
export const attendances = pgTable('attendances', {
	id: text('id').$defaultFn(createId).primaryKey(),
	webinarId: text('webinarId').references(() => webinars.id, { onDelete: 'cascade' }),
	attendeeId: text('attendeeId').references(() => attendees.id, { onDelete: 'cascade' }),
	attendedType: attendedTypeEnum('attendedType').notNull(),
	joinedAt: timestamp('joinedAt').defaultNow().notNull(),
	leftAt: timestamp('leftAt'),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	updatedAt: timestamp('updatedAt').defaultNow().notNull(),
	deletedAt: timestamp('deletedAt'),
})
export const insertAttendances = createInsertSchema(attendances)
	.omit({ id: true, createdAt: true, updatedAt: true })
	.extend({
		webinarId: z.string().min(1),
		attendeeId: z.string().min(1),
		attendedType: z.enum(['REGISTERED', 'ATTENDED', 'ADDED_TO_CART', 'FOLLOW_UP', 'BREAKOUT_ROOM', 'CONVERTED']),
		joinedAt: z.date().default(new Date()),
		leftAt: z.date().optional(),
		// userId: z.string().min(1),
	});
export type InsertAttendances = z.infer<typeof insertAttendances>;
export type Attendances = typeof attendances.$inferSelect;
// Relations
export const usersRelations = relations(user, ({ many }) => ({

}));
