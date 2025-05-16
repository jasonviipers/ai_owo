"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState, useTransition } from "react"
import { signIn } from "@/lib/auth-client"
import { toast } from "sonner"
import { IconsProviders } from "@/components/globals/icons/Icons"

export const providers = [
  {
    name: 'Google',
    icon: <IconsProviders.google />,
    provider: 'google',
  },
  {
    name: 'GitHub',
    icon: <IconsProviders.github />,
    provider: 'github',
  },
] as const;

type ProviderType = (typeof providers)[number]['provider'];

export function Connect() {
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()
  const [activeProvider, setActiveProvider] = useState<string | null>(null)

  const isValidProvider = (provider: string): provider is ProviderType =>
    ['google', 'github'].includes(provider);

  const handleConnect = async (provider: (typeof providers)[number]) => {
    if (isValidProvider(provider.provider)) {
      setActiveProvider(provider.provider);

      try {
        startTransition(async () => {
          try {
            await signIn.social({
              provider: provider.provider,
              callbackURL: '/home',
            });
           
          } catch (error) {
            console.error('Sign in error:', error);
            toast.error('Failed to sign in. Please try again later.')
            setError('Authentication failed. Please try again.');
            // Reset the active provider on error
            setActiveProvider(null);
          }
        });
      } catch (error) {
        console.error('Transition error:', error);
        toast.error('Something went wrong. Please try again.')
        setActiveProvider(null);
      }
    } else {
      toast.error('Invalid provider. Please select a valid provider.')
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 shadow-2xl w-full max-w-md overflow-hidden relative z-10">
      <div className="p-8">
        <div className="flex items-center justify-center mb-8">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-lukso-purple to-indigo-600 flex items-center justify-center shadow-lg shadow-lukso-purple/30">
            <span className="text-white font-bold text-xl">OWO</span>
          </div>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome to OwO Assistant</h1>
          <p className="text-gray-300">Connect to continue</p>
        </div>
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-md">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}
        <div className="space-y-4">
          {providers.map((provider) => (
            <Button
              key={provider.name}
              onClick={() => handleConnect(provider)}
              disabled={isPending && activeProvider === provider.provider}
              className={`w-full ${isPending && activeProvider === provider.provider
                  ? "bg-gradient-to-r from-lukso-purple/70 to-indigo-600/70"
                  : "bg-gradient-to-r from-lukso-purple to-indigo-600 hover:from-lukso-purple hover:to-indigo-500"
                } text-white h-12 shadow-lg shadow-lukso-purple/20 backdrop-blur-sm transition-all duration-300 ease-in-out`}
              aria-label={`Connect with ${provider.name}`}
            >
              <span className="flex items-center gap-2">
                {provider.icon}
                <span>{isPending && activeProvider === provider.provider ? 'Connecting...' : `Connect with ${provider.name}`}</span>
              </span>
            </Button>
          ))}
        </div>
        <div className="mt-8 p-4 backdrop-blur-md bg-lukso-bg rounded-lg border border-lukso-purple/20 shadow-inner">
          <h4 className="text-sm font-medium text-white mb-2">What is a AI OwO ?</h4>
          <p className="text-sm text-gray-300">
            OwO is real estate AI analyst specializing in identifying buyer intent.
          </p>
        </div>
      </div>
    </motion.div>
  )
}