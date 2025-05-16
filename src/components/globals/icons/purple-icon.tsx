import { cn } from '@/lib/utils'
import React from 'react'

interface IPurpleIconProps {
    className?: string
    children: React.ReactNode
}
export function PurpleIcon({ children, className }: IPurpleIconProps) {
    return (
        <div className={cn('px-4 py-2 iconBackground', className)}>
            {children}
        </div>
    )
}
