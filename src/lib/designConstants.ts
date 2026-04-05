export const GOOGLE_FONTS = [
  // Populer / Modern Sans
  "Inter", "Poppins", "Montserrat", "Roboto", "Open Sans", "Nunito", "Raleway", "Ubuntu", "Rubik", "Work Sans", "Plus Jakarta Sans", "Barlow", "Assistant", "Mulish", "Public Sans",
  // Underrated / Karakter Kuat
  "Space Grotesk", "Syne", "Outfit", "Manrope", "Cabinet Grotesk", "Clash Display", "Satoshi", "General Sans", "DM Sans",
  "Epilogue", "Lexend", "Sen", "Sora", "Urbanist", "Bricolage Grotesque", "Bebas Neue", "Oswald", "Teko", "Archivo Black", "Archivo", "Unbounded", "Orbitron",
  // Serif / Klasik / Elegan
  "Playfair Display", "Merriweather", "Lora", "PT Serif", "Noto Serif", "Cormorant Garamond", "Eczar", "Fraunces", "Instrument Serif", "Newsreader", "Cormorant", "Cinzel", "DM Serif Display", "Tenor Sans", "Arvo", "Source Serif 4",
  // Monospace / Retro / Playful
  "JetBrains Mono", "Space Mono", "Fira Code", "IBM Plex Mono", "Inconsolata", "Source Code Pro", "VT323", "Baloo 2", "Fredoka", "Karla", "Jost", "Lato"
];

export const CSS_PATTERNS = [
  { id: "none", label: "Tidak Ada", css: "none" },
  { id: "dots", label: "Titik (Dots)", css: "radial-gradient(#000000 1.5px, transparent 1.5px)", backgroundSize: "20px 20px" },
  { id: "dots-dense", label: "Titik Rapat", css: "radial-gradient(#000000 1.5px, transparent 1.5px)", backgroundSize: "10px 10px" },
  { id: "grid", label: "Kotak (Grid)", css: "linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)", backgroundSize: "20px 20px" },
  { id: "grid-large", label: "Kotak Besar", css: "linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)", backgroundSize: "40px 40px" },
  { id: "stripes-diagonal", label: "Garis Miring", css: "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 10px)", backgroundSize: "30px 30px" },
  { id: "stripes-vertical", label: "Garis Vertikal", css: "repeating-linear-gradient(to right, #000 0, #000 1px, transparent 1px, transparent 20px)", backgroundSize: "100% 100%" },
  { id: "stripes-horizontal", label: "Garis Horisontal", css: "repeating-linear-gradient(to bottom, #000 0, #000 1px, transparent 1px, transparent 20px)", backgroundSize: "100% 100%" },
  { id: "crosshatch", label: "Jaring (Cross)", css: "linear-gradient(45deg, transparent 48%, #000 48%, #000 52%, transparent 52%), linear-gradient(-45deg, transparent 48%, #000 48%, #000 52%, transparent 52%)", backgroundSize: "20px 20px" },
  { id: "isometric", label: "Isometrik", css: "repeating-linear-gradient(30deg, transparent, transparent 10px, #000 10px, #000 11px), repeating-linear-gradient(150deg, transparent, transparent 10px, #000 10px, #000 11px)", backgroundSize: "40px 40px" },
  { id: "zigzag", label: "Zigzag", css: "linear-gradient(135deg, #000 25%, transparent 25%), linear-gradient(225deg, #000 25%, transparent 25%), linear-gradient(315deg, #000 25%, transparent 25%), linear-gradient(45deg, #000 25%, transparent 25%)", backgroundSize: "20px 20px", backgroundPosition: "-10px 0, -10px 0, 0 0, 0 0" }
];

export interface ThemePreset {
  id: string;
  name: string;
  config: Partial<Record<string, any>>;
}

/* 
Mapping Logic for 3 User Colors (Primary, BG, Accent):
- BG = bgColor
- Primary = shopButtonColor & promoBgColor
- Accent = linkButtonColor
Contrasting Text (White/Black) applied contextually.
FontSizes standardized: Profile(24), Bio(14), Links(16).
*/
const baseSizes = { nameFontSize: 24, bioFontSize: 14, linksFontSize: 16 };

export const PRESET_THEMES: ThemePreset[] = [
  {
    id: "modern-saas", name: "1. Modern SaaS",
    config: { ...baseSizes, fontFamily: "Inter", buttonStyle: "rounded", bgColor: "#F1F5F9", bgPattern: "dots-dense", patternColor: "#2563EB", patternOpacity: 50, profileTitleColor: "#0F172A", profileBioColor: "#475569", shopButtonColor: "#2563EB", shopTextColor: "#FFFFFF", linkButtonColor: "#FFFFFF", linkTextColor: "#0F172A", promoBgColor: "#2563EB", promoTextColor: "#FFFFFF", promoBtnBgColor: "#FFFFFF", promoBtnTextColor: "#2563EB" }
  },
  {
    id: "creative-agency", name: "2. Creative Agency",
    config: { ...baseSizes, fontFamily: "Syne", buttonStyle: "neo-brutalism", bgColor: "#F97316", bgPattern: "isometric", patternColor: "#000000", patternOpacity: 50, profileTitleColor: "#000000", profileBioColor: "#000000", shopButtonColor: "#000000", shopTextColor: "#FFFFFF", linkButtonColor: "#FFFFFF", linkTextColor: "#000000", promoBgColor: "#000000", promoTextColor: "#FFFFFF", promoBtnBgColor: "#F97316", promoBtnTextColor: "#000000" }
  },
  {
    id: "premium-fashion", name: "3. Premium Fashion",
    config: { ...baseSizes, fontFamily: "Playfair Display", buttonStyle: "square", bgColor: "#F5EFE6", bgPattern: "stripes-vertical", patternColor: "#BC9881", patternOpacity: 50, profileTitleColor: "#4A3F35", profileBioColor: "#4A3F35", shopButtonColor: "#4A3F35", shopTextColor: "#F5EFE6", linkButtonColor: "#BC9881", linkTextColor: "#FFFFFF", promoBgColor: "#4A3F35", promoTextColor: "#F5EFE6", promoBtnBgColor: "#BC9881", promoBtnTextColor: "#FFFFFF" }
  },
  {
    id: "horeca", name: "4. HORECA / Supply",
    config: { ...baseSizes, fontFamily: "Lora", buttonStyle: "rounded", bgColor: "#F8FAFC", bgPattern: "crosshatch", patternColor: "#059669", patternOpacity: 50, profileTitleColor: "#0F172A", profileBioColor: "#334155", shopButtonColor: "#0F172A", shopTextColor: "#FFFFFF", linkButtonColor: "#059669", linkTextColor: "#FFFFFF", promoBgColor: "#059669", promoTextColor: "#FFFFFF", promoBtnBgColor: "#FFFFFF", promoBtnTextColor: "#059669" }
  },
  {
    id: "neo-brutalism", name: "5. Neo-Brutalism",
    config: { ...baseSizes, fontFamily: "Space Grotesk", buttonStyle: "neo-brutalism", bgColor: "#FFDE03", bgPattern: "dots-dense", patternColor: "#000000", patternOpacity: 50, profileTitleColor: "#000000", profileBioColor: "#000000", shopButtonColor: "#000000", shopTextColor: "#FFFFFF", linkButtonColor: "#FF5277", linkTextColor: "#000000", promoBgColor: "#FF5277", promoTextColor: "#000000", promoBtnBgColor: "#000000", promoBtnTextColor: "#FFFFFF" }
  },
  {
    id: "wellness", name: "6. Wellness & Zen",
    config: { ...baseSizes, fontFamily: "DM Serif Display", buttonStyle: "pill", bgColor: "#ECFDF5", bgPattern: "stripes-horizontal", patternColor: "#134E4A", patternOpacity: 50, profileTitleColor: "#134E4A", profileBioColor: "#047857", shopButtonColor: "#134E4A", shopTextColor: "#FBBF24", linkButtonColor: "#FBBF24", linkTextColor: "#134E4A", promoBgColor: "#134E4A", promoTextColor: "#FBBF24", promoBtnBgColor: "#FBBF24", promoBtnTextColor: "#134E4A" }
  },
  {
    id: "fintech", name: "7. Fintech & Security",
    config: { ...baseSizes, fontFamily: "Roboto", buttonStyle: "rounded", bgColor: "#FFFFFF", bgPattern: "grid", patternColor: "#1E3A8A", patternOpacity: 50, profileTitleColor: "#1E3A8A", profileBioColor: "#475569", shopButtonColor: "#1E3A8A", shopTextColor: "#FFFFFF", linkButtonColor: "#10B981", linkTextColor: "#FFFFFF", promoBgColor: "#1E3A8A", promoTextColor: "#FFFFFF", promoBtnBgColor: "#10B981", promoBtnTextColor: "#FFFFFF" }
  },
  {
    id: "gaming", name: "8. Gaming / Community",
    config: { ...baseSizes, fontFamily: "Orbitron", buttonStyle: "square", bgColor: "#0F172A", bgPattern: "grid-large", patternColor: "#7C3AED", patternOpacity: 50, profileTitleColor: "#00FFD1", profileBioColor: "#94A3B8", shopButtonColor: "#7C3AED", shopTextColor: "#FFFFFF", linkButtonColor: "#1E293B", linkTextColor: "#00FFD1", promoBgColor: "#7C3AED", promoTextColor: "#FFFFFF", promoBtnBgColor: "#00FFD1", promoBtnTextColor: "#0F172A" }
  },
  {
    id: "fnb", name: "9. F&B / Kuliner",
    config: { ...baseSizes, fontFamily: "Poppins", buttonStyle: "pill", bgColor: "#FFFBEB", bgPattern: "zigzag", patternColor: "#DC2626", patternOpacity: 50, profileTitleColor: "#1F2937", profileBioColor: "#4B5563", shopButtonColor: "#DC2626", shopTextColor: "#FFFFFF", linkButtonColor: "#FFFFFF", linkTextColor: "#DC2626", promoBgColor: "#DC2626", promoTextColor: "#FFFFFF", promoBtnBgColor: "#FFFFFF", promoBtnTextColor: "#DC2626" }
  },
  {
    id: "luxury", name: "10. Luxury Real Estate",
    config: { ...baseSizes, fontFamily: "Cormorant", buttonStyle: "square", bgColor: "#1A1A1A", bgPattern: "stripes-vertical", patternColor: "#C5A059", patternOpacity: 50, profileTitleColor: "#C5A059", profileBioColor: "#D1D5DB", shopButtonColor: "#C5A059", shopTextColor: "#1A1A1A", linkButtonColor: "#262626", linkTextColor: "#C5A059", promoBgColor: "#C5A059", promoTextColor: "#1A1A1A", promoBtnBgColor: "#1A1A1A", promoBtnTextColor: "#C5A059" }
  },
  {
    id: "education", name: "11. Education",
    config: { ...baseSizes, fontFamily: "Fredoka", buttonStyle: "rounded", bgColor: "#F9FAFB", bgPattern: "dots", patternColor: "#FB923C", patternOpacity: 50, profileTitleColor: "#4F46E5", profileBioColor: "#4B5563", shopButtonColor: "#4F46E5", shopTextColor: "#FFFFFF", linkButtonColor: "#FB923C", linkTextColor: "#FFFFFF", promoBgColor: "#FB923C", promoTextColor: "#FFFFFF", promoBtnBgColor: "#4F46E5", promoBtnTextColor: "#FFFFFF" }
  },
  {
    id: "architect", name: "12. Architect",
    config: { ...baseSizes, fontFamily: "Unbounded", buttonStyle: "square", bgColor: "#F5F5F5", bgPattern: "isometric", patternColor: "#A3A3A3", patternOpacity: 50, profileTitleColor: "#262626", profileBioColor: "#525252", shopButtonColor: "#262626", shopTextColor: "#FFFFFF", linkButtonColor: "#A3A3A3", linkTextColor: "#FFFFFF", promoBgColor: "#262626", promoTextColor: "#FFFFFF", promoBtnBgColor: "#A3A3A3", promoBtnTextColor: "#FFFFFF" }
  },
  {
    id: "eco", name: "13. Eco-Friendly",
    config: { ...baseSizes, fontFamily: "Fraunces", buttonStyle: "rounded", bgColor: "#FEFCE8", bgPattern: "stripes-diagonal", patternColor: "#D9F99D", patternOpacity: 50, profileTitleColor: "#365314", profileBioColor: "#4D7C0F", shopButtonColor: "#365314", shopTextColor: "#FEFCE8", linkButtonColor: "#D9F99D", linkTextColor: "#365314", promoBgColor: "#365314", promoTextColor: "#D9F99D", promoBtnBgColor: "#D9F99D", promoBtnTextColor: "#365314" }
  },
  {
    id: "logistics", name: "14. Logistics & Tech",
    config: { ...baseSizes, fontFamily: "Barlow", buttonStyle: "rounded", bgColor: "#111827", bgPattern: "grid", patternColor: "#E11D48", patternOpacity: 50, profileTitleColor: "#F3F4F6", profileBioColor: "#9CA3AF", shopButtonColor: "#E11D48", shopTextColor: "#FFFFFF", linkButtonColor: "#1F2937", linkTextColor: "#F3F4F6", promoBgColor: "#E11D48", promoTextColor: "#FFFFFF", promoBtnBgColor: "#FFFFFF", promoBtnTextColor: "#E11D48" }
  },
  {
    id: "beauty", name: "15. Beauty & MUA",
    config: { ...baseSizes, fontFamily: "Tenor Sans", buttonStyle: "pill", bgColor: "#FFF1F2", bgPattern: "dots-dense", patternColor: "#FDA4AF", patternOpacity: 50, profileTitleColor: "#4C0519", profileBioColor: "#9F1239", shopButtonColor: "#4C0519", shopTextColor: "#FFF1F2", linkButtonColor: "#FDA4AF", linkTextColor: "#4C0519", promoBgColor: "#FDA4AF", promoTextColor: "#4C0519", promoBtnBgColor: "#4C0519", promoBtnTextColor: "#FDA4AF" }
  },
  {
    id: "legal", name: "16. Corporate & Legal",
    config: { ...baseSizes, fontFamily: "Cinzel", buttonStyle: "square", bgColor: "#F3F4F6", bgPattern: "stripes-horizontal", patternColor: "#312E81", patternOpacity: 50, profileTitleColor: "#312E81", profileBioColor: "#4B5563", shopButtonColor: "#312E81", shopTextColor: "#FFFFFF", linkButtonColor: "#B45309", linkTextColor: "#FFFFFF", promoBgColor: "#312E81", promoTextColor: "#FFFFFF", promoBtnBgColor: "#B45309", promoBtnTextColor: "#FFFFFF" }
  },
  {
    id: "kids", name: "17. Kids & Playful",
    config: { ...baseSizes, fontFamily: "Baloo 2", buttonStyle: "rounded", bgColor: "#FFFFFF", bgPattern: "zigzag", patternColor: "#FACC15", patternOpacity: 50, profileTitleColor: "#0EA5E9", profileBioColor: "#334155", shopButtonColor: "#0EA5E9", shopTextColor: "#FFFFFF", linkButtonColor: "#FACC15", linkTextColor: "#0F172A", promoBgColor: "#0EA5E9", promoTextColor: "#FFFFFF", promoBtnBgColor: "#FACC15", promoBtnTextColor: "#0F172A" }
  },
  {
    id: "artisan", name: "18. Artisan Handmade",
    config: { ...baseSizes, fontFamily: "Arvo", buttonStyle: "rounded", bgColor: "#FFFBEB", bgPattern: "crosshatch", patternColor: "#92400E", patternOpacity: 50, profileTitleColor: "#451A03", profileBioColor: "#78350F", shopButtonColor: "#451A03", shopTextColor: "#FFFBEB", linkButtonColor: "#92400E", linkTextColor: "#FFFBEB", promoBgColor: "#92400E", promoTextColor: "#FFFBEB", promoBtnBgColor: "#FFFBEB", promoBtnTextColor: "#92400E" }
  },
  {
    id: "travel", name: "19. Travel & Adventure",
    config: { ...baseSizes, fontFamily: "Lexend", buttonStyle: "rounded", bgColor: "#F0FDFA", bgPattern: "dots", patternColor: "#0891B2", patternOpacity: 50, profileTitleColor: "#0891B2", profileBioColor: "#0F766E", shopButtonColor: "#0891B2", shopTextColor: "#FFFFFF", linkButtonColor: "#F97316", linkTextColor: "#FFFFFF", promoBgColor: "#F97316", promoTextColor: "#FFFFFF", promoBtnBgColor: "#FFFFFF", promoBtnTextColor: "#F97316" }
  },
  {
    id: "minimalist", name: "20. Minimalist Design",
    config: { ...baseSizes, fontFamily: "Bebas Neue", buttonStyle: "square", bgColor: "#E7E5E4", bgPattern: "grid-large", patternColor: "#57534E", patternOpacity: 50, profileTitleColor: "#292524", profileBioColor: "#57534E", shopButtonColor: "#292524", shopTextColor: "#FFFFFF", linkButtonColor: "#78716C", linkTextColor: "#FFFFFF", promoBgColor: "#292524", promoTextColor: "#FFFFFF", promoBtnBgColor: "#78716C", promoBtnTextColor: "#FFFFFF" }
  }
];
