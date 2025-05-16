'use client'
import { Tooltip, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { SIDEBAR_LINKS } from '@/lib/constants/side-bar'
import { cn } from '@/lib/utils'
import { User2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <div className='w-18 sm:w-28 h-screen sticky top-0 py-10 px-2 sm:px-6 border bg-background border-border flex flex-col items-center justify-start gap-10'>
      <div>Logo</div>
      <div className="w-full h-full justify-between items-center flex flex-col">
        <div className='w-full h-fit flex flex-col items-center justify-start gap-10'>
          {SIDEBAR_LINKS.map((link) => (
            <TooltipProvider key={link.title}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={link.url}
                    className={cn(
                      "flex items-center gap-2 cursor-pointer rounded-lg p-2",
                      pathname.includes(link.url) ? "iconBackground" : ""
                    )}
                  >
                    <link.icon className={cn("w-5 h-5",
                      pathname.includes(link.url) ? "" : "opacity-80"
                    )} />
                  </Link>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        {/* TODO:User button */}
        <User2 className={cn('w-5 h-5 opacity-80 cursor-pointer hover:opacity-100 transition-all duration-200 ease-in-out', 'text-muted-foreground')} />
      </div>
    </div>
  )
}
