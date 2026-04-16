# Design System Document: The Luminescent Odyssey

## 1. Overview & Creative North Star
The visual strategy for this design system is defined by the Creative North Star: **"The Luminescent Odyssey."** 

We are moving away from the rigid, sterile grids of traditional productivity apps and toward a high-end, editorial "Fantasy HUD" (Heads-Up Display). The goal is to make the user feel like they are interacting with a magical artifact that is simultaneously ancient and futuristic. 

To break the "template" look, we utilize **intentional asymmetry**—such as hero elements that bleed off-canvas—and **tonal depth**. We treat the screen not as a flat surface, but as a deep, celestial void where information floats at varying altitudes.

---

### 2. Colors & Surface Philosophy
The palette centers on a deep navy foundation, punctuated by vibrant, "living" neon accents that signify energy and progression.

#### The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using 1px solid borders to section off content. Traditional borders create a "boxed-in" feel that contradicts the expansive nature of an RPG. 
- Boundaries must be defined solely through **background color shifts** (e.g., a `surface_container_low` card sitting on a `surface` background).
- Separation is achieved through **negative space** (following our Spacing Scale) or subtle tonal transitions.

#### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the `surface_container` tiers to define "altitude":
- **Surface (Deepest):** The infinite void of the app background.
- **Surface Container Lowest:** Inset areas, like a recessed quest log.
- **Surface Container High/Highest:** Active "floating" elements, such as a current task or an XP notification.

#### The "Glass & Gradient" Rule
To achieve a premium feel, floating elements should utilize **Glassmorphism**.
- **Formula:** Use a semi-transparent `surface_variant` or `surface_container` color with a `backdrop-blur` of 12px–20px. 
- **Signature Textures:** For primary CTAs (Call to Action), use a linear gradient from `primary_container` (#00f2ff) to `primary` (#e1fdff). This provides a "soul" and professional polish that flat color cannot replicate.

---

### 3. Typography
The typography system bridges the gap between clean futurism and epic storytelling.

- **Display & Headlines (Space Grotesk):** This is our "Fantasy-Tech" font. Use it for quest titles, level-ups, and major headers. It is designed to be expressive; don't be afraid of the `display-lg` (3.5rem) size for "Quest Complete" screens. Use wide letter-spacing (tracking) for a more cinematic feel.
- **Body & Labels (Manrope):** This is our workhorse. It ensures that even in a complex RPG environment, the "productivity" aspect remains legible and low-friction. 
- **The Contrast Rule:** Maintain a high contrast between display and body sizes. A large, bold `headline-lg` paired with a significantly smaller `body-md` creates an editorial, high-end hierarchy that feels intentional rather than default.

---

### 4. Elevation & Depth
We convey hierarchy through **Tonal Layering** rather than traditional structural lines.

- **The Layering Principle:** Place a `surface_container_lowest` card on a `surface_container_low` section to create a soft, natural "lift." This mimics the way light interacts with matte surfaces in the real world.
- **Ambient Shadows:** When a floating effect is required (e.g., a reward modal), use extra-diffused shadows. 
    - **Shadow Color:** Do not use black. Use a tinted version of `surface_tint` (#00dbe7) at 5–8% opacity. 
    - **Blur:** Use large values (20px to 40px) to simulate a soft ambient glow rather than a harsh drop shadow.
- **The "Ghost Border" Fallback:** If a border is functionally required for accessibility, it must be a "Ghost Border." Use the `outline_variant` token at **10% opacity**. Never use 100% opaque, high-contrast strokes.

---

### 5. Components

#### Buttons
- **Primary:** Gradient fill (`primary_container` to `primary`). 16px (`DEFAULT`) corner radius. Apply a subtle "bloom" effect (a soft glow) using the `primary` color as a shadow.
- **Secondary:** Surface-tinted glassmorphism with a "Ghost Border."
- **Tertiary:** Text only, using `primary_fixed` to indicate interactivity without visual weight.

#### Quest Cards & Lists
- **Rule:** Absolute prohibition of divider lines. 
- **Execution:** Separate list items using `surface_container_low` backgrounds and 12px of vertical spacing. Each card should feel like a standalone "artifact." 
- **Icons:** Use `secondary` (#00ff9d) for "Health/Check" icons and `tertiary` (#ffd700) for rewards/gold icons.

#### XP Progress Bars
- **Background:** `surface_container_highest`.
- **Fill:** A horizontal gradient from `primary_container` to `secondary_container`.
- **Micro-interaction:** On completion, the bar should trigger an "XP sparkle"—a brief emission of particles using the `primary_fixed` color.

#### Input Fields
- **Style:** Understated. Use `surface_container_lowest` for the field background. 
- **Focus State:** Instead of a thick border, use a subtle outer glow (bloom) of the `primary` color.

---

### 6. Do's and Don'ts

#### Do
- **Do** use `tertiary` (#ffd700) sparingly. It is a "reward" color; if everything is gold, nothing is valuable.
- **Do** use `9999px` (full) rounding for chips and small status badges to contrast against the `16px` standard components.
- **Do** leverage "Negative Space" as a structural tool. Let the deep navy background breathe.

#### Don't
- **Don't** use pure white (#ffffff) for text. Use `on_surface` or `on_background` (#e2dfff) to maintain the soft, atmospheric glow.
- **Don't** use standard Material Design "Drop Shadow" presets. All shadows must be tinted and diffused.
- **Don't** align everything to a rigid center. Use slight offsets in decorative RPG icons (swords, shields) to create a more "hand-crafted" adventurous feel.