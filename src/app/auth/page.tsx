import { Connect } from '@/components/globals/auth/connnect'
import React from 'react'

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background/10 via-black to-background/50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-lukso-purple/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl"></div>
      </div>
      <Connect/>
    </div>
  )
}
