import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface IFeatureSectionLayout {
  heading: string
  link: string
  children: React.ReactNode
  className?: string
}
export function FeatureSectionLayout({ heading, link, children, className }: IFeatureSectionLayout) {
  return (
    <div className={`p-10 flex items-center justify-between flex-col gap-10 rounded-3xl border-border bg-background-10 ${className}`}>
      {children}
      <div className="w-full justify-between items-center flex flex-wrap gap-4">
        <h3 className="sm:w-[70%] font-semibold text-3xl">{heading}</h3>
        <Link href={link} className="text-primary font-semibold text-lg flex items-center justify-center rounded-md opacity-50">
          View <ArrowRightIcon className="ml-2 w-6 h-6" />
        </Link>
      </div>
    </div>
  )
}
