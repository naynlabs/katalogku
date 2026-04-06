// ===== Shared Types for Katalogku =====

/** Product displayed in storefront */
export type Product = {
  id: number;
  name: string;
  price: number;
  cat: string;
  badge?: string;
  badgeColor?: string;
  img: string;
};

/** Cart item */
export type CartItem = {
  id: number;
  qty: number;
};

/** Cart item with product data merged */
export type CartItemWithProduct = Product & {
  qty: number;
};

/** Link item in storefront */
export type StorefrontLink = {
  type: "image" | "icon";
  image?: string;
  icon?: string;
  iconBg?: string;
  iconColor?: string;
  label: string;
  url: string;
  openInNewTab?: boolean;
  isVisible?: boolean;
};

/** Social media link */
export type SocialLink = {
  id: string;
  platform: string;
  handle: string;
  url: string;
  icon?: string;
  color?: string;
};

/** Store profile data */
export type StoreProfile = {
  name: string;
  tagline: string;
  wa: string;
  banner: string;
  profile: string;
  isVerified: boolean;
  theme: string;

  // Customization
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

/** Storefront data passed to StorefrontUI */
export type StorefrontData = StoreProfile & {
  categories?: string[];
  links?: StorefrontLink[];
  products?: Product[];
  socials?: SocialLink[];
};

/** Order status */
export type OrderStatus = "Baru" | "Diproses" | "Dikirim" | "Selesai";

/** Checkout form data */
export type CheckoutForm = {
  name: string;
  phone: string;
  address: string;
  notes: string;
};
