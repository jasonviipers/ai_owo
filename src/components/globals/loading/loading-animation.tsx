"use client"

import { motion } from "framer-motion"

export function LoadingAnimation() {
    return (
        <div className="fixed inset-0 bg-lukso-dark flex flex-col items-center justify-center z-50">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative">
                <div className="h-24 w-24 rounded-full bg-lukso-purple/20 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-lukso-purple/40 flex items-center justify-center">
                        <div className="h-10 w-10 rounded-full bg-lukso-purple flex items-center justify-center">
                            <span className="text-white font-bold text-xl">UP</span>
                        </div>
                    </div>
                </div>

                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-lukso-purple/30 border-t-lukso-purple"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8 text-center">
                <h2 className="text-xl font-bold text-white mb-2">UP Assistant AI</h2>
                <p className="text-gray-400">Initializing your Universal Profile experience...</p>
            </motion.div>

            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "200px" }}
                transition={{ delay: 0.8, duration: 2 }}
                className="h-1 bg-lukso-purple rounded-full mt-6"
            />
        </div>
    )
}
