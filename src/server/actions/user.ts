'use server';

import { headers } from 'next/headers';
import { auth } from '../auth';

export async function getCurrentUser() {
    const headersList = await headers();
    const session = await auth.api.getSession({
        headers: headersList,
    });

    return session?.user;
}