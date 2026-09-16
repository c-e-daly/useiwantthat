# I Want That! Site Style Guide

This guide records the visual language used by the I Want That! marketing site. It is based on the current implementation in `app/styles/globals.css`, `tailwind.config.ts`, `app/layout.tsx`, shared public components, and the Ask Rami and Vector pages. Treat it as a practical reference when building related experiences, including Vector Hub; preserve the core brand and adapt product details to the destination.

## Brand feel

- Clear, direct, and useful. Lead with what the product lets someone do.
- Consumer-facing Ask Rami pages emphasize agency, confidence, and ease.
- Merchant-facing Vector pages emphasize decisions, conversion, and measurable outcomes.
- Keep layouts spacious and uncluttered. Use short paragraphs, strong headings, and obvious next steps.
- Use blue as the primary action color. Use black and white for contrast and structure.

## Typography

| Role | Typeface | Usage |
| --- | --- | --- |
| UI and body | Inter | Default for paragraphs, navigation, labels, controls, and headings. Variable font includes upright and italic styles. |
| Display accent | Kaushan Script | Decorative brand accent only; avoid for body copy or functional labels. |

Inter is loaded locally in `app/layout.tsx` and configured as the `sans` family. Use a sans-serif fallback stack (`Inter`, `system-ui`, `sans-serif`) in other applications. Headings are generally bold with tight letter spacing. Common hero sizing is 48px on smaller screens and 64–72px at desktop widths; supporting copy is typically 18–20px. Body copy is usually 16px with relaxed line height. Small eyebrow labels use 12px bold uppercase lettering with expanded tracking.

## Color palette

| Token | Hex | Use |
| --- | --- | --- |
| `brand` | `#266DF0` | Primary buttons, links, highlights, icons, and selected states. |
| `brand-deep` | `#1A4CB0` | Primary button hover and deeper blue emphasis. |
| `brand-bright` | `#4D89F5` | Brighter blue accent. |
| `brand-active` / `accent-blue` | `#0442BF` | Active blue and article links. |
| `neutral-dark` | `#000000` | Main text and high contrast areas. |
| `neutral-muted` | `#666666` | Supporting text. |
| `surface-canvas` | `#FFFFFF` | Main page background. |
| `surface-card` | `#FFFFFF` | Cards and raised content. |
| `surface-subtle` | `#F5F5F7` | Secondary panels, quiet buttons, and hover backgrounds. |
| `surface-border` | `#E2E8F0` | Card, input, and divider borders. |
| `accent-orange` | `#FFA300` | Secondary accent, used selectively. |
| `accent-green` | `#80BF9B` | Secondary success/positive accent. |
| `accent-teal` | `#85D9B4` | Secondary accent. |

Use white or near-white surfaces with black text, then reserve saturated blue for actions and important emphasis. Use muted gray for explanatory text. Dark sections are used sparingly for strong closing CTAs or product demonstrations; keep text white and supporting text translucent white. Do not make orange the primary I Want That! action color. Some Vector editorial/blog components use orange as a Vector-specific accent; that treatment is contextual rather than the default site palette.

## Shape, borders, and elevation

- Standard control and card radius: 6px (`rounded-askrami`).
- Pill labels: fully rounded (`rounded-full` / `rounded-pill`).
- Standard border: 1px solid `#E2E8F0` (`border-surface-border`).
- Cards are usually white with a subtle border and light shadow; use shadows to separate layers, not as decoration.
- Available shadows: `shadow-soft` (`4px 4px 12px`, 3% black), `shadow-portal-soft` (4% black), and `shadow-card` (`2px 2px 8px`, 5% black). Larger hero mockups may use a stronger shadow.

## Layout and spacing

- Use a centered, responsive content container with horizontal padding: 16px mobile, 24px small screens, 32px large screens.
- Give hero sections generous vertical space. Typical values are about 80px on mobile and 112px on desktop.
- Use responsive grids rather than fixed-width columns. Two-column hero layouts begin around large breakpoints; cards commonly move from one column to two or three as space permits.
- Use consistent vertical rhythm: 8px/12px within controls, 16px between related elements, 24–32px between content groups, and larger section breaks for major page areas.
- Keep paragraphs readable with a max width around 640–720px and relaxed line height.
- Alternate white and subtle surfaces to distinguish sections. Reserve full black backgrounds for focused feature or final CTA sections.

## Buttons and links

### Primary button

Use for the single most important action in a section.

```tsx
className="inline-flex items-center justify-center gap-2 rounded-askrami bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-deep"
```

Use `px-8 py-4 text-base` for a larger hero action. Button text should be a concise verb-led label such as “Get a demo,” “Get Started,” or “Sign up.” An `ArrowRight` icon may follow the label when it helps signal progression.

### Secondary button

Use a white background, dark text, and a light border. Hover with the subtle surface color.

```tsx
className="inline-flex items-center justify-center rounded-askrami border border-surface-border bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-surface-subtle"
```

### Quiet or tertiary action

Use a subtle background or a text link when the action is useful but should not compete with the primary CTA. Maintain a clear hover and keyboard focus state.

### Interaction and accessibility

- Keep visible keyboard focus, using a brand-blue ring or text treatment.
- Buttons need clear names, adequate contrast, and a usable touch target. Icon-only buttons need an accessible label.
- Use real links for navigation and buttons for in-place actions.
- For external links opened in a new tab, set `target="_blank"` and `rel="noopener noreferrer"`.
- Keep hover transitions brief and restrained; do not rely on hover alone to communicate meaning.

## CTA patterns

### Hero CTA group

Place a primary action next to one secondary action below the headline and supporting sentence. On narrow screens, stack them vertically. Keep the primary action first. The Ask Rami hero uses “Sign up” as the primary action and an in-page “See how it works” link as the secondary action.

### Mid-page CTA

Connect a relevant action to the section’s content, such as a calculator link after explaining a business problem. Keep copy specific to the benefit, and use one primary plus at most one secondary action where possible.

### Closing CTA section

Use a dark background, a short eyebrow, a direct headline, one sentence of context, and a clear action. The Vector page also uses linked CTA cards when there are several equally useful next steps. Avoid presenting many same-weight buttons in a hero.

### CTA copy

- Say what happens next: “Get a demo,” “See how it works,” “Get Started.”
- Keep labels short and consistent across a page.
- Tie the CTA to the surrounding audience and product. Ask Rami speaks to shoppers; Vector speaks to store operators.
- If the destination is an external product or signup, confirm the destination URL and use the same target behavior consistently.

## Common component patterns

### Header

The shared `MainHeader` is white, sticky, and separated by a light bottom border with a subtle shadow. It uses a compact logo, uppercase desktop navigation, hover/focus dropdown menus, and a blue “Get Started” button. On small screens, navigation collapses behind an accessible menu button and expandable sections.

### Cards

Use a white background, subtle border, 6px radius, and consistent padding (often 24px). A light shadow can add separation. Clickable cards should have a visible hover state without changing their content’s readability.

### Eyebrow labels

Use small, bold uppercase text in brand blue with generous letter spacing. These labels introduce a section; they should remain secondary to the headline.

### Product mockups and dark panels

Use black or charcoal framing with nested dark/white surfaces, thin translucent borders, and blue highlights. Reserve this treatment for product UI previews and focused feature sections.

### Footer

The shared footer uses a light gray surface, thin top border, muted copyright text, and compact, evenly spaced links. Legal and utility links are lower emphasis than primary page actions.

## Responsive behavior

- Design for mobile first. Stack CTA groups and card layouts at narrow widths.
- At tablet and desktop widths, introduce columns only when content remains comfortably readable.
- Scale hero typography and section spacing up gradually; avoid desktop-only fixed widths.
- Keep navigation, cards, and controls usable without hover.

## Product-specific guidance

The I Want That! site contains distinct products. Keep the shared shell (Inter, white/black neutrals, blue action color, 6px radius, light borders) consistent, while tailoring the page’s examples and CTA destinations:

- **Ask Rami:** consumer-oriented copy and actions, with approachable explanations and direct shopper benefits.
- **Vector / Vector Hub:** merchant-oriented copy for WooCommerce and Shopify shops. Focus on store outcomes, offer decisions, and clear next steps. Keep blue as the shared primary action color; use any Vector-specific accent sparingly.

The legacy site and app destinations may change. New pages should use the current product URLs supplied by the owning application rather than copying old `app.useiwantthat.com` links from historical source.

## Source references

- Global base styles and editorial component classes: `app/styles/globals.css`
- Color, font, radius, and shadow tokens: `tailwind.config.ts`
- Local font loading and shared page shell: `app/layout.tsx`
- Shared responsive navigation: `components/public/mainHeader.tsx`
- Shared site footer: `components/public/footer.tsx`
- Ask Rami marketing page: `app/ask-rami/page.tsx`
- Vector marketing page: `app/vector/page.tsx`
