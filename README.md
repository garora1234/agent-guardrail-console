# BankAgentGuard

A configurable control system for governing how AI agents operate within core banking environments.

## Overview

BankAgentGuard is designed to enable banks to safely deploy AI agents within their existing systems. Each bank has its own products, workflows, and compliance requirements — making it critical that AI behavior is configurable, constrained, and auditable.

Rather than treating agents as autonomous entities, this system treats them as **controlled execution layers** operating within explicitly defined policies and permissions.

This project is based on a time-boxed product design exercise. All content reflects my own thinking and does not include any proprietary or confidential information.

---

## Problem

Banks need AI agents that can:

* Operate within their specific implementation of core banking systems
* Follow institution-specific policies and compliance rules
* Provide full traceability for every action taken

The challenge is building a system that is:

* Configurable across different banks
* Safe for action-taking (not just read-only)
* Auditable for compliance and regulatory needs

---

## Approach

I approached this as designing a **control system for AI behavior**, not a traditional settings UI.

The system is structured around five core layers:

* **Bank Configuration** — Define the bank’s environment (data sources, products, workflows, policy ingestion)
* **Decisioning Rules** — Convert policies into structured rules that govern agent behavior
* **Role Configuration** — Define who can do what, including autonomy limits and approval authority
* **Simulation** — Test agent behavior before deployment
* **Audit Log** — Provide full traceability and explainability of every action

At runtime, agent behavior is determined by:

> **Policy constraints ∩ Role permissions**

---

## Key Capabilities

* **Bank Configuration Studio**
  Map data sources, products, workflows, and ingest policy documents to align the system with each bank’s environment

* **Decisioning Rules**
  Define and refine rules governing actions (e.g., fee waivers, address changes), including conditions, approvals, and guardrails

* **Role Configuration**
  Control permissions, autonomy levels, and approval authority across roles such as CSR, Supervisor, and Admin

* **Simulation**
  Test real scenarios to understand how policies and roles interact before deployment

* **Audit Log**
  Reconstruct every action with full context: inputs, rules applied, approvals, and outcomes

* **Monitoring**
  Provide system-level visibility into activity, risk signals, and operational health

---

## Target Users

| Role                     | Responsibility                                    |
| ------------------------ | ------------------------------------------------- |
| Bank Admins / Operations | Configure policies, workflows, and agent behavior |
| Compliance & Risk Teams  | Audit decisions and ensure regulatory adherence   |
| Implementation Teams     | Deploy and manage configurations across banks     |

---

## Design Principles

* Treat agents as **controlled systems**, not autonomous actors
* Enforce behavior through **explicit policies and permissions**
* Support **progressive autonomy** (suggest → approve → execute)
* Ensure all actions are **traceable, explainable, and reconstructable**
* Prioritize **clarity, safety, and auditability** over flexibility

---

## Tech Stack

* **Frontend:** React 18, TypeScript, Vite, Tailwind CSS
* **UI Components:** shadcn/ui
* **State Management:** TanStack React Query
* **Routing:** React Router

---

## Getting Started

```bash
npm install
npm run dev
```
