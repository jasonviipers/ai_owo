import { FeatureCard } from '@/components/globals/feature/feature-card'
import { FeatureSectionLayout } from '@/components/globals/feature/feature-section-layout'
import { OnBoarding } from '@/components/globals/layout/onboarding/onboarding'
import { UserInfoCard } from '@/components/globals/user/user-info-card'
import { PotentialCustomer } from '@/lib/constants/data'
import { UploadIcon, WebcamIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function HomePage() {
  return (
    <div className='w-full mx-auto h-full'>
      <div className="w-full flex flex-col items-start justify-between sm:flex-row gap-4">
        <div className="space-y-6">
          <h1 className="text-primary font-semibold text-4xl">
            Get maximum value from your webinar
          </h1>
          <OnBoarding />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 place-content-center'>
          <FeatureCard
            Icon={UploadIcon}
            title='Browse or drag a pre-recorded webinar video'
            description='Upload a video file or paste a link to a video hosted on YouTube, Vimeo, or Wistia.'
            buttonText='Upload'
            buttonLink='#'
          />
          <FeatureCard
            Icon={WebcamIcon}
            title='Record a new webinar'
            description='Record a new webinar using your webcam and microphone.'
            buttonText='Record'
            buttonLink='/webinars'
          />
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-x1 bg-background-10">
        <FeatureSectionLayout heading="See how far along are your potential customers" link="/lead">
          <div className="p-5 flex flex-col gap-4 items-start border rounded-x1 border-border backdrop-blur-3x1">
            <div className="w-full flex justify-between items-center gap-3">
              <p className="text-primary font-semibold text-sm">Conversions</p>
              <p className="text-xs text-muted-foreground font-normal">50</p>
            </div>
            <div className="flex flex-col gap-4 items-start">
              {Array.from({ length: 3 }).map((_, index) => (
                <Image src={'/featurecard.png'} alt='info-card' width={250} height={250}
                  className='w-full h-full object-cover rounded-xl' key={index} />
              ))}
            </div>
          </div>
        </FeatureSectionLayout>
        <FeatureSectionLayout heading="See how the list of your current customers" link="/pipeline">
          <div className="flex gap-4 items-center h-full w-full justify-center relative flex-wrap">
            {PotentialCustomer.slice(0, 2).map((customer, index) => (
              <UserInfoCard key={index}
                customer={customer}
                tags={customer.tags} />
            ))}
            <Image src={'/glowCard.png'} alt='info-card' width={350} height={350}
              className='object-cover rounded-xl absolute px-5 mb-28 hidden sm:flex backdrop-blur-[20px]'
            />
          </div>
        </FeatureSectionLayout>
      </div>
    </div>
  )
}
