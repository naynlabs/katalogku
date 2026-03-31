# Design System Document

## 1. Overview & Creative North Star: "The Digital Curator"

This design system is built to transform the "micro-storefront" from a utility into an editorial experience. Moving away from the rigid, boxed-in templates of traditional SaaS, our Creative North Star is **"The Digital Curator."** 

We treat every small business owner’s catalog as a high-end boutique display. This is achieved through **Organic Asymmetry** and **Tonal Depth**. By leaning into a mobile-first, "link-in-bio" aesthetic, we prioritize thumb-friendly interaction while using sophisticated whitespace and overlapping elements to create a sense of professional polish. We don't just list products; we frame them.

---

### 2. Colors: Tonal Atmosphere

This system operates exclusively in a high-key, Light Mode environment. We use color to define space rather than lines.

*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Separation must be achieved through background shifts (e.g., a `surface-container-low` card resting on a `surface` background).
*   **Surface Hierarchy:** Use the `surface-container` tiers to create "nested" depth.
    *   **Background (`#f8f9fb`):** The canvas.
    *   **Surface Container Low (`#f3f4f6`):** Used for large secondary sections or grouping related items.
    *   **Surface Container Lowest (`#ffffff`):** Reserved for high-priority interactive cards and input fields to make them "pop" against the canvas.
*   **The Glass & Gradient Rule:** For floating headers or navigation bars, use `surface-container-lowest` at 80% opacity with a `backdrop-blur-md` (12px-16px). 
*   **Signature Textures:** Main CTAs should utilize a subtle linear gradient from `primary` (`#3525cd`) to `primary_container` (`#4f46e5`) at a 135-degree angle to provide a premium, "liquid" feel.

---

### 3. Typography: Editorial Clarity

We utilize **Plus Jakarta Sans** for its contemporary, geometric rhythm, which excels in the Indonesian language context (balancing long words with generous x-height).

*   **Display (lg/md/sm):** Use for hero statements and brand names. Set with a tight letter-spacing (`-0.02em`) to create an authoritative, editorial impact.
*   **Headline & Title:** These are the "hooks." Use `headline-md` for product categories. Ensure high contrast against body text using the `on_surface` color.
*   **Body (lg/md/sm):** Optimized for readability. Indonesian text can be dense; always maintain a line height of at least 1.5 for `body-md` to allow the storefront to breathe.
*   **Labels:** Use `label-md` for micro-copy (e.g., "Stok Terbatas" or "Diskon"). These should always be uppercase with `+0.05em` letter spacing for a "designer tag" aesthetic.

---

### 4. Elevation & Depth: Tonal Layering

We reject the "floating box" shadow style of 2010. Our depth is environmental and soft.

*   **The Layering Principle:** Instead of shadows, place a `surface-container-lowest` card inside a `surface-container-low` section. This creates a "soft lift" that feels integrated into the UI.
*   **Ambient Shadows:** For primary action cards, use a custom shadow: `0px 20px 40px rgba(77, 68, 227, 0.06)`. Note the tint—we use a low-opacity version of our `surface_tint` rather than black to ensure the shadow feels like light passing through colored glass.
*   **The "Ghost Border":** If a boundary is required for accessibility, use the `outline_variant` token at **15% opacity**. It should be felt, not seen.
*   **Glassmorphism:** Use semi-transparent layers for mobile bottom-sheets. This allows product images to bleed through the UI, maintaining the user's context.

---

### 5. Components

#### Buttons
*   **Primary:** `primary` to `primary_container` gradient. Radius: `rounded-full`. 
*   **Secondary:** `secondary_container` background with `on_secondary_container` text. This provides a playful "pop" of green inspired by organic growth.
*   **Tertiary:** Transparent background, `primary` text, no border. Used for "Lihat Semua" or "Batal" actions.

#### Cards & Storefront Items
*   **Rule:** Forbid divider lines. Use `spacing-6` (1.5rem) to separate items.
*   **Style:** `surface-container-lowest` background, `rounded-xl` (3rem) or `rounded-lg` (2rem) corners.
*   **Interaction:** On tap/hover, the card should scale slightly (1.02x) rather than darkening.

#### Input Fields
*   **Style:** `surface-container-lowest` background with a `ghost-border`. 
*   **Focus State:** Transition the border to `primary` (40% opacity) and add a soft `primary_fixed` outer glow.
*   **Labels:** Floating labels using `label-md` tucked into the top-left of the container.

#### Chips (Category Pills)
*   **Inactive:** `surface-container-high` background, `on_surface_variant` text.
*   **Active:** `secondary_fixed` background with `on_secondary_fixed` text. Use `rounded-full` to emphasize the playful nature.

#### Specialized Storefront Components
*   **WhatsApp CTA:** A floating action button (FAB) using `secondary_container` with a high-diffusion shadow. This is the "Gold Path" for Indonesian micro-SaaS.
*   **Product Badge:** A `label-sm` chip overlapping the top-right corner of a product image, using `primary_fixed` to highlight "Best Seller."

---

### 6. Do’s and Don’ts

#### Do
*   **DO** use whitespace as a functional element. If a screen feels cluttered, increase the spacing from `spacing-4` to `spacing-8`.
*   **DO** use `rounded-full` for all buttons and chips to maintain the "friendly/playful" attribute.
*   **DO** mix typography scales. A `display-sm` headline next to a `body-sm` description creates a high-end, asymmetrical look.

#### Don’t
*   **DON’T** use pure black (`#000000`) for text. Use `on_surface` (`#191c1e`) to keep the interface soft.
*   **DON’T** use 90-degree corners. Everything must have a radius of at least `sm` (0.5rem).
*   **DON’T** use "Warning Red" for everything. Use `error_container` for a softer, more approachable way to communicate issues to small business owners.