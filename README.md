# AgentEdge Control Center

AI-powered configuration and governance platform for banks to define, control, and audit how AI agents operate within core banking environments.

## Overview

AgentEdge provides a centralized control system where bank administrators, compliance officers, and implementation teams can configure agent behavior, define action policies, and monitor AI-driven operations — all within a secure, auditable framework.

## Key Features

- **Bank Configuration Studio** — Set up data sources, product catalogs, workflows, and ingest policy documents
- **Action Policy Builder** — Define what actions AI agents can take, under what conditions, with approval flows and guardrails
- **Role Configuration** — Control autonomy levels, permissions, and approval authority per role (CSR, Supervisor, Admin)
- **Test & Simulation** — Simulate agent behavior against real scenarios before deployment
- **Audit Trail** — Full traceability of every agent decision with rule evaluation, approval chains, and explainability
- **Monitoring** — High-level system health, agent activity, and risk signal overview

## Target Users

| Role | Responsibility |
|------|---------------|
| Bank Admins / Operations | Configure agent behavior and policies |
| Compliance Officers / Supervisors | Monitor, audit, and review agent actions |
| FIS Implementation Teams | Set up and manage configurations for smaller banks |

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** TanStack React Query
- **Routing:** React Router

## Getting Started

```bash
npm install
npm run dev
```

## Design Principles

- Control system for AI behavior — not a chatbot interface
- Agents operate within a defined policy sandbox, not open-ended autonomy
- All agent actions must be traceable, explainable, and reconstructable
- Enterprise-focused: clarity, trust, safety, and visibility
