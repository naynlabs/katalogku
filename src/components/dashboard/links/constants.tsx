import { Icon } from '@iconify/react';
import { ReactNode } from 'react';

/** Icon library untuk e-commerce dan umum */
export const ECOM_ICONS = [
  "lucide:shopping-bag", "lucide:shopping-cart", "lucide:store", "lucide:tag", "lucide:tags", "lucide:percent", "lucide:gift", "lucide:credit-card", "lucide:truck", "lucide:package", "lucide:receipt", "lucide:ticket", "lucide:wallet", "lucide:coins", "lucide:banknote",
  "lucide:home", "lucide:search", "lucide:user", "lucide:users", "lucide:settings", "lucide:cog", "lucide:menu", "lucide:list", "lucide:grid", "lucide:bell", "lucide:calendar", "lucide:clock", "lucide:watch", "lucide:camera", "lucide:video", "lucide:image", "lucide:music", "lucide:mic", "lucide:map", "lucide:map-pin", "lucide:navigation", "lucide:compass", "lucide:globe",
  "lucide:star", "lucide:heart", "lucide:thumbs-up", "lucide:thumbs-down", "lucide:message-circle", "lucide:message-square", "lucide:mail", "lucide:phone", "lucide:phone-call", "lucide:share", "lucide:share-2", "lucide:link", "lucide:external-link", "lucide:bookmark", "lucide:flag",
  "lucide:edit", "lucide:edit-2", "lucide:edit-3", "lucide:pen-tool", "lucide:plus", "lucide:plus-circle", "lucide:minus", "lucide:minus-circle", "lucide:check", "lucide:check-circle", "lucide:x", "lucide:x-circle", "lucide:trash", "lucide:trash-2", "lucide:download", "lucide:upload", "lucide:arrow-right", "lucide:arrow-left", "lucide:arrow-up", "lucide:arrow-down", "lucide:chevron-right", "lucide:chevron-left", "lucide:chevron-up", "lucide:chevron-down", "lucide:refresh-cw", "lucide:refresh-ccw", "lucide:power",
  "lucide:coffee", "lucide:utensils", "lucide:briefcase", "lucide:award", "lucide:medal", "lucide:shield", "lucide:shield-check", "lucide:key", "lucide:lock", "lucide:unlock", "lucide:crown", "lucide:zap", "lucide:flame", "lucide:sun", "lucide:moon", "lucide:cloud", "lucide:umbrella", "lucide:smile", "lucide:frown", "lucide:meh", "lucide:laptop", "lucide:smartphone", "lucide:tablet", "lucide:monitor", "lucide:headphones", "lucide:wifi", "lucide:bluetooth", "lucide:battery", "lucide:battery-charging", "lucide:file", "lucide:file-text", "lucide:folder", "lucide:folder-open", "lucide:archive", "lucide:box"
];

/** Item sosial media yang tersedia */
export interface SocialPlatformItem {
  platform: string;
  color: string;
  icon: ReactNode;
}

export const AVAILABLE_SOCIALS: SocialPlatformItem[] = [
  { platform: 'Instagram', color: '#E1306C', icon: <Icon icon="skill-icons:instagram" width="32" height="32" /> },
  { platform: 'TikTok', color: '#000000', icon: <Icon icon="logos:tiktok-icon" width="28" height="28" className="m-0.5 shrink-0" /> },
  { platform: 'WhatsApp', color: '#25D366', icon: <Icon icon="logos:whatsapp-icon" width="32" height="32" /> },
  { platform: 'X', color: '#000000', icon: <div className="bg-black w-8 h-8 min-w-8 min-h-8 shrink-0 rounded-full flex items-center justify-center p-1.5 text-white"><Icon icon="ri:twitter-x-fill" className="w-full h-full" /></div> },
  { platform: 'Threads', color: '#000000', icon: <div className="bg-black w-8 h-8 min-w-8 min-h-8 shrink-0 rounded-full flex items-center justify-center p-1.5 text-white"><Icon icon="simple-icons:threads" className="w-full h-full" /></div> },
  { platform: 'YouTube', color: '#FF0000', icon: <Icon icon="logos:youtube-icon" width="32" height="32" /> },
  { platform: 'Facebook', color: '#1877F2', icon: <Icon icon="logos:facebook" width="32" height="32" /> },
  { platform: 'Messenger', color: '#0084FF', icon: <Icon icon="logos:messenger" width="32" height="32" /> },
  { platform: 'Telegram', color: '#26A5E4', icon: <Icon icon="logos:telegram" width="32" height="32" /> },
  { platform: 'Discord', color: '#5865F2', icon: <Icon icon="logos:discord-icon" width="32" height="32" /> },
  { platform: 'Pinterest', color: '#E60023', icon: <Icon icon="logos:pinterest" width="32" height="32" /> },
  { platform: 'LinkedIn', color: '#0A66C2', icon: <Icon icon="logos:linkedin-icon" width="32" height="32" /> },
  { platform: 'GitHub', color: '#181717', icon: <Icon icon="logos:github-icon" width="32" height="32" /> },
  { platform: 'Website', color: '#4F46E5', icon: <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center"><Icon icon="lucide:globe" className="text-gray-600 w-5 h-5" /></div> }
];
