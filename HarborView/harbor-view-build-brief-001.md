# Harbor View Workspace

## Build Brief 001: Workspace Home

**Organization:** Harbor Community Services  
**Environment:** Harbor View Workspace  
**Module:** Workspace Home  
**Build stage:** Week 1 foundation  
**Implementation method:** Claude frontend skill  

---

## 1. Purpose of this brief

Build the first production-quality screen of the Harbor View Workspace: a personalized staff homepage that helps a Harbor Community Services employee quickly understand what needs their attention today.

This is not a public nonprofit homepage and should not resemble a marketing website. It is a calm, modern digital workplace for authenticated staff. The screen must establish the reusable visual system, application shell, component patterns, and data conventions that future Harbor View modules will inherit.

The homepage should answer one primary question:

> What needs me today?

The answer should emerge from the arrangement and prioritization of information, not from an overwhelming dashboard or an explicit command.

---

## 2. Authority and source hierarchy

Use the supplied files in this order of authority:

1. **This build brief** — authoritative for the Week 1 build.
2. **Workspace Structure: Methodology & Thought Process (Living Document)** — authoritative for product purpose and current Home information architecture.
3. **`harbor-home-action-wireframe.png`** — structural reference for the Home screen.
4. **Harbor Community Services: Demo Site Content Kit** — source for organization details, brand colors, programs, staff, events, and realistic sample content.
5. **`a_clean_modern_nonprofit_website_homepage_screens.png`** — visual-tone and brand reference only.

When sources conflict, follow the highest item in this list.

Important conflict: the content kit contains an older Home Page Content Plan centered on mission copy, static quick links, recent news, events, and contacts. Do not implement that plan on Workspace Home. The later methodology intentionally redefined Home as a personalized action layer.

---

## 3. Product naming

Keep these names distinct:

- **Harbor Community Services:** the fictional nonprofit organization.
- **Harbor View Workspace:** the connected staff-facing digital workplace.
- **WorkView:** the future capacity and staffing module within Harbor View.

Use **Harbor View** in the product shell and **Harbor Community Services** when referring to the organization.

---

## 4. User and scenario

### Primary user

A Harbor Community Services Program Coordinator beginning the workday.

### User needs

Within a few seconds, the employee should be able to determine:

- What requires action now?
- What is approaching a deadline?
- What am I waiting on or responsible for?
- What commitments affect my week?
- Where can I search when I need something else?

### Demonstration scenario

The user signs in on a weekday morning. They have an expense report awaiting approval, a program report due soon, a consultant payment requiring attention, an intake form awaiting review, volunteer hours to log, and several calendar commitments this week.

The interface should make the next sensible action apparent without making every item look urgent.

---

## 5. Experience principles

The visual and interaction direction is **calm software**:

- Human-centered and purposeful
- Generous whitespace
- Clarity over density
- Actions before general information
- One primary purpose per screen
- Progressive disclosure
- Predictable spatial stability
- Visible completion and closure
- Honest status language
- Subtle motion only when it clarifies a change
- AI advisory and quiet, not dominant

Avoid:

- Traditional intranet clutter
- Marketing-site hero treatments
- A wall of cards with equal emphasis
- Decorative dashboards
- Excessive badges or counters
- Meaningless animation
- Bright color used merely for decoration
- Static quick-link grids on Home
- General news feeds on Home
- A complete calendar duplicated from another system
- Invented history, analytics, or organizational facts

Semantic status colors should communicate meaning. Red, gold, and green are for risk, attention, and positive/completed states—not project identity.

---

## 6. Brand foundation

Use the Harbor Community Services palette:

| Token | Value | Primary use |
| --- | --- | --- |
| Harbor Navy | `#1C3A4B` | Product identity, headings, active navigation |
| Dockside Teal | `#4B8B8C` | Links, interactive accents, selected states |
| Sandbar | `#E8DCC8` | Warm supporting surfaces; use sparingly |
| Coral Accent | `#D97B5C` | Primary calls to action and meaningful highlights |
| Charcoal | `#2B2B2B` | Primary body text |

Create supporting neutral and state tokens as needed while maintaining accessible contrast. Prefer warm off-white page surfaces over stark white when appropriate.

The logo may be a refined text treatment consisting of a minimal horizon/dot mark and the words **Harbor View**, with a smaller **Community Services** or **Workspace** descriptor. Do not spend the build creating an elaborate logo system.

Typography should feel warm, capable, and highly readable. A restrained display face may be used for limited organizational character, but application labels, controls, and working content should use a clean sans-serif.

---

## 7. Required page structure

### A. Application shell

Create a reusable shell containing:

- Harbor View identity
- Primary navigation
- Global search
- Notifications control
- User avatar/profile control

For this build, the visible primary navigation is:

- Home
- Resources
- News

Home is active. Resources and News may route to clear placeholder pages or safe placeholder states if routes already exist. Do not build those complete pages in this task.

The shell should be designed so future areas such as My Work, Projects, Requests, People & Capacity, Insights, and Leadership can be added without redesigning the whole header.

### B. Rare organizational alert

Provide a reserved alert pattern for an organization-wide issue that is genuinely important to see today.

Example content:

> Office closed Friday for staff training

This slot should be visually distinct but not permanently dominant. It must also have an intentionally calm empty state or be omitted cleanly when no alert exists, without leaving a visual gap.

### C. Personalized orientation

Include:

- A natural greeting, such as **Good morning, Jordan**
- The current date
- A short, calm orientation line only if it adds value

Do not use a large marketing headline or mission statement here.

### D. What needs you

This is the primary section and strongest visual priority.

Show two high-value work items:

1. **Expense pending approval**  
   Supporting detail: one manager approval required before submission.

2. **Program report due**  
   Supporting detail: due in two days.

Each item should communicate:

- What the item is
- Why it needs the user
- Its status or timing
- The next action
- Its originating system or work type only when useful

The first item should be the clearest next action, but avoid making the interface feel alarmist.

### E. Needs your attention

Show a compact list containing:

- Expense: consultant payment
- Intake form awaiting review
- Volunteer hours to log

These items require attention but are secondary to the two primary items above. Use differentiated priority, status, or timing where useful. Do not make all three look equally urgent.

### F. This week

Show a filtered, merged slice of commitments rather than a full calendar:

- Monday: Program check-in
- Wednesday: Board materials due
- Thursday: Alvarez traveling / out of office

Make source distinctions understandable when helpful—for example, personal calendar, project schedule, travel, or organizational commitment—without cluttering the interface.

### G. Quiet completion or empty-state behavior

Design the Home screen so it still feels intentional when:

- There is no organizational alert
- There are no urgent items
- The user has completed everything requiring attention
- This week has few commitments

Use calm, specific language. Do not fill empty space with invented content merely to make the screen look busy.

---

## 8. Interaction requirements

Implement enough interaction for the screen to feel like a functioning demonstration rather than a static mockup.

Required:

- Navigation has visible active, hover, and focus states.
- Search can be opened or focused and may display a simple scoped suggestion state using local sample data.
- Work items can be opened to reveal additional context or a lightweight detail panel.
- A primary action can change an item's state in a believable local demonstration.
- The change should be reflected consistently wherever that item appears.
- Notifications and profile controls should have appropriate affordances even if their complete destinations are outside this week's scope.
- Keyboard navigation and visible focus treatment must work.

Prefer progressive disclosure over navigating away for every detail. Do not introduce modals for information that can be handled by a small panel, expansion, or dedicated detail region.

Do not add a chatbot, persistent AI assistant, or proactive AI card. AI should remain absent unless there is a specific, justified use case.

---

## 9. Data and architecture expectations

Use a shared, single-source local data model for the demo. Do not hard-code slightly different versions of the same work item into multiple components.

Suggested conceptual entities:

- User
- Work item
- Commitment/event
- Organizational alert
- Notification
- Source system

Derive filtered views such as `whatNeedsYou`, `needsAttention`, and `thisWeek` from the shared data rather than maintaining duplicate arrays.

The work-item interface should remain source-agnostic. A future adapter may retrieve items from Planner, Asana, SharePoint, or another system. Components should consume normalized data rather than depend directly on a specific third-party schema.

Keep sample data deterministic. Avoid generating random counts, dates, status changes, or fabricated activity history.

Preserve the project's existing stack, structure, routing, dependencies, linting conventions, and design system if an existing repository is supplied. Do not replace the stack or introduce a new component library without a clear need.

---

## 10. Reusable components

Create reusable primitives rather than one-off homepage markup. Choose component names that fit the existing repository conventions.

Expected component responsibilities include:

- Workspace shell/header
- Primary navigation
- Global search
- Organizational alert
- Personalized greeting
- Priority work item
- Attention list/item
- Weekly commitment list/item
- Status indicator
- Empty state
- Detail panel or expansion region

Do not over-abstract prematurely. Reuse should emerge from repeated visual and behavioral patterns, not from creating a large generic component framework before the screen works.

---

## 11. Responsive behavior

The experience must be intentionally designed for desktop, tablet, and mobile.

### Desktop

- Maintain a calm content width and generous margins.
- The primary work section should remain visually dominant.
- “Needs your attention” and “This week” may sit side by side when space allows.

### Tablet

- Preserve hierarchy without squeezing cards or labels.
- Allow the secondary sections to stack when needed.

### Mobile

- Use a compact application header and an accessible navigation pattern.
- Place “What needs you” before secondary information.
- Stack content in a deliberate reading/action order.
- Avoid horizontal scrolling.
- Maintain comfortable touch targets.
- Do not simply shrink the desktop layout.

---

## 12. Accessibility and quality

Meet a practical WCAG 2.2 AA standard:

- Semantic landmarks and heading order
- Keyboard-operable controls
- Visible focus indicators
- Accessible names for icon-only controls
- Sufficient color contrast
- Status not conveyed through color alone
- Comfortable target sizes
- Reduced-motion support
- Clear screen-reader language for changing item states
- Responsive behavior without lost content or functionality

Also provide appropriate loading, error, and no-data states where the implementation architecture makes them relevant.

---

## 13. Claude's design freedom

Claude may make thoughtful improvements to:

- Component composition
- Spacing and visual rhythm
- Typography hierarchy
- Responsive layout
- Accessible interactions
- Subtle transitions
- Empty, loading, success, and error states
- Concise supporting microcopy
- Reusable implementation patterns

Claude should use its frontend expertise to make the experience feel finished, not mechanically trace the wireframe.

When an improvement would alter product meaning, scope, navigation, source data, or workflow logic, do not implement it silently. Record it under **Recommendations for product review** after completing the requested build.

---

## 14. Boundaries and non-goals

Do not:

- Redesign the experience as a public nonprofit website.
- Build the complete Resources or News pages.
- Add all 20 planned Harbor View modules.
- Add a full task manager, calendar, or notification center.
- Build backend authentication or production integrations unless already present and required to run the existing project.
- Introduce a database solely for this demonstration screen.
- Fabricate operational analytics or historical trends.
- Add a persistent AI assistant.
- Add features merely to make the screen appear more impressive.
- duplicate data across components.
- Replace existing architecture without first identifying a concrete technical blocker.

The successful result is one complete homepage story and a strong reusable foundation—not a partially built platform.

---

## 15. Deliverables

Provide:

1. A polished, functional Workspace Home screen.
2. Reusable design tokens and foundational components.
3. Deterministic Harbor sample data separated from view components.
4. Desktop, tablet, and mobile behavior.
5. Working interaction for opening and updating at least one work item.
6. Calm alert-present, alert-absent, populated, and completed/empty states.
7. A short implementation summary covering:
   - Components created or changed
   - Data-model decisions
   - Accessibility considerations
   - Any assumptions
   - Recommendations for product review
8. Passing production build, lint, and relevant tests available in the repository.

---

## 16. Acceptance criteria

The build is ready for design and technical review when:

- A staff member can identify the most important next action within a few seconds.
- “What needs you” is clearly the primary section.
- Secondary attention items and weekly commitments remain visible without competing with the primary action.
- Home does not read like a public website, news portal, or generic dashboard.
- Harbor's identity is present but does not overpower the work.
- The screen remains calm with both full and sparse data.
- An item updated in one place changes consistently everywhere it appears.
- Components consume a shared normalized data model.
- The layout works intentionally at desktop, tablet, and mobile widths.
- Keyboard interaction, focus visibility, semantics, and contrast meet the accessibility requirements.
- No unnecessary new features or dependencies were added.
- The existing application still builds and previously working routes remain intact.

---

## 17. Implementation sequence

Before coding:

1. Inspect the existing repository, routes, styling conventions, dependencies, and reusable components.
2. Summarize the intended implementation approach and identify any conflict with this brief.
3. Do not ask broad aesthetic questions already answered by the supplied references.

Then:

1. Establish or extend the Harbor design tokens.
2. Build or refine the reusable application shell.
3. Create the shared normalized sample-data layer.
4. Implement the Home content hierarchy.
5. Add the focused item interaction and synchronized state.
6. Add responsive and accessibility behavior.
7. Exercise populated, sparse, completed, and alert-absent states.
8. Run the production build, linting, and relevant tests.
9. Report completed work, assumptions, and separately listed recommendations.

Work on this screen only. Stop after Build Brief 001 is complete and ready for review.

---

## 18. Review question

The final experience will be reviewed against one central question:

> When a Harbor Community Services employee begins the day, does Harbor View help them see, understand, and act on what matters without making work feel heavier?
