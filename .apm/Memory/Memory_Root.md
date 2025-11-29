# Chacal Estudio Website – Memory Root

**Project:** Rebuild Chacal Estudio website as Next.js App Router landing page
**Memory Strategy:** Dynamic-MD

---

## Phase 01 – Project Setup & Tooling Summary

**Outcome:** Successfully established the complete development infrastructure for the Chacal Estudio website rebuild. The project now has a robust Git workflow with `main`/`develop` branches, automated quality gates via Husky hooks (pre-commit lint, pre-push lint + build), comprehensive ESLint + Prettier configuration with Tailwind support, and Next.js 16 configured with React Compiler. All core dependencies for future phases are installed (next-intl, react-hook-form, zod, resend, @marsidev/react-turnstile). AWS Amplify deployment pipeline is fully documented with build specifications and environment variable documentation ready for production deployment.

**Agents Involved:**
- Agent_Frontend_Architecture

**Task Logs:**
- [Task 1.1 - Initialize Workflow, Branches, Tooling](Phase_01_Project_Setup_Tooling/Task_1.1_Initialize_Workflow_Branches_Tooling.md)
- [Task 1.2 - Configure NextJS, React Compiler](Phase_01_Project_Setup_Tooling/Task_1.2_Configure_NextJS_React_Compiler.md)
- [Task 1.3 - Prepare AWS Amplify Pipeline](Phase_01_Project_Setup_Tooling/Task_1.3_Prepare_AWS_Amplify_Pipeline.md)

**Key Artifacts:**
- Git branches: `main` (production), `develop` (integration)
- Quality tooling: `.husky/`, `eslint.config.mjs`, `prettier.config.mjs`
- Documentation: `README.md`, `CONTRIBUTING.md`, `DEPLOYMENT.md`
- Deployment: `amplify.yml`, `.env.example`

---

## Phase 02 – Design System & Global Layout Summary

**Outcome:** Established a comprehensive design system and global layout structure. Design tokens were extracted from Figma and implemented as CSS custom properties (brand blue `#2F2E59`, accent colors, typography with Crimson Text and DM Sans). A complete atomic component library was built including Button, Heading, Text, Link, Badge, Input, and Card components using CVA for variants and Radix UI for accessibility. The global layout shell is complete with a sticky Header featuring smooth-scroll navigation and responsive mobile menu, and a Footer with contact, social, and legal links. Font loading was optimized using `next/font/google`. The reference source folder from Figma was properly excluded from build/lint processes.

**Agents Involved:**
- Agent_Design_System

**Task Logs:**
- [Task 2.1 - Define Design Tokens, Theming](Phase_02_Design_System_Global_Layout/Task_2.1_Define_Design_Tokens_Theming.md)
- [Task 2.2 - Build Core Atomic Components](Phase_02_Design_System_Global_Layout/Task_2.2_Build_Core_Atomic_Components.md)
- [Task 2.3 - Implement Global Layout, Navigation, Footer](Phase_02_Design_System_Global_Layout/Task_2.3_Implement_Global_Layout_Navigation_Footer.md)

**Key Artifacts:**
- Design tokens: `app/globals.css`
- Atoms: `components/atoms/` (Button, Heading, Text, Link, Badge, Input, Logo)
- Molecules: `components/molecules/` (Card)
- Organisms: `components/organisms/` (Header, Footer)
- Utils: `lib/utils.ts` (cn helper)

---

## Phase 03 – Page & Section Implementation Summary

**Outcome:** Successfully implemented all Home page sections and Projects pages, completing the core visual implementation of the Chacal Estudio website. The Home page now features a complete content flow: Hero section with headline and CTA, "El Método" 7-step process visualization, "Nuestro Impacto" three-pillar section (equipo, comunidad, planeta), Services grid with Consultoría Sustentable, Plant Based Treaty alliance section with 3R principles and CTAs, ODS/SDG section with UN goal colors, and Partners/Alliances section. The Projects system includes an index page with responsive card grid and dynamic detail pages with case-study structure (challenge, solution, results, gallery). All sections use Framer Motion scroll-triggered animations, responsive layouts, and design system components. A Header visibility fix was implemented by adjusting the global layout stacking context.

**Agents Involved:**
- Agent_Feature_Pages

**Task Logs:**
- [Task 3.1a - Home Hero Section](Phase_03_Page_Section_Implementation/Task_3.1a_Implement_Home_Hero_Section.md)
- [Task 3.1b - The Method Section](Phase_03_Page_Section_Implementation/Task_3.1b_Implement_The_Method_Section.md)
- [Task 3.1c - Our Impact & Services Sections](Phase_03_Page_Section_Implementation/Task_3.1c_Implement_Our_Impact_Services_Sections.md)
- [Task 3.1d - Plant Based Treaty Section](Phase_03_Page_Section_Implementation/Task_3.1d_Implement_Plant_Based_Treaty_Section.md)
- [Task 3.1e - Remaining Content Sections](Phase_03_Page_Section_Implementation/Task_3.1e_Implement_Remaining_Content_Sections.md)
- [Task 3.2 - Projects Index Page](Phase_03_Page_Section_Implementation/Task_3.2_Implement_Projects_Index_Page.md)
- [Task 3.3 - Project Detail Pages](Phase_03_Page_Section_Implementation/Task_3.3_Implement_Project_Detail_Pages.md)

**Key Artifacts:**
- Home sections: `components/sections/` (HeroSection, MethodSection, ImpactSection, ServicesSection, PlantBasedTreatySection, SDGSection, PartnersSection)
- Projects data: `lib/projects.ts`
- Projects pages: `app/projects/page.tsx`, `app/projects/[slug]/page.tsx`
- Project card: `components/molecules/ProjectCard.tsx`

---

## Phase 04 – Internationalization & Content Localization Summary

**Outcome:** Successfully implemented full internationalization support using `next-intl` with App Router. The site now supports Spanish (es-AR, default) and English (en) with SEO-friendly locale-based routing (`/es-AR/...`, `/en/...`). The app directory was restructured under `app/[locale]/` with middleware for automatic locale detection and redirection. A language switcher (Globe icon) was added to the Header for seamless locale switching. All components were refactored to use `useTranslations` (client) and `getTranslations` (server) hooks. Comprehensive message files contain complete translations for all sections: Hero, Method, Impact, Services, Plant Based Treaty, SDG, Partners, Projects, Navigation, and Footer. Project content was fully localized with bilingual titles, descriptions, challenges, solutions, and results for all 6 projects. English translations were refined to match Chacal Estudio's professional-yet-warm brand voice while preserving the meaning and tone of Spanish originals.

**Agents Involved:**
- Agent_i18n_SEO_Legal

**Task Logs:**
- [Task 4.1 - Setup next-intl, App Router, Routing](Phase_04_Internationalization_Content_Localization/Task_4.1_Setup_next_intl_App_Router_Routing.md)
- [Task 4.2 - Create and Organize Translation Messages](Phase_04_Internationalization_Content_Localization/Task_4.2_Create_Organize_Translation_Messages.md)
- [Task 4.3 - Localize Long-Form Content](Phase_04_Internationalization_Content_Localization/Task_4.3_Localize_Long_Form_Content.md)

**Key Artifacts:**
- i18n config: `i18n/routing.ts`, `i18n/request.ts`, `middleware.ts`
- Messages: `messages/es-AR.json`, `messages/en.json`
- Locale layout: `app/[locale]/layout.tsx`
- Language switcher: integrated in `components/organisms/Header.tsx`

---

