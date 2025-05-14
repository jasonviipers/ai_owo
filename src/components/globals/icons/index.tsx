'use client'
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface IconProps {
    title: string;
    icon: LucideIcon;
    isActive?: boolean;
    activeTitle?: string;
    disabled?: boolean;
    onClick?: () => void;
    styles?: string;
    url?: string; 
}

export const Icon = ({
    title,
    icon: IconComponent,
    isActive,
    activeTitle,
    disabled,
    onClick,
    styles,
    url 
}: IconProps) => {
    const isCurrentActive = isActive && activeTitle === title;

    // Create the icon content
    const IconContent = (
        <motion.div
            className={cn(
                'w-[50px] h-[50px] rounded-[10px]',
                isCurrentActive && 'bg-lukso-dark',
                'flex justify-center items-center',
                !disabled && 'cursor-pointer',
                !disabled && !isCurrentActive && 'hover:bg-lukso-dark/10',
                'transition-colors duration-200',
                styles
            )}
            onClick={!disabled && !url ? onClick : undefined}
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {IconComponent && (
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{
                        scale: 1,
                        rotate: isCurrentActive ? [0, 5, -5, 0] : 0
                    }}
                    transition={{
                        duration: 0.4,
                        type: "spring",
                        stiffness: 200
                    }}
                >
                    <IconComponent
                        className={cn(
                            'w-6 h-6',
                            isActive && activeTitle !== title ? 'text-lukso-purple' : 'text-gray-400',
                            'transition-colors duration-300'
                        )}
                    />
                </motion.div>
            )}
        </motion.div>
    );

    // If URL is provided, wrap with Link component
    if (url && !disabled) {
        return (
            <Link href={url} passHref>
                {IconContent}
            </Link>
        );
    }

    // Otherwise, return the icon directly
    return IconContent;
};