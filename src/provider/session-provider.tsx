'use client';

import {Session} from 'better-auth';
import {createContext} from 'react';

type Props = {
	children: React.ReactNode;
	session: Session | null;
};

export const SessionContext = createContext<Session | null>(null);

export function SessionProvider({children, session}: Props) {
	return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}
