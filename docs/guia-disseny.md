---
title: "UI & HCI Design Guide for Mobile and Desktop"
version: 1.1
compiled: 2026-11-19
changes_in_1_1: "Merged 18 courses on visual aesthetics, color and interaction/motion (see Appendix B, second table). New or extended: §1.2, §3.4, §7.1, §7.2, §7.5, §8.1, §8.5, §9.1, §9.2, §9.6 (new), §13.3, §14.7–§14.12 (new), §22 #25–#45, §23.8–§23.10 (new), Appendix A (motion in Figma), Appendix B (second table), Appendix C."
language: en
audience: "AI agents (and humans) that design, generate, critique or implement user interfaces"
platforms: ["iOS", "iPadOS", "Android (Material 3)", "macOS", "Windows/desktop apps", "Web (responsive)"]
sources: ["Apple Human Interface Guidelines", "Material Design 3 (incl. M3 Expressive)", "Nielsen Norman Group", "Laws of UX", "Google UX Design Professional Certificate", "Uxcel: Apple HIG, Introduction to Figma, Color contrast and accessibility review", "Figma Design for beginners", "Figma for Beginners (YouTube)", "freeCodeCamp: Learn Figma in 6 Hours", "Dan Scott: Figma UX/UI Essentials (free + Udemy)", "Designlab: Figma 101", "Scrimba: Learn UI Design Fundamentals (Gary Simon)", "Learn UI Design (Erik Kennedy) + free articles and tools", "Refactoring UI (Wathan & Schoger)", "Shift Nudge (Matt D. Smith)", "Canva Design School: Graphic Design Basics", "Brainmunk: Graphic Design Fundamentals", "Skillshare: UI Design Color Theory (Ruben Cespedes)", "Josh W. Comeau: Interactive Guide to CSS Transitions + Whimsical Animations", "Codecademy: Learn CSS Transitions and Animations", "Josh Collinsworth: Ten Tips for Better CSS Transitions", "Kole Jain: 11 Micro Animations (YouTube)", "Million Frames: Micro-interactions in Figma", "DesignerUp: Complete Guide to UI Animations", "ZTM: Motion Design with Figma", "Skillademia: Figma Motion Course", "Skillshare: Advanced Prototyping in Figma (Arash Ahadzadeh)", "School of Motion: UX Animation Essentials"]
---

# UI & HCI Design Guide for Mobile and Desktop

## 0. Purpose (read first)

**This document is a rulebook for producing good human–computer interaction and good user interfaces on phones, tablets and desktop computers (native apps and the web).** It merges 13 courses and official guidelines into one deduplicated, conflict-resolved set of rules with concrete values.

Use it whenever you have to:

1. **Design** a screen, flow, component or design system from scratch.
2. **Generate UI code** (SwiftUI/UIKit, Jetpack Compose/Views, HTML/CSS/React, Flutter, etc.) that must look and behave correctly.
3. **Review or critique** an existing interface and list concrete problems with fixes.
4. **Decide** between alternatives (e.g. tab bar vs drawer, dialog vs snackbar, checkbox vs switch).

The goal of every rule here is the same: **people can understand the interface at a glance, do what they came to do quickly and without errors, recover easily when something goes wrong, and feel respected, regardless of device, ability, language or context.**

### Contents
0. Purpose · 1. How to use this document · 2. The ten commandments · 3. Quick reference (numbers)
4. HCI principles and psychological laws · 5. Usability heuristics · 6. UX process
7. Layout, grids, spacing · 8. Typography · 9. Color, contrast, dark mode · 10. Icons, images, media
11. Components · 12. Navigation and IA · 13. Forms · 14. Feedback, loading, errors, empty states, motion (14.6–14.12: motion principles, timing, CSS, recipes, tools, stress tests)
15. Accessibility · 16. UX writing · 17. iOS/iPadOS · 18. Android (Material 3) · 19. Desktop (macOS, web, Windows)
20. Responsive/adaptive · 21. Ethics, privacy, permissions, onboarding · 22. Conflict log · 23. Review checklists
Appendix A. Figma tool tips · B. Sources and confidence · C. Glossary

---

## 1. How to use this document

### 1.1 Rule keywords
| Keyword | Meaning for you |
|---|---|
| **MUST** | Mandatory. Break it only with a strong, explicitly stated and tested reason. |
| **SHOULD** | Default behaviour. Deviate only when the context clearly calls for it, and say why. |
| **AVOID** | Default anti-pattern. Don't do it unless there is a strong, stated reason. |
| **NEVER** | Hard prohibition (accessibility failures, deceptive patterns, data loss). |

### 1.2 Confidence and source tags
- Rules without a mark are **verified**: they come from an official guideline (Apple HIG, Material 3 tokens/docs, WCAG) or from published NN/g research, and several sources agree.
- **†** = **inferred or unverified**: a well-established industry default, a value from a single course that couldn't be checked against the primary source, or an M3 value marked "spec knowledge" in the source notes. Treat as a strong default and verify before pixel-exact work.
- Source tags in brackets show where a rule comes from when it matters: **[Apple]** Apple HIG · **[M3]** Material Design 3 · **[NNg]** Nielsen Norman Group · **[LoUX]** Laws of UX · **[GUX]** Google UX Design Certificate · **[WCAG]** Web Content Accessibility Guidelines 2.x · **[Figma]** Figma courses · **[Kennedy]** Erik Kennedy / Learn UI Design · **[RUI]** Refactoring UI · **[Shift]** Shift Nudge · **[Comeau]** Josh W. Comeau · **[Motion]** the motion courses together (Collinsworth, Codecademy, Kole Jain, Million Frames, ZTM, Skillademia, Skillshare, DesignerUp, School of Motion).
- Values that a course demonstrates in its own project (e.g. "card opens with a Quick spring") are **examples**, not standards. They are marked "course value" and lose to platform tokens (§1.3).

### 1.3 Precedence when rules collide
Apply in this order (higher wins):

1. **Explicit user / product requirements** given in the task (brand, legal, platform targets).
2. **Accessibility and safety** (WCAG AA, no data loss, no deceptive patterns). Never trade these away for aesthetics.
3. **The target platform's conventions** (Apple HIG on Apple platforms, Material 3 on Android, web conventions on the web). A platform-specific rule beats a general rule in this document.
4. **Research-backed usability rules** (NN/g, Laws of UX).
5. **General visual-design defaults** (spacing scales, type scales, color ratios from the courses).

When two sources disagree on a number, this document already picked one and explains why in **§22 Conflict log**.

### 1.4 Recommended workflow for an AI
1. **Identify context**: platform(s), device class/window size class, primary input (touch, pointer, keyboard, stylus, voice), user, task, frequency of use, environment.
2. **Structure before style**: define the task flow → information architecture → screen layout (wireframe) → then visual design (§6, §12).
3. **Pick platform-native navigation and components first** (§11, §12, §17–§19); customize only when they fail.
4. **Apply the numeric defaults** (§3 quick reference) for targets, type, spacing, contrast, motion.
5. **Design every state**: default, hover, focus, pressed, selected, disabled, loading, empty, error, success, offline, long content, RTL, largest text size, dark mode.
6. **Run the checklists** in §23 before delivering. Report which rules you deliberately broke and why.

---

## 2. The ten commandments (if you remember nothing else)

1. **Follow platform and web conventions** (Jakob's Law). Users spend most of their time in *other* apps.
2. **One clear primary action per screen/region.** Make it visually dominant; everything else quieter.
3. **Always show system status.** Every action gets visible feedback within 100 ms; waits > 1 s get an indicator.
4. **Prevent errors first, then make recovery easy**: constraints, defaults, forgiving input, Undo, inline errors that say how to fix.
5. **Recognition over recall.** Visible labels, visible options, carried-forward context; never rely on memory.
6. **Targets ≥ 44×44 pt (iOS) / 48×48 dp (Android) / ≥ 24×24 CSS px (web, 44 preferred)**, well spaced.
7. **Contrast ≥ 4.5:1 for text, ≥ 3:1 for large text and UI parts. Never convey meaning by color alone.**
8. **Everything works with keyboard, screen reader, large text (200 %), reduced motion, and without gestures.**
9. **Less, but better**: remove anything that doesn't serve the user's goal; use progressive disclosure for the rest.
10. **Never deceive**: declining must be as easy as accepting; no fake urgency, sneaking or confirmshaming.

---

## 3. Quick reference: the numbers

### 3.1 Targets, spacing, layout
| Item | iOS / iPadOS | Android (M3) | macOS | Web / desktop |
|---|---|---|---|---|
| Recommended hit target | **44×44 pt** | **48×48 dp** | **28×28 pt** | **44×44 CSS px** (WCAG 2.2 AAA 2.5.5) |
| Absolute minimum hit target | **28×28 pt** (secondary only) | 48 dp (no lower official floor for touch) | **20×20 pt** | **24×24 CSS px** (WCAG 2.2 AA 2.5.8) |
| Physical equivalent | ≈ **1 × 1 cm** (NN/g) | ≈ 1 × 1 cm | n/a | ≈ 1 × 1 cm on touch screens |
| Space between targets | ~12 pt padding around bezeled, ~24 pt around bezel-less elements | ≥ **8 dp** † | same as iOS | ≥ 8 px †; enough that the target's 24 px circle doesn't overlap neighbours (WCAG) |
| Base spacing unit | **8 pt** grid, 4 pt for fine detail | **8 dp** grid, **4 dp** for icons/type/inner parts | 8 pt † | **8 px** (4 px for fine detail) |
| Screen side margins | layout margins / safe area (≈16–20 pt) | **16 dp** compact, **24 dp** medium+ | window content insets ≈ 20 pt † | 16 px mobile, 24–32 tablet †, desktop: center content with max width |
| Columns | n/a (use size classes) | **4** compact, **8** medium, **12** expanded † | n/a | **4 / 8 / 12** (mobile / tablet / desktop) |
| Gutter | — | 16–24 dp † | — | 16 px mobile, 24 px desktop (most common) |
| Max reading width | readable-width layout guide | **≈ 60 characters** short-form | readable width | **45–75 characters** body text; content container ≈ 1000–1280 px |

### 3.2 Typography
| Item | iOS / iPadOS | Android (M3) | macOS | Web |
|---|---|---|---|---|
| Body text default | **17 pt** (Body, leading 22) | **16 sp** body-large (lists, inputs) / **14 sp** body-medium (default paragraph) | **13 pt** (Body, line 16) | **16 px** (1 rem) |
| Smallest allowed text | **11 pt** (Caption 2) | **12 sp** body; **11 sp** label-small for labels only | **10 pt** | 12 px for captions †; never body < 16 px on mobile web |
| Text scaling | support ≥ **200 %** (Dynamic Type up to AX5) | sp units, test at **200 %** | no Dynamic Type | rem units, zoom to **200 %** without loss (WCAG 1.4.4) |
| Typefaces per product | 1–2 (system font for body/captions) | 1–2 (brand + plain) | 1–2 | ≤ 2 families |
| Body line height | per text style (~1.3×) | per token (16/24, 14/20 → ~1.4–1.5×) | per style | **1.4–1.6×** † |

### 3.3 Color and contrast (WCAG 2.x AA, used by Apple, Google and NN/g)
| Element | Minimum contrast |
|---|---|
| Normal text (< 18 pt / < 24 px regular, < 14 pt / < 18.66 px bold) | **4.5:1** |
| Large text (≥ 18 pt / 24 px, or ≥ 14 pt / 18.66 px bold) | **3:1** |
| UI components, icons, input borders, focus indicators, meaningful graphics | **3:1** against adjacent colors |
| Enhanced (AAA) target, recommended by Apple for custom colors and small text | **7:1** normal, 4.5:1 large |

### 3.4 Time and motion
| Item | Value |
|---|---|
| Feels instantaneous | **≤ 100 ms** (acknowledge every input within this) |
| Flow-preserving response (Doherty threshold) | **< 400 ms** |
| Train of thought kept | **≤ 1 s** (no indicator needed below this) |
| Show a busy indicator | waits **> 1 s** (spinner/loading indicator, with text from ~2 s) |
| Show determinate progress + estimate + Cancel | waits **≥ 10 s** |
| Micro-feedback animation (checkbox, toggle, ripple) | **~100 ms** (50–200 ms) |
| Component transitions (menus, sheets, dialogs) | **200–300 ms** (enter slightly longer than exit) |
| Full-screen transitions | **300–500 ms** (M3 long tokens up to 600 ms on large/mobile full-screen moves) |
| Feels sluggish | **≥ 500 ms** for frequent UI |
| Hover-intent delay (mega menus, hover cards) | **~500 ms** rest before open, open within 100 ms |
| Press feedback (scale/darken on pointer-down) | **instant to ~100 ms** (Comeau's 3D button: 34 ms down) [Comeau] |
| Hover in / hover out (asymmetric) | in **100–150 ms**, out **250–450 ms** (the return to rest may linger) [Comeau, Kennedy] |
| Tooltip open delay | first tooltip **500–700 ms**, then **instant** for neighbouring tooltips while the pointer stays in the group † |
| Dropdown/menu close on pointer leave | delay **~300 ms** before closing (forgives diagonal mouse paths) [Comeau] |
| Stagger between list items | **20–50 ms** per item; cap the whole sequence at ~300–500 ms [Motion] |
| Single CSS transition, typical | **150–400 ms**; exit + enter sequence ≈ 2× plus a small gap [Motion] |
| Flashing | never more than **3 flashes per second** |
| Auto-moving content | lasting **> 5 s** must be pausable |

### 3.5 Counts and limits
| Item | Value |
|---|---|
| Bottom tab bar / navigation bar destinations | **3–5** (Android: 3–5; iOS: ≤ 5 default) |
| Navigation rail destinations | 3–7 † |
| Segmented control segments | **2–5** (≤ ~5 on iPhone, up to ~7 on wide UIs) |
| Radio buttons before switching to a menu/pop-up | **2–5** (≤ ~5) |
| Pull-down / overflow menu | **≥ 3** items to justify it; 1–2 actions → separate buttons |
| Alert/dialog buttons | **≤ 3** |
| Prominent (filled) buttons per view | **1** (Apple allows 1–2) |
| FABs per screen | **1** |
| Context-menu separator groups | ≤ ~3 |
| Submenu depth | **1** level |
| macOS tab view tabs | ≤ **6** |
| Page control dots | ≤ **10** |
| Carousel frames | ≤ **5** |
| Home-screen quick actions (iOS) | 1–4 |
| Type sizes per view (visual hierarchy) | ≤ **3** main sizes; ≤ 2 large elements |
| Color palette | ~2 primary + 2 secondary + neutrals + semantic colors; **60-30-10** distribution |
| Optional form fields | ≤ 1–2, clearly marked "(optional)" |
| Usability test participants per round | **5** (5–8 per user group) |
| Tooltip/help-tag length | **≤ 60–75 characters** |
| Toolbar/nav title | **< 15 characters** |

---

## 4. HCI principles and psychological laws

These explain *why* the concrete rules exist. Use them to judge situations no rule covers. The laws guide design; **they don't replace user research** [LoUX].

### 4.1 Foundational design principles (merged Apple HIG, Google UX, NN/g)
| Principle | What it means | Concrete consequence |
|---|---|---|
| **Purpose / usefulness** | Solve a real, researched user problem. | Every feature and element must justify itself by the user's goal; remove the rest. |
| **Clarity / simplicity** | Include just what's necessary; "simplicity isn't minimalism" [Apple]. | Clear hierarchy, concise copy, recognisable controls, people always know where they are and what's next. |
| **Familiarity / consistency** | Build on what people know; once a behaviour or look is set, apply it everywhere. | Platform components, standard icons, same term for the same thing, same position for the same control. |
| **Agency / user control** | Let people do things their own way; no locked flows or modes. | Guided flows are skippable/escapable; reversible actions; recovering never costs time or work. |
| **Feedback** | Show when controls are available, when content changes, what happened. | Pressed/selected states, progress, confirmation of significant outcomes, explanations when something can't run. |
| **Flexibility / equity** | Design for everyone from the start; support many inputs and contexts. | Accessibility, multiple input methods, localisation, low bandwidth, low literacy. |
| **Responsibility** | Act in people's best interest. | Transparent data use, minimal data collection, no manipulation. |
| **Craft / delight** | Quality in every detail; delight never at the expense of the task. | Polish motion, wording and visuals; don't mistake decoration for delight. |
| **Good UX = usable, equitable, enjoyable, useful** [GUX] | Check every design against all four. | — |

### 4.2 Laws of UX (30 laws, merged with NN/g and Google UX)
Grouped by concern. Each law: essence → rules.

**Perception and grouping (Gestalt)**
- **Proximity**: near = related. MUST make spacing inside a group visibly smaller than spacing between groups; MUST place labels, hints and errors next to the control they describe.
- **Common region**: items inside a clear boundary form a group. Use cards, panels, fieldsets; AVOID boxes inside boxes ("card soup"). Try spacing first, then containers.
- **Similarity**: look-alike = same function. MUST give interactive elements (links, buttons) a style distinct from static content; one visual style per meaning.
- **Uniform connectedness**: visually connected = related (lines, shared backgrounds, steppers).
- **Prägnanz (simplicity)**: people perceive the simplest form. Use simple shapes, simple icons, simple charts, a grid.
- **Figure-ground, continuity, closure, focal point, symmetry, common fate** [GUX]: separate foreground (modal, card) from background (scrim, elevation); align items on lines; partially visible cards signal more content; one focal element; things that move together are a group.

**Memory**
- **Miller's Law (7±2)** and **Working memory (4–7 chunks, short-lived)**: MUST NOT require people to remember information between screens; carry context forward, show summaries of earlier choices. MUST NOT use "7" as a limit on *visible* items: long, well-grouped, scannable lists are fine [LoUX].
- **Chunking**: group information into meaningful units. MUST format long identifiers in groups (card `4242 4242 4242 4242`, phone numbers, IBAN, OTP 3+3); split long forms into titled sections.
- **Serial position effect**: first and last items are remembered best. SHOULD place key items first and last (e.g. Home first, primary CTA last in a nav bar); least important in the middle.
- **Zeigarnik effect**: unfinished tasks stick in mind. Show progress, remaining items, resume banners, autosaved drafts. MUST NOT fake incompleteness to manipulate.
- **Peak-end rule**: people judge an experience by its peak and its end. MUST design endings (success screens, confirmations) and error states deliberately and humanely.

**Decisions**
- **Hick's Law**: more and more complex choices = slower decisions. Reduce and group options, use progressive disclosure, MUST highlight a recommended/primary option when offering several.
- **Choice overload**: too many options paralyse. Provide search, filters, smart defaults; MUST put comparable items side by side, not across pages.
- **Cognitive bias**: use defaults, social proof and framing only when honest and in the user's interest; MUST NOT exploit biases (see §21).
- **Pareto (80/20)**: ~20 % of features carry ~80 % of use. Make the most-used features the most visible and polished; de-emphasise (don't remove) the long tail, which still includes real needs such as accessibility.

**Effort and simplicity**
- **Cognitive load**: mental effort to use the UI. MUST remove elements that don't support the goal; MUST pair non-universal icons with text labels.
- **Occam's razor**: the solution with the fewest assumptions wins; "done when nothing more can be removed".
- **Tesler's Law (conservation of complexity)**: irreducible complexity can only be moved. MUST move it into the system (autofill, smart defaults, computing derived values) rather than onto the user; simplify the *interface*, never hide what users need to understand or control.
- **Parkinson's Law**: tasks expand to fill the time available. Support autofill (correct input types and `autocomplete`), reuse known data, state expected duration and beat it.

**Motor and speed**
- **Fitts's Law**: time to acquire a target = f(distance, size); `T = a + b·log₂(2D/W)`. Make targets big and close to where the hand/pointer already is; include the label in the hit area; space adjacent targets (especially destructive ones). On desktop, screen edges and corners are "infinite" targets; on touch, edges give no advantage. Put the submit button right after the last form field.
- **Doherty threshold**: productivity soars when system response is **< 400 ms**. Acknowledge input within ~100 ms; use optimistic UI, skeletons and background work; show progress beyond ~1 s. Add an artificial delay only when it truthfully communicates work.
- **Flow**: challenge ≈ skill, clear goals, immediate feedback. Keep core loops uninterrupted (no pop-ups mid-task), prefer Undo over confirmation, offer expert shortcuts.

**Attention and emphasis**
- **Selective attention**: people filter for goal-relevant stimuli; content that looks like an ad is ignored (banner blindness). MUST show feedback near the point of focus; MUST NOT style essential content like advertising.
- **Von Restorff (isolation) effect**: the item that differs is remembered. Emphasise only the single most important element per region; combine color with another cue; respect reduced motion when using motion for emphasis.
- **Aesthetic-usability effect**: attractive designs are perceived as easier and earn tolerance, but beauty can mask usability problems in tests → MUST measure behaviour (success, time, errors), not only opinions.

**Expectations and learning**
- **Jakob's Law**: users expect your product to work like the ones they already know. MUST follow platform conventions; innovate only when clearly better and tested; provide a transition path (preview, opt-in, revert) for major redesigns.
- **Mental models**: users' beliefs about how the system works. Research them (interviews, card sorting, tests); match the UI to them or improve them with clear labels; never reuse a familiar cue with a new meaning.
- **Paradox of the active user**: people never read manuals; they start immediately. MUST assume nobody reads instructions first; teach in context, at the moment of need.

**Motivation**
- **Goal-gradient effect**: effort increases near the goal. MUST show progress and remaining steps in multi-step flows ("Step 2 of 3"); never let progress move backwards or stall at 99 %.

**Robustness**
- **Postel's Law**: be liberal in what you accept, conservative in what you send. MUST accept and normalise reasonable input variants (spaces, dashes, case, diacritics, date formats); MUST state constraints up front; output consistent, predictable formats.

**Known tensions and how to resolve them**
- Hick/Occam (simplify) vs Tesler (complexity must live somewhere) → simplify the interface, not the capability; hide advanced options, never essential ones.
- Jakob (familiar) vs differentiation → default to convention; novelty only for real differentiation, and test it.
- Von Restorff vs banner blindness → emphasise one thing, never in ad-like style or ad positions.
- Persuasion vs ethics → use psychology to *empower, not exploit* [GUX].

---

## 5. Usability heuristics (Nielsen's 10, with applied rules)

Use these for heuristic evaluation of any screen.

1. **Visibility of system status.** Keep users informed through timely feedback. MUST confirm every interaction (pressed state, item added, request done). Show backstage state that affects the user (low stock, unavailable items marked individually, progress toward thresholds). Communicate state *before* actions with consequences. Long processes show steps done/remaining and time; a bare spinner is inadequate past ~10 s.
2. **Match between system and real world.** Use the users' language, not internal jargon, codes or system terms. Follow real-world conventions and natural ordering; never use a conventional symbol with a different meaning.
3. **User control and freedom.** Provide clear "emergency exits": **Back** (one step back in the user's real history), **Cancel** (quit a task at any point), **Close**, **Undo/Redo**. NEVER hijack the browser/OS Back button. Forms MUST survive Back (preserve data). Overlays that look like screens close on Back. Cancel of composed content offers "Save draft / Delete". Make Undo discoverable (toolbar, menu with shortcut, snackbar with enough time); don't rely on shake-to-undo alone.
4. **Consistency and standards.** Internal (same term, look, position everywhere) and external (platform/web conventions). Standard positions: logo top-left → home (web), search top, cart top-right, close in the platform's place.
5. **Error prevention.** Eliminate error-prone conditions or check before commit. See §13.4 (slips vs mistakes, constraints, defaults, forgiving formats, confirmations).
6. **Recognition rather than recall.** Visible options, menus, recent items, search history/autocomplete, persistent labels (not placeholders), instructions visible during the step, summaries of earlier choices.
7. **Flexibility and efficiency of use.** Accelerators for experts that novices don't need to see: keyboard shortcuts (shown next to menu items and in tooltips), gestures (always with a visible alternative), batch actions, saved preferences, remembering last-used parameters. Don't rely on customisation: most users never customise.
8. **Aesthetic and minimalist design.** Every extra unit of information competes with the relevant ones. Remove decoration that doesn't aid comprehension; defer rarely used options (progressive disclosure). Minimalist ≠ flat or empty.
9. **Help users recognise, diagnose and recover from errors.** Plain language, no codes as the main message, precise problem, constructive fix, visible error styling (text + icon + color). See §14.4.
10. **Help and documentation.** Best if not needed. Prefer **pull** help (contextual, triggered by the user's current task: inline hints, tooltips, empty-state guidance) over **push** help (tours, launch tips). Reactive help must be searchable, task-focused, scannable, text-first (never video-only), and reachable again after dismissal.

**Top 10 application-design mistakes [NNg]** (check for these explicitly): poor feedback · inconsistency · bad error messages · no default values · unlabeled icons · hard-to-acquire targets (weak signifiers, tiny) · overuse of modals · meaningless information (IDs as primary labels) · junk-drawer menus ("More", "Tools") · destructive actions next to confirmation actions.

---

## 6. UX process (how to arrive at a good UI)

### 6.1 Frameworks
- **Design Thinking** (main framework, non-linear): **Empathize → Define → Ideate → Prototype → Test**, then iterate [GUX].
- **User-centred design**: Understand context → Specify requirements → Design → Evaluate.
- **Five elements of UX** (abstract → concrete): Strategy → Scope → Structure → Skeleton → Surface. Decide in this order; don't polish the surface before the structure works.
- **Double Diamond**: Discover → Define → Develop → Deliver. **Lean UX**: Think → Make → Check.
- **Design sprint**: 5 days: Understand → Ideate/Sketch → Decide → Prototype → Test.

### 6.2 Research and definition artifacts
- **Research types**: foundational (what to build: interviews, surveys, field/diary studies), design (how: usability tests, A/B, card sorting), post-launch (did it work: metrics, A/B). Qualitative = why/how; quantitative = how many.
- **Empathy map**: Says / Thinks / Does / Feels.
- **Pain points**: financial, product, process, support.
- **Personas** (3–8 per product, based on research, behaviour and goals, not stereotypes). A persona stops you designing for yourself or for "everyone" and settles taste debates ("what suits Sarah?").
- **User story**: "As a [user], I want to [action] so that [benefit]."
- **Edge cases**: mononymous names, very long names, no address, lost connection mid-payment, empty data, huge data. Design graceful recovery.
- **Journey map**: actions → tasks → feelings → improvement opportunities (also for users with disabilities).
- **Problem statement**: "[User] is a [characteristics] who needs [need] because [insight]." **Hypothesis**: "If [action], then [outcome]." **Goal statement**: "Our [product] will let users [action], which will affect [who] by [impact]. We will measure effectiveness by [metric]."
- **Competitive audit**: 5–10 direct + indirect competitors, consistent criteria and rating scale; find patterns and gaps.
- **Ideation**: How Might We…?, Crazy Eights (8 sketches in 8 minutes), quantity first, judge later.

### 6.3 Structure: flows and information architecture
- **Task flow** = one linear path for one job; **user flow** = multiple paths/decisions to the same goal (reveals dead ends, loops, stuck points). Notation: circle = action, rectangle = screen, diamond = decision, arrows. Include error and alternative paths.
- **IA** = organisation + hierarchy + sequence. Dan Brown's principles: objects, choices (fewer, well organised), disclosure, exemplars, **front doors** (assume ≥ half of users land on an inner page), multiple classification, focused navigation (don't mix navigation types in one menu), growth.
- **Site structures**: hierarchical (tree, most common), sequential (checkout), matrix, database (catalog with search/filters). Build sitemaps from IA + card sorting.
- **Storyboards**: big-picture (context, emotion) and close-up (screen by screen).

### 6.4 Fidelity ladder
1. **Paper sketches**: ≥ 5 alternatives per key screen, combine the best parts.
2. **Lo-fi wireframes**: greyscale + at most one accent color, one neutral font, boxes with an X for images, lines for text, real labels for headlines/buttons, generic placeholder copy. Purpose: test structure and flow without taste debates.
3. **Lo-fi prototype**: wireframes linked into a clickable flow → usability test.
4. **Style foundations**: color palette, type scale, spacing, radius, elevation, icons as tokens/styles (§7–§10).
5. **Mockups** (hi-fi static) built from components → **hi-fi prototype** with real content, transitions and states → test again.
6. **Handoff**: specs, tokens, all states, annotations (accessibility, motion), exported assets.

### 6.5 Usability testing
- Test with **5 users per round** (5–8 per user group), iterate. Include diverse participants and assistive-technology users.
- Moderated (deeper, can probe) or unmoderated (faster, cheaper, larger). Think-aloud; "we're testing the design, not you".
- Task prompts are realistic and **never contain UI labels** ("You want to label an email as 'Travel'. Show me how." not "Click Labels").
- Avoid bias: leading questions, confirmation, friendliness, social desirability, Hawthorne effect.
- KPIs: task success, time on task, error rate, drop-off, conversion, navigation vs search use, **SUS** (0–100), NPS.
- Synthesis: affinity diagram → themes → insights (observation + why it matters + recommendation). Priority: **P0** blocks the main flow / accessibility / deception → fix first; **P1** important; **P2** nice to have.
- Test mobile designs **on a real phone** at 100 % zoom: tap targets, legibility, contrast, broken links, colors.
- Privacy: collect only needed PII, informed consent, de-identify, secure storage.

### 6.6 Cross-device strategy
- **Mobile-first**: design the smallest screen first to force prioritisation, then enhance. **Progressive enhancement** (basic core everywhere, richer where capable) is preferred over **graceful degradation**.
- Decide mobile-first vs desktop-first from real traffic/usage data.
- **4 Cs** [GUX]: **Consistency** (same brand, voice, core patterns), **Continuity** (stop on one device, continue on another), **Context** (design for where/when/how each device is used), **Complementary** (each device adds unique value).
- **Mobile-first is not mobile-only** [NNg]: content and feature parity across devices, but not identical UI. Don't port mobile patterns (hamburger, search icon instead of box, "More" tabs) to desktop.
- Native app vs responsive web: native for device features, performance, frequent use; web for reach, no install, occasional use, SEO.

---

## 7. Layout, grids and spacing

### 7.1 Visual hierarchy
- MUST decide content priority first, then express it with **scale, color/contrast, position and grouping** [NNg].
- Most important items **near the top and leading side** (reading order; mirrored in RTL).
- Use **≤ 3 type sizes** for the main hierarchy (body / subheading / heading) and **≤ 2 large elements** per view [NNg]. Example web scale: body 14–16 px, subhead 18–22 px, header up to 32 px.
- Give the most important element the most surrounding space.
- **Squint/blur test**: blur the screen 5–10 px; intended groups and the focal element must still be obvious. If you can't tell where to look, hierarchy is missing.
- Anti-pattern: everything the same size and color, all caps, no breathing room.
- Prominence MUST match importance: a button that looks more important than it is misleads [Figma/Dan Scott].
- **Align** elements for scanning; **indent** to show subordination; **group** with whitespace first, then containers or separators.
- **Progressive disclosure**: reveal advanced/rare options via disclosure controls, menus, "More details" sections.
- **Design in grayscale first** [Kennedy, RUI, Scrimba]: get hierarchy right with spacing, size, weight and lightness; add color last. If the screen only works in color, hierarchy is missing.
- **De-emphasise before you emphasise** [RUI]: instead of making the primary element louder, make competitors quieter (lighter color, smaller weight, less contrast within the AA limit).
- Express hierarchy with **color and weight before size** [RUI]: about **3 text colors** (primary, secondary, tertiary) and **2 weights** (regular 400–500 + bold 600–700). Never weights below 400 for UI text.
- **SLUB labels** [Kennedy]: secondary labels can be **S**maller, **L**ighter (≈ 70–90 % of the text color), **U**ppercase (short labels only, +0.05 em tracking) and/or **B**old. Use one or two of these, not all four.
- **Labels are a last resort** [RUI]: when the format explains the data (email, phone, price), drop the "Email:" label or combine it into the value ("12 left in stock"). Keep labels in forms and dense data screens.
- **Review order for any visual critique** [Scrimba, Shift]: (1) whitespace and alignment, (2) contrast and scale, (3) typography and color, (4) overall hierarchy. Fix the earliest broken layer first; later fixes rarely save a broken grid.
- **Light comes from above** [Kennedy]: raised elements get a lighter top edge and a shadow below; inset elements (inputs, wells) get a shadow at the top inside. Never mix light directions.

### 7.2 Spacing system
- MUST use a spacing scale on an **8-point base**: `4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 96…` (4 for fine detail inside components). Avoid arbitrary values (7, 13, 27).
- Same relationship → same gap. Intra-group gap < inter-group gap.
- Typical values: item spacing 8, component padding 16, card padding 16, section padding 24–56 vertical (larger = more emphasis), screen margins 16 (compact) / 24 (larger) [M3, Figma].
- Paragraph spacing: about **half the font size** (or a quarter) via "space after", never empty lines [Figma/Dan Scott].
- Align icons/type to a 4-pt baseline where possible.
- Adjacent steps of a spacing (or type) scale MUST differ by **≥ ~25 %** [RUI]: near-equal values (18 vs 20, 14 vs 15) look like mistakes, not decisions. Refactoring UI scale: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256`.
- **Start with too much whitespace**, then remove [RUI]. Dense UIs are a deliberate choice, not the default.
- **Outer spacing > inner spacing** (Law of Locality) [Kennedy, RUI]: the space around a group MUST be larger than the space inside it, otherwise labels look attached to the wrong field.
- Spacing by role † [Brainmunk, Shift]: inside a component 8–16; between components 16–32 (Shift Nudge: 16 for related, 20 standard); card padding 24; between sections 48–64 (up to 96–128 on marketing pages).
- Don't fill the whole screen just because it is there [RUI]: give content the width it needs (forms ≈ 400–600 px, reading column ≈ 50 rem max) and let the rest be margin.

### 7.3 Grids
| Device class | Frame width (design) | Columns | Margin | Gutter |
|---|---|---|---|---|
| Phone (compact) | 360–402 (common presets 375, 390, 393, 411) | 4 (or 6 when finer alignment needed) | 16 | 16 |
| Tablet (medium) | 744–834 | 8 | 24–32 † | 16–24 † |
| Desktop / web | 1280–1440 (design at 1440) | 12 | stretch with 40–120 margins, or fixed centered container ≈ 1000–1280 | 24 (20–32) |

- 12 columns on desktop because it divides into 2/3/4/6 and matches frameworks (Bootstrap gutter 1.5 rem = 24 px; Tailwind unit 0.25 rem = 4 px).
- Native apps usually don't need column grids; use the 8-pt spacing system plus platform layout margins and safe areas.
- Element widths should be whole numbers of columns (a card = 3 of 12 columns → 4 per row).
- **Very wide screens**: cap content width (container system: full-bleed outer block for backgrounds + centered inner content with max width), so text and navigation don't stretch across a 4K monitor.
- Grid types: column (default), modular (galleries), hierarchical (editorial/detail), manuscript (single column reading), baseline (vertical rhythm, 4 or 8 pt).

### 7.4 Safe areas, insets and system UI
- MUST respect **safe areas** (notch/Dynamic Island, rounded corners, home indicator, status bar, camera housing on Mac) and platform layout margins.
- Android **edge-to-edge**: draw backgrounds and scrolling content behind system bars; pad interactive content by system-bar insets; NEVER place tap/drag targets under system gesture insets; respect display cutouts. Use a protection gradient/scrim behind status bars when content scrolls under.
- iOS/iPadOS/macOS (Liquid Glass era): full-bleed content extends under sidebars, toolbars and tab bars; separate floating bars from content with the **scroll edge effect**, not with custom opaque backgrounds.
- macOS: NEVER put controls or critical info at the **bottom of a window** (windows get dragged partly off-screen) or in a sidebar's bottom area.

### 7.5 Containment and surfaces
- Implicit containment (whitespace, alignment, type) first; explicit (cards, dividers, surface colors, borders) when whitespace isn't enough [M3, NNg].
- Cards = one subject with content + actions; don't use cards for simple lists; avoid several competing tap targets in one card (make the whole card one target where possible).
- Dividers: 1 dp/pt, low-contrast decorative color; full-width between sections, inset (16) inside lists. Prefer whitespace.
- **Elevation** communicates layering (z-axis): use it only for hierarchy, focus, or draggable feel. In M3, elevation is expressed mainly with tonal surface colors; shadows sparingly.
- Shadows MUST be subtle ("if someone notices, it's too strong"): soft, low opacity, dark grey not pure black, one consistent light source (from above). Useful defaults †: small `y 1–2, blur 2–4, 5–10 % black`; medium `y 4, blur 12–16, 8–12 %`; large `y 8–16, blur 24–40, 10–15 %`. Layering one large soft shadow + one small contact shadow looks natural.
- **Shadow scale (web reference, Tailwind v1 / Refactoring UI)**. Use these as the elevation tokens when a project has none. Every level except the smallest is **two shadows**: a large soft one for distance plus a tight one for contact.
  | Token | CSS `box-shadow` | Use |
  |---|---|---|
  | xs | `0 0 0 1px rgba(0,0,0,.05)` | hairline ring instead of a border |
  | sm | `0 1px 2px 0 rgba(0,0,0,.05)` | inputs, flat buttons |
  | base | `0 1px 3px 0 rgba(0,0,0,.10), 0 1px 2px 0 rgba(0,0,0,.06)` | cards at rest |
  | md | `0 4px 6px -1px rgba(0,0,0,.10), 0 2px 4px -1px rgba(0,0,0,.06)` | raised cards, hover |
  | lg | `0 10px 15px -3px rgba(0,0,0,.10), 0 4px 6px -2px rgba(0,0,0,.05)` | dropdowns, popovers |
  | xl | `0 20px 25px -5px rgba(0,0,0,.10), 0 10px 10px -5px rgba(0,0,0,.04)` | dialogs |
  | 2xl | `0 25px 50px -12px rgba(0,0,0,.25)` | modal hero, drag preview |
  | inner | `inset 0 2px 4px 0 rgba(0,0,0,.06)` | wells, pressed/inset fields |
- Kennedy's crisp alternative (flatter, "app-like"): `0 1px 2px` black at **30 %** or `0 2px 3px` at **20 %** on light backgrounds (≈ 40 % on dark); a 1 px border of black at ≈ 20 % (≈ 50 % on saturated surfaces) [Kennedy].
- **Elevation = meaning** [RUI]: the higher an element (bigger shadow), the closer and more "grabbable" it is. A dragged item gets a larger shadow than at rest; a pressed button gets a smaller one.
- On **dark surfaces**, shadows barely show: separate modules with a lighter surface plus a **1 px inner stroke of white at ≈ 10 %** [Shift] (M3: tonal surface levels).
- **Use fewer borders** [RUI]: separate with spacing, a background tint or a shadow instead. When a border is needed for affordance (inputs, 1.4.11), it MUST reach **3:1**.
- **Accent borders** [RUI]: a 2–6 px colored bar on the top or leading edge of a card, alert or active nav item adds polish and signals state without extra elements.
- **Nested corner radius**: inner radius = outer radius − padding (keep curves concentric). Same element type = same radius across the product.
- Modals/overlays sit on a **scrim** (≈ 32–50 % dark overlay †) that separates them from content.

### 7.6 Reading and scanning layouts
- **79 % of users scan; 16 % read word by word** [NNg]. Write and lay out for scanning (§16).
- **F-pattern** on text-heavy pages: users read the first lines and the first words of each line; put key information in the first two paragraphs and front-load headings, links and list items (**first 2 words carry the gist**).
- **Layer-cake pattern** (best): users read headings and dive in → write literal, meaningful subheadings.
- **Z-pattern** for simple landing pages: logo → nav → hero → CTA.
- **Scroll and attention**: ~57 % of viewing time is above the fold, ~74 % in the first two screenfuls → put the highest-priority content and main CTAs at the top. Avoid **false floors** (layouts that look finished); let content cut off at the fold to signal scrolling.
- Left-align text meant to be scanned (lists, menus, feeds, paragraphs); center only short headings or single-line labels. Don't justify text (uneven gaps, worse for dyslexia).

---

## 8. Typography

### 8.1 Universal rules
- MUST use **one type scale** (named styles/tokens); don't invent ad-hoc sizes.
- MUST limit to **1–2 typefaces** (e.g. brand/display + UI/body; or the system font for everything). A common pattern: custom font for headlines, **system font for body and captions** [Apple].
- MUST size text in scalable units (iOS text styles/Dynamic Type, Android **sp**, web **rem**) and keep layouts working at **200 %** text size: no clipping, no overlap.
- AVOID light/thin weights (Ultralight, Thin, Light) for UI text, especially at small sizes and in dark mode. Use Regular, Medium, Semibold, Bold.
- Hierarchy through **size and weight** first, color second; never color alone.
- Line length **45–75 characters** for body text (≈ 60 ideal); cap container widths on large screens.
- Line height ≈ **1.4–1.6×** for body text †; tighter for headings; never tight leading for 3+ lines [Apple].
- Paragraph spacing via styles, not empty lines.
- Don't use ALL CAPS for long text or buttons (M3 dropped all-caps buttons; Apple uses title/sentence case). Limit italics.
- Body text should not be pure `#000` on pure `#FFF` for long reading on web †; use near-black (e.g. `#111`–`#222`, or a dark tint of the brand hue) while keeping ≥ 4.5:1 (ideally ≥ 7:1).
- Use **tabular (monospaced) figures** for tables, prices, timers and changing numbers; slashed zero for codes.
- Right-align numbers in tables; left-align text; keep consistent decimals and locale formats.
- Truncate variable text with an ellipsis and a max line count **only** when the full text is available elsewhere (detail view, tooltip on desktop). Minimise truncation; never truncate in scrollable regions at large text sizes.
- Forms (especially payments): neutral, legible font at **16 px/pt Regular**; no decorative fonts.
- Fonts MUST be licensed for the target use (app, web, desktop licences differ). Google Fonts are free for commercial use.
- Judge type at **100 % zoom on the real device**.
- **Rule of three sizes** [Shift]: most screens need only three sizes (title, body, small). A fourth is a decision, not a habit. Kennedy: about **4 sizes** in a whole app.
- Adjacent sizes in a scale MUST differ by **≥ ~1.2–1.25×** [Scrimba, RUI]; 15 vs 16 px reads as an error. Refactoring UI hand-picked scale (px): `12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72`. A hand-picked scale beats a strict modular ratio, which yields fractional and too-few useful sizes.
- Body sizes by context [Kennedy]: **web on mobile 16–20 px; web on desktop 18–24 px** for content sites; **apps 14–20 px** (dense tools can use 14). Inputs ≥ 16 px.
- Line height is **inversely proportional to size** [RUI]: body **1.5** (1.4–1.6), long lines up to 1.75, headings **1–1.25**, display text ≈ 1.0–1.1. Wider columns need more leading.
- **Letter-spacing** [RUI, Kennedy]: tighten large headings (≈ **−0.01 to −0.025 em**); loosen ALL CAPS and small caps (≈ **+0.05 em**); leave body at 0.
- Mixed sizes on one line (price + unit, title + metadata) MUST **align on the baseline**, not centered vertically [RUI].
- Pick typefaces with many weights (≥ 5) and a tall x-height for UI; avoid display faces for body. ≤ 2 families (3 is the hard maximum) [Canva, Scrimba].
- On large display text, check kerning of awkward pairs: **A, K, V, W, Y** next to each other, and **F, L, T** before lowercase [Canva]. Never kern body text by hand.
- Left-align body text; justified text creates rivers and hurts dyslexic readers (also WCAG 1.4.8 AAA) [Canva, NNg]. Center only 1–3 lines.

### 8.2 iOS / iPadOS text styles (default "Large" Dynamic Type size; size/leading in pt)
| Style | Size / leading | Weight |
|---|---|---|
| Large Title | 34 / 41 | Regular (emphasised: Bold) |
| Title 1 | 28 / 34 | Regular (Bold) |
| Title 2 | 22 / 28 | Regular (Bold) |
| Title 3 | 20 / 25 | Regular (Semibold) |
| Headline | 17 / 22 | **Semibold** |
| Body | **17 / 22** | Regular |
| Callout | 16 / 21 | Regular |
| Subheadline | 15 / 20 | Regular |
| Footnote | 13 / 18 | Regular |
| Caption 1 | 12 / 16 | Regular |
| Caption 2 | 11 / 13 | Regular |

- Dynamic Type has 7 standard sizes (xSmall–xxxLarge) + 5 accessibility sizes (AX1–AX5; Body = 28 pt at AX1, 53 pt at AX5). Support all; at large sizes **stack horizontal layouts vertically**, reduce columns, let rows grow, allow multi-line labels; keep primary content on top. Don't let tab titles grow; scale meaningful icons with text (SF Symbols do).
- System font: SF Pro (optical sizes Text ≤ 19 pt / Display ≥ 20 pt applied automatically), SF Pro Rounded, SF Mono, New York (serif). Don't embed system fonts; the system applies tracking automatically (e.g. 17 pt → −0.43 pt; 11 pt → +0.06 pt; ≥ 80 pt → 0).
- Custom fonts MUST support Dynamic Type and Bold Text.

### 8.3 macOS text styles (no Dynamic Type)
| Style | Size / line height | Weight |
|---|---|---|
| Large Title | 26 / 32 | Regular |
| Title 1 | 22 / 26 | Regular |
| Title 2 | 17 / 22 | Regular |
| Title 3 | 15 / 20 | Regular |
| Headline | 13 / 16 | **Bold** |
| Body | **13 / 16** | Regular |
| Callout | 12 / 15 | Regular |
| Subheadline | 11 / 14 | Regular |
| Footnote / Caption 1 / Caption 2 | 10 / 13 | Regular / Regular / Medium |

### 8.4 Material 3 type scale (sp; web: px, rem = px/16)
| Token | Size / line height | Weight | Tracking |
|---|---|---|---|
| display-large / medium / small | 57/64 · 45/52 · 36/44 | 400 | −0.25 / 0 / 0 |
| headline-large / medium / small | 32/40 · 28/36 · 24/32 | 400 | 0 |
| title-large | 22/28 | 400 | 0 |
| title-medium / small | 16/24 · 14/20 | 500 | 0.15 / 0.1 |
| body-large / medium / small | **16/24** · **14/20** · 12/16 | 400 | 0.5 / 0.25 / 0.4 |
| label-large / medium / small | 14/20 · 12/16 · 11/16 | 500 | 0.1 / 0.5 / 0.5 |

- Roles: **Display** = hero numbers/short high-impact text (mostly large screens); **Headline** = screen titles on large screens, dialog titles (headline-small); **Title** = app bars (title-large), list/card titles, tabs (title-small); **Body** = long text (lists use body-large + body-medium); **Label** = text inside components (buttons/chips label-large, nav labels label-medium, badges label-small).
- M3 Expressive adds an **emphasized** version of each style (heavier weight) for selection, actions and editorial hierarchy.
- On large/desktop screens move type **one or two steps up** the scale (e.g. reading views at 18–24 sp).

### 8.5 Web/desktop type scale (default when no platform scale applies) †
| Role | Desktop web | Mobile web |
|---|---|---|
| H1 / Display | 48–64 px | 32–34 px |
| H2 | 32–40 px | 24–28 px |
| H3 | 24–28 px | 20–22 px |
| H4 / lead | 18–20 px | 18 px |
| Body | **16–18 px** | **16 px** |
| Small / secondary | 14 px | 14 px |
| Caption | 12 px | 12 px |
- Build with a modular ratio (1.2–1.333) or a simple set such as 72/48/32/24/18/16. Body never below 16 px on mobile web (also prevents iOS Safari auto-zoom on inputs).
- Content-heavy sites (articles, docs, marketing) may go larger: body 18–20 px desktop [Kennedy]. App UIs stay at 14–16 px.
- NEVER use the golden ratio (1.618) for UI type scales: it jumps too fast (16 → 26 → 42) and leaves no usable intermediate sizes (§22 #40).

---

## 9. Color, contrast and appearance

### 9.1 Palette structure
- Roles, not raw values: **primary** (brand, primary actions), **secondary**, **tertiary/accent** (sparingly), **neutrals** (6–10 steps for text, surfaces, borders), **semantic** (error, warning, success, info), **surfaces** (background + container levels).
- Generate tints/shades per color (scale 50/100…900, 500 = base; leave gaps for later additions). When lightening, add a little saturation so tints don't look washed out; avoid hue jumps.
- **60-30-10 rule**: ~60 % dominant neutral/surface, ~30 % secondary, ~10 % accent (CTAs, highlights).
- **One color = one meaning** across the product (e.g. brand blue = interactive; never also use it for non-interactive text) [Apple].
- One main accent for primary actions across the product. Keep semantic colors few and consistent; harmonise custom/semantic colors toward the primary hue [M3].
- Name tokens by role (`text/primary`, `surface/container-high`, `border/strong`, `error`), never by look (`dark-gray`). Never paste raw hex into screens.
- Prefer off-white surfaces and rich (tinted) near-blacks for a softer look †, while meeting contrast.
- Pair every container color with its **on-color** (M3: primary/on-primary, primary-container/on-primary-container, surface/on-surface) so contrast holds by construction.
- Gradients: subtle, analogous hues, avoid a muddy/grey middle; text must stay legible over them. On the web interpolate in a perceptual space so the middle stays bright: `linear-gradient(90deg in oklch, #… , #…)` [Kennedy]. Keep hue rotation between stops ≤ ~30–60°.
- **Shade ramps** [RUI]: per hue, define **9 shades (100–900)** plus **8–10 greys**. Pick the base (≈ 500, works as a button fill), the darkest (text on a light tint) and the lightest (tinted background), then fill the gaps. **Boost saturation toward the light and dark ends**, or they look washed out.
- **Tinted greys** [RUI]: greys with a little saturation (cool blue-grey or warm grey, saturation ≈ 5–15 %) look intentional; pure greys look dead next to brand colors.
- Never put grey text on a colored background [RUI]: use a lighter or darker shade of **the background hue** (or white/black at reduced opacity only if contrast still passes).
- **Flipped contrast** for badges, tags and alerts [RUI]: light tint background + dark text of the same hue (e.g. green-100 bg + green-800 text) is calmer than a saturated fill with white text, and passes contrast more easily.
- **60-30-10 proportion** [Canva, Skillshare]: the 10 % accent is reserved for the primary action and key highlights; never split it across many unrelated elements. Small palettes: **3–4 colors** plus neutrals.
- **One color, one role** [Shift]: red is only for destructive actions and errors; never make red the default CTA (§22 #41). The accent marks what is interactive; don't reuse it for decoration.
- Two-layer tokens [Skillshare, RUI]: **primitive** tokens (`blue-500`, `grey-100`) hold values; **semantic** tokens (`action/primary`, `text/secondary`, `surface/raised`) point to primitives and are the only ones used in components. Themes (light/dark/high contrast) swap only the semantic layer.

### 9.2 Accessibility of color (MUST)
- Contrast ratios in §3.3, in **every** appearance (light, dark, increased contrast) and every state (hover, disabled excepted, selected).
- **NEVER rely on color alone** to convey state, errors, links, chart series or interactivity: add text, icon, shape, pattern, underline or weight. ~350 million people have color-vision deficiencies; red–green and blue–orange pairs are the hardest. Test in **grayscale**.
- AVOID lowering text contrast to de-emphasise; use size/weight/position instead [NNg].
- Text over images: overlay/scrim, text shadow, darkened highlights, or place the text off the image. Kennedy's methods, from simplest to subtlest:
  | Method | Recipe | Best for |
  |---|---|---|
  | Full overlay | black at **≈ 35–60 %** over the whole image | hero banners with long text |
  | Floor fade (scrim gradient) | transparent → black **0 → 20–60 %** from the text edge | cards and media tiles with a caption at the bottom |
  | Text box | solid or semi-opaque box behind the text | busy photos |
  | Blur | blur the image region behind the text (+ slight darken) | glass-style headers |
  | Soft text shadow | large, low-opacity shadow around the glyphs | short white titles on calm images |
  Contrast MUST be checked against the **worst pixel** under the text, not the average; recheck when images are user-supplied.
- Contrast is not only the ratio: audit text in **real conditions** [Uxcel]: over images and gradients, in light, dark and increased-contrast modes, in every state (hover, focus, selected, error), on a low-brightness phone in sunlight, with a color-blindness simulator and in grayscale. Prioritise small text, placeholder and helper text, error messages, disabled-looking but enabled controls, and focus indicators.
- Common failures: Refactoring UI's lightest grey text `#A0AEC0` on white = **2.3:1** (fails); `#767676` on white = **4.54:1** is the lightest neutral grey that passes AA on white; black text at 50 % opacity on white ≈ **3.9:1** (fails; use ≥ 55–60 %) [Shift, Skillademia].
- **APCA** (Lc values, WCAG 3 draft) is useful for tuning dark mode and thin fonts, but it is **not** a conformance standard yet. Ship to WCAG 2.2 ratios; use APCA only as an extra check.
- Disabled content may fall below contrast minimums (WCAG exempts it), but must still be recognisable as present-but-unavailable (M3: container 12 %, content 38 % of on-surface).
- Consider cultural color meaning (red = danger in some cultures, luck/positive in others; white = mourning or purity).

### 9.3 Platform color systems
- **Apple**: use **system and semantic colors** (`label`, `secondaryLabel`, `tertiaryLabel`, `quaternaryLabel`, `systemBackground`/`secondary…`/`tertiary…`, grouped backgrounds, `separator`, `link`, `placeholderText`); never hard-code their values (they change between releases) and never redefine their semantics. Every custom color needs **light + dark variants, each with an increased-contrast version**. Use the accent color sparingly (primary actions, status, selected tab); with Liquid Glass, color the **background** of a primary control, not its symbol; don't color the backgrounds of multiple controls; keep bars monochrome over colorful content.
- **Material 3**: scheme generated from **one source color** (HCT: hue, chroma, **tone 0–100**) → 5 key colors (primary, secondary, tertiary, neutral, neutral-variant) + error → tonal palettes → ~50 roles for light and dark. Light accents use tone 40, dark use tone 80; containers 90/30. Surfaces are tonal (`surface-container-lowest … highest`). `outline` (important boundaries, must reach 3:1) vs `outline-variant` (decorative dividers). **Dynamic color** (Android 12+) from wallpaper, always with a static brand fallback. Support standard/medium/high contrast schemes. Baseline: primary `#6750A4`, surface `#FEF7FF` (light) / `#141218` (dark), error `#B3261E` / `#F2B8B5`.
- **Web**: implement roles as CSS custom properties; switch with `prefers-color-scheme` and support `prefers-contrast`.

### 9.4 Dark mode
- MUST follow the **system appearance by default** (users expect it; ~1/3 use dark, 1/3 light, 1/3 switch). iOS/macOS: **don't add an app-specific appearance setting** [Apple]. Android/web: an in-app override is acceptable in addition to "System default" [M3].
- Dark ≠ inverted: **dimmer backgrounds + brighter, slightly desaturated foregrounds**. Use dark grey surfaces (M3 surface ≈ tone 6, e.g. `#141218`; Apple system dark backgrounds), not pure black, except for media/OLED-specific experiences.
- Express elevation with **lighter surfaces** (shadows barely show on dark). Apple uses *base* (dimmer) vs *elevated* (brighter) backgrounds for sheets/popovers automatically.
- Check: thin fonts get swallowed; saturated colors vibrate → desaturate; thin grey dividers disappear → use surface differences; images with opaque white backgrounds glow → use transparent assets or soften whites; dark logos/icons vanish → add strokes or variants; keep QR/barcodes dark-on-light.
- Test both appearances **with Increase Contrast and Reduce Transparency** on and off.

### 9.5 Color management (assets)
- Embed color profiles; sRGB for standard, **Display P3** for wide gamut (export 16-bit PNG, provide sRGB fallback). Test on real devices and in varied lighting (bright light mutes colors; dark rooms make them harsh).

### 9.6 Color recipes (building and adjusting palettes)
Work in **HSB/HSL for intuition** and **OKLCH for perceptual consistency** (equal L ≈ equal perceived lightness across hues; HSL does not: yellow at L 50 % looks far lighter than blue at L 50 %).

**Making variations of one color** [Kennedy]:
| Want | Change | Hue shift |
|---|---|---|
| Darker variant (hover, pressed, text on tint) | **saturation ↑, brightness ↓** | rotate slightly toward the nearest of red 0°, green 120°, blue 240° (the "dark" hues) |
| Lighter variant (tints, backgrounds) | **saturation ↓, brightness ↑** | rotate slightly toward the nearest of yellow 60°, cyan 180°, magenta 300° (the "bright" hues) |
- Keep hue rotation ≤ ~20–30° across a ramp [RUI]; it makes ramps look richer (yellow → warm orange at the dark end) without changing identity.
- Fix contrast without losing the brand: **keep the hue, move only saturation/brightness** (or OKLCH L) until the target ratio passes (Kennedy's Accessible Color Generator works this way).
- Consistent ramps in OKLCH [Shift] †: buttons and links around **L ≈ 0.53** on light surfaces and **L ≈ 0.60–0.68** on dark ones. Check each value; a lightness that passes on `#121212` can fail on `#1C1C1E`.
- Harmonies (complementary, analogous, triadic, split-complementary) are a starting point for brand and illustration palettes [Canva]. In UI they matter less than **roles and contrast**: one brand hue + neutrals + semantic colors is enough for most products.
- Tint / shade / tone on the web: `color-mix(in oklch, var(--brand) 20%, white)` (tint), `… black` (shade), `… grey` (tone).

**Data visualisation palettes** [Kennedy]:
| Data | Palette |
|---|---|
| Categories (unordered) | **multi-hue**, similar lightness and chroma, ≤ 6–8 colors; label directly, don't rely on color alone |
| Ordered values (low → high) | **single-hue** (or narrow-hue) ramp from light to dark |
| Values around a midpoint (±, above/below target) | **divergent**: two hues meeting at a neutral light middle |
- Test every chart palette with a color-blindness simulator; avoid red/green as the only distinction (§9.2).

---

## 10. Iconography, imagery and media

### 10.1 Icons
- Use the platform icon set first: **SF Symbols** (Apple), **Material Symbols** (Android/web). Custom icons: vector (SVG/PDF), one style (outline *or* filled), one stroke weight (e.g. 1.5–2 px), consistent size grid (16/20/24/32), consistent corner and cap style, optically aligned (add padding so asymmetric glyphs look centred).
- Default icon size: **24 dp** (M3; 18 dp inside buttons/chips); Apple symbols scale with adjacent text (small/medium/large scales, 9 weights; match weight to text).
- Only a few icons are universally understood: **home, print, search (magnifier)**; also close (×), back chevron, share, add (+), settings gear are platform-standard. Hamburger, heart, star, bookmark, clock are ambiguous.
- MUST pair icons with **visible text labels** unless the icon is universal/platform-standard **and** space-constrained (toolbars); even then provide an accessible name and a tooltip on desktop. Tab-bar/nav-bar items ALWAYS show labels (always, or never, not only on the selected item). NEVER rely on hover-only labels on touch.
- 5-second rule [NNg]: if you need more than 5 s to think of an icon for a concept, use a word.
- Selected state: **filled** variant (tab bars, nav bars) or stronger color; unselected: outline. Don't rely on color alone.
- Mirror directional icons (back/forward arrows, text alignment, progress) in RTL; don't mirror logos, checkmarks, clocks, real objects, right-handed tools.
- Use standard symbols for standard actions (Apple: `square.and.arrow.up` share, `trash` delete, `xmark` close, `checkmark` done, `ellipsis` more, `plus` add, `magnifyingglass` search, `arrow.uturn.backward` undo).
- NEVER use emoji as UI icons where the platform expects monochrome, adaptive icons (e.g. iOS quick actions).
- Provide accessibility labels for every meaningful icon; mark decorative icons as hidden.
- Small icons get a **larger invisible hit area** (keep the glyph small if you want; enlarge the tappable frame) instead of being bloated.

### 10.2 Images
- Decide each image's role first: content, background, decorative, or interface icon.
- Keep aspect ratios (never stretch); crop with masks; use a consistent set of ratios (16:9, 3:2, 4:3, 1:1, 3:4, 2:3) †. Fill (cover, may crop) for heroes/cards; Fit (contain) for logos/products that must not be cut.
- Avatars: circular masks; catalog/product grids: uniform square masks.
- Formats: **SVG/PDF** for icons/logos/flat art; **PNG** for transparency; **JPEG** (≈ 60–80 % quality) or **HEIC/WebP/AVIF** for photos; provide **@1x/@2x/@3x** rasters where needed (iOS @2x+@3x, iPad @2x, macOS @1x+@2x, Android density buckets mdpi…xxxhdpi). Compress; oversized images slow everything.
- Alt text: succinct, describes content **and function**, doesn't repeat captions; decorative images get empty alt / hidden from assistive tech. No text baked into images (not localisable, not accessible).
- Use diverse, representative, licensed imagery; avoid stereotypes.
- App icons (Apple): square 1024×1024 layered artwork, system applies mask and Liquid Glass effects; no baked shadows/gloss; no text unless essential; provide dark/clear/tinted appearances. Launch screens are **not** branding opportunities.

### 10.3 Video, audio, haptics
- Never autoplay audio/video without controls; offer a global opt-out. Captions, subtitles, audio descriptions, transcripts for media.
- Pair audio cues with visual cues and haptics; never rely on sound alone.
- Haptics: use system patterns only for their documented meaning (success/warning/error, impact, selection); consistent cause→effect; short for discrete events; optional; never overuse.
- Use the platform's video player; keep original aspect ratio (no baked letterboxing); Space = play/pause on keyboards.

---

## 11. Components

General rules for every component:
- **Use system/design-system components first**; they come with states, accessibility, Dark Mode, Dynamic Type, RTL and platform behaviour. Customise appearance only; keep familiar size, placement and behaviour.
- Every interactive component MUST have: **default, hover (pointer), focus (visible ring), pressed, disabled**, plus **selected/activated, loading, error** where relevant. Inputs add **filled, error, success**.
- **State layers** (M3): overlay in the content color — hover **8 %**, focus **10–12 %** (+ focus ring), pressed **10–12 %** (+ ripple), dragged **16 %**; disabled = container 12 % / content 38 % of on-surface.
- Every interactive component has a hit target ≥ 44 pt / 48 dp regardless of visual size.
- Interactive things MUST look interactive without hovering (shape, fill, border, color, underline); static things MUST NOT look interactive. Weak signifiers cost ~22 % more time to find targets [NNg]. Flat design works only with traditional layouts and clearly distinct interactive elements ("flat 2.0": subtle shadows/borders).

### 11.1 Buttons
- **Emphasis hierarchy**: filled (primary, max **one per area/view**) → tonal/tinted → elevated → outlined (secondary) → text/plain (tertiary, dialogs, inline). Distinguish the preferred option by **style, not size** [Apple].
- Sizes: M3 baseline height **40 dp** (target 48), pill shape, label-large, 18 dp leading icon, horizontal padding 24 dp (16 with icon) †; M3 Expressive sizes XS 32 / S 40 / M 56 / L 96 / XL 136 dp †. Apple: hit region ≥ 44×44 pt; macOS push buttons standard control sizes. Web: min height 44 px for touch †, 32–40 px acceptable for dense pointer-only desktop UIs if the 24 px WCAG minimum is met.
- Labels: **verbs** that name the result ("Save", "Add to Cart", "Delete draft"), short, **one line** (don't wrap). Capitalisation per platform (Apple: title case for buttons; Material/web: sentence case). Icon before label.
- Buttons **hug their content** (grow with the label/translations); set a min width (~48–64) and a max width on large screens; never stretch buttons full-width on desktop.
- Always a **pressed** state; for async actions show an inline **loading** state ("Checkout" → spinner + "Checking out…") and prevent double submission.
- **Roles** [Apple]: normal, **primary/default** (accent, responds to Return/Enter), **cancel** (Esc), **destructive** (red). NEVER give the primary/default role to a destructive action.
- Destructive buttons: red text (plain style), filled red only in the final confirmation; spatially separated from frequent and confirming actions [NNg].
- **Enter** in a single-line form field MUST submit the form's primary action (unless multi-line).
- A disabled button is better than a hidden one when users need to understand that the action exists; explain why it's disabled (helper text) when not obvious. Apple: enable Next/Continue only when required fields are filled.
- Navigation vs action: links navigate, buttons act; style them distinctly. Ghost buttons are weak signifiers → secondary actions only.
- macOS: trailing ellipsis "…" when the button opens a window/dialog needing more input ("Export…"). Help button: one per window, context-relevant.

### 11.2 Icon buttons, FAB, toolbars
- Icon button: 40 dp container, 24 dp icon, 48 dp target [M3]; Apple bar buttons: standard symbols, no borders/circles, no text labels "Back"/"Close" on Apple platforms (the chevron and × are the labels; accessibility label still required). Tooltip on desktop always.
- **FAB** (Android): only for **the single primary, constructive action** of a screen (Compose, Create); never destructive or minor. 56 dp (16 dp corner), medium 80, large 96; elevation level 3. Placement: bottom-end 16 dp from edges on compact; at the **top of the navigation rail** on medium+. Max one per screen. FAB menu (2–6 related actions) replaces speed dial.
- **Toolbars** act on the current view; tab bars navigate. Don't overcrowd: define which items go into overflow when width shrinks; system overflow on Apple (don't add your own). Max ~3 groups; key action (Done/Submit) with prominent style, one only, trailing side. M3 Expressive: **docked toolbar** (64 dp, global actions; replaces bottom app bar) and **floating toolbar** (contextual actions).
- Every toolbar item on macOS MUST also exist as a menu-bar command.

### 11.3 Text fields and inputs
- MUST have a **visible label** outside or floating above the field; **a placeholder is never a label** (it vanishes, fails contrast, may not be announced, looks prefilled) [NNg, M3, Apple]. Use placeholder only for an optional example ("name@example.com").
- Label **above** the field (mobile and short forms); left-aligned labels acceptable on very long desktop forms.
- Helper/supporting text below the field for format rules, **shown before** the user types.
- Field width reflects expected input length (e.g. ZIP short, city ~19 characters, street long). Consistent widths within field groups.
- Show the right **keyboard/input type** (email, number, decimal, tel, URL, search) and `autocomplete`/content type so autofill and password managers work; turn **off autocorrect/autocapitalise** for names, emails, usernames, codes.
- Secure fields for passwords with a show/hide toggle; never prefill passwords (use keychain/biometrics/passkeys).
- Clear (×) button at the trailing end for search and long single-line fields (iOS); leading icon = purpose, trailing = extras.
- Allow paste and drag-and-drop into fields. Accept any reasonable format and normalise (§13.4).
- Focus state clearly visible (M3: indicator 1 → 2 dp in primary color); use a **neutral** focus color in forms and **reserve red for errors** [Figma/Dan Scott].
- Error state: red/error color **+ icon + message text below the field**, preserved input (see §14.4).
- M3 text field: filled (top corners 4 dp, active indicator) or outlined (4 dp corners, 1 → 2 dp outline on focus), ~56 dp tall †, body-large text, body-small supporting/error text. Use **one style consistently** in a product.
- Character counter for limited fields; warn before the limit (live count, highlight excess) rather than truncating silently.
- Keep fields visible above the on-screen keyboard (portrait and landscape); scroll the focused field into view.

### 11.4 Selection controls
| Need | Control |
|---|---|
| On/off setting that **applies immediately** (Wi-Fi) | **Switch/toggle** |
| One choice from 2–5 options, all visible | **Radio buttons** (provide a sensible default; add "None" if no choice is valid) |
| One choice from many options (> ~5), or space-constrained | **Menu / select / pop-up button / picker** |
| Zero or more independent choices; a value saved on submit; "I agree" | **Checkboxes** (standalone checkbox = single opt-in, unchecked by default) |
| Switch between closely related views/modes of the same content | **Segmented control** (2–5 segments) / M3 connected button group |
| Filters or tags | **Filter chips / input chips** |
| Value in a range where exactness isn't critical (volume, brightness) | **Slider** (+ text field for exact values) |
| Small discrete numeric changes (quantity) | **Stepper** (+ editable field for large changes) |
| Date/time | **Platform date/time picker**; allow typing too |

- Don't split one mutually exclusive choice into two checkboxes; use two radios when a checkbox can't express both states clearly.
- Positive labels ("Send me updates", not "Don't send me…"); label states what "on/checked" means.
- Labels are clickable (extend the hit area). Vertical lists, one option per line.
- Checkboxes/radios MUST NOT trigger immediate actions (apply on Save/OK); switches apply immediately and MUST NOT be used inside forms that need a submit.
- iOS: switches only in list rows; elsewhere use a toggle-button. macOS: checkboxes/radios/switches only in window bodies, never toolbars; parent checkbox shows **mixed** state for partially selected children.
- Prefer radio buttons over dropdowns for 2–5 options (visible, one tap).
- Don't use dropdowns for very familiar data you can type faster (birth day/month/year, state with type-ahead) or for very long lists (use type-ahead/autocomplete). Avoid wheel pickers for birth years.
- Segmented controls: equal widths, text **or** icons (not both), nouns, don't mix selection and momentary actions.
- Sliders: min at leading/bottom, max at trailing/top; show the value; keyboard arrows step, Page Up/Down jump, Home/End to limits. Never a plain slider for system audio volume on iOS.
- Pickers: show **in context** (inline, popover, below the field), don't switch screens; values logically ordered; minute intervals that divide 60.
- M3 sizes: checkbox 18 dp box / 40 state layer / 48 target; radio 20 dp; switch track 52×32 dp, handle 16/24/28 dp; chips 32 dp high, 8 dp corners.

### 11.5 Lists, tables and collections
- **Text → lists/tables; image-heavy, variable-size items → collections/grids.**
- Rows: primary text first, succinct; long content goes to a detail view. Consistent row heights, icon/thumbnail sizes and spacing. M3 list items: 56 / 72 / 88 dp for 1/2/3 lines, 16 dp side padding; supporting text ≤ 2 lines.
- Drill-down rows show a **chevron** (disclosure indicator); an info button only reveals details, never navigates [Apple].
- Selection feedback: navigation lists keep the selected row highlighted (shows path, especially in split views); option lists show a checkmark.
- Swipe actions: always provide a visible non-gesture alternative (button, context menu, edit mode); never leave a row half-swiped.
- Tables: column headers as nouns (title case on macOS), click to sort (click again reverses), resizable columns, text left / numbers right, most important columns leftmost, sticky headers for long tables, alternating row colors for multi-column desktop tables, middle-ellipsis truncation for file names. Hierarchical data → outline/tree view (hierarchy only in the first column).
- Lead with human-readable labels, not IDs/codes [NNg].
- Long lists: search/filter; index only if rows have no trailing controls.
- Loading: skeleton rows; infinite scroll for homogeneous feeds on mobile; **pagination or "Load more"** when users search for specific items, compare, need the footer, or have accessibility/low-bandwidth needs. Restore scroll position when returning from a detail view.
- Animate insertions, deletions and reorders; don't change layout dynamically while the user is interacting.
- Accessibility: one focus stop per item; decorative children not focused; expose swipe/context actions as accessibility actions; announce changes.

### 11.6 Cards and carousels
- Card: one subject; hierarchy media → title → supporting text → actions; M3 corner 12 dp, padding 16 dp †; elevated / filled / outlined variants.
- Make the whole card (image + title) one target when it leads to one place; avoid multiple competing targets.
- Carousels: ≤ 5 frames; show frame count/position; visible, large, high-contrast controls; show a **peek of the next item** to signal horizontal scroll; avoid auto-advance (if used: pause on interaction, allow ~3 words/s reading time, loop); never put critical information only in a carousel.

### 11.7 Dialogs, alerts, sheets and popovers (modality)
- **Modal only when there is a clear benefit**: critical info that needs a decision now, confirming a destructive/irreversible action, information required to continue a user-initiated task, a short focused sub-task. NOT for success messages, promotions, newsletter sign-ups, feedback requests mid-task, or anything users need to reference the page for.
- One modal at a time; never stack alerts; no "app within the app" (no navigation hierarchies inside modals; one path if subviews are needed).
- Title the modal with its task/question; content short; obvious dismissal following platform conventions (iOS: toolbar button or swipe down; macOS: buttons in the content; Android/web: Esc, scrim tap unless a choice is required, explicit close). Confirm before closing if user content would be lost (offer Save).
- **Alerts / basic dialogs**: title that says what happened or asks a specific question (never "Error" or "Are you sure?"), ≤ 2 lines; message only if it adds value; **≤ 3 buttons**; button labels are specific verbs describing the result ("Delete", "Keep File", "Discard"), never "Yes/No"; "OK" only for purely informational alerts; always include **Cancel** with a destructive action; **Cancel is never the default**; for dangerous actions consider no default at all.
  - Button placement: Apple: default/likely action **trailing** in a row (top in a stack), Cancel **leading** (bottom in a stack). M3: text buttons end-aligned, **confirming action last (rightmost)**, dismissive before it.
  - M3 dialog: 28 dp corners, elevation 3, surface-container-high, headline-small title, body-medium text, width 280–560 dp †, 24 dp padding †. Full-screen dialog for complex tasks on compact screens.
- **Action sheets / confirmation dialogs** (iOS): for choices related to an intentional action (Delete Draft / Save Draft); destructive at top in red, Cancel at bottom; never scrolling.
- **Sheets**: scoped task related to the current context. iOS: detents (medium ≈ half, large = full), grabber when resizable, swipe down to dismiss (confirm if unsaved), Cancel leading + Done trailing in the top bar; never show Cancel, Done and Back together. macOS: sheet attaches to a window and is modal to that window. M3 bottom sheet: 28 dp top corners, 32×4 dp drag handle; switch to side sheet / dialog / menu on larger windows.
- **Popovers** (iPad/macOS/desktop): small amount of info or a few related controls; arrow points at the source; one at a time; closes on outside tap; auto-saves on close; **never in compact width** (use a sheet); never for warnings.
- Nonmodal panels/side sheets for non-critical tasks or when users need to reference content (inspectors, filters, compose while browsing).
- Never trap the user; Esc closes on desktop/web; focus is trapped inside while open and returns to the trigger on close.

### 11.8 Menus
- Labels: short verbs ("Duplicate", "Move to…"), front-loaded; ellipsis when more input is needed; drop articles.
- Order by frequency/importance; group related items with separators (≤ ~3 groups in context menus); put frequent items closest to the pointer/finger; destructive items **last** and red (iOS/Android/web context menus).
- Context menus contain only relevant, frequently needed commands, and every command MUST also exist elsewhere in the UI (toolbar, menu bar). Hide unavailable items in context menus; **dim (don't hide)** unavailable items in menu-bar menus.
- Submenus: sparingly, one level deep, click-activated (not hover-only) with a caret/arrow signifier.
- Pull-down/overflow ("More", ellipsis) only for ≥ 3 secondary items; it hurts discoverability → never hide primary actions there; avoid "junk-drawer" menus.
- Icons in menus: all or none within a group; standard icons for common actions.
- M3 menu items 48 dp high, 4 dp corners, elevation 2; arrow keys navigate, Esc closes.
- Keyboard shortcuts shown in desktop menu bars (not in context menus on Apple).

### 11.9 Feedback components
- **Snackbar / toast**: brief, low-priority, non-blocking feedback about the user's own action ("Message archived"), bottom of screen above nav/FAB, **one at a time**, **at most one action** (Undo, Retry), auto-dismiss ~4–10 s † (don't auto-dismiss one whose action matters for accessibility). M3: 48 dp single line, inverse-surface.
  - NEVER use a toast/snackbar as the only carrier of an **error the user must act on** or of critical info [NNg]; use inline errors, banners or dialogs.
- **Banner** (persistent, top of content): important but non-blocking info with 1–2 actions (offline, account issue).
- **Badges**: small dot (6 dp) for status, number badge (16 dp, max ~3 characters, "999+") for counts; only for important/critical info (Apple: tab bar badges only for critical info).
- **Tooltips**: brief, describe only the hovered/focused control, start with a verb, don't repeat the label, ≤ 60–75 characters, sentence case; show on **hover and keyboard focus**; never hold task-critical info (e.g. password rules); on touch use explicit "i"/"?" popup tips instead.
- **Progress indicators**: see §14.2. **Inline status near the item it describes** (e.g. "Updated just now" in a toolbar) rather than alerts.

### 11.10 Tabs, segmented navigation, page controls
- Primary tabs at top of content under the app bar for sibling views of the same level; M3 48 dp (64 with icon), 3 dp indicator, title-small labels; fixed (2–4 equal) or scrollable. Swipe between tab contents on mobile. Don't nest primary tabs.
- macOS tab views: ≤ 6, noun labels, title case; not switched with a pop-up button.
- Page controls (dots): flat ordered pages only, centered at the bottom, ≤ 10 dots; dots are weak cues, so add other affordances (peek, arrows).

### 11.11 Search
- Search MUST be a **visible text field** (not just an icon) wherever search is important, especially on desktop, at the top (right or left), on every page, ~27+ characters wide [NNg].
- Mobile: search field at top of the list it filters, or a dedicated search tab, or a bottom toolbar field (easier reach) [Apple]; full-screen search view on compact, docked on larger windows [M3]. Placeholder says what is searchable / the scope.
- Search as people type (debounce ~150–300 ms †); recent searches before typing; suggestions/autocomplete while typing; spelling correction; tolerate typos, plurals, synonyms.
- Results: best first, categorised, matched terms highlighted; scope shown with a one-click way to widen (default scope = everything); **zero results are never a dead end** (suggest corrections, broader filters, related items).
- Offer to clear search history (privacy). Advanced search linked from results, not on the home page.

### 11.12 Charts
- Use charts for trends, comparisons and changing values; when people just need the data, a sortable/searchable table is better.
- Prefer common types: **bar** (compare categories, totals), **line** (change over time), **point** (relationships, outliers). Bars start at zero; familiar tick steps (0, 5, 10).
- Title/summary that states the main message ("Chance of light rain in the next hour"); data most prominent; descriptive labels; units in the title on narrow screens.
- Never color alone (add shapes/patterns/direct labels); separators between adjacent color areas.
- Accessibility labels per element/group with context + value, unambiguous formats ("June 6", "60 minutes"), no subjective words; never require interaction to reveal critical info.
- Same data → same chart type, colors and annotations at every size.

---

## 12. Navigation and information architecture

### 12.1 Choosing the primary navigation
| Context | Primary navigation |
|---|---|
| Phone (compact width), 3–5 top-level destinations | **Bottom tab bar / navigation bar**, always visible, icons **with labels** |
| Phone, > 5 destinations or content-heavy browse | Tab bar for the 4–5 most important + "More"/menu for the rest (**combo navigation**); or a **hub** home screen for one-task-per-session apps; hamburger/drawer only as a last resort, labelled "Menu" |
| Tablet / medium–expanded window | **Navigation rail** (Android) at the start edge, **sidebar or top tab bar** (iPadOS, sidebar-adaptable) |
| Desktop app / large window | **Sidebar** (persistent, collapsible), split views; Android large screens: expanded rail |
| Website (desktop) | **Visible top navigation bar** (or left nav for applications); **NEVER a hamburger on desktop**; mega menus for large sites |
| Website (mobile) | ≤ 4–5 items visible; otherwise combo or a prominent "Menu" button (icon + text) |

- Hidden navigation reduces discoverability by > 20 % and makes desktop tasks ≥ 39 % slower [NNg].
- Tab bars: **navigation only, not actions**; always visible across sections (except under modals); never disable or hide tabs (explain empty sections instead); keep each tab's navigation state; tapping the active tab scrolls to top/resets; avoid a "More" overflow tab where possible; badges only for critical info. Use the **fade-through** transition between top-level destinations (M3).
- iOS 26 (Liquid Glass): tab bar floats at the bottom, may minimise on scroll; optional search tab at the trailing end. iPadOS: tab bar near the top, convertible to a sidebar; default ≤ 5 tabs for continuity.
- M3: navigation bar (80 dp baseline / 64 dp Expressive, active indicator pill) on compact; rail (80 / 96 dp) on medium+, FAB at the top of the rail; **expanded rail** replaces the standard drawer on large screens. Don't stretch a bottom bar across a large screen.
- Sidebars: ≤ 2 levels of hierarchy (deeper → split view with a content list column); allow hiding but **don't hide by default**; SF Symbols/Material icons + labels; let users customise when there are many items.

### 12.2 Hierarchy, back and location
- Keep hierarchies shallow: ~3–4 drill-down levels max on mobile †; on desktop show more content in **fewer nested levels**.
- **Back** MUST return exactly one step in the user's real history and preserve state (scroll position, form data, filters). Back is not Cancel.
- iOS: back = leading chevron + previous screen title (no "Back" text on standard bars); swipe from the left edge also goes back. Android: system back gesture/button + **predictive back** preview (outgoing screen scales 100 → 90 %, fade-through at 35 % progress). Web: browser Back must work (one URL per meaningful state; overlays close on Back).
- Show the user's **current location**: highlighted nav item (the most common menu mistake is not doing so), page title, breadcrumbs on deep desktop sites (reflect hierarchy, not history; current page last and unlinked; start with Home), selected row persistently highlighted in split views.
- Local navigation to siblings avoids pogo-sticking. Logo/wordmark links to Home on the web.
- Every overlay, menu or full-screen modal has a visible dismiss/back control.

### 12.3 Navigation menus (web and desktop)
- Primary nav in the header (websites) or left (applications); utility nav (account, cart, language) top-right; local nav left; footer for secondary audiences.
- Clear, specific, familiar labels (users' words, no invented terms or jargon), front-loaded keywords, left-aligned vertical menus.
- Menu link colors contrast with the background (no transparent nav over busy images); don't cover the whole viewport with open menus on large screens.
- Submenus click-activated; hover menus only with ~0.5 s intent delay, diagonal-path tolerance, and a non-hover fallback. Avoid cascades deeper than one level; use mega menus (2–3 tiers, grouped, all visible without scrolling) for large sites.
- Sticky headers: small, opaque, high-contrast; consider hide-on-scroll-down / reveal-on-scroll-up (~300–400 ms) †.
- Repeat key navigation at the bottom of long mobile pages; provide "back to top" on long pages.

### 12.4 Adaptive navigation (component swaps by window width)
| Compact (< 600) | Medium (600–839) | Expanded (840–1199) | Large / XL (≥ 1200) |
|---|---|---|---|
| Bottom nav bar / tab bar | Navigation rail / sidebar-adaptable tab bar | Rail or sidebar; list-detail with 2 panes | Expanded rail / persistent sidebar; 2–3 panes |
| Bottom sheet | Side sheet or bottom sheet | Side sheet | Side sheet / inspector panel |
| Full-screen dialog | Basic dialog | Basic dialog | Basic dialog |
| Full-screen search | Docked search | Docked search | Docked search |
| Modal date picker | Modal or docked | Docked | Docked |
Keep **functionality identical** across sizes; only the amount visible and the presentation change.

---

## 13. Forms and data entry

Forms following the guidelines below reached **78 % error-free first submissions vs 42 %** for forms violating them [NNg, CHI 2014].

### 13.1 Before adding a field
- MUST ask whether each field is needed now. Remove fields that can be derived, detected, collected later or dropped; every removed field raises completion.
- **Get data from the system** with permission instead of asking: location instead of ZIP, camera for cards/documents/barcodes, contacts, wallet/Apple Pay/Google Pay instead of card entry, biometrics/passkeys instead of passwords, autofill.
- Compute what you can (state/city from ZIP; card type from number).
- Before long forms state: estimated time, documents/info needed, whether progress is saved, steps ("Step 1 of 4").

### 13.2 Layout
- **Single column**. Exception: short, logically related fields on one row (City / State / ZIP; Expiry / CVV).
- Labels **above** fields, visually closer to their own field than to the previous one; proper programmatic label association.
- Group related fields in titled sections (fieldsets); long forms → multiple steps with a progress indicator ("one thing per page" for complex/high-stakes forms).
- Logical sequence: follow standard orders (card number → expiry → CVV), ask qualifying questions first, ask easy/low-sensitivity before sensitive. Logical Tab order.
- Mark required vs optional simply: asterisk with a legend **or** "(optional)" on the few optional fields; don't stack indicators (asterisk + icon + red outline). Extra required-field cues only after a submit attempt.
- **Submit button directly after the last field**, aligned with the fields' left edge †; primary action visually dominant; NO Reset/Clear buttons; Cancel (if needed) less prominent and separated.
- Conditional fields: show only relevant questions (branching).

### 13.3 Input
- Right control for the data (§11.4): radios for 2–5 options, menus/selects for many, steppers for small numbers, date pickers that also accept typing, no dropdowns for birth dates.
- Right keyboard and autocomplete attributes; autocorrect off for names, emails, addresses, codes.
- **Anything But Dropdowns** [Kennedy]: a dropdown hides options and costs two taps. Prefer: 2–5 options → radio buttons or segmented control; yes/no → checkbox or switch; small numbers → stepper; dates → date picker with typing; many known options → autocomplete/combobox; 6–15 options with long labels → dropdown is acceptable.
- Hover effects on form controls and buttons: 100–250 ms, and they MUST NOT shift layout (no border-width or font-weight change that moves neighbours) [Kennedy].
- Sensible **defaults** (most common choice from analytics, last-used values, "Tomorrow", "In 1 hour"); defaults also teach reasonable values.
- **Forgiving formatting** (Postel): accept spaces, dashes, parentheses, case, diacritics, apostrophes and hyphens in names, multiple date formats; normalise behind the scenes; auto-format as users type (group digits); never reject a phone number because of spaces.
- Proactive constraints instead of errors (cap a transfer at the available balance; disable impossible dates).
- Suggestions/autocomplete for hard-to-spell values.
- Positive, plain wording (≈ 6th–8th grade reading level for general audiences); use the users' words ("Reason for visit", not "Chief complaint"); no double-barrelled questions; show where to find complex identifiers (image of serial number location).
- Inclusive data: don't require a last name; offer non-binary/self-describe/prefer-not-to-say if gender is truly needed; universal security questions.

### 13.4 Error prevention (slips vs mistakes)
- **Slip** = right goal, wrong action (autopilot) → prevent with constraints, good defaults, suggestions, forgiving formats, spacing between dangerous and safe targets.
- **Mistake** = wrong mental model → prevent with clear labels, conventions, previews of the result, feedback, summaries before commit.
- Show **real-time previews** of parameter changes; warn *before* errors (live character counter going negative, "You mentioned an attachment but didn't attach one").
- **Prefer Undo over confirmation** for most destructive actions (it catches errors dialogs miss and doesn't interrupt). Support multiple undo levels; undo-send windows (e.g. ~30 s) for messages.
- **Confirmation dialogs** only for serious, irreversible or costly actions: name the exact items and consequence ("Delete 24 photos?"), outcome-labelled buttons ("Delete photos" / "Keep"), no destructive default, progressive disclosure for details, optional "Don't ask again" for routine ones. For the most dangerous operations require a non-standard action (type the name) — rarely.
- Never confirm routine actions (habituation makes users click through the important ones).

### 13.5 Validation and form errors (10 rules)
1. **Inline validation** when the user **leaves the field** (on blur), shown next to the field. Server errors after submit must be equally clear and located at the fields.
2. **Never validate prematurely**: not while typing (ZIP before 5 digits, email at first letter), not on merely focusing a field, not on untouched fields, never on page load.
3. Real-time feedback only where it helps: **requirement checklists** for passwords, username availability, strength meters; success marks only for complex fields.
4. Error message **next to the field** (below it), explicit, human, polite, precise, constructive: what's wrong + how to fix ("Enter a date in the future", "Use at least 8 characters").
5. Redundant cues: error color + **icon** + **text** (+ outline/tinted background); never color alone; don't animate the text.
6. Preserve the user's input; never clear the form; let them edit the invalid value.
7. On submit with errors: move focus to the first error (or an error summary at the top that links to each field) **and** mark every field inline.
8. Don't report errors in tooltips/hover icons or toasts.
9. Use modals for form errors only when the form can still proceed ("Send anyway?").
10. After 3+ repeated errors on the same field, offer more help and treat it as a design bug.
- Apple timing nuance: user name/password validated **before** leaving the field when possible; email when leaving; digits-only fields reject non-digits immediately.
- Hostile patterns to avoid: premature errors, stacked required indicators, informational notes styled as errors (red/caution for "No attachments to display").
- Use neutral styling + info icon for information; yellow/caution for recoverable issues; red only for real, blocking errors.

### 13.6 Mobile input checklist [NNg]
- [ ] Should this field exist? · [ ] Label above, required/optional marked, no placeholder-as-label · [ ] Field wide enough and visible above the keyboard (portrait + landscape) · [ ] Prefilled with defaults/history/device data · [ ] Copy/paste allowed · [ ] Correct keyboard · [ ] Autocomplete/suggestions · [ ] Autocorrect off where wrong · [ ] Any format accepted, auto-formatted.

---

## 14. Feedback, status, loading, errors, empty states and motion

### 14.1 Feedback principles
- Every action gets immediate, visible feedback (pressed state within ~100 ms); otherwise users repeat the action.
- **Match feedback to significance** [Apple]: routine → subtle (state change, inline status); important → noticeable (banner, snackbar); critical/irreversible → interrupting (alert/dialog).
- Multimodal and accessible: color **+** text/icon (+ sound/haptics where appropriate).
- Put status **near the item it describes**.
- Warn only about **unexpected, irreversible** data loss; don't warn when loss is the expected result (emptying a trash folder the user chose to empty).
- Confirm completion only for significant tasks (payment, submission); otherwise people only need to know about **failures**.
- When a command can't run, say why ("Can't route between the same start and end").
- Indicators (passive badges/icons on changed items), validations (tied to input), notifications (system events) are different tools; action-required notifications may be modal; passive ones must be unobtrusive.

### 14.2 Loading and progress
| Expected wait | Show |
|---|---|
| < 1 s | Nothing extra (a flashing spinner distracts); optimistic UI where safe |
| 1–2 s | Subtle busy indicator (spinner in the button/area, busy cursor) |
| 2–10 s | Looped indicator **with explanatory text** ("Loading comments…") for a module; **skeleton screen** for full-page/content loads |
| ≥ 10 s | **Determinate progress** (percent or "3 of 50") + time estimate + **Cancel/Stop**; allow backgrounding; notify on completion if the user left |
| Unknown total | Running count in absolute terms ("Searched 3 databases…") |

- Prefer **determinate** indicators; report progress accurately and evenly; never stall at 99 %; switch indeterminate → determinate once duration is known; never switch spinner ↔ bar shapes.
- **Skeletons**: static or subtle shimmer (respect reduced motion) wireframes of the real layout; AVOID frame-only skeletons (header/footer only).
- Show **something ASAP**; load progressively (above-the-fold first); let people keep working while loading; keep the indicator in a consistent location.
- NEVER show "No results / No data" while still loading.
- Avoid static "Loading…" text without motion and "Don't click again" warnings (instead show the first click was accepted).
- Users who saw an animated progress bar waited ~3× longer and were more satisfied [NNg].
- Pull-to-refresh is an extra, not a replacement for periodic auto-refresh; its label (if any) shows useful info like last-update time, not instructions.
- Variable network: optimistic updates with rollback + clear failure messages; offline indicators; queue actions for retry.

### 14.3 Empty states
- Say **why** it's empty, explicitly ("No orders in this date range"), distinguishing "nothing yet", "no results" and "error".
- Teach what the area is for and how it fills up ("Star messages to see them here").
- Provide the **direct action** that fills it (Create, Import, Add first item, Load sample data, Clear filters).
- Welcoming tone; don't put crucial info only in an empty state (it disappears).
- Empty search: explain, suggest corrections/broader filters/related items.

### 14.4 Error messages
- **Visibility**: next to the source, noticeable (bold/high-contrast text, icon, border), scaled to impact (inline < banner < dialog), never only color.
- **Communication**: human-readable, no codes as the main message (code may be secondary for support), describe the problem precisely ("Your card was declined by the bank", not "An error occurred"), say how to fix it, positive tone, **never blame** the user; AVOID "invalid", "illegal", "incorrect", "fatal", "oops", humour, puns.
- **Efficiency**: preserve input; offer the likely fix as a one-tap action ("Did you mean gmail.com?"); link to details only when needed; say whether work was saved.
- Apple alert titles: specific, not "Error"; buttons name actions; tone direct and neutral, not accusatory.
- Full-system outages: apology + status + what users can do; a light touch of personality only in low-stakes contexts.
- Permission denied → don't show an error; explain why the feature is unavailable and deep-link to the exact setting.

### 14.5 Notifications (push/system)
- Ask permission in context (after the user sees value), never at first launch without reason.
- Notify only about events that matter to the user; respect Focus/Do Not Disturb; represent urgency honestly (iOS **Time Sensitive** only for events now or within an hour; **Critical** needs an entitlement; marketing notifications need explicit opt-in and are never time-sensitive).
- Provide in-app notification settings; group/summarise; never use "needy" patterns (guilt, fake urgency, excessive re-engagement pings).
- Notify completion of long user-initiated background tasks; not routine ones.

### 14.6 Motion and animation
**Purpose**: motion must inform (show relationships, where things came from/go, what changed), focus attention, or give feedback — never decoration for its own sake, and never block the user.

**Durations** (pick the shortest that isn't jarring):
| Animation | Duration |
|---|---|
| Micro-feedback (toggle, checkbox, ripple, hover) | **50–150 ms** (~100 ms) |
| Small component change (chip select, icon morph, tooltip) | 100–200 ms |
| Medium (menu, dialog, sheet, expanding card) | **200–300 ms** in, 150–250 ms out |
| Large / full-screen transition | **300–500 ms** (M3 emphasized ≈ 500 ms) |
| Ambient/decorative | 700 ms+ (rare) |
- Duration grows with distance and area covered; **exits shorter than entrances**; the more frequent the animation, the shorter and subtler (or none: avoid motion on very frequent interactions) [Apple, NNg, M3].
- Desktop: small elements can move faster than on mobile; large elements moving long distances should be slower or simpler.

**Easing**: never linear for movement (linear only for color/opacity).
| Situation | Easing |
|---|---|
| Element entering the screen | **Decelerate / ease-out** (M3 emphasized-decelerate `cubic-bezier(0.05, 0.7, 0.1, 1)`) |
| Element leaving the screen | **Accelerate / ease-in** (M3 emphasized-accelerate `cubic-bezier(0.3, 0, 0.8, 0.15)`) |
| Element moving within the screen | **Standard / ease-in-out** (M3 standard `cubic-bezier(0.2, 0, 0, 1)`; emphasized for hero moves) |
| Spring physics (M3 Expressive, iOS) | Spatial springs (damping ~0.9) for position/size/shape — slight overshoot allowed; effects springs (damping 1.0) for color/opacity — no overshoot. Fast for small components, default for partial-screen, slow for full-screen |

**Transition patterns** [M3, Figma]:
- **Container transform**: a card/row grows into its detail view (strong continuity).
- **Shared axis**: X for sequential/lateral steps (onboarding, tabs), Y for vertical sequences, Z for parent ↔ child.
- **Fade through**: unrelated destinations (switching bottom-nav tabs).
- **Fade**: elements entering/leaving inside the screen (dialogs, menus, snackbars).
- Direction must match the spatial model: a menu opened from a left icon slides in from the left and leaves the same way; going back reverses the forward animation; a view revealed by sliding down is dismissed by sliding down.
- Use one consistent animation per relationship throughout the app.

**Rules**:
- Motion is **optional**: never the only carrier of information; supplement with text/haptics.
- MUST respect **Reduce Motion / `prefers-reduced-motion`**: replace slides/zooms/parallax with fades or instant changes, reduce bounce, avoid animating depth and blur.
- Let people interrupt/cancel animations; never make them wait for an animation, especially repeated ones.
- Feedback follows the finger/pointer (gesture-driven animations track the gesture).
- AVOID scroll-jacking, parallax for important content, auto-advancing carousels, flashing (> 3/s), and any moving content > 5 s without pause.
- Hand off motion with element, property, duration (ms) and easing curve.

### 14.7 Purpose test and motion principles
**Purpose test** [Motion]: before adding an animation, name which of these it does. If none, cut it.
| Lens (School of Motion) | Question it answers | Example |
|---|---|---|
| **Continuity** | Where did this come from / go? | card expands into its detail view |
| **Relationship** | How are these things connected? | menu grows from the button that opened it |
| **Narrative** | What just happened, in what order? | item flies into the cart, badge count ticks up |
| **Expectation** | What will happen if I do this? | sheet follows the finger and snaps back if released early |
- **"Hard cut" test** [School of Motion]: show the change with no animation. If users lose track of what changed, motion is needed; if nothing is lost, the animation is decoration and must be short or removed.
- **Integrated vs additive motion**: integrated motion is part of the interaction (a drawer that follows the drag); additive motion is layered on top (a confetti burst). Prefer integrated; keep additive rare, short and skippable.
- **Real-time vs non-real-time** [DesignerUp]: real-time motion is driven by the user's input (drag, scroll, pinch) and MUST track it 1:1 with no easing lag; non-real-time motion plays after an input (tap → transition) and uses durations and easings.
- **Willenskomer's 12 principles of UX in motion** (use as a review vocabulary, not a checklist to fill):
  | Principle | Meaning in UI |
  |---|---|
  | Easing | motion accelerates/decelerates like a physical object (§14.6) |
  | Offset & delay | items move at slightly different times, which shows they are separate but related (stagger) |
  | Parenting | one property drives another (a header shrinks as content scrolls) |
  | Transformation | one element morphs into another (button → spinner → check) |
  | Value change | numbers or bars animate from old to new value |
  | Masking | revealing or hiding by changing an element's visible area |
  | Overlay | a layer slides over another while the base stays in place |
  | Cloning | new elements emerge from an existing one (FAB → menu items) |
  | Obscuration | blurred/frosted layer shows context behind a focused layer |
  | Parallax | layers move at different speeds; use only for decoration, never for content, and drop it in reduced motion |
  | Dimensionality | elements behave as if they have depth (cards flip, sheets stack) |
  | Dolly & zoom | the "camera" moves toward or away from content (zoom into a photo, a map) |
- **Microinteraction model** (Dan Saffer): **trigger** (user or system) → **rules** (what happens) → **feedback** (what the user sees/hears/feels) → **loops and modes** (does it repeat, change over time, or have a setting?). Design all four, not only the visual feedback.
- **Mental model, zoom vs flip** [School of Motion]: going deeper into a hierarchy zooms (child grows out of parent); switching between peers slides or flips (shared axis). Don't mix them for the same relationship.
- **Curve matches meaning** [Collinsworth]: success and confirmation can be eager (fast start, slight overshoot); errors and destructive results reluctant (no bounce, a short shake of 2–3 cycles at most).
- Bounce and overshoot are **brand-dependent**: playful consumer products may use a little (≤ ~10–20 % overshoot); productivity and finance UIs should not. NEVER bounce on error, destructive or high-frequency elements.

### 14.8 Timing details and easing values
- **Asymmetric timing** [Comeau]: things that **leave the screen** go faster than they arrived; things that **return to rest in place** (hover-out, a button settling after press) may linger longer than they started (hover in ≈ 125–150 ms, out ≈ 250–450 ms). Both rules are in §22 #33.
- Exit + enter sequences [Collinsworth]: total ≈ 2 × single duration plus a small gap; cross-fades can overlap instead.
- Fades rarely need to start at 0: **fade from ≈ 0.4** plus a small **5–40 px** slide feels faster and keeps context [Collinsworth].
- Opacity can run **linear** while the transform is eased; scale and position MUST be eased.
- **Stagger** list items by 20–50 ms; stagger only the first ~5–8 visible items, then show the rest at once.
- Course demo values are often longer than shipping UI (presentation videos run 500–2000 ms). Use §14.6 durations in product UI (§22 #36).

**CSS keyword easings** (cubic-bezier control points) [Codecademy]:
| Keyword | `cubic-bezier` | Use |
|---|---|---|
| `ease` (default) | `0.25, 0.1, 0.25, 1` | general, slightly front-loaded |
| `ease-in` | `0.42, 0, 1, 1` | elements leaving |
| `ease-out` | `0, 0, 0.58, 1` | elements entering, hover |
| `ease-in-out` | `0.42, 0, 0.58, 1` | on-screen moves |
| `linear` | `0, 0, 1, 1` | opacity, color, spinners, progress |
- The keyword curves are soft; for crisper UI prefer stronger curves (M3 tokens in §14.6, or e.g. ease-out `cubic-bezier(0.16, 1, 0.3, 1)` †). Only the x values of `cubic-bezier` must stay in [0, 1]; y values outside that range create overshoot.
- Default CSS `transition-duration` is **0 s**: a transition with no duration does nothing. In the shorthand, the first time value is the duration and the second is the delay.

**Springs** (iOS, Compose, Motion/Framer, Figma, M3 Expressive): defined by **mass, stiffness, damping**; the **damping ratio ζ = damping / (2 √(stiffness × mass))** decides the character.
| ζ | Character | Use |
|---|---|---|
| 1.0 (critically damped) | no overshoot, fastest settle | effects: color, opacity, most productivity UI (M3 effects springs) |
| ≈ 0.8–0.9 | tiny overshoot | spatial moves: position, size, shape (M3 spatial springs ≈ 0.9) |
| ≈ 0.5–0.7 | visible bounce | playful confirmations, likes, toggles in consumer apps |
| < 0.5 | wobbly | avoid in UI |
- Example [Kole Jain]: stiffness 636, damping 24, mass 1 → ζ ≈ 0.48, ≈ 18 % overshoot, settles in ≈ 500 ms. Treat this as a playful upper limit, not a default.
- Converting an M3 spring to Figma or another tool: **damping = ζ × 2 √stiffness** (mass 1). Example: ζ 0.9, stiffness 700 → damping ≈ 47.6 † [ZTM].
- Springs are interruptible and carry velocity, so they suit gesture-driven motion; a duration-based curve restarts awkwardly when interrupted.

### 14.9 Implementing motion on the web (CSS/JS)
- NEVER `transition: all`: list the properties (`transition: transform 200ms, opacity 200ms`) [Comeau]. `all` animates layout changes and surprises.
- Animate only **`transform` and `opacity`** (and `filter` with care); animating `width`, `height`, `top`, `left`, `margin` triggers layout on every frame. For size changes use `transform: scale` or the FLIP technique, or View Transitions.
- `will-change: transform` only on elements about to animate, and remove it after; it costs memory and can blur text [Comeau].
- **Reduced motion, opt-in pattern** [Comeau]: write the static version first and add motion only inside `@media (prefers-reduced-motion: no-preference) { … }`. In JS, read `matchMedia('(prefers-reduced-motion: reduce)')` and listen for changes. Reduced motion means **replace** large movement with fades or instant changes, not remove all feedback [Collinsworth].
- **Hover jitter ("doom flicker")** [Comeau]: if hovering moves the element, the pointer can fall off it and toggle hover in a loop. Put the hover trigger on a stable parent and move a child.
- **Springs in CSS**: the `linear()` easing approximates a spring with ~20–50 points; wrap it so old browsers get a cubic-bezier fallback:
  ```css
  :root { --spring: cubic-bezier(0.2, 0.9, 0.3, 1.2); }
  @supports (transition-timing-function: linear(0, 1)) {
    :root { --spring: linear(0, 0.218, 0.629, 0.973, 1.151, 1.179, 1.123, 1.048, 0.993, 0.969, 0.969, 0.981, 0.995, 1.003, 1.006, 1.005, 1.003, 1, 0.999, 0.999, 1); }
  }
  .card { transition: transform 600ms var(--spring); }
  ```
  (This curve is the ζ ≈ 0.48 example above: playful. Use fewer, smaller overshoot values for calm UIs.)
- Keyframes: **partial keyframes** (only `to {}`) start from the current value; use `animation-fill-mode: both` so the first frame applies during the delay and the last frame persists.
- **Scroll-driven animations** (`animation-timeline: view()` / `scroll()`, with `animation-range`) replace JS scroll listeners for reveal and progress effects. Keep them decorative and disable them under reduced motion. NEVER hijack scroll speed or direction.
- **View Transitions API** (`document.startViewTransition`, `view-transition-name`) for shared-element and page transitions on the web; it supports the container-transform pattern without JS layout math.
- CSS vs JS: CSS for state transitions (hover, open/close); a JS library (e.g. Motion) for gesture-driven, interruptible, spring or layout animations. Avoid hand-rolled `requestAnimationFrame` loops for UI.
- **Busy states**: a loading button MUST block duplicate submits in **logic**, not just look disabled [School of Motion]. Progress animation MUST reflect real progress; never fake a bar that stalls at 99 %.

### 14.10 Microinteraction recipes (starting values; tune to the product)
| Pattern | Recipe |
|---|---|
| Button press | scale to **0.95–0.97** on pointer-down, instant or ≤ 100 ms; release returns with a short ease-out or spring |
| Hover lift (cards) | translateY −2 to −4 px + next shadow level (§7.5), in 150 ms, out 250–400 ms |
| Toggle / checkbox | thumb slides 150–200 ms standard easing; check mark draws (stroke-dashoffset) ≈ 150–250 ms |
| Like / favourite | icon scales up to ≈ 1.2 then settles (spring ζ ≈ 0.5–0.7), ≈ 100–300 ms; optional burst |
| Button label change | old text slides/rolls out, new in (e.g. "Add" → "Added ✓"), 150–250 ms; keep the button width stable |
| Loading button | label → spinner in place, button width fixed, ≤ 200 ms morph; success check, then revert after ≈ 1–2 s |
| Toast stack | new toast enters from the edge with ease-out 200–300 ms; older ones scale down/offset slightly behind; auto-dismiss ≥ 4–6 s, pause on hover/focus |
| Tooltip | opacity + 4–8 px slide from the trigger, 100–150 ms after the open delay (§3.4) |
| Search expand | icon → field widens 200–300 ms, focus moves to the field, Esc collapses |
| Progress ring | stroke-dashoffset tied to real progress, linear; completion pulse once |
| Swipe card | follows finger 1:1; past threshold → flies out with velocity; below → springs back |
| Shimmer / animated border | slow (≥ 1.5–3 s loop) with a pause between loops; stops under reduced motion; never on many elements at once |

### 14.11 Choosing tools and handing off motion
| Need | Tool |
|---|---|
| Screen-to-screen prototype, simple state changes | Figma prototyping (Smart Animate), Appendix A |
| Timeline-precise presentation video | Figma Motion (timeline mode), After Effects |
| Lightweight vector animation shipped in app/web | **Lottie / dotLottie** (After Effects + Bodymovin, or Figma/LottieFiles plugins) |
| Interactive animation with states and inputs (characters, toggles, onboarding) | **Rive** (state machines) |
| Realistic prototypes with sensors, conditions, variables | ProtoPie |
| Production UI | platform code: SwiftUI/UIKit, Jetpack Compose, CSS/Web Animations, Motion |
- Pick the lowest fidelity that answers the question; don't build a 60 fps After Effects film to decide whether a menu should slide or fade.
- Lottie: author at **30 fps**, check playback at **60 fps**, aim ≲ **100 KB**; avoid effects Lottie can't export (shaders, angular gradients, most blurs) [Skillademia, School of Motion].
- Video exports for review: MP4, 24–30 fps. Loops MUST end on their first frame.
- **Motion spec** (one per animation, attach to the component) [School of Motion, DesignerUp]:
  ```yaml
  name: card-to-detail
  trigger: tap on card
  elements:
    - target: card container
      property: [position, size, corner-radius]
      from: card bounds, radius 16
      to: full screen, radius 0
      duration: 350ms        # or spring: {stiffness: 400, damping: 36}
      easing: emphasized-decelerate
      delay: 0
    - target: detail content
      property: opacity
      from: 0
      to: 1
      duration: 150ms
      delay: 200ms
  interruptible: true
  reduced_motion: cross-fade 150ms
  notes: back gesture reverses the transform
  ```

### 14.12 Motion stress tests (run before shipping)
1. **Long text and localisation**: labels 30 % longer, wrapping titles. Does the animation still fit?
2. **Extreme values**: 0 items, 1 item, 1,000 items; 0 % and 100 % progress; huge numbers in counters.
3. **Image shapes**: portrait, landscape, square, missing image during a container transform.
4. **Resizing**: rotate the phone, resize the window mid-animation; nothing should jump or clip.
5. **Rapid input**: tap or hover repeatedly; animations must be interruptible and blend from the current state (≈ 0.2 s blend), never queue up or restart from the start.
6. Reduced motion on, slow device (CPU throttled 4–6×), 120 Hz and 60 Hz screens.

---

## 15. Accessibility (non-negotiable baseline: WCAG 2.2 AA + platform guidelines)

About 15 % of people live with a significant disability (≈ 1 billion; 61 M US adults); disabilities can be permanent (one arm), temporary (broken arm) or situational (holding a baby, bright sunlight, noisy room). Accessible design helps everyone (curb-cut effect). **Build it in from the start.** WCAG principles: **Perceivable, Operable, Understandable, Robust (POUR)**.

### 15.1 Vision
- Contrast per §3.3 in all appearances; never color alone; grayscale check.
- Text scales to **200 %** (iOS Dynamic Type to AX5; Android sp at 200 % font scale; web zoom/reflow to 320 CSS px width without horizontal scrolling †) without clipping, overlap or loss of function.
- Every meaningful element has an accessible name/description (VoiceOver labels, Android `contentDescription`/Compose semantics, web `alt`/`aria-label`/visible label); decorative elements hidden from assistive tech.
- Logical **reading and focus order** (top → bottom, leading → trailing; mirrored in RTL); headings marked as headings; landmarks (header, nav, main, footer) and a skip link on the web.
- Group related elements so screen readers announce a list item/card as one unit; announce state (selected, expanded/collapsed, checked, disabled) and dynamic changes (live regions, accessibility notifications).
- Descriptive link and button text that makes sense out of context ("Download report", never "Click here"/"More").
- Support Increase Contrast, Reduce Transparency, Bold Text, Smart Invert, color filters; offer higher-contrast palettes.
- Charts and images: alt text/summaries; data tables as alternatives.

### 15.2 Motor and input
- Targets per §3.1; spacing between targets; larger targets for primary CTAs, on-the-move use, children, seniors, kiosks.
- **Every gesture has a visible, single-pointer alternative** (button for swipe-to-delete, buttons for pinch-zoom, drag-and-drop alternatives via menus). Simplest gestures for frequent actions; no custom multi-finger gestures for essential functions; never conflict with system edge gestures.
- **Full keyboard operability** on desktop, web, iPad and Mac (Full Keyboard Access): Tab/Shift+Tab through interactive elements in visual order, arrow keys inside composite widgets (lists, menus, tabs, radio groups, grids), Enter/Space activate, Esc closes temporary UI; no keyboard traps except inside modals (trap focus, return it to the trigger on close); sensible initial focus. Don't override system shortcuts.
- **Visible focus indicator** on every focusable element, ≥ 3:1 contrast, thick (M3: 3 dp ring, 2 dp offset); never remove outlines without a better replacement; color change alone isn't enough.
- Support Switch Control/Access, Voice Control (labels match visible text), AssistiveTouch, pointer control.
- No hover-only functionality (touch and keyboard users can't hover).
- Avoid time limits; if needed, allow extending/disabling; avoid auto-dismissing UI for important info (dismiss by explicit action).
- Dragging movements need a single-pointer alternative (WCAG 2.2 2.5.7).

### 15.3 Hearing
- Captions/subtitles, transcripts, audio descriptions; visual + haptic alternatives to sound alerts; text/chat alternatives to voice or phone channels.

### 15.4 Cognitive and neurodiverse
- Simple language, short sentences, consistent terms and layouts, one primary action per screen, clear steps with progress, predictable behaviour.
- Forgiving input, undo, confirmation for hard-to-recover actions (Apple Assistive Access: confirm twice).
- No autoplay; respect Reduce Motion and Dim Flashing Lights; no flashes > 3/s.
- Left-aligned text, no justified text, limit italics and ALL CAPS, avoid dense walls of text.
- Redundant entry avoided (don't ask for the same information twice — WCAG 2.2 3.3.7); accessible authentication without cognitive tests (allow paste and password managers — 3.3.8).

### 15.5 Testing
- Automated checks (contrast, labels, Accessibility Inspector / Accessibility Scanner / axe) **plus** manual: keyboard-only pass, screen reader pass (VoiceOver, TalkBack, NVDA/JAWS), largest text size, 200 % zoom, grayscale, reduced motion, high contrast, RTL pseudo-locale.
- Test with real users of assistive technology (~5 per round).
- Declare support where platforms allow (Apple Accessibility Nutrition Labels).

---

## 16. UX writing (microcopy)

- **Clear, concise, useful**: the fewest words needed; read it aloud. Cutting words by ~half, making text scannable and objective improved usability by **+124 %** combined [NNg].
- **Front-load**: most important information first (inverted pyramid); first two words of headings, links, buttons and list items carry the meaning; don't start every list item with the same words.
- **Users' language**: plain words, no jargon, no internal codes; define technical terms; ≈ 6th–8th grade reading level for general audiences.
- **Voice and tone**: consistent voice (keep a glossary of terms); tone matches the moment (serious for errors and payments, light for celebrations). Address people as **"you"**; reserve "we" for the company, and avoid "we" in system messages ("Unable to load content", not "We're having trouble…") [Apple]. Don't switch perspective; use possessives sparingly ("Favorites", not "Your Favorites").
- **Actions are verbs**: buttons and menu items describe the result ("Send", "Save draft", "Delete account"), never "Click here", "Submit" when something more specific fits, or "Yes/No".
- Multi-step flows: "Get Started" → "Continue"/"Next" → "Done" consistently.
- **Capitalisation**: choose per element type and apply consistently. Apple: title case for buttons, menus, alerts titles that are fragments, column headings; sentence case for full sentences and tooltips. Material/web: **sentence case** for almost everything. Never all caps for sentences.
- **Device-appropriate verbs**: "tap" on touch, "click" with pointer; better, use device-neutral verbs ("select", "choose") in shared code.
- Settings labels describe what happens when **on**; link directly to settings instead of describing the path.
- Error messages: see §14.4. Empty states: see §14.3. Permission rationales: see §21.2.
- Don't explain standard components; explain what they do in *your* app.
- Inclusive language: gender-neutral ("they", "Subscribers can…"), people-first disability language, no idioms or culture-specific humour (hard to translate).
- **Localisation-ready**: leave ~30 %+ room for text expansion (German, Finnish), don't concatenate strings, use locale-aware date/number/currency formats, unambiguous date formats ("June 6", not "6/6"), mirror layouts for RTL, no text in images.
- Numbers: numerals ("3 items"); units spelled clearly in accessibility labels ("60 minutes", not "60m").

---

## 17. Platform: iOS and iPadOS (Apple HIG, Liquid Glass era)

### 17.1 Context
- iPhone: held in one or two hands, portrait ↔ landscape, sessions from 1–2 min check-ins to an hour; frequent app switching. iPad: touch + keyboard + trackpad + Apple Pencil, often combined; multiple apps/windows on screen.
- Mobile sessions are short (~72 s average vs ~150 s desktop) and interrupted → **save state continuously** and restore exactly (scroll position, drafts, selection).

### 17.2 Structure
- iPhone: **tab bar** (≤ 5, floating at the bottom, filled SF Symbols + single-word labels) for top-level sections + **navigation stack** with a **large title** that collapses to an inline title on scroll; **sheets** for scoped tasks; **action sheets** for choices after an action.
- iPad: tab bar near the top or **sidebar-adaptable** tab view; **split views** (sidebar → list → detail) in regular width; popovers instead of sheets in regular width; support multiple windows, Split View, Slide Over, resizable windowed mode (window controls at the toolbar's leading edge: move leading buttons inward).
- **Decide layout by size class (compact/regular), not device or orientation**; keep functionality identical across size classes (tab bar ↔ sidebar).
- Minimise modality and full-screen transitions on iPad; use the space to show content, not to stretch controls.

### 17.3 Layout and controls
- Respect safe areas (Dynamic Island, corners, home indicator) and layout margins; readable-width guides for text.
- Frequently used controls in the **middle or bottom** of the screen (thumb reach); search field at the bottom toolbar when there's room.
- Liquid Glass: controls and navigation float on glass above the content layer; don't use glass in the content layer; don't add custom bar backgrounds or tint multiple controls; use the scroll edge effect; content extends edge to edge under bars. With clear glass over bright media add a ~35 % dark dimming layer.
- Toolbars: only the most important items; standard Back (chevron) and Close (×) symbols without text; one prominent action (Done) at the trailing side; titles < 15 characters, never the app name.
- Lists: grouped/inset-grouped styles for settings; disclosure chevrons for drill-down; switches only in rows; swipe actions with visible alternatives; edit mode for multi-select.
- Context menus (touch and hold) with previews; either a context menu or an edit menu for an item, not both. Home Screen quick actions: 1–4 high-value tasks with SF Symbols.
- Keyboard types and Return-key labels matched to fields; keep fields above the keyboard (keyboard layout guide).
- Pickers: compact date picker when space is tight; inline calendar otherwise.
- Gestures: support swipe-back from the left edge, swipe actions in rows, pull-to-refresh, 3-finger undo/redo, shake to undo (don't redefine them); every gesture also has an on-screen control.

### 17.4 Typography, color, icons
- SF Pro with text styles and Dynamic Type (§8.2), test up to AX5; SF Symbols (outline in toolbars/lists, fill in tab bars/selected states), matching text weight and scaling with text.
- System/semantic colors, light + dark + increased contrast variants; accent color for primary actions and selection only.

### 17.5 System behaviours
- **Launch instantly**; the launch screen nearly matches the first screen (no text, no logo/ads); restore previous state.
- Permissions requested **when the feature is used**, with a specific purpose string (§21.2). Optional pre-alert screen has one "Continue" button only.
- Account: require only if core functionality needs it; prefer **Sign in with Apple** / **passkeys**; delay sign-in; name the method ("Sign In with Face ID"); provide in-app account deletion.
- Ratings: system prompt only, after demonstrated engagement, never on first launch, ≥ 1–2 weeks apart (system limits to 3 per year).
- Settings: best defaults, minimal settings, task options in context; rarely changed options may live in the Settings app (link directly to it).
- Undo: shake/3-finger swipe; alert titles "Undo Typing".
- Haptics: system feedback generators (notification success/warning/error, impact, selection) only for their meaning.
- Widgets/Live Activities: glanceable, ≥ 11 pt text, standard margins (widgets 16 pt, Lock Screen Live Activity 14 pt).

---

## 18. Platform: Android (Material Design 3, incl. M3 Expressive 2025)

### 18.1 Foundations
- **Tokens, not raw values**: `md.sys.color.*`, `md.sys.typescale.*`, shape, motion, elevation. Theme by changing roles, not by overriding individual components.
- Color scheme from one source color (Material Theme Builder / Material Color Utilities) in light and dark (+ medium/high contrast), dynamic color with static fallback (§9.3).
- Type scale: 15 roles (§8.4) + emphasized variants; Roboto/Roboto Flex/Google Sans Flex or brand fonts in brand/plain slots; sp units.
- Shape scale: **0 / 4 / 8 / 12 / 16 / 20 / 28 / 32 / 48 dp / full**; bigger, more important containers get rounder corners (chips 8, cards 12, FAB 16, dialogs and sheets 28, buttons and switches full). Expressive: shapes morph with state (round → square when pressed/selected) and a library of 35 decorative shapes for avatars, crops and loading indicators.
- Elevation levels: 0 / 1 / 3 / 6 / 8 / 12 dp, expressed mostly as tonal surface containers; hover lifts +1 level; app bars rise to level 2 when content scrolls under.
- 8 dp grid (4 dp for small parts); touch targets **48×48 dp**; margins 16 dp compact, 24 dp medium+; pane spacer 24 dp.

### 18.2 Window size classes and canonical layouts
| Width class | Window width | Panes | Navigation |
|---|---|---|---|
| Compact | < 600 dp | 1 | Navigation bar (3–5) |
| Medium | 600–839 dp | 1 (2 optional) | Navigation rail |
| Expanded | 840–1199 dp | 2 | Rail (collapsed or expanded) |
| Large | 1200–1599 dp | 2–3 | Expanded rail / standard drawer |
| Extra-large | ≥ 1600 dp | 2–3 | Expanded rail / standard drawer |
- Height classes: compact < 480 dp (phones in landscape), medium 480–899, expanded ≥ 900. A landscape phone is medium width but compact height → avoid two cramped panes and tall vertical navigation.
- Size classes come from the **window**, never "isTablet"; they change at runtime (split screen, freeform windows, folding, rotation) and **state must survive**.
- **Canonical layouts**: **list-detail** (email, messages, settings; keep the detail visible when narrowing, show a placeholder detail when widening), **feed** (grid of equivalent cards with adaptive columns, e.g. min item width ~180 dp), **supporting pane** (main ≈ 2/3, supporting ≈ 1/3; becomes a bottom/side sheet on compact).
- Adaptive strategies: reflow, reveal/show-hide, resize/scale (type one or two steps up), **component swap** (§12.4), divide into panes.
- **Never lock to portrait** (causes letterboxing); support resizing, folding (hinge-aware: keep content off the hinge; tabletop = content top, controls bottom) and multi-window.
- Set max widths on text (~60 characters), inputs and buttons; never stretch them full width on large screens.

### 18.3 Components (Expressive replacements)
- Use: **docked toolbar** (not bottom app bar), **expanded navigation rail** (not navigation drawer), **connected button group** (not segmented buttons), **medium/large flexible app bars** (not medium/large top app bars), **FAB menu** (not speed dial), **loading indicator** (morphing shape, 48 dp, waits < ~5 s) instead of most indeterminate circular indicators, **extended FAB small/medium/large**. Small FAB (40 dp) and surface FABs are deprecated.
- Key sizes: nav bar 80 dp (Expressive 64), rail 80 (96) dp, app bars 64 / 112 / 152 dp (flexible large 120), tabs 48/64, search bar 56, list items 56/72/88, menu items 48, chips 32, buttons 40 (Expressive XS–XL 32–136), FAB 56/80/96, snackbar 48/68, bottom sheet handle 32×4, dialog 280–560 wide †.
- Top app bar: up to 3 trailing actions, rest in overflow; scroll behaviours pinned / enter-always / exit-until-collapsed; becomes a contextual action bar during selection.

### 18.4 System integration
- **Edge-to-edge** with insets; protections behind system bars; no targets in gesture areas; respect cutouts.
- **Predictive back** on all custom screens (scale to 90 %, fade-through at 35 %); sheets/search have built-in support.
- Permissions: Android has no purpose string → show your own **pre-permission explanation** in context before the system dialog.
- Respect system font scale, dark theme, contrast settings, animation scale (reduce motion), TalkBack, Switch Access, Voice Access.
- Keyboard and mouse on Android tablets/Chromebooks/desktop: hover states, right-click context menus, instant drag with a pointer, keyboard shortcuts with the shortcuts helper, correct cursors.

---

## 19. Desktop: macOS, Windows-style desktop apps and the web

### 19.1 Principles for desktop
- Primary input is **keyboard + precise pointer**; touch, if any, is secondary (enlarge hit areas, not controls). Sessions are long and focused; users multitask with many windows.
- Show **more content in fewer nested levels** and with **less modality**, at comfortable density. "More screen, more done": denser information, not just bigger elements.
- Let people **resize, move, hide, full-screen and tile windows**; adapt fluidly to any window size; remember window size/position and app state.
- **Hover** states on every interactive element; pointer cursor changes meaningfully (pointing hand for links, I-beam for text, open/closed hand for draggable, resize arrows, crosshair, not-allowed, wait/progress, copy, help).
- **Right-click/secondary-click context menus** everywhere objects appear; drag-and-drop starts **instantly** with a pointer (no long-press), including between apps; band (rectangle) selection; Shift-click range, Cmd/Ctrl-click toggle selection.
- **Keyboard-first efficiency**: standard shortcuts, app shortcuts for the most frequent commands shown in menus and tooltips, full keyboard navigation, command palette for power users †.
- **Tooltips** on icon-only controls.
- Pointer targets can be smaller than touch targets (macOS default 28×28 pt, min 20×20 pt; web min 24×24 px), but primary actions stay comfortably large; never full-width buttons.
- Personalisation: customisable toolbars, resizable panes, density options (but most users won't customise: good defaults first).

### 19.2 macOS specifics
- **Menu bar is the source of truth**: every command (including every toolbar and context-menu command) appears there, with standard menus in standard order: **App · File · Edit · Format · View · [app menus] · Window · Help**. Menu-bar items keep the same set; **disable (dim) rather than hide** unavailable items. View menu always exists (Show/Hide Toolbar, Sidebar, Enter Full Screen); Window menu always exists.
- **Standard shortcuts** (never repurpose): ⌘N new, ⌘O open, ⌘S save, ⇧⌘S duplicate/save as, ⌘W close, ⌘Q quit, ⌘Z / ⇧⌘Z undo/redo, ⌘X/C/V, ⌘A, ⌘F find, ⌘G find next, ⌘P print, **⌘, Settings**, ⌘? help, **⌘. / Esc cancel**, ⌃⌘F full screen, ⌥⌘T toolbar, ⌘` next window. Modifier priority: ⌘ main, ⇧ secondary, ⌥ sparingly, avoid ⌃. List modifiers in the order ⌃⌥⇧⌘.
- Window anatomy: title bar + toolbar (unified, bezel-less items) + body; states: main, key (coloured window controls), inactive. No custom window frames/controls. Nothing critical in bottom bars.
- **Settings window** opened from App menu › Settings… (⌘,), pane toolbar, title = current pane, reopens last pane, minimise/zoom disabled.
- **Sidebar + split view** navigation; outline views for hierarchies; tables with sortable, resizable columns and alternating rows; inspectors/panels (not popovers) for adjustable properties; sheets modal to one window.
- Controls: push buttons (title case, "…" when more input needed, default button responds to Return), checkboxes for single settings and hierarchies (mixed state), radio buttons for 2–5 options, pop-up buttons for > 5 exclusive options, pull-down buttons for commands, switches for emphasised settings; none of these in toolbars except standard toolbar items.
- Typography: Body 13 pt, min 10 pt (§8.3); controls in regular/small/mini sizes consistently per area.
- Documents: autosave; "Untitled" new docs; "— Edited" in title when unsaved changes exist and autosave is off; Open Recent; Duplicate preferred over Save As; hide file extensions by default.
- Full screen via the green button/View menu/⌃⌘F; never auto-exit; let the Dock be revealed.
- Alerts: app icon, specific title, ≤ 3 buttons, suppression checkbox for repeating alerts; caution symbol only for unexpected data loss.
- Help tags (tooltips): ≤ 60–75 characters, start with a verb, describe the control only.
- Menu bar extras: optional, user-enabled, menu not popover, functions also available elsewhere.

### 19.3 Web and cross-platform desktop apps
- **Visible top or left navigation**; no hamburger on desktop; visible search box (not an icon) at the top; logo top-left links home; utility nav top-right; footer with secondary links.
- Links look like links (distinct color, **underlined in body text**), buttons look like buttons; never style non-links as links.
- Pages: inverted pyramid, scannable headings, main CTA above the fold, content width capped (~1000–1280 px containers, 45–75-character text measure).
- **Browser Back must work**: every meaningful state (filters, tabs, opened item, pagination) has a URL; modals/overlays close on Back; forms survive Back; NEVER hijack Back; avoid opening links in new tabs unless the user would lose work (and indicate it).
- Responsive (§20), keyboard accessible (logical tab order, skip link, visible focus), semantic HTML first (native `<button>`, `<a>`, `<label>`, `<select>`, landmarks, headings), ARIA only to fill gaps following WAI-ARIA Authoring Practices patterns.
- Performance is UX: aim for Core Web Vitals "good" (e.g. INP ≤ 200 ms †); render above-the-fold first; lazy-load the rest; skeletons for slow content.
- Use `prefers-color-scheme`, `prefers-reduced-motion`, `prefers-contrast`; rem/em units; `autocomplete` and correct `type`/`inputmode` on inputs.
- Infinite scroll only for homogeneous feeds; otherwise pagination or "Load more" (footer access, refinding).
- Pop-ups: never before content loads or immediately after login; no modal cookie walls (use nonmodal banners), no modal app-download prompts, no exit-intent nagging; delay any newsletter prompt until engagement, nonmodal, easy to dismiss.
- Hover menus with intent delay and click fallback; mega menus for large sites.
- Windows-style desktop apps †: follow the host OS conventions (Windows: Fluent design, title bar controls top-right, Ctrl-based shortcuts, Settings via app menu/gear, standard file dialogs). Electron/web-based desktop apps must still honour native shortcuts, menus, window behaviour and accessibility APIs.

---

## 20. Responsive and adaptive design

- Design **at least three representative widths**: phone (~360–414), tablet (~768–834), desktop (~1280–1440), plus check the extremes (320 px; ultrawide ≥ 1920). Breakpoints come from the **content** (where the layout breaks), aligned where possible with M3 window classes (600 / 840 / 1200 / 1600 dp) or the team's CSS framework †.
- Decide per element what happens across sizes: **reflow** (multi-column → single column; side-by-side cards → stacked), **reveal/hide** (secondary content behind disclosure on small screens; never remove functionality), **resize** (type one or two steps up on large screens), **reposition** (FAB → rail; bottom nav → rail/sidebar), **swap component** (bottom sheet → side sheet; full-screen dialog → dialog), **divide** (one long screen → panes).
- **Content and feature parity across devices; not identical UI.** Don't port mobile patterns to desktop or desktop patterns to mobile.
- Max widths on text, inputs and buttons; fluid images (`max-width: 100%`, preserve aspect ratio, art-directed crops for different ratios); responsive type with rem and clamp() where useful †.
- Touch vs pointer: detect capabilities (`pointer: coarse/fine`, `hover: hover`), not device names. Never make hover the only way to reveal content. Keep 44 px targets wherever touch is possible (laptops with touch screens, tablets with keyboards).
- Orientation: support both; content that didn't scroll in portrait shouldn't suddenly need scrolling in landscape for critical actions; keep primary actions reachable.
- Test reflow at each breakpoint and in between (layouts must stretch smoothly, not only snap), with long strings, localisation (+30 % length, RTL), largest text sizes, and multitasking/split windows.
- Developers need to see behaviour per breakpoint: specify grids, constraints (what stretches, what is fixed, what is pinned top/bottom), max widths and component swaps in the handoff.

---

## 21. Ethics, privacy, permissions and onboarding

### 21.1 Deceptive (dark) patterns: NEVER
| Pattern | What it does | Do instead |
|---|---|---|
| Obstruction / roach motel | Easy to sign up, hard to cancel/delete | Cancel and delete as easy as sign-up; account deletion in-app |
| Forced continuity | Trial silently converts to paid | Remind before the trial ends; one-click cancel |
| Sneaking / preselection | Items added to cart, paid add-ons pre-checked | Never pre-select paid or data-sharing options |
| Hidden costs | Fees appear at the last step | Show total price early |
| Confirmshaming / manipulinks | "No thanks, I don't like saving money" | Neutral, respectful decline copy |
| False urgency / false scarcity | Fake countdowns, fake "Only 1 left" | Urgency/scarcity only when true and complete |
| Visual tricks | Double negatives, misleading hierarchy, Close button far from the modal, disguised ads | Honest hierarchy; decline as visible as accept |
| Nagging | Asking again after a "no" | Respect choices; allow reversal in settings |
| Needy patterns | "Please don't go" pop-ups, guilt notifications, "come back" tab titles | Let people leave |
| Sludge | Friction that blocks good outcomes (multi-screen cookie rejection) | Reject in one step |
- Rule: **declining must be as easy and as visible as accepting**; defaults favour the user; persuasion (social proof, scarcity, anchoring) only when authentic and complete.
- Attention economy: don't design for compulsion (endless feeds with no stopping cues, autoplay, excessive notifications); respect people's time. Test for deception with a vulnerable-user persona (time-poor, low digital literacy).

### 21.2 Privacy and permissions
- Collect only what's needed, as specific as possible; process on-device where possible; be transparent about what you collect and why; protect data (Keychain/secure storage, encryption).
- **Ask in context, at the moment of need** (tapping the mic → mic permission), not at launch, unless the app can't function without it. Never a barrage of requests at install. Provide value before asking for non-critical permissions.
- Purpose text: brief, specific, active, states the user benefit. Formula: "*App* would like to access your *[resource]* so that you can *[concrete benefit]*." Any reason raises grants (+12 %); the best wording raised grants by +81 % vs the worst [NNg]. ✅ "The app records during the night to detect snoring sounds." ❌ "Microphone access is needed for a better experience."
- Pre-permission screen (optional): explains the benefit; one "Continue" button that triggers the system prompt; no fake system dialogs, no incentives, no "Allow" lookalikes (Apple rejects these for tracking prompts).
- After denial: don't show an error; explain why the feature is unavailable and deep-link to the exact setting.
- Accounts: only when core functionality requires it; delay sign-in until value is shown (browse first, sign in at purchase); prefer passkeys / Sign in with Apple / Google sign-in; 2FA for passwords; biometrics for re-auth; account deletion available in-app with clear consequences.
- Search history and sensitive data: offer to clear; hide sensitive info on Always-On/lock screens and shared devices.

### 21.3 Onboarding and help
- **Best onboarding is none**: make the UI usable first. Tutorials made apps *seem harder* in research (perceived ease 4.92 vs 5.49) without improving success [NNg].
- Warranted only when: data is needed to start (account, preferences that change content), functionality depends on context, or features are genuinely novel.
- If needed: **fast, optional, skippable**, few steps, one concept per step, learn by doing (interactive walkthrough in a safe sandbox), progress indicator, never explain standard controls, no legal text, no large blocking downloads, postpone non-essential setup with good defaults. Don't ask for visual customisation (themes) at onboarding.
- Prefer **contextual help** at first encounter (tips, coach marks on one control, empty-state guidance, checklists). Tips: ≤ 3-action features, 1–2 sentences, eligibility rules (don't show to people already using the feature), frequency limits (e.g. once per 24 h †), dismissible, re-accessible later.
- Feature promotion: not at first launch; contextually when actionable; short, skippable "what's new" only for genuinely new features.
- Ask for ratings, purchases or reviews **only after people have experienced value**, at natural breaks, never mid-task.

---

## 22. Conflict log (source disagreements and how they are resolved)

| # | Topic | Disagreement | Resolution in this guide | Why |
|---|---|---|---|---|
| 1 | **iOS type sizes** | Uxcel's Apple HIG course says Body = 14 pt, Headline = 14 pt Semibold, Large Title = 31 pt, body leading 19 (and contradicts itself, saying back buttons use "Body (17 pt)"). | **Apple's values**: Body 17/22, Headline 17 Semibold, Large Title 34/41, etc. (§8.2). Uxcel's 14/31 are the *xSmall* Dynamic Type sizes, not the default. | Apple's official HIG is the primary source; Uxcel's own macOS values and Caption 2 match Apple. |
| 2 | Touch target size | Apple 44×44 pt (min 28); M3 48×48 dp; NN/g 1×1 cm; WCAG 2.2 AA 24×24 px (AAA 44); Laws of UX "web ≥ 24, ideally 44". | Use **44 pt / 48 dp / 44 px** as the default everywhere touch is possible; treat 28 pt (iOS) and 24 px (web) as absolute floors for secondary, well-spaced targets only. | All values ≈ 7–10 mm physically; the floor values are compliance minimums, not recommendations. |
| 3 | "Large text" for 3:1 contrast | Apple's table: 18 pt any weight **or bold at any size**. WCAG: ≥ 18 pt, or ≥ 14 pt **bold**. | **WCAG definition** (≥ 18 pt / 24 px, or ≥ 14 pt / 18.66 px bold). | Stricter and the standard that audits use; Apple cites WCAG as its basis. |
| 4 | Minimum body text | Apple 17 pt default (min 11); M3 body ≥ 12 sp (body-medium 14, body-large 16); NN/g web body 14–16 px; Dan Scott and Google UX ≥ 16 px. | Default body: **17 pt iOS, 16 sp (lists/inputs) or 14 sp (paragraphs) Android, 13 pt macOS, 16 px web**. Never below 11 pt / 12 sp / 12 px even for captions; label-small 11 sp only for labels. | Each platform's native scale is calibrated to its viewing distance and pixel units; web 16 px is the browser default and prevents iOS input zoom. |
| 5 | Appearance setting | Apple: don't offer an app-specific light/dark setting. M3: follow system and offer an in-app override. | Follow the **system by default** everywhere; **no in-app toggle on Apple platforms** (except rare immersive media apps); optional override (with "System default") on Android/web. | Each rule is the platform's own convention (Jakob's Law per platform). |
| 6 | Icon-only vs labelled controls | NN/g: always pair icons with visible text. Apple toolbars: prefer simple symbols, no "Back"/"Close" text. | Navigation bars/tab bars: **always labels**. Toolbars with **standard platform symbols** (back chevron, ×, share, +, trash, search) may be icon-only **if** they have accessible names and desktop tooltips. Any non-standard icon gets a visible label. | Universal/standard glyphs are recognised; everything else fails recognition tests. |
| 7 | Where "close" goes | NN/g: X top-right of overlays. Apple: iOS sheets Cancel leading/Done trailing; macOS window close at top-left. M3: full-screen dialog close at top-start. | **Follow the platform**; on the web, X at the top-right of overlays plus Esc and Back. | Platform conventions win (§1.3). |
| 8 | Button text case | Apple: title case for buttons. M3/Google: sentence case. Figma 101 used ALL CAPS. | Apple → title case; Android/web → sentence case; **never all caps** for buttons. | M3 dropped all-caps buttons; all caps hurt readability. |
| 9 | Dialog button order | Apple: default trailing, Cancel leading. M3: confirming action last (end). Windows historically: OK before Cancel. | Platform order; on the web, follow the design system in use (default: primary at the end/right, as M3) †. | Platform conventions. |
| 10 | Validation timing | NN/g: on blur, never while typing. Apple: user name/password before leaving the field. | **On blur by default**; real-time only for requirement checklists, availability checks and impossible characters. | Prevents premature, hostile errors while keeping helpful live feedback. |
| 11 | Animation length | NN/g: 100–500 ms, ≥ 500 ms feels slow. M3: long tokens 450–600 ms for full-screen moves, emphasized 500 ms. Dan Scott: ~300 ms default, 600 ms push. | **~100 ms micro, 200–300 ms components, 300–500 ms full-screen**; > 500 ms only for large, infrequent, full-screen transitions on large/mobile screens. | Consensus range; frequency of use dictates brevity. |
| 12 | Easing | NN/g: never linear; ease-out entering, ease-in exiting. Dan Scott: ease-in-out "often looks best". M3: emphasized/standard tokens. | Decelerate in, accelerate out, standard (ease-in-out) for on-screen moves; linear only for opacity/color (§14.6). | Matches physics and all sources once the movement type is specified. |
| 13 | Toasts/snackbars for errors | NN/g: never toasts for errors. M3: snackbar may carry "Retry". | Snackbar OK for **transient, low-stakes failures with Retry**; errors that block a task or need input go **inline/banner/dialog**. | Combines both: transient messages vanish and can be missed. |
| 14 | Hamburger menu | Google UX lists "collapse top nav into a hamburger" as a responsive move; NN/g: never on desktop, avoid on mobile with ≤ 4 items. | Hamburger **only on small screens** when > 4–5 destinations, with a "Menu" label; never on desktop. | NN/g quantitative research (discoverability −20 %, desktop tasks ≥ 39 % slower). |
| 15 | Miller's 7±2 | Google UX: "short-term memory holds about 7 items → chunk". Laws of UX: don't use 7 as a limit on visible items. | Apply 7±2 (better: 4±1 chunks) to what users must **remember**, not to how many items they can **see**. | Original research concerns memory span. |
| 16 | Mobile column grid | Figma 101: 3 columns; Dan Scott: 6 or 12 columns; Figma 6h/M3/Google UX: 4 columns. | **4 columns** on compact (6 or 12 acceptable when finer subdivision is needed); 8 tablet; 12 desktop. | Majority + Material default. |
| 17 | Focus/pressed state-layer opacity | M3 tokens v0_192: 12 %; newer M3 spec: 10 %. | 10–12 % (prefer the version of your M3 library). | Both are official at different versions. |
| 18 | Scrim opacity | M3 ≈ 32 % †; Dan Scott ≈ 50 %. | **32–50 %** dark scrim; enough to separate layers while keeping context. | Neither value verified as a hard rule. |
| 19 | Segmented control count | Apple: ≤ ~5 on iPhone, 5–7 on wide UIs; Uxcel: 2–5; M3 segmented buttons 2–5 (deprecated → connected button groups). | **2–5** segments (up to ~7 only on wide desktop UIs). | Conservative common range. |
| 20 | Placeholder text | Apple: placeholder hint + separate label. Uxcel: placeholder gives context and vanishes. NN/g: placeholders harmful. M3: labels must stay visible. | **Visible label always**; placeholder only as an optional example; never the only label. | All sources agree a label must be visible; NN/g research on harm. |
| 21 | Pure black / pure white | Figma courses: avoid pure #000 on #FFF for long reading; Apple: OLED true black acceptable in media contexts; M3: dark theme uses dark grey. | UI surfaces: off-white/dark grey; text near-black/near-white while keeping ≥ 4.5:1 (prefer ≥ 7:1). Pure black acceptable for full-screen media. | Comfort without sacrificing contrast. |
| 22 | Max drill-down depth | Uxcel ~3–4 levels; Apple: Mac fewer nested levels; sidebars ≤ 2 levels. | Prefer shallow (≤ 3–4 levels mobile, fewer on desktop with split views) †. | Heuristic, not a hard standard. |
| 23 | Body line length | M3 40–60 / ~60 chars; Google UX 45–75; Figma for beginners 1000 px at 20 px. | **45–75 characters**, ~60–66 ideal. | Consensus. |
| 24 | Google UX course numbers | Course 5–6 values (breakpoints, grid columns) came from known/companion material, not transcripts. | Marked † where used. | Course videos were behind login. |
| 25 | Low-contrast secondary text | Refactoring UI's tertiary grey `#A0AEC0` on white (2.3:1) and "de-emphasise with lighter grey". WCAG: 4.5:1 for all text. | De-emphasise with weight, size and position; secondary grey **≥ 4.5:1** (on white, `#767676` or darker). | WCAG is the floor (§1.3); the book predates wide AA audits. |
| 26 | Links without color | Refactoring UI: links inside UI can be marked by weight or position only. WCAG 1.4.1: color alone is not enough, and NN/g: underline body-text links. | Body-text links: **colored + underlined**. Links in navigation, menus and buttons: position/shape is enough. | Both hold in their own context. |
| 27 | Borderless inputs | Refactoring UI and Shift Nudge show fields marked only by a faint background tint. WCAG 1.4.11: the boundary needed to identify a control must reach 3:1. | Field boundary (border or fill edge) **≥ 3:1** against the background. Tinted fills are fine if their edge passes. | Accessibility floor. |
| 28 | Placeholder contrast | Several course mockups use very light placeholder text. WCAG: placeholder is text, so 4.5:1. | Placeholder ≥ 4.5:1, and never the only label (§22 #20). | WCAG. |
| 29 | Pill shape = primary | Shift Nudge: reserve full-pill shape for the primary action. M3: pill (full) shape is the default for all common buttons. | Hierarchy comes from **fill and color** (filled > tonal > outlined > text), not shape. On M3 keep M3 shapes; elsewhere one consistent radius per button family. | Platform conventions win. |
| 30 | Shadows vs tonal elevation | Refactoring UI, Kennedy: shadow scales express elevation. M3: tonal surface colors first, shadows sparingly; dark mode: shadows barely visible. | Light theme web/desktop: shadow scale (§7.5). M3 apps and all dark themes: **tonal surfaces** (+ hairline stroke), small shadows only for floating layers. | Each fits its rendering context. |
| 31 | Destructive actions styling | Refactoring UI: destructive actions need not be big red buttons unless they are the confirmation step. Some courses style every Delete red. | In normal screens, Delete is **secondary/tertiary** (often red text); the **confirmation dialog's** confirm button is the red primary. | Avoids accidental emphasis while keeping a clear final warning. |
| 32 | Tooltip delay | Kole Jain's demo: 1000 ms. NN/g/OS conventions: ~500 ms. | First tooltip **500–700 ms**, later neighbours instant †. | 1 s feels broken for icon-only toolbars. |
| 33 | Exit faster vs linger on return | NN/g, M3: exits shorter than entrances. Comeau: hover-out slower than hover-in. | Elements **leaving the screen** exit faster; elements **returning to rest in place** may ease back slower. | Different situations, so both rules hold. |
| 34 | Bounce and overshoot | Kole Jain, Million Frames: bouncy springs and "Back" easings as default. M3/Apple: subtle (spatial ζ ≈ 0.9, effects 1.0); NN/g: no gratuitous motion. | Default **ζ 0.8–1.0**; visible bounce only for playful, infrequent, positive moments; never for errors, destructive actions or frequent controls. | Productivity and comfort beat delight. |
| 35 | Long springs | Some course springs settle in ~1000 ms or more. §14.6: ≤ 500 ms for most UI. | Spring visual settle ≲ **500 ms** for components; up to ~600 ms only for full-screen moves. Interactions stay usable during the settle. | Frequency of use dictates brevity. |
| 36 | Demo durations | Skillademia/ZTM video exercises use 500–2000 ms timelines. | Presentation videos may be slower; **product UI uses §14.6 durations**. | Videos are watched, UIs are used. |
| 37 | Figma presets vs tokens | Figma's "Gentle/Quick/Bouncy/Slow" springs † and "Ease In And Out Back" are generic. Platforms define motion tokens. | Prototype with presets; **hand off platform tokens** (M3 spring/duration tokens, iOS `.smooth`/`.snappy`, or the project's own). | Tokens are what engineers implement. |
| 38 | Pressed overlay strength | Million Frames: 20–30 % black overlay on press. M3: pressed state layer 10–12 %. | Follow the platform state layer (M3 10–12 %); custom designs ≤ ~15–20 %. | 30 % hides content and looks like disabled. |
| 39 | Caption size via Fibonacci | Brainmunk shows an 8 pt caption in a Fibonacci scale. Platforms: ≥ 11 pt / 12 sp / 12 px. | Never below platform minimums (§3.2). | Legibility floor. |
| 40 | Golden-ratio type scale | Canva mentions 1.618 scales. RUI/Scrimba: hand-picked scales, ratio 1.2–1.333. | **1.2–1.333** or a hand-picked scale; golden ratio only for display/marketing headings. | 1.618 leaves no usable middle sizes. |
| 41 | Red as CTA | Canva: red attracts attention, good for calls to action. Shift Nudge/platforms: red = destructive/error. | **Never red for a primary non-destructive action** in product UI; red reserved for errors and destructive actions (marketing pages for red brands excepted). | One color, one meaning. |
| 42 | Large text bold any size | Apple's contrast table: bold text at any size counts as "large". Uxcel and WCAG: ≥ 14 pt bold only. | WCAG definition (§22 #3, restated by Uxcel). | Stricter standard wins. |
| 43 | Justified text | Some layout examples justify body text. Canva, NN/g, WCAG 1.4.8: left-align. | **Left-aligned** (ragged right) for UI and web; justified only with hyphenation in print-like reading apps. | Readability and dyslexia. |
| 44 | Text at 50 % opacity | Skillademia and glass mockups use 50 % black text. On white it is 3.9:1. | Secondary text via opacity **≥ 55–60 %** on white, verified; on glass/images, check the worst background. | WCAG 4.5:1. |
| 45 | APCA vs WCAG 2 | Shift Nudge reports APCA Lc values; WCAG 3 is a draft. | Ship to **WCAG 2.2 ratios**; APCA is an optional extra check. | Only WCAG 2.x is a legal/audit standard. |

---

## 23. Review checklists

Run the relevant lists before delivering any design or UI code. Report failures with the rule section number and a fix.

### 23.1 Every screen (any platform)
- [ ] Purpose clear in 5 seconds: one primary task, one visually dominant primary action.
- [ ] Platform conventions followed (navigation, controls, positions, gestures, wording).
- [ ] Visual hierarchy passes the squint test; ≤ 3 main type sizes; whitespace groups related items (proximity), containers only when needed.
- [ ] Spacing from the 8-pt scale; aligned to grid/margins; safe areas respected.
- [ ] Type from the scale; body at platform default; nothing below the minimum; works at 200 % / largest Dynamic Type.
- [ ] Color from role tokens; contrast ≥ 4.5:1 text, ≥ 3:1 large text and UI parts; no color-only meaning; light + dark (+ high contrast) checked.
- [ ] Targets ≥ 44 pt / 48 dp / 44 px (floors 28 pt / 24 px only for secondary), adequately spaced; destructive actions separated from primary ones.
- [ ] Interactive elements look interactive; static ones don't; hover and focus states on pointer/keyboard platforms.
- [ ] Icons standard or labelled; accessible names everywhere; decorative elements hidden.
- [ ] All states designed: default, hover, focus, pressed, selected, disabled, loading, empty, error, success, offline, long/short content, localisation (+30 %), RTL.
- [ ] Feedback within 100 ms; indicators for waits > 1 s; determinate progress + cancel for ≥ 10 s.
- [ ] Back/Cancel/Undo available; no dead ends; state preserved on navigation and interruption.
- [ ] Copy: verbs on buttons, users' language, front-loaded, consistent terms, no blame, correct capitalisation for the platform.
- [ ] No deceptive patterns; permissions in context with clear benefit; decline as easy as accept.

### 23.2 Mobile-specific (iOS / Android)
- [ ] Bottom tab/nav bar for 3–5 top-level destinations, always labelled; deeper navigation via stack with Back.
- [ ] Primary actions within thumb reach; FAB (Android) only for the single primary constructive action.
- [ ] Every gesture has a visible alternative; system gestures not overridden; edge-to-edge with insets (Android); predictive back supported.
- [ ] Correct keyboards, autofill, autocorrect settings; fields stay above the keyboard.
- [ ] Device capabilities used instead of typing (camera, location, wallet, biometrics, passkeys).
- [ ] Sheets/dialogs follow platform patterns (detents/grabber on iOS; bottom sheet → side sheet on larger windows).
- [ ] Works in portrait and landscape, split screen, foldables; not locked to portrait (Android).
- [ ] Dynamic Type (AX sizes) / font scale 200 % reflow tested; VoiceOver/TalkBack order and labels tested.
- [ ] Launch fast; state restored; permissions deferred; no onboarding unless justified.
- [ ] Tested on a real device at 100 %.

### 23.3 Desktop-specific (macOS / Windows / web)
- [ ] Navigation visible (top nav or sidebar); no hamburger; visible search box.
- [ ] Full keyboard operability, logical tab order, visible focus, standard shortcuts, shortcuts shown in menus/tooltips; Esc cancels; Enter submits.
- [ ] Right-click context menus; instant drag-and-drop; multi-select with Shift/Cmd/Ctrl; hover states and correct cursors; tooltips for icon-only controls.
- [ ] macOS: complete menu bar with standard menus/order; every toolbar/context command also in the menu bar; Settings at ⌘,; no critical controls at window bottom.
- [ ] Windows resizable, layout adapts at every width; content width capped; denser information instead of stretched controls.
- [ ] Web: browser Back works for every state; URLs for meaningful states; links underlined in body text; semantic HTML; skip link; landmarks; no modal pop-ups before content; Core Web Vitals within targets.

### 23.4 Forms
- [ ] Only necessary fields; system data and autofill used; single column; labels above; no placeholder-as-label.
- [ ] Required/optional marked simply; constraints and formats shown before input; forgiving formats.
- [ ] Right controls (radios for 2–5, no dropdowns for birth dates); sensible defaults.
- [ ] Validation on blur, inline, color + icon + text, says how to fix, input preserved, focus moves to first error on submit.
- [ ] Submit right after last field; no Reset; multi-step forms show progress and keep data on Back.

### 23.5 Accessibility quick audit
- [ ] Contrast (text, large text, UI components, focus indicators) in all modes.
- [ ] Screen reader: names, roles, states, headings, order, grouping, announcements.
- [ ] Keyboard-only and switch access complete every task.
- [ ] 200 % text / zoom and reflow; no truncation of essential text.
- [ ] Reduced motion honoured; no flashing; no autoplay; pausable moving content.
- [ ] Captions/transcripts; non-audio alternatives for sounds.
- [ ] No time limits or adjustable ones; no hover-only or gesture-only functions; dragging has an alternative.
- [ ] Grayscale test passes.

### 23.6 Heuristic evaluation (score each 0–4, list issues with P0/P1/P2)
1 Visibility of status · 2 Match with real world · 3 User control & freedom · 4 Consistency & standards · 5 Error prevention · 6 Recognition over recall · 7 Flexibility & efficiency · 8 Aesthetic & minimalist · 9 Error recovery · 10 Help & documentation.
Priority: **P0** blocks a core task, causes data loss, deceives, or fails accessibility → fix before shipping; **P1** significant friction → next iteration; **P2** polish.

### 23.7 Handoff to engineering
- [ ] Tokens/styles named by role and matching code (color, type, spacing, radius, elevation, motion).
- [ ] Components with all variants and states; documented usage ("which and why").
- [ ] Specs per breakpoint: grids, constraints, max widths, component swaps.
- [ ] Interaction and motion notes (trigger, duration in ms, easing).
- [ ] Accessibility annotations: headings, reading/focus order, labels, alt text, landmarks, keyboard behaviour.
- [ ] Edge cases and empty/loading/error/success states included; real content lengths.
- [ ] Assets exported: SVG/PDF for icons and logos, PNG/JPEG/WebP rasters at needed scales (@1x/@2x/@3x), named consistently.
- [ ] Engineers involved early (feasibility, framework defaults such as grid, spacing and breakpoints).

### 23.8 Visual polish review (run after the screen works)
Order matters: fix earlier layers first [Scrimba, Shift].
- [ ] **Grayscale**: hierarchy readable with color removed; one obvious focal point.
- [ ] **Spacing**: values from the scale; adjacent steps ≥ 25 % apart; outer spacing > inner; enough whitespace (try adding more before adding containers).
- [ ] **Alignment**: shared edges and baselines; mixed sizes on one line baseline-aligned; nothing optically off-centre.
- [ ] **Type**: ≤ 3–4 sizes on screen, ≤ 2 families, 2 weights (≥ 400); body line height ≈ 1.5, headings 1–1.25; large headings tightened, caps loosened; 45–75 characters per line.
- [ ] **Color**: roles only; accent ≈ 10 % and only on actions/highlights; tinted greys; no grey text on colored backgrounds; red only for errors/destructive.
- [ ] **Depth**: one light direction; shadows from the scale and meaning-based; fewer borders; dark mode uses tonal surfaces + hairlines.
- [ ] **Details**: concentric radii, consistent icon stroke and size, empty/long content tested, images cropped consistently, text on images legible at the worst pixel.
- [ ] **Critique write-up** [Shift]: Summary · What's off (with section refs) · Questions · One thing to try · What's working.

### 23.9 Motion review
- [ ] Each animation passes the purpose test (continuity, relationship, narrative or expectation) and the hard-cut test (§14.7).
- [ ] Durations within §3.4/§14.6; exits faster than entrances; frequent interactions ≤ ~150 ms or none.
- [ ] Easing matches direction (decelerate in, accelerate out, standard on screen); springs ζ 0.8–1.0 unless intentionally playful.
- [ ] Only `transform`/`opacity` animated; no `transition: all`; ≥ 60 fps on a mid-range device.
- [ ] Interruptible and reversible; gestures tracked 1:1; rapid input doesn't queue animations.
- [ ] Reduced motion: large movement replaced with fades or instant changes; parallax, autoplay, scroll effects off; nothing flashes > 3/s; loops > 5 s pausable.
- [ ] Stress tests in §14.12 passed.

### 23.10 Contrast audit (real conditions) [Uxcel]
- [ ] Automated check of all text and UI parts (tokens and screens), every state.
- [ ] Light, dark and increased-contrast modes.
- [ ] Text over images/gradients checked at the worst pixel; user-supplied images handled with a scrim.
- [ ] Placeholder, helper, error, disabled-looking-but-enabled and focus indicators checked.
- [ ] Color-blindness simulation (protanopia, deuteranopia, tritanopia) and grayscale: no meaning carried by color alone.
- [ ] Real device at low brightness / outdoors.
- [ ] Failures fixed by moving lightness, not hue; record the passing pair in the token docs.

---

## Appendix A. Figma tool tips (short; tool-specific)

The courses taught these mechanics. They matter only when working in Figma; the design rules above are tool-independent.

**File organisation**
- Pages: Cover · Explorations/Wireframes · Style guide/Components · Designs · Prototype · Archive (or Handoff). Group screens of a flow with **Sections**. Name every frame and layer meaningfully (`Header`, `Card/Product`, `Button/Primary/Large`); slash names create folders in the Assets panel. Version names like "Company Ecom V1", never "final final". Grey canvas (`#D9D9D9`) makes white frames easier to see.
- Use device **frame presets** (e.g. iPhone 375×667 / 390×844, Android 411 wide, desktop 1440×1024). Only top-level frames are prototype destinations.

**Structure and responsiveness**
- **Frames, not groups**, for anything adaptive (groups only for logos/icons that must scale together).
- **Auto layout** (Shift+A) for anything whose content can change: buttons, chips, cards, lists, nav bars, pages. Resizing per axis: **Hug** (buttons, labels), **Fill** (blocks that stretch to the parent), **Fixed** (hard specs such as nav height 80, page width 1440). Nest horizontal stacks inside vertical ones for 2-D layouts. Use gap = spacing token, padding = spacing token, "Auto" gap for space-between.
- Container pattern: full-width outer frame (background + padding) → inner content frame with a **max width** (e.g. 1000), centred.
- **Constraints** (for frames without auto layout or "absolute position" children): bars Left & Right + Top/Bottom; FAB Right + Bottom; centred modal Center/Center; backgrounds Scale or Left&Right + Top&Bottom. With a stretch grid, constraints follow columns. Test by resizing the frame.
- **Layout grids/guides**: columns (count, gutter, margin, stretch/fixed/centre), rows, uniform square grid (icons). Save combinations as grid styles. Baseline grid of 4 for type rhythm.
- Hide (don't delete) optional items in auto-layout components so instances can re-show them.
- Text boxes: Auto width for labels, Auto height for paragraphs, Fixed only for strict slots.

**Styles, variables and components**
- Save every color, text style, effect (shadow/blur) and grid as **styles or variables** with semantic names; never paste raw hex values or ad-hoc fonts.
- **Components**: main component (definition) → instances (override text, fill, icon swap, visibility only). Avoid detaching (irreversible). Keep mains on a Components page. **Variants** with properties (`Type`, `Size`, `State`), plus Boolean, Text and Instance-swap properties. Include all states (default, hover, pressed, focus, disabled, error, loading).
- Publish styles/components as a **team library** for consistency across files.
- Icons: 24×24 (or 16/20/32) square frames, consistent stroke (e.g. 2), round caps; Boolean operations (Union, Subtract, Intersect, Exclude) are non-destructive; Flatten (Cmd/Ctrl+E) only when final. Resize icons with Shift on the normal selection tool to keep strokes; outline strokes before boolean ops when needed.
- Masks (Cmd/Ctrl+Alt+M) for avatars (circle) and uniform product images (square). Compress images before importing.
- Shadows: subtle drop shadows (≈ 8–16 % opacity, blur 8–12, y 2–4) †; inner shadow for pressed states; background blur needs < 100 % fill opacity and is costly.

**Prototyping**
- Interaction = trigger (on tap/click, on drag, while hovering, after delay, key press) + action (navigate, open overlay, swap, scroll to, back, open link) + animation (instant, dissolve, move in/out, push, slide, Smart Animate) with easing and duration.
- Link real interactive elements only (not whole screens); logo → home; use the generic "Back" action; overlays: dim background (~50 %), close on outside click, explicit close button that only closes.
- Fixed elements: set nav bars/tab bars to "fixed when scrolling"; stacking "first on top"; opaque sticky backgrounds.
- Transitions consistent per relationship: Push/Move for lateral or hierarchical navigation, Dissolve for page changes from menus, Smart Animate for state changes; scroll-to with ease-out ~300–400 ms and an offset under sticky headers.
- Set flow starting points; audit links after duplicating frames; test in Present mode on the target device (Figma mobile app) at 100 %.

**Motion in Figma** [Million Frames, ZTM, Skillshare, Skillademia]
- **Smart Animate** matches layers by **identical name and hierarchy** across frames/variants. Rename before animating; a renamed or re-nested layer cuts instead of moving.
- Hide elements for Smart Animate with **opacity 0 or scale ≈ 0.01**, not visibility off (hidden layers don't interpolate).
- Smart Animate interpolates position, size, rotation, opacity, fill and corner radius. It does **not** interpolate shape morphs between different vector paths, and shadows and overlays animate poorly. Fake those with opacity cross-fades.
- **Interactive components**: put hover/press/toggle states as variants with "While hovering"/"While pressing"/"On click → Change to" so every instance animates without per-screen wiring.
- Chain multi-step sequences with **After delay** triggers (1 ms works as "immediately next"). Keep chains short; long chains are hard to maintain and better done in a timeline tool.
- Use **spring** easings for physical moves and custom bezier for token-exact easing; enter the project's tokens rather than generic presets when presenting to engineers (§22 #37). Generic presets †: Gentle (mass 1, stiffness 100, damping 15), Quick (1/300/20), Bouncy (1/600/15), Slow (1/80/20).
- **Figma Motion (timeline mode)**: default animation 500 ms on a 2000 ms timeline; keyframe per property; "Hold" easing for stepped changes; spinners linear; loops end on the first frame. Exports MP4 (24–30 fps) or Lottie (no shaders or angular gradients).
- Don't fake platform-owned animations (Dynamic Island, system sheets, keyboard) in detail; reference the system behaviour instead.
- Course example values (not standards): like pop 100 ms; hover/switch 200 ms; press 300 ms Ease In And Out Back; card → detail with the Quick spring.

**Handoff and sharing**
- Dev Mode/Inspect for measurements, CSS/code snippets, tokens and exports; mark sections "Ready for dev"; component descriptions + doc links; file thumbnail with status.
- Export: SVG for icons/logos, PNG for transparency, JPG for photos, PDF for vector/iOS assets; 1x/2x/3x scales.
- Share with least privilege (view vs edit); deep-link to a frame or flow; persistent feedback in comments (cursor chat is ephemeral).
- Accessibility plugins/tools: contrast checkers (e.g. Stark, "Contrast"); check while building the palette, not at the end.

**Useful shortcuts** (Mac / Windows): Frame F or A · Rectangle R · Text T · Pen P · Auto layout Shift+A · Component Opt+Cmd+K / Ctrl+Alt+K · Group Cmd/Ctrl+G · Frame selection Opt+Cmd+G / Ctrl+Alt+G · Mask Opt+Cmd+M / Ctrl+Alt+M · Flatten Cmd/Ctrl+E · Zoom 100 % Shift+0 · Zoom to fit Shift+1 · Nudge 1 px arrows, 10 px (or custom 8 px) Shift+arrows · Lock Shift+Cmd/Ctrl+L · Swap fill/stroke Shift+X · Toggle layout grids Ctrl+G (Mac) / Ctrl+Shift+4 (Windows) †.

---

## Appendix B. Sources and confidence

| Source (course) | Covered | Confidence / limits |
|---|---|---|
| Apple Human Interface Guidelines (developer.apple.com, 173 pages crawled 2026-11-18, Liquid Glass era) | iOS, iPadOS, macOS principles, foundations, patterns, components, inputs, technologies | High: primary source, numbers quoted exactly. |
| Material Design 3 + M3 Expressive (2025) | Foundations, styles, components, adaptive layout, Android desktop guidance | High for token values (from official material-web tokens and material-components-android docs); m3.material.io itself was blocked, so values tagged "spec knowledge" are marked † here. |
| Nielsen Norman Group (~55 articles) | Heuristics, errors, forms, response times, touch targets, mobile vs desktop, navigation, reading, visual design, empty states, onboarding, permissions, accessibility, dark patterns, components | High: research-based; the heuristics overview page itself returned server errors, definitions came from the individual heuristic articles. |
| Laws of UX (lawsofux.com, 30 laws + 8 articles) | Psychological principles | Definitions faithful to the site; "apply/rules" sections are synthesised with platform standards. |
| Google UX Design Professional Certificate (Coursera, 7 courses) | UX process, research, IA, wireframing, visual design, responsive web, ethics | Medium: syllabus and learner notes; video transcripts were behind login; course numbers for breakpoints/grids marked †. |
| Uxcel: Apple HIG course (18 lessons) | Apple principles, visual language, components, platform adaptivity | Medium–high; iOS type sizes in the course are wrong (see §22 #1); interactive exercises not accessible. |
| Uxcel: Introduction to Figma | Figma mechanics + tool-independent rules (alignment, shadows, type, export) | Medium; a few copy errors in the source noted. |
| Figma Design for beginners (official) | Auto layout, components, container systems, type/spacing values in a portfolio project | High for mechanics; design values are the course project's (examples, not standards). |
| Figma for Beginners (official YouTube, 4 parts) | Wireframe → hi-fi → prototype → handoff | High for mechanics. |
| freeCodeCamp: Learn Figma in 6 Hours | Fundamentals, style guides, components, grids, projects | Medium: chapter structure verified; much content marked inferred in the source (†). |
| Dan Scott: Figma UX/UI Essentials (free) and Figma UI UX Design Essentials (Udemy) | Practitioner workflow, wireframes, grids, type, color, forms, motion, testing, handoff | Medium–high; free lessons plus public material; some values marked uncertain in source. |
| Designlab: Figma 101 | 7-day beginner course: grids, components, prototyping, responsive | Medium; values are course examples (e.g. 3-column mobile grid) rather than standards. |
| WCAG 2.2 | Contrast, target size, focus, motion, input assistance | Cited through the course notes; not fetched directly. |

**Added in v1.1: visual aesthetics, color and motion courses** (public content only; nothing was purchased, so paid courses are represented by their free articles, previews, syllabi and the authors' public writing).

| Source (course) | Covered | Confidence / limits |
|---|---|---|
| Learn UI Design (Erik Kennedy), plus "7 Rules for Gorgeous UI", articles and Accessible Color Generator | Light and shadow, HSB color variation, text on images, type sizes, SLUB, layout locality, gradients, data-viz palettes | High for the free articles and tools; paid course itself only from syllabus. |
| Refactoring UI (Wathan & Schoger), free article + public samples | Hierarchy, spacing and type scales, color ramps, shadows, borders, labels | High: values quoted from public material and Tailwind v1; some advice conflicts with WCAG (§22 #25–27). |
| Shift Nudge (Matt D. Smith), public lessons and articles | Review order, three sizes, spacing roles, one-color-one-role, dark modules, OKLCH, critique template | Medium: paid course; public samples only; OKLCH values marked †. |
| Scrimba: Learn UI Design Fundamentals (Gary Simon), free | Seven fundamentals, grayscale first, fix order, scales | High (free course). |
| Canva Design School: Graphic Design Basics, free | Type, kerning, color harmony, 60-30-10, layout patterns, export | Medium: graphic-design focus, adapted to UI; some advice conflicts (§22 #40–41). |
| Brainmunk: Graphic Design Fundamentals, free | Spacing roles, finishing checklist | Medium–low: small source; caption value overridden (§22 #39). |
| Uxcel: Color contrast and accessibility lesson | Real-world contrast audit | Medium: values are WCAG's; the audit procedure is the contribution. |
| Skillshare: UI Design Color Theory (Ruben Cespedes) | Base hue roles, 60-30-10, primitive/semantic tokens, themes | Low: paid, public description and previews only; no new numbers. |
| Josh W. Comeau: Interactive Guide to CSS Transitions (free) + Whimsical Animations (public lessons) | CSS transitions, asymmetric timing, reduced motion pattern, `linear()` springs, keyframes, scroll-driven animation | High for the free guide; paid course only from public lessons. |
| Codecademy: Learn CSS Transitions and Animations | Transition properties, keyword cubic-bezier values, shorthand | High (matches the CSS spec). |
| Josh Collinsworth: Ten Tips for Better CSS Transitions (free article) | Durations, fades, slide distances, stagger, curve meaning | High for practitioner advice; values are recommendations. |
| Kole Jain: 11 Micro Animations (YouTube) | Microinteraction recipes, spring example | Medium: demo values; tooltip delay overridden (§22 #32). |
| Million Frames: Micro-interactions in Figma | Smart Animate rules, interactive components, demo durations | Medium: Figma-specific; demo values only. |
| DesignerUp: Complete Guide to UI Animations (free article) | Real-time vs non-real-time, tools, handoff table | Medium–low: mostly synthesis of known standards. |
| ZTM: Motion Design with Figma | 12 principles, Saffer model, Figma limits, M3 spring conversion | Medium: paid, public syllabus and previews; conversion formula †. |
| Skillademia: Figma Motion Course | Figma Motion timeline, export, Lottie limits | Medium: tool is new; values from public previews. |
| Skillshare: Advanced Prototyping in Figma (Arash Ahadzadeh) | Smart Animate techniques, After-delay chaining, demo values | Medium–low: paid, previews only. |
| School of Motion: UX Animation Essentials | Motion lenses, hard-cut test, stress tests, spec template, tool choice, Lottie budget | Medium: paid, public syllabus, articles and free lessons. |

Material Design 3 color and the M3 / Apple HIG motion token pages listed in the source document were already covered by the v1.0 sources and were not re-processed.

---

## Appendix C. Glossary

- **Affordance / signifier**: what an element lets you do / the visible cue that tells you so (a raised button, an underline).
- **Breakpoint**: a width at which the layout changes. **Window size class**: M3 width/height category (compact, medium, expanded, large, extra-large).
- **Canonical layout**: list-detail, feed, supporting pane (M3).
- **Chunking**: grouping items into meaningful units to ease memory.
- **Component / instance / variant**: reusable UI element / a copy linked to it / a defined alternative (size, state).
- **Container / on-color** (M3): a fill role and the text/icon color guaranteed to contrast with it.
- **Design token**: a named design decision (`md.sys.color.primary`, `space-16`) shared by design and code.
- **Dynamic Type** (Apple) / **font scale, sp** (Android) / **rem** (web): user-controlled text sizing.
- **Edge-to-edge**: drawing content behind system bars while padding interactive content by insets.
- **Elevation / scrim / state layer**: z-depth of a surface / dark overlay behind modals / translucent overlay showing interaction state.
- **Empty state**: what a view shows when it has no content.
- **F-pattern / layer-cake pattern**: common eye-scanning patterns on text pages.
- **Gestalt principles**: proximity, similarity, common region, continuity, closure, figure-ground, uniform connectedness, Prägnanz, common fate.
- **Heuristic evaluation**: expert review against usability heuristics (Nielsen's 10).
- **Information architecture (IA)**: organisation, hierarchy and sequence of content.
- **Liquid Glass**: Apple's material for floating controls and navigation above content (2025+).
- **Mental model**: a user's belief about how a system works.
- **Modal / nonmodal**: blocks the parent view until dismissed / doesn't block.
- **Persona / journey map / user flow / task flow**: research-based user archetype / steps + feelings over time / multi-path route to a goal / one linear path.
- **Predictive back**: Android preview animation during the back gesture.
- **Progressive disclosure**: showing advanced or rare options only on request.
- **Progressive enhancement / graceful degradation**: build up from a basic core / build full then ensure fallbacks.
- **Safe area**: screen region not covered by hardware features or system bars.
- **Size class** (Apple): compact or regular per axis.
- **Skeleton screen**: placeholder wireframe of the layout shown while content loads.
- **Slip / mistake**: wrong action for a correct goal / wrong goal from a wrong mental model.
- **SUS**: System Usability Scale (10 questions, 0–100 score).
- **WCAG**: Web Content Accessibility Guidelines (levels A, AA, AAA); principles POUR.
- **APCA**: Accessible Perceptual Contrast Algorithm (Lc values); draft for WCAG 3, not yet a conformance standard.
- **Damping ratio (ζ)**: how quickly a spring stops oscillating; 1 = no overshoot, lower = bouncier.
- **Easing / cubic-bezier**: the acceleration curve of an animation, defined by two control points.
- **HSB/HSL, OKLCH, HCT**: color models; OKLCH and HCT are perceptual (equal lightness values look equally light).
- **Lottie / Rive**: vector animation formats for apps and web; Rive adds interactive state machines.
- **Smart Animate**: Figma prototyping transition that interpolates matching layers between frames.
- **Stagger**: small delay between items animating in sequence.

*End of document.*


modifca la pàgina per a que seueixi aquests criteris