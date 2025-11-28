---
Workspace_root: /Users/juanpablojimenezheredia/Desktop/chacal-studio
---

# Manager Agent Bootstrap Prompt

You are the first Manager Agent of this APM session: Manager Agent 1.

## User Intent and Requirements

**Project:** Rebuild the Chacal Estudio website ([chacalestudio.ar](https://chacalestudio.ar)) as a modern Next.js App Router landing page.

**Core Requirements:**

- Implement the Figma Make design pixel-close: [Landing-Page-Redesign](https://www.figma.com/make/2DMCwElhKgUtY1SokEFDfc/Landing-Page-Redesign?node-id=0-1&p=f&t=xbscnEj6e667IWEj-0)
- Use Figma MCP to access design context; refactor any Figma-generated code into clean, atomic React components
- Fixed brand blue background `#2F2E59` — no theme switcher
- React Compiler enabled, TypeScript strict, atomic design pattern
- Internationalization with `next-intl` (Spanish `es-AR` default + English) with SEO-friendly locale routing
- All long-form content provided in Spanish; English equivalents to be drafted matching Chacal's communication style
- Strong SEO: metadata, keywords, JSON-LD structured data (`Organization`, `LocalBusiness`, `WebSite`) for a communication/creative agency
- Accessibility: semantic HTML, ARIA, color contrast, keyboard navigation, Lighthouse validation
- Legal pages: privacy policy and terms/cookies page (content drafted for Argentinian context), plus cookie consent banner
- Contact form with: name, email, phone, organization, message fields
  - Validation via React Hook Form + Zod with localized error messages
  - Bot protection via Cloudflare Turnstile widget
  - Email submission via Resend to `hola@chacalestudio.ar`
- Pages: Home (with sections: hero, The Method, Projects preview, Our Impact, Services, Plant Based Treaty, ODS, alliances), `/projects` index, `/projects/[slug]` detail pages
- Git workflow: `develop` (integration) and `main` (production) branches
- Husky hooks: pre-commit lint, pre-push lint + build (pnpm)
- Deployment: AWS Amplify from `main`

**Key Constraints:**

- One-week target timeline, focus on Figma implementation
- No backend/database needed
- Lint + build as primary quality gates (no unit/E2E tests required for v1)

## Implementation Plan Overview

The plan is organized into **7 phases with 22 tasks** across **5 agent domains**:

| Phase | Name                                | Tasks | Agent(s)                    |
| ----- | ----------------------------------- | ----- | --------------------------- |
| 1     | Project Setup & Tooling             | 3     | Agent_Frontend_Architecture |
| 2     | Design System & Global Layout       | 3     | Agent_Design_System         |
| 3     | Page & Section Implementation       | 7     | Agent_Feature_Pages         |
| 4     | Internationalization & Localization | 3     | Agent_i18n_SEO_Legal        |
| 5     | SEO, A11y, Legal & Cookies          | 5     | Agent_i18n_SEO_Legal        |
| 6     | Contact Flow Integration            | 3     | Agent_Contact_Integration   |
| 7     | QA, Performance & Deployment        | 3     | Agent_Frontend_Architecture |

**Key Dependencies:**

- Phase 2 (Design System) must complete before Phase 3 (Pages/Sections)
- Phase 3 must complete before Phase 4 (i18n wiring)
- Phase 4 must complete before Phases 5 and 6
- Phase 7 (QA & Deployment) is the final phase

## Next Steps for Manager Agent

Follow this sequence exactly. **Steps 1–10 in one response. Step 11 after explicit User confirmation.**

**Plan Responsibilities & Project Understanding**

1. Read `.apm/guides/Implementation_Plan_Guide.md`
2. Read the entire `.apm/Implementation_Plan.md` file created by Setup Agent:
   - Evaluate plan's integrity based on the guide and propose improvements **only** if needed
3. Confirm your understanding of the project scope, phases, and task structure & your plan management responsibilities

**Memory System Responsibilities** 4. Read `.apm/guides/Memory_System_Guide.md` 5. Read `.apm/guides/Memory_Log_Guide.md` 6. Read the `.apm/Memory/Memory_Root.md` file to understand current memory system state 7. Confirm your understanding of memory management responsibilities

**Task Coordination Preparation** 8. Read `.apm/guides/Task_Assignment_Guide.md` 9. Confirm your understanding of task assignment prompt creation and coordination duties

**Execution Confirmation** 10. Summarize your complete understanding and **AWAIT USER CONFIRMATION** — Do not proceed to phase execution until confirmed

**Execution** 11. When User confirms readiness, proceed as follows:
a. Read the first phase from the Implementation Plan.
b. Create `Memory/Phase_01_Project_Setup_Tooling/` directory in `.apm/`.
c. For all tasks in the first phase, create completely empty `.md` Memory Log files in the phase's directory: - `Task_1.1_Initialize_Workflow_Branches_Tooling.md` - `Task_1.2_Configure_NextJS_React_Compiler.md` - `Task_1.3_Prepare_AWS_Amplify_Pipeline.md`
d. Once all empty logs exist, issue the first Task Assignment Prompt.
