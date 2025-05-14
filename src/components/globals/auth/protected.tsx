"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { LoadingAnimation } from "@/components/globals/loading/loading-animation"
import { useSession } from "@/lib/auth-client"

export function Protected({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const { isPending, data } = useSession()

    useEffect(() => {
        if (!isPending && !data?.session) {
            router.push("/auth")
        }
    }, [isPending, data, router]);

    if (isPending) return (
        <LoadingAnimation />
    )

    return data?.session ? <>{children}</> : null
}
