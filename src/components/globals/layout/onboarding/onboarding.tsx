'use client'
import { onboardingSteps } from '@/lib/constants/side-bar';
import { CheckCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function OnBoarding() {
    return (
        <div className="flex flex-col gap-1 items-start justify-start">
            {onboardingSteps.map((step, index) => (
                <Link
                    key={index}
                    href={step.link}
                    className="flex items-center gap-2"
                >
                    <CheckCircleIcon />
                    <p className="text-base text-foreground">{step.title}</p>
                </Link>
            ))}
        </div>
    )
}
