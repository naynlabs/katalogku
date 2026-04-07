import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import type { StorefrontData } from "@/types";

export function LinksTab({ 
  data, 
  baseBtnClass 
}: { 
  data: StorefrontData;
  baseBtnClass: string;
}) {
  return (
    <div className="animate-fade-up">
      <div className="px-6 flex flex-col gap-4 max-w-md mx-auto">
        {data.links?.filter((l: any) => l.isVisible !== false).map((link: any, i: number) => {
          if (link.type === 'divider') {
            return (
              <div key={i} className="w-full text-center mt-6 mb-2">
                <span 
                   className="inline-block px-4 font-bold uppercase tracking-widest text-[11px]"
                   style={{ color: data.linkTextColor, opacity: 0.8 }}
                >
                  {link.label}
                </span>
              </div>
            );
          }

          let animationClass = "";
          if (link.animation === 'pulse') animationClass = "animate-pulse";
          if (link.animation === 'bounce') animationClass = "animate-bounce";

          const isGlow = link.animation === 'glow' || link.isFeatured;
          const glowStyle = isGlow ? { boxShadow: `0 0 20px -2px ${data.linkButtonColor}` } : {};

          return (
            <a 
              key={i} 
              className={`group flex items-center p-2.5 ${baseBtnClass} ${animationClass} ${link.isFeatured ? 'scale-105 my-1.5 border-2 z-10' : ''} ${data.glassmorphism && data.buttonStyle !== 'neo-brutalism' ? 'backdrop-blur-md bg-opacity-80' : ''}`} 
              style={{ 
                 backgroundColor: data.linkButtonColor, 
                 color: data.linkTextColor,
                 borderColor: link.isFeatured ? data.linkTextColor : 'transparent',
                 ...glowStyle,
                 ...(data.buttonStyle === 'neo-brutalism' ? { boxShadow: '4px 4px 0px rgba(0,0,0,1)' } : (!isGlow ? { boxShadow: '0px 10px 30px rgba(0,0,0,0.05)' } : {}))
              }}
              href={link.url}
              target={link.openInNewTab ? "_blank" : "_self"}
              rel={link.openInNewTab ? "noopener noreferrer" : undefined}
            >
              <div className={`relative w-11 h-11 ${baseBtnClass} overflow-hidden flex-shrink-0 flex items-center justify-center bg-black/5`}>
                {link.type === 'image' && link.image ? (
                  <Image alt={link.label} fill className="object-cover" src={link.image} unoptimized />
                ) : link.type === 'icon' && link.icon ? (
                  <Icon icon={link.icon} className="text-[20px] w-5 h-5 opacity-80" />
                ) : (
                   <Icon icon="lucide:link" className="text-gray-400 w-5 h-5" />
                )}
              </div>
              <span className="ml-4 flex-grow font-bold truncate" style={{ fontSize: `${data.linksFontSize || 14}px` }}>{link.label}</span>
              {link.isFeatured ? (
                 <div className="mr-3 shrink-0 opacity-80">
                   <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                 </div>
              ) : (
                 <div className="mr-2 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center shrink-0 group-hover:bg-black/10 transition-colors">
                   <span className="material-symbols-outlined text-lg">chevron_right</span>
                 </div>
              )}
            </a>
          );
        })}
        {(!data.links || data.links.length === 0) && (
           <p className="text-center text-sm text-gray-400 my-4">Belum ada tautan</p>
        )}
      </div>
    </div>
  );
}
