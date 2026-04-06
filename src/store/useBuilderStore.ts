import { create } from 'zustand';

export type StoreLink = {
  id: string;
  type: "image" | "icon";
  image?: string;
  icon?: string;
  iconBg?: string;
  iconColor?: string;
  label: string;
  url: string;
  openInNewTab?: boolean;
  isDeepLink?: boolean;
  isVisible?: boolean;
};

export type SocialLink = {
  id: string;
  platform: string;
  handle: string;
  url: string;
  icon?: string;
  color?: string;
};

export type StoreProfile = {
  name: string;
  tagline: string;
  wa: string;
  banner: string;
  profile: string;
  isVerified: boolean;
  theme: string;

  // Kustomisasi Starter
  bgColor: string;
  bgImage: string;
  bgPattern: string;
  patternColor: string;
  patternOpacity: number;
  fontFamily: string;
  nameFontSize: number;
  bioFontSize: number;
  linksFontSize: number;
  productTitleFontSize: number;
  buttonStyle: 'pill' | 'rounded' | 'square' | 'neo-brutalism';
  productImageStyle: 'pill' | 'rounded' | 'square' | 'neo-brutalism';
  productLayout: 'grid' | 'list';
  
  linkButtonColor: string;
  linkTextColor: string;
  shopButtonColor: string;
  shopTextColor: string;

  // Header & Typography
  profileTitleColor: string;
  profileBioColor: string;
  headerAlignment: 'left' | 'center' | 'right';
  
  // Effects
  glassmorphism: boolean;
  
  // Product Specific
  hidePrice: boolean;
  productCtaText: string;

  // Promo Banner
  promoEnabled: boolean;
  promoLabel: string;
  promoTitle: string;
  promoButtonText: string;
  promoButtonUrl: string;
  promoTitleFontSize: number;
  promoBgColor: string;
  promoTextColor: string;
  promoBtnBgColor: string;
  promoBtnTextColor: string;
};

interface BuilderState {
  profile: StoreProfile;
  links: StoreLink[];
  socials: SocialLink[];
  // Actions
  setProfileField: <K extends keyof StoreProfile>(field: K, value: StoreProfile[K]) => void;
  applyTheme: (themeConfig: Partial<StoreProfile>) => void;
  updateLink: (id: string, updates: Partial<StoreLink>) => void;
  addLink: (link: StoreLink) => void;
  removeLink: (id: string) => void;
  reorderLinks: (newLinks: StoreLink[]) => void;
  addSocial: (social: SocialLink) => void;
  removeSocial: (id: string) => void;
  updateSocial: (id: string, updates: Partial<SocialLink>) => void;
}

export const useBuilderStore = create<BuilderState>((set) => ({
  profile: {
    name: "Toko Kue Bunda",
    tagline: "Cita Rasa Rumah di Setiap Gigitan ✨",
    wa: "+6281234567890",
    banner: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPDXUeurpWEUqXJgo4d9clRn2JoNqe2BjHD7bOj-skDh4SHeocrMThWPcfApfyR1-yUhCGz2fN0KHedxEAiedwO1wz10nUiNDgb2427We9uMMBm2kAGADzki4o4Eky7ECWdaHBV8fg-7pKTuLhfQbm_Yfg1qpsxfPmjFfBaEgg4OyzNqT2sue4yDLLhtN8Zh9CMk9pRZ3CL7kyqbeZMLHXJkp2kWRdnxYR1KvSN0ZcBnEAO0vO5N4w1d2yNJIiXLxowWGwwMuu_6se",
    profile: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7MTx8jdW1SBBJwO_1lqJmAi4Cc7xNeRDxfqrNbf0yDiLwGgn1a1FnOSJ8khAZHFjp-PPOlam98RxpVs2RIOwkfsw7sbFyA9QTZv-I1skMV9GVqL0dpMcLhfV6a8Pfrs70o3HCL8rglmyLMIhLXxYMuuwdDIvmqiV96Tdz35zmgqwcJyLoRi9HM_MyimZtwdBn2L2R78ktu14JqpRLe2A8UtEPy41m8j8oEJwudj-1fmBCV4ZftyNSJoK_a6cIDdzwOYe4TjELuhJs",
    isVerified: true,
    theme: 'glassmorphism',
    
    // Default Starter Config
    bgColor: '#fdfaf8',
    bgImage: '',
    bgPattern: 'none',
    patternColor: 'rgba(0,0,0,0.05)',
    patternOpacity: 20,
    fontFamily: 'Inter',
    nameFontSize: 24,
    bioFontSize: 14,
    linksFontSize: 14,
    productTitleFontSize: 14,
    buttonStyle: 'rounded',
    productImageStyle: 'rounded',
    productLayout: 'grid',
    linkButtonColor: '#ffffff',
    linkTextColor: '#191c1e',
    shopButtonColor: '#4f46e5',
    shopTextColor: '#ffffff',
    
    // Header & Typography (New Additions)
    profileTitleColor: '',
    profileBioColor: '',
    headerAlignment: 'center',
    
    // Effects
    glassmorphism: false,
    
    // Product Specific (New Additions)
    hidePrice: false,
    productCtaText: 'Detail',
    
    // Default Promo
    promoEnabled: true,
    promoLabel: 'Promo Akhir Pekan',
    promoTitle: 'Diskon 15% Untuk\nHampers Keluarga',
    promoButtonText: 'Klaim Sekarang',
    promoButtonUrl: '',
    promoTitleFontSize: 24,
    promoBgColor: '#4f46e5',
    promoTextColor: '#ffffff',
    promoBtnBgColor: '#ffffff',
    promoBtnTextColor: '#4f46e5',
  },
  links: [
    { id: "1", type: "image", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpCLXs2Q0wzKqnJx1D-lFNMFWSyM5ZKs5l62fUj3_juJVuU2ihth8bn-ZwVbkECZa41wzKerQ_HRDZgZeq32YlxMWU5tC97A7J8xa4U2JAqygjGEP2qR4XDTUN83tUaxvxuIRa88yluuboraJi7kGzcHmCG-rmiIXQCnzjb9FeiIHFNhi75sUCcjmvAR4gRvg_F8821Q6IEd_XTfQOZ2CxDWv7Ff0COWlqs-OE3mLEoL9Wez_Ayo6k6KK2SylLa7xWBIfb-94ldxws", label: "Pesan Hampers Lebaran", url: "" },
    { id: "2", type: "image", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqritIlcfHbbpOPYcMGoGzY2Vzf_s0xSC5sPj-vSaOMWaQlBI-nbJhynLVrtvzjRahAdV0DuiJjro3gM6BpbFeNZv7Jy9qMytmpHb1DVizmbzvos-xTxehxb7no1xu5MASR8l0iB1HiTb7Rj0A5mTWXY7hIpHwz27CWfiVv1GuHX0utHadvPkGgo631JdEsKukyJHIE5s5wJPaedkGNxG1n9IYZY6q5PhDLmD-KDrlpgoBZ5j5uxcL0eMHnef6nWwaFbsTNr7015Ln", label: "Katalog Ulang Tahun", url: "" },
    { id: "3", type: "icon", icon: "lucide:message-circle", iconBg: "bg-primary/10", iconColor: "text-primary", label: "Chat Admin (Tanya Stok)", url: "" },
    { id: "4", type: "icon", icon: "lucide:star", iconBg: "bg-[#9ef65c]/20", iconColor: "text-[#346b00]", label: "Review Pelanggan", url: "" },
  ],
  socials: [
     { id: "s1", platform: "Instagram", handle: "katalogku", url: "https://instagram.com/katalogku", color: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500" },
     { id: "s2", platform: "TikTok", handle: "@katalogku", url: "https://tiktok.com/@katalogku", color: "bg-black" },
     { id: "s3", platform: "WhatsApp", handle: "+6281234567890", url: "https://wa.me/6281234567890", color: "bg-[#25D366]" },
  ],

  setProfileField: (field, value) => set((state) => ({ profile: { ...state.profile, [field]: value } })),
  applyTheme: (themeConfig) => set((state) => ({ profile: { ...state.profile, ...themeConfig } })),
  updateLink: (id, updates) => set((state) => ({
    links: state.links.map(l => l.id === id ? { ...l, ...updates } : l)
  })),
  addLink: (link) => set((state) => ({ links: [...state.links, link] })),
  removeLink: (id) => set((state) => ({ links: state.links.filter(l => l.id !== id) })),
  reorderLinks: (newLinks) => set({ links: newLinks }),
  
  addSocial: (social) => set((state) => ({ socials: [...state.socials, social] })),
  removeSocial: (id) => set((state) => ({ socials: state.socials.filter(s => s.id !== id) })),
  updateSocial: (id, updates) => set((state) => ({
    socials: state.socials.map(s => s.id === id ? { ...s, ...updates } : s)
  })),
}));
