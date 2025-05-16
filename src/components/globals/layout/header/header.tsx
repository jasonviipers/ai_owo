'use client'
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'
import { ArrowLeftIcon, Zap } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation'
import { PurpleIcon } from '../../icons/purple-icon';
import { WebinarButton } from '../../button/webinar-button';

interface IHeaderProps {
    user: {
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        image?: string | null | undefined | undefined;
    } | undefined
}
export function Header() {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <div className='w-full px-4 pt-10 sticky top-0 z-10 flex justify-between items-center
             flex-wrap gap-4 bg-background'>
            {pathname.includes('pipeline') ? (
                <Button className='bg-primary/10 border border-border rounded-xl'
                    variant={'outline'} onClick={() => router.push('/webinar')}>
                    <ArrowLeftIcon className='w-4 h-4 mr-2' />
                    Back to Webinar
                </Button>
            ) : (
                <div className="px-4 py-2 flex justify-center items-center rounded-xl bg-background border border-border text-primary capitalize">
                    {pathname.split("/")[1]}
                </div>
            )}
            <div className='flex items-center gap-6 flex-wrap'>
                <PurpleIcon>
                   <Zap className='w-5 h-5 text-primary' />
                </PurpleIcon>
                <WebinarButton/>
            </div>
        </div>
    )
}
