---
name: engineering-review-gate
description: Mandatory two-checkpoint engineering review for ComidaPeruana. Use whenever planning, implementing, modifying, refactoring, fixing or extending code. Requires an Opus review of the plan before any code is written, and a second Opus review of the real diff before the work is considered done. Also enforces spec conformance, design fidelity, navigation reachability, zero-cost constraints, accessibility and performance. Favours the simplest correct solution.
---

# Engineering Review Gate

Act as a mandatory engineering quality gate around every meaningful code change.

The workflow has two required review checkpoints:

1. **Pre-implementation review**
2. **Post-implementation review**

Do not consider a coding task complete unless both checkpoints have passed.

The purpose of this skill is not to make solutions more sophisticated.

The purpose is to ensure that every change is:

* compatible with the project;
* consistent with the existing architecture;
* simple;
* maintainable;
* secure;
* high quality;
* proportional to the problem being solved.

The governing principle is:

> The simplest correct solution that fits the existing system is usually the best solution.

---

# 1. Mandatory workflow

For every meaningful code change, follow this sequence:

```text
Understand task
    ↓
Inspect existing project
    ↓
Prepare implementation plan
    ↓
OPUS REVIEW — PLAN
    ↓
Resolve blocking observations
    ↓
Implement
    ↓
Run validation/tests
    ↓
OPUS REVIEW — IMPLEMENTATION
    ↓
Resolve blocking observations
    ↓
Final validation
    ↓
Complete task
```

Never skip either review merely because the requested change appears straightforward.

For extremely trivial edits such as:

* typo corrections;
* comment changes;
* copy changes with no behavioral impact;

use judgment.

For any change involving logic, data, architecture, permissions, APIs, database access, authentication, configuration, dependencies, or reusable components, always perform both reviews.

---

# 2. Reviewer model requirement

Use **Opus** as the reviewer whenever the execution environment supports selecting or delegating work to an Opus model.

The implementation agent and review agent should be logically separate.

The reviewer must evaluate the work independently rather than merely confirming the implementer's reasoning.

If the environment supports subagents or delegated model execution:

> Delegate both review checkpoints to Opus.

If the environment does not provide access to Opus:

* do not falsely claim that Opus reviewed the work;
* perform the strongest independent review available;
* explicitly state that an Opus review could not be executed.

Never silently replace the required reviewer while claiming compliance.

---

# 3. Inspect the project before planning

Before proposing implementation:

Inspect enough of the existing repository to understand the relevant system.

At minimum inspect, when applicable:

* project structure;
* existing modules;
* relevant components;
* database schema;
* migrations;
* existing services;
* API patterns;
* authentication;
* authorization;
* RLS policies;
* configuration;
* dependencies;
* naming conventions;
* error-handling conventions;
* tests;
* nearby implementations solving similar problems;
* project documentation;
* `soul.md`;
* README;
* architecture or specification documents.

Do not design the change in isolation.

Prefer extending existing patterns over introducing new ones.

---

# 4. Pre-implementation review

Before writing production code, prepare a concise implementation plan.

The plan must include:

## Objective

What problem is being solved?

## Existing system involved

Which modules, tables, services, components, routes, or APIs are affected?

## Proposed changes

What will be created, modified, or removed?

## Data impact

Will the change affect:

* tables;
* relationships;
* migrations;
* schemas;
* types;
* API contracts;
* persisted state?

## Security impact

Will the change affect:

* authentication;
* authorization;
* RLS;
* server/client boundaries;
* secrets;
* API keys;
* public endpoints;
* user-controlled input?

## Spec conformance

Which numbered sections of the functional specification govern this surface?

List them explicitly and quote the requirement. A plan that touches navigation
must name the navigation sections. A plan that touches a screen must name the
screen's section and the mockup panel it corresponds to.

Never write "matches the spec" without naming what was read.

## Cost impact

Does this change introduce, or move the project closer to:

* a paid API call;
* a metered quota (image transformations, analytics events, bandwidth, database
  rows, build minutes);
* a service whose free tier requires a billing account on file;
* a plan whose terms prohibit the project's intended use?

State the expected monthly volume and the free-tier ceiling it sits under.

This project's standing constraint is zero recurring cost. A change that
silently starts a meter is a blocking issue even when the code is correct.

## Complexity

Why is this the simplest reasonable implementation?

## Validation

How will the implementation be verified?

After preparing the plan, submit it for the first Opus review.

Do not begin implementation before the review is completed and blocking issues are resolved.

---

# 5. Opus plan review

Ask the reviewer to evaluate the proposed plan deeply against the following principles.

---

## Principle A — Project congruence

Verify that the plan fits the project as it exists today.

Check:

* compatibility with the current architecture;
* compatibility with the current data model;
* compatibility with planned modules;
* consistency with project specifications;
* consistency with `soul.md`;
* whether existing functionality could break;
* whether future planned functionality becomes unnecessarily difficult;
* whether the proposal duplicates something already implemented.

Ask:

> Does this change naturally belong in the current system?

Reject approaches that create isolated parallel systems without a strong reason.

Avoid introducing:

* duplicate sources of truth;
* alternative data access patterns;
* overlapping modules;
* redundant abstractions;
* incompatible schemas.

---

## Principle B — Code consistency

Verify that the plan follows patterns already established in the repository.

Check:

* naming;
* file structure;
* component structure;
* service patterns;
* data access;
* error handling;
* validation;
* types;
* state management;
* dependency usage;
* testing patterns.

Prefer:

> Extend the pattern already used by the codebase.

Avoid creating a new architectural style merely because another style is theoretically attractive.

Do not introduce:

* classes into a functional codebase without need;
* repositories when direct service patterns are already established and sufficient;
* new state libraries for a small local-state problem;
* new abstractions for a single use case;
* duplicate utilities;
* parallel design systems.

---

## Principle C — Technical debt

Determine whether the proposed implementation creates meaningful future maintenance cost.

Identify:

* duplicated logic;
* fragile coupling;
* unnecessary dependencies;
* inconsistent abstractions;
* hidden side effects;
* unclear responsibilities;
* premature generalization;
* hardcoded behavior that should clearly be data-driven;
* data migrations likely to cause problems later.

Do not reject a simple pragmatic solution merely because a more abstract solution exists.

Technical debt means foreseeable maintenance problems, not lack of theoretical elegance.

---

## Principle D — Quality

Ensure the plan can produce clean, understandable code.

Reject designs likely to create:

* spaghetti code;
* giant components;
* giant functions;
* deeply nested conditional logic;
* unclear mutation;
* hidden dependencies;
* duplicated business logic;
* confusing control flow;
* responsibilities mixed across unrelated layers.

Prefer code that another competent engineer can understand quickly.

Clarity is more important than cleverness.

---

## Principle E — Security

Review security explicitly.

Never treat security as an optional final check.

Check for:

### Secrets

Never expose to browser/client bundles:

* service-role keys;
* private API keys;
* database credentials;
* secret tokens;
* signing keys;
* privileged environment variables.

Ensure secrets are only accessed from trusted server-side code.

### Database

For Supabase or equivalent systems:

* verify RLS;
* verify policies;
* use least privilege;
* never assume client-side UI restrictions provide authorization;
* never rely on hidden buttons for security;
* ensure users cannot query or modify unauthorized records.

### APIs

Verify:

* server/client boundaries;
* input validation;
* authorization;
* abuse potential;
* privileged operations;
* unintended information disclosure.

### Browser access

Assume users can:

* inspect JavaScript;
* call APIs directly;
* manipulate requests;
* edit local storage;
* modify client state;
* bypass UI restrictions.

Security must survive these actions.

Never trust the browser.

---

## Principle F — Simplicity

This principle has high priority.

Quality does NOT mean architectural complexity.

Prefer:

* fewer files;
* fewer abstractions;
* fewer dependencies;
* shorter execution paths;
* clear functions;
* existing utilities;
* explicit behavior;
* small changes;
* boring technology.

Ask:

> Can this be implemented correctly with less code or fewer concepts?

If yes, prefer the simpler implementation.

Avoid speculative architecture for hypothetical future requirements.

Do not build a framework to solve one problem.

Do not introduce patterns merely because they are considered "enterprise" patterns.

Do not optimize prematurely.

---

# 6. Plan review outcome

The Opus reviewer must return one of:

## APPROVED

No blocking problems exist.

Implementation may proceed.

## APPROVED WITH NON-BLOCKING NOTES

Implementation may proceed.

Notes are optional improvements that do not justify additional complexity.

## CHANGES REQUIRED

One or more material issues must be fixed before implementation.

Each blocking issue must include:

* problem;
* why it matters;
* smallest reasonable correction.

Do not produce vague criticism.

---

# 7. Implement only after plan approval

After approval:

Implement the smallest coherent change that satisfies the requirement.

Do not expand scope during implementation.

Do not add:

* unrelated refactors;
* speculative abstractions;
* unnecessary dependencies;
* features not requested;
* broad cleanup unrelated to the task.

If implementation reveals that the approved plan is materially wrong:

Stop implementing that portion.

Update the plan.

Repeat the plan review for the materially changed approach.

---

# 8. Validate implementation before final review

Before the post-implementation review, run all relevant project checks.

Depending on the project, this may include:

```text
lint
typecheck
unit tests
integration tests
build
database validation
migration validation
security checks
```

Also inspect the actual diff.

Do not ask Opus to review a hypothetical implementation.

The reviewer must inspect the real changes.

---

# 9. Post-implementation Opus review

After implementation, ask Opus to review:

* the original task;
* approved implementation plan;
* actual diff;
* affected files;
* related existing code;
* schema/migrations when relevant;
* tests;
* security-sensitive configuration.

The reviewer must determine whether the implementation actually matches the approved approach.

---

# 10. Post-implementation review checklist

Evaluate the implementation against all of the following.

## Congruence

* Does the implementation fit the current architecture?
* Does it preserve the data model?
* Does it avoid breaking planned modules?
* Does it preserve existing contracts?
* Does it avoid duplicate sources of truth?

## Consistency

* Does it look like code from this repository?
* Does it reuse existing conventions?
* Did it introduce an unnecessary architectural pattern?
* Are names and locations consistent?

## Quality

* Is the code readable?
* Are responsibilities clear?
* Are functions/components reasonably sized?
* Is business logic duplicated?
* Is control flow understandable?
* Are errors handled appropriately?
* Are edge cases addressed where necessary?

## Technical debt

* Did this create avoidable complexity?
* Are new abstractions justified?
* Are new dependencies justified?
* Is anything being generalized prematurely?
* Is there obvious cleanup required before merge?

## Security

* Are any secrets exposed?
* Are privileged keys server-only?
* Are authorization checks server-side?
* Is RLS correct?
* Can the browser bypass intended restrictions?
* Can users access another user's data?
* Are inputs validated?
* Are public endpoints intentionally public?
* Did logs accidentally expose sensitive information?

## Simplicity

* Is there a materially simpler solution?
* Is any code unnecessary?
* Did implementation over-engineer the requirement?
* Could an abstraction be removed?
* Could an existing mechanism have been reused?

## Spec conformance

* Open the specification sections that govern this surface and read them again
  against the built result. Not from memory.
* Is every element the spec requires actually present?
* Was anything built that the spec does not ask for?
* If the spec and the approved design disagree, was the conflict raised rather
  than silently resolved?

## Design fidelity

* Compare against the approved mockup, panel by panel.
* Are the elements visible in the mockup present: labels, badges, counters,
  section headings, controls?
* Typography scale, colour roles, spacing and corner treatment consistent with
  the rest of the product?
* Does every control read as a control? An icon with no label, no background
  and no hit area is not a button.

## Navigation reachability

Trace the product as a graph, not as a list of screens.

* From every screen, can the traveller reach every other primary destination?
* After committing to one path, can they change their mind without clearing
  storage, editing the URL, or using the browser back button repeatedly?
* Does every link in a menu resolve to a page that exists?
* Does a back control return somewhere useful, rather than to the start?

A dead end is a defect even when every individual screen is correct. This is
the failure mode that unit-level review does not catch.

## Content and localisation

* Is any user-facing copy hardcoded in a component instead of the dictionaries?
* Does every dictionary have every key, in every supported language?
* Is any domain content hardcoded in a component instead of coming from data?
* Do lists derive their options from the data actually present, rather than
  from the full catalogue? An option that yields an empty result is a defect.
* Does every image carry meaningful alternative text in every language?

## Performance and accessibility

* Are images sized with a `sizes` value that matches their real rendered width?
* Are animations limited to transform and opacity?
* Is `prefers-reduced-motion` honoured centrally rather than per component?
* Do interactive targets reach 44x44?
* Is the interface operable by keyboard, and is focus visible?
* Does semantic markup match the role each element actually plays?

## Correctness

* Does it satisfy the requested behavior?
* Do tests pass?
* Does the build pass?
* Does type checking pass?
* Are migrations safe?
* Are failure states acceptable?
* Were route types regenerated after adding or moving routes?
* Does any newly referenced external host require configuration before it will
  load at runtime?

---

# 11. Final review outcome

Return one of:

## APPROVED

Implementation is ready.

## APPROVED WITH NON-BLOCKING NOTES

Implementation is sound.

Do not automatically implement optional suggestions.

Only apply them if their value clearly exceeds the complexity they introduce.

## CHANGES REQUIRED

Do not consider the task complete.

Fix the blocking issues and repeat the post-implementation review.

---

# 12. Severity levels

Classify findings as:

## BLOCKER

Security vulnerability, data corruption risk, architecture incompatibility, broken behavior, or serious correctness problem.

Must fix.

## HIGH

Significant maintainability, consistency, or reliability problem.

Normally must fix.

## MEDIUM

Real issue but limited impact.

Fix when doing so remains simple.

## LOW

Minor observation or stylistic preference.

Do not increase complexity merely to resolve it.

---

# 13. Avoid review theater

The reviewer must not manufacture issues merely to appear thorough.

Do not:

* demand abstractions without evidence;
* demand interfaces for single implementations;
* demand patterns because they are fashionable;
* demand extra layers without concrete benefit;
* propose redesigns unrelated to the task;
* request extensive tests for trivial behavior;
* turn style preferences into blockers.

A review is successful when it prevents meaningful problems.

The number of comments is irrelevant.

Zero findings is acceptable when the implementation is sound.

---

# 14. Prefer deletion over addition

When improving code, consider solutions in this order:

1. Can unnecessary code be removed?
2. Can an existing function solve the problem?
3. Can an existing abstraction be extended?
4. Can a small local function solve it?
5. Only then consider introducing a new abstraction.

The default should not be to create more architecture.

---

# 15. Existing code is context, not absolute truth

Follow existing project conventions unless doing so would:

* create a security vulnerability;
* reproduce a known serious bug;
* significantly worsen technical debt;
* conflict with explicit project architecture.

If an existing pattern is problematic, call it out explicitly rather than silently introducing a competing pattern.

Prefer targeted improvement over broad unsolicited refactoring.

---

# 16. Database rules

For every database-related change:

Review:

* tables;
* columns;
* indexes;
* foreign keys;
* constraints;
* migrations;
* nullable fields;
* deletion behavior;
* ownership;
* RLS;
* policies.

Ensure application behavior does not depend solely on client-side filtering.

For Supabase:

> RLS is part of the security model, not an optional optimization.

Never approve a client-accessible table containing protected data without appropriate RLS and policies.

---

# 17. Environment variable rules

Classify environment variables as:

## Public

Safe to expose intentionally to the browser.

Example:

```text
NEXT_PUBLIC_*
```

Only use this category when the value is genuinely public.

## Private

Server-only.

Examples:

```text
SUPABASE_SERVICE_ROLE_KEY
DATABASE_URL
PRIVATE_API_KEY
WEBHOOK_SECRET
```

Never move a private secret into a public environment variable to make an implementation easier.

---

# 18. Dependency rule

Before adding a dependency, answer:

1. Can the existing stack already solve this?
2. Is the dependency maintained?
3. Is its value greater than its complexity?
4. Will it become foundational infrastructure unnecessarily?

For small functionality, prefer existing APIs or simple code over adding packages.

---

# 19. Refactoring rule

Do not combine feature work with broad refactoring unless the refactor is necessary for the feature.

If a nearby problem is discovered:

* mention it;
* fix it only if small and directly relevant;
* otherwise leave it outside the current scope.

Keep diffs focused.

---

# 20. Final completion report

After successful implementation and final review, report concisely:

```text
Implementation
- What changed

Validation
- Tests/typecheck/lint/build performed
- Checks actually executed, with their results

Spec conformance
- Sections read, and how the result was compared against them

Cost impact
- New metered usage, or none

Opus pre-review
- APPROVED / APPROVED WITH NOTES

Opus post-review
- APPROVED / APPROVED WITH NOTES

Security
- Relevant security checks performed

Provisional
- What looks finished but is not: placeholder copy, stand-in assets, stubs

Notes
- Any non-blocking observations
```

Do not claim completion if the final review returned `CHANGES REQUIRED`.

---

# 21. Core engineering principles

Always optimize for these principles, in this order:

### 1. Correctness

The implementation must solve the actual problem.

### 2. Project congruence

The change must belong naturally in the existing system.

### 3. Security

Never trade security for convenience.

### 4. Simplicity

Use the smallest solution that works well.

### 5. Consistency

Follow established project patterns.

### 6. Maintainability

A future engineer should understand the change quickly.

### 7. Performance

Optimize where relevant, not speculatively.

---

# 22. Ultimate decision rule

When choosing between two valid implementations, prefer the one with:

* fewer concepts;
* fewer dependencies;
* less code;
* smaller blast radius;
* clearer behavior;
* stronger compatibility with existing code;
* easier deletion or modification later.

The best implementation is not the most sophisticated.

The best implementation is the simplest implementation that is correct, secure, consistent, and maintainable.

---

# 23. Verify, do not assert

A review claim must be backed by something that was run or read in this
session.

Acceptable evidence:

* a command that was executed and its output;
* a file that was opened and read;
* a route that was requested and its status code;
* a specification section that was quoted.

Not acceptable:

* "the build passes" without running it;
* "the spec allows this" without opening the spec;
* "the images load" without requesting one;
* "this matches the design" without opening the design.

When a check cannot be run, say so explicitly rather than implying it passed.

Say "I could not verify the rendered result" instead of describing a result
that was never observed.

## Distinguish a broken test from broken code

When a verification fails, establish which one failed before reporting it.

A malformed request, a wrong port, a stale process or a bad shell quote produces
a failure that looks identical to a real defect. Reproduce it a second way
before calling it a bug, and before "fixing" code that was never broken.

---

# 24. Reviewer separation

The plan review and the implementation review must both be performed with fresh
attention, not as a confirmation of the reasoning that produced the work.

Where the environment supports delegating to a separate Opus agent, delegate.

Where it does not, the same model may perform the review, but it must:

* re-open the actual files rather than reviewing from memory of writing them;
* re-read the governing specification sections;
* state plainly that author and reviewer were the same session.

Never describe a review as independent when it was not.

---

# 25. Phase discipline

Work proceeds one phase at a time.

At the end of each phase:

* run the full validation set;
* perform the post-implementation review;
* report what was built and what was deliberately deferred;
* stop, and wait before starting the next phase.

Two rules that matter more than they appear:

**Name what is provisional.** Placeholder copy, invented ratings, stand-in
photography and stubbed screens must be labelled as such in the code itself and
in the report. Work that looks finished but is not is worse than work that is
obviously unfinished.

**Say when nothing visible changed.** A phase that produces only data or only
configuration will look identical in the browser. Say so before the reviewer
opens it and wonders what happened.

---

# 26. Data integrity

Type checking validates shape. It does not validate meaning.

For any hand-written dataset, verify separately:

* every referenced identifier resolves to a record that exists;
* no record is unreachable from the rest of the graph;
* no relationship exceeds the limit the specification sets;
* limits scoped to a context are counted within that context, not globally;
* no asset is reused where two records appear side by side;
* editorial text does not promise something the data cannot deliver.

Prefer the database to enforce these once it exists. Until then, check them by
hand, and say which checks were run.

---

# 27. Zero-cost operating constraints

Standing decisions for this project. Revisit only when the product monetises.

* No paid API calls. External data that costs money is entered by hand instead.
* No invented external identifiers. An identifier that cannot be verified is
  left empty rather than guessed, so nothing ships a broken link.
* Free hosting is used while the project is pre-revenue and non-commercial.
  Platform-proprietary APIs are avoided so the project stays portable if its
  terms stop fitting.
* Metered features are configured to stay well inside free ceilings, and the
  configuration is treated as load-bearing rather than incidental.
* Placeholder photography is free-licence only, and marked in code as
  provisional.
