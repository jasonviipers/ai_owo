'use client'

import { useWebinarStore } from "@/store/use-webinar-store"
import { useState } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircleIcon, CheckIcon, ChevronRightIcon, LoaderCircleIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { createWebinar } from "@/server/actions/webinar"
import { toast } from "sonner"
import { error } from "console"
import { useRouter } from "next/navigation"

interface IMultistepForm {
  title: string
  description: string
  component: React.ReactNode
}

type IFormStepPops = {
  steps: IMultistepForm[]
  onComplete: (id: string) => void
}
export function MultistepForm({ steps, onComplete }: IFormStepPops) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { formState, validateStep, isSubmitting, setIsSubmitting, setIsModalOpen } = useWebinarStore();

  const router = useRouter();
  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNext = async () => {
    setValidationError(null)
    const isValid = validateStep(currentStep.title as keyof typeof formState);
    setCurrentStepIndex(currentStepIndex + 1);
    if (!isValid) {
      setValidationError('Please fill in all reqiuired fields')
      return
    }

    if (!completedSteps.includes(currentStep.title)) {
      setCompletedSteps([...completedSteps, currentStep.title])
    }

    if (isLastStep) {
      try {
        setIsSubmitting(true)
        const res = await createWebinar(formState)
        if (res.status === 200 && res.webinarId) {
          toast.success('Your webinar has been created successfull');
          onComplete(res.webinarId);
        } else {
          toast.error(res.msg || 'Your webinar has not been created')
          setValidationError(res.msg)
        }
        router.refresh()
      } catch (error) {
        console.error('Error creating webinar:', error)
        toast.error('Failed to create webinar. Please try again')
        setValidationError('Failed to create webinar. Please try again')
      } finally {
        setIsSubmitting(false)
      }
    }
    setCurrentStepIndex(currentStepIndex + 1);
  };

  const handlePrevious = () => {
    if (isFirstStep) {
      setIsModalOpen(false)
    }
    setCurrentStepIndex(currentStepIndex - 1);
    setValidationError(null)
  }

  return (
    <div className="flex flex-col justify-center items-center bg-[#27272A]/20 border border-border rounded-3xl overflow-hidden
    max-w-6xl mx-auto backdrop-blur-[106px]">
      <div className="flex items-center justify-start">
        <div className="w-full md:w-1/3 p-6">
          <div className="space-y-6">
            {steps.map((step, idx) => {
              const isCompleted = completedSteps.includes(step.title);
              const isCurrent = idx === currentStepIndex;
              const isPast = idx < currentStepIndex;
              return (
                <div key={step.title} className="relative">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <motion.div initial={false} animate={{
                        backgroundColor: isCurrent ? 'rgb(147,51,234)' : 'rgb(31,41,55)',
                        transition: { duration: 0.3 },
                        scale: [isCurrent && !isCompleted ? 0.8 : 1, 1],
                      }}
                        className="flex items-center justify-center w-8 h-8 rounded-full z-10">
                        <AnimatePresence mode="wait">
                          {isCompleted ? (
                            <motion.div key="check"
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              transition={{ duration: 0.2 }}>
                              <CheckIcon className="w-5 h-5" />
                            </motion.div>
                          ) : (
                            <motion.div initial={{ opacity: 0, scale: 0.5 }} key='number'
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              transition={{ duration: 0.2 }}>
                              <CheckIcon className="w-5 h-5" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      {idx < steps.length - 1 && (
                        <div className="absolute top-8 left-4 w-0.5 h-16 bg-gray-700 overflow-hidden">
                          <motion.div
                            initial={{
                              height: isPast || isCompleted ? '100%' : '0%',
                              backgroundColor: 'rgb(147,51,234)',
                              transition: { duration: 0.5, ease: 'easeInOut' },
                            }}
                            className="w-full h-full"
                          />
                        </div>
                      )}
                    </div>
                    <div className="pt-1">
                      <motion.h3 animate={{
                        color: isCurrent || isCompleted ? 'rgb(255,255,255)' : 'rgb(156,163,175)',
                        transition: { duration: 0.3 },
                      }} className="font-medium">
                        {step.title}
                      </motion.h3>
                      <div className="text-sm text-gray-500">
                        {step.description}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <Separator className="data-[orientation=vertical]:h-1/2" orientation="vertical" />
        <div className="w-full md:w-2/3">
          <AnimatePresence mode="wait">
            <motion.div key={currentStep.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ x: -20, opacity: 0.3 }}
              transition={{ duration: 0.3 }} className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold">
                  {currentStep.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {currentStep.description}
                </p>
              </div>
              <div className="space-y-6">
                {currentStep.component}
              </div>
              {validationError && (
                <div className="mt-4 p-3 bg-red-900/30 border border-red-800 rounded-md flex items-start gap-2">
                  <AlertCircleIcon className="h-5 w-5 m-5 text-red-300 flex-shrink-0" />
                  <p>{validationError}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div >
      <div className="w-full p-6 flex justify-between">
        <Button variant='outline' onClick={handlePrevious} disabled={isSubmitting}
          className={cn('border-gray-700 text-white hover:bg-gray-800', isFirstStep && 'opacity-50 cursor-not-allowed')}
        >{isFirstStep ? 'Cancel' : 'Back'}</Button>
        <Button disabled={isSubmitting} onClick={handleNext}>
          {isLastStep ? isSubmitting ? (
            <div>
              <LoaderCircleIcon className="animate-spin" />
              Creating...
            </div>
          ) : ("Complete") : ("Next")}
          {!isLastStep && <ChevronRightIcon className="ml-1 h-4 w-4" />}
        </Button>
      </div>
    </div >
  )
}
