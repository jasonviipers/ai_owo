'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useWebinarStore } from "@/store/use-webinar-store"
import { PlusIcon } from "lucide-react"
import { MultistepForm } from "../form/multistep-form"
import { useState } from "react"
import { BasicInfo } from "../form/basic-info"

export function WebinarButton() {
  const { setIsModalOpen, isModalOpen, isComplete, setIsComplete } = useWebinarStore();
  const [webinarLink, setWebinarLink] = useState<string>('');

  const handleComplete = (webinarId: string) => {
    setIsComplete(true);
    setWebinarLink(`${process.env.NEXT_PUBLIC_WEBINAR_URL}/live-webinar/${webinarId}`);
  }

  // mockup data steps
  const steps = [
    {
      title: 'Basic Information',
      description: 'Please fill out the standard info needed to start your webinar. ',
      component: <BasicInfo />
    },
  ];
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl flex gap-2 items-center hover:cursor-pointer px-4 py-2 border border-border
        bg-primary/10 backdrop-blur-sm text-sm font-normal text-primary hover:bg-primary-20"
          onClick={() => setIsModalOpen(true)}>
          <PlusIcon />
          <span>
            Create a webinar
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] p-0 bg-transparent border-none">
        {isComplete ? (
          <div className="bg-muted  text-primary rounded-lg overflow-hidden">
            <DialogTitle className="sr-only">Create a Webinar</DialogTitle>
          </div>
        ) : (
          <div className="flex">
            <DialogTitle className="sr-only">Create a Webinar</DialogTitle>
            <MultistepForm onComplete={handleComplete}
              steps={steps} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
