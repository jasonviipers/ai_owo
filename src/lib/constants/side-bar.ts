import { HomeIcon, LucideIcon, SettingsIcon, SparkleIcon, UsersIcon, WebcamIcon } from "lucide-react";

interface ISidebarLink {
    title: string;
    icon: LucideIcon;
    url: string;
}

export const SIDEBAR_LINKS: ISidebarLink[] = [
    {
        title: 'Dashboard',
        icon: HomeIcon,
        url: '/home',
    },
    {
        title: 'Webbinars',
        icon: WebcamIcon,
        url: '/webbinars',
    },
    {
        title: 'Leads',
        icon: UsersIcon,
        url: '/leads',
    },
    {
        title: 'Ai Agents',
        icon: SparkleIcon,
        url: '/ai-agents',
    },
    {
        title: 'Settings',
        icon: SettingsIcon,
        url: '/settings',
    },
];

export const onboardingSteps = [
    { title: 'Create a webinar', link: '', complete: false, },
    { title: 'Get leads', link: '', complete: false, },
    { title: 'Conversion status', link: '', complete: false, },
];