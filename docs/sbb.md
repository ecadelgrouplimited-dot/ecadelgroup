Smart Business Book (SBB) — Project Overview
Version 3.0 — May 2026

Classification: Internal Reference — Authoritative

This document is the single source of truth for the SBB platform. It is written for engineers, investors, product managers, partners, and AI systems that need a complete, accurate understanding of what SBB is, what it does, and how it works.

Table of Contents
1.	Executive Summary
2.	The Problem We Solve
3.	Product Vision & Mission
4.	Who SBB Is For
5.	Platform Features — Complete Coverage
o	5.1 Transactions & Money Movement
o	5.2 Invoicing & Collections
o	5.3 Expenses, Bills & Suppliers
o	5.4 Products & Inventory
o	5.5 Customers & CRM
o	5.6 Payroll & HR
o	5.7 Accounting, Ledger & Close
o	5.8 Tax & Compliance
o	5.9 Reports & Analytics
o	5.10 Point of Sale
o	5.11 SUSU / ROSCA Savings Groups
o	5.12 Credit Book
o	5.13 Budget & Forecast
o	5.14 Reconciliation
o	5.15 Purchase Orders
o	5.16 Fixed Assets
o	5.17 Multi-Business & Workspaces
o	5.18 Collaboration & Review
o	5.19 Alerts & Signals
o	5.20 NGO Mode
o	5.21 Kiongozi AI Copilot
o	5.22 WhatsApp Integration
o	5.23 Payment Infrastructure
o	5.24 Support System
6.	Subscription Plans & Pricing
7.	Geographic Coverage & Localisation
8.	Technical Architecture
9.	Data Model Overview
10.	Infrastructure & Deployment
11.	Security & Compliance
12.	Integrations & APIs
13.	Mobile Application
14.	Platform Administration
15.	Competitive Position
16.	Strategic Roadmap
17.	Key Metrics & Statistics
18.	Contact & Support

1. Executive Summary
Smart Business Book (SBB) is a full-stack business operating and financial control platform built specifically for African SMEs, NGOs, and institutions. It is live, in production at sbb.finance, and actively used by real businesses across Uganda, Kenya, Nigeria, Ghana, Tanzania, and Rwanda.
SBB gives founders, finance leads, operators, and accountants one unified environment to run the commercial and financial heartbeat of their business — connecting money movement, invoicing, bills, payroll, HR, inventory, tax compliance, banking reconciliation, savings groups, and AI intelligence under a single roof.
The platform is not a simplified bookkeeping app. It is an enterprise-grade system built from the ground up for the realities of African business: offline-capable POS, SMS-to-transaction ingestion, mobile money integration, multi-currency fund accounting, ROSCA/Susu group management, USAID/EU-standard NGO grant reporting, and a 25-agent AI workforce operating in full business context.
Key platform statistics:
·	62 API route groups across 43+ functional prefixes
·	136 database tables across all business domains
·	98 Alembic migrations (March–May 2026)
·	68 Next.js application pages
·	56 support knowledge base articles across 12 categories
·	199 countries supported on the platform
·	6 subscription tiers from Free to Enterprise
·	40 business types across 6 categories

2. The Problem We Solve
The African SME financial management crisis
Over 44 million SMEs operate across Sub-Saharan Africa. The overwhelming majority manage their finances through one of three methods:
1.	Paper notebooks and ledgers — no search, no backup, no insights
2.	WhatsApp groups and spreadsheets — fragmented, error-prone, no real-time view
3.	Generic global software (QuickBooks, Sage, Zoho) — priced for Western markets, designed for Western accounting models, requiring accountants for basic operation
The result is a catastrophic visibility gap. Most African business owners cannot answer basic questions in real time:
·	How much money do I actually have right now — across mobile money, bank accounts, and cash?
·	Which customers owe me money and how overdue are they?
·	Am I making a profit this month?
·	When will I run out of cash?
·	How do I comply with eTIMS in Kenya or FIRS in Nigeria?
The NGO-specific gap
For NGOs, churches, foundations, and schools — which collectively manage hundreds of millions in donor funding across Africa — the gap is even more severe. Grant fund accounting (restricted vs unrestricted), compliance calendar tracking, USAID/EU-standard report generation, and multi-donor visibility have been locked behind enterprise software costing thousands of dollars per month or requiring dedicated finance systems.
What SBB solves
SBB eliminates these gaps through:
·	Automatic transaction capture from mobile money SMS alerts
·	Real-time multi-account balance visibility (MTN, Airtel, M-Pesa, bank accounts, cash)
·	AI-driven financial intelligence that proactively surfaces insights, risks, and recommendations
·	Africa-native payment infrastructure (Paystack, Flutterwave, M-Pesa STK Push)
·	Built-in compliance tooling for eTIMS, KRA, FIRS, NSSF, NHIF, and other statutory requirements
·	NGO Mode — a complete impact-finance layer for non-profits, free as part of the platform

3. Product Vision & Mission
Vision
To be the default operating system for every business in Africa — the platform that African business owners open first every morning and never need to leave.
Mission
Build the financial and operational infrastructure that makes African businesses smarter, faster, and more resilient — by connecting every data point, workflow, and decision into one intelligent, live system.
Core principles
1. African-first, not Africa-adapted

SBB is designed from scratch for African business realities — not ported from a Western product. SMS ingestion, mobile money, ROSCA groups, M-Pesa, eTIMS, and multi-currency fund accounting are native features, not bolt-ons.
2. One system, full business

SBB replaces the entire stack: accounting software + payroll software + inventory system + CRM + HR system + tax compliance tool + banking dashboard. One login. One dashboard. One truth.
3. Intelligence at the core

Kiongozi — SBB's AI copilot — is not a chatbot layer on top of a system. It is woven into every workflow, with full context of every transaction, every alert, every pattern, and every anomaly in the business.
4. Accessible without an accountant

A solo trader should be able to use SBB without accounting knowledge. An accountant should find the same system powerful enough for institutional clients. Both use cases are first-class.

4. Who SBB Is For
Primary users
Segment	Description	Key needs
SME Founders & Owners	1–50 employee businesses across commerce, services, food, production	Real-time cash visibility, invoice collection, payroll, stock tracking
Finance Leads & Accountants	In-house or external accountants managing books	Ledger, close, P&L, reports, reconciliation, tax
NGOs & Non-profits	Foundations, churches, schools, community groups, healthcare NGOs	Donor registry, grant tracking, fund accounting, compliance reports
Retail & POS Operations	Multi-location shops, supermarkets, fuel stations	POS, inventory, shift management, per-location analytics
Savings Group Treasurers	Chama/Susu/ROSCA group managers	Member management, contributions, payouts, compliance
HR & Operations Managers	Managing people and processes	Payroll, leave, attendance, performance, access control

Business types supported (40 across 6 categories)
Commerce: Retail shops, wholesale distributors, e-commerce, import/export, hardware, pharmacy, supermarket, fashion, electronics, auto parts
Food & Hospitality: Restaurants, bakeries, bars, hotels, catering
Services: Salons, professional services, consulting, marketing agencies, repair, cleaning, logistics, travel, real estate
Production: Manufacturing, agriculture, construction, mining, printing
Community & Digital: Clinics, schools, tech companies, media, freelancers
NGO, Faith & Impact: NGOs, foundations, churches, community groups, healthcare NGOs
Geographic presence
Primary markets: Uganda, Kenya, Nigeria, Ghana, Tanzania, Rwanda

Platform coverage: 94 African countries, 199 countries total

5. Platform Features — Complete Coverage
5.1 Transactions & Money Movement
The foundation of SBB. Every financial event in the business flows through the transactions module.
Core capabilities:
·	Record income and expense transactions manually with full categorisation
·	SMS auto-ingestion — SBB reads mobile money SMS alerts (M-Pesa KE, MTN Ghana, MTN Nigeria, Airtel Money) and converts them to confirmed transactions automatically
·	Multi-account balance tracking: Mobile Money wallets, bank accounts, petty cash
·	Transfer recording between accounts with double-entry ledger posting on both sides
·	Transaction categorisation with a 2-tier hierarchy (parent + child categories)
·	Counterparty tracking (customer or supplier names automatically linked)
·	Review workflow: SMS-ingested transactions enter "pending review" state; owners or accountants confirm, correct, or reject
·	Transaction nullification — soft-delete with full audit trail
·	Duplicate detection with automatic flagging
·	Confidence scoring for AI-classified transactions
·	Advanced filtering and saved views (filter by type, category, counterparty, date, amount, review status)
·	Bulk operations: confirm, reject, export multiple transactions
·	Tax treatment flags (VAT-applicable, exempt, withholding tax eligible)
·	Full transaction history with activity log per record
Ledger integration:

Every confirmed transaction posts double-entry ledger entries automatically. No manual journal entries needed for standard business operations.

5.2 Invoicing & Collections
Professional invoice generation and systematic collection management.
Core capabilities:
·	Create invoices with line items (name, quantity, unit price, description, tax)
·	Branded invoice templates with logo and accent colour
·	Multiple invoice templates per business
·	Payment links — shareable URLs that customers use to pay via mobile money or card
·	WhatsApp sharing — one-click send via WhatsApp with payment link embedded
·	Invoice status tracking: Draft → Sent → Partial → Paid → Overdue → Void
·	Automated payment reminders — schedule reminder emails/WhatsApp at configurable intervals
·	Customer email delivery with delivery log
·	PDF export for any invoice
·	Invoice cloning and recurring invoice templates
·	Credit notes and partial payments
·	Collection tracking: total outstanding, days overdue per customer
·	Payment link public checkout pages (no account required for payers)
·	Share links for read-only invoice view by external parties
Payment integrations:

Paystack, Flutterwave, and M-Pesa STK Push are wired to invoice payment links. When a customer pays, SBB updates the invoice status and records the transaction in real time via webhook.

5.3 Expenses, Bills & Suppliers
Full payables management from supplier registration through payment scheduling.
Core capabilities:
·	Supplier master records — register suppliers with contact details, payment terms, and tax information
·	Supplier bill management — create bills with line items, due dates, and approval workflows
·	Bill approval workflows with configurable policy (who can approve at what amount)
·	Payment scheduling: schedule future bill payments and track them
·	Receipt capture — photograph or upload receipts; OCR extracts amounts and dates
·	Receipt attachment to transactions (photo evidence for audits)
·	Expense categorisation with category hierarchy
·	Bill aging view — outstanding bills sorted by overdue status
·	Purchase history per supplier
·	Supplier statement reconciliation
·	Automatic expense recording from approved bills

5.4 Products & Inventory
Complete product catalogue and stock management for retail, wholesale, and distribution businesses.
Core capabilities:
·	Product catalogue with categories, units, SKUs, barcodes
·	Stock level tracking per product per location
·	Reorder alerts — automatic alert when stock falls below threshold
·	Product expiry tracking — alert when perishable stock approaches expiry date
·	Stock movement history (sales, purchases, transfers, adjustments)
·	Multiple stock locations (warehouses, branches, vehicles)
·	Inter-location stock transfers
·	Stock count / physical inventory workflow
·	Cost of goods sold (COGS) calculation
·	Gross margin per product
·	Product performance analytics (top sellers, slow movers, dead stock)
·	CSV bulk import for initial product setup
·	Barcode scanning support (via POS)

5.5 Customers & CRM
From simple contact management to a full CRM pipeline for growing businesses.
Core capabilities:
·	Customer contact database with full profile (name, phone, email, address, tax ID)
·	Customer transaction history and lifetime value
·	Customer statements — generate and share outstanding balance statements
·	Credit ledger — track how much each customer owes and for how long
·	WhatsApp payment reminders for overdue customers
·	Customer segments and tags
·	CRM pipeline: lead stages from inquiry through close
·	CRM campaigns — bulk email/SMS campaigns to customer lists
·	Email templates for customer communications
·	Lead intake forms — embeddable forms for capturing new enquiries
·	Conversation log per customer (emails, WhatsApp, notes)
·	Contact notes with timestamps
·	Mailing lists and bulk communications

5.6 Payroll & HR
Enterprise-grade people operations for businesses with 1 to hundreds of employees.
Payroll:
·	Employee compensation profiles (base salary, overtime rates, bonuses, deductions)
·	Monthly payroll run workflow: calculate → review → approve → disburse
·	Variable pay inputs: attendance, overtime, commissions per run
·	Payroll recovery: track and apply advances or prior-period corrections
·	Payslip generation per employee with WhatsApp delivery
·	Multi-currency payroll support
·	Mobile Money disbursement integration
·	Country-specific statutory deductions:
o	Nigeria: PAYE, NHF, Pension, NSITF
o	Kenya: PAYE, NHIF, NSSF, Housing Levy
o	Uganda: PAYE, NSSF, LST
o	Ghana: PAYE, SSNIT, Ghana Card levy
HR Management:
·	Department and job role hierarchy
·	Employee profiles with full employment history
·	Leave management: leave types, balance, request, approval workflow
·	Attendance tracking with shift scheduling
·	Shift management: create schedules, swap requests, manager approval
·	HR document management (contracts, certificates, policy documents)
·	Performance review cycles with scoring
·	Benefit plan tracking
·	Offboarding workflow
·	Employee self-service access (employees log in, view payslips, request leave)
·	Manager-level role-based access control

5.7 Accounting, Ledger & Close
A complete double-entry accounting system built into the platform — not a third-party integration.
General Ledger:
·	Chart of accounts with standard account types (Asset, Liability, Equity, Income, Expense)
·	Every transaction automatically posts double-entry ledger entries
·	Manual journal entries for accountants
·	Adjustment schedules (accruals, prepayments, depreciation)
Period Close:
·	Monthly close workflow: review → sign-off → lock period
·	Period lock prevents modification of closed periods
·	Reopen workflow with approvals for corrections
·	Close audit trail — who signed off, when, with what outstanding items
Financial Statements:
·	Profit & Loss statement (monthly, quarterly, annual)
·	Balance sheet
·	Cash flow statement
·	Trial balance
·	Retained earnings statement
·	Comparative periods (current vs prior month, current vs prior year)
Journals & Adjustments:
·	Manual journal entry creation
·	Recurring journal templates
·	Depreciation schedules for fixed assets
·	Prepayment amortisation
·	Accrual reversals

5.8 Tax & Compliance
Country-specific tax computation and compliance filing tooling.
Core capabilities:
·	Business tax profile per country with applicable rates
·	Transaction-level tax treatment classification (VAT, exempt, zero-rated, withholding)
·	Tax liability estimation in real time as transactions are recorded
·	eTIMS integration (Kenya KRA and Nigeria FIRS):
o	Electronic invoice signing with compliance QR codes
o	Real-time submission to tax authority
o	Compliance validation before invoice dispatch
·	Withholding tax (WHT) tracking and reporting
·	VAT computation with input/output tax netting
·	Tax filing workflow: compute → review → submit → record
·	Tax filing history with status tracking
·	Country compliance configurations (statutory deduction rules, tax brackets)

5.9 Reports & Analytics
Comprehensive reporting from basic summaries to management accounts.
Standard reports:
·	Daily/weekly/monthly income and expense summaries
·	Category breakdown reports
·	Cash flow report
·	Receivables aging (how long customers owe)
·	Payables aging (how long bills are outstanding)
·	Gross margin by product or category
·	Bank and mobile money reconciliation reports
Financial statements (see Section 5.7):

Full P&L, Balance Sheet, Cash Flow in standard accounting format.
Analytics features:
·	Revenue trends with period-over-period comparison
·	Expense ratio analysis
·	Top customers by revenue
·	Top suppliers by spend
·	Working capital position
·	Burn rate and runway calculations
·	Forecast scenarios (what-if modelling)
·	Year-over-year analysis
Export:
·	CSV and Excel export for all major datasets
·	Scheduled exports (daily/weekly/monthly auto-delivery)
·	PDF export for financial statements and reports

5.10 Point of Sale
Offline-capable POS for retail and field sales operations.
Core capabilities:
·	Product catalogue with barcode scanning
·	Cart-based sale entry with quantity and discount fields
·	Multiple payment methods per sale (cash, mobile money, card, credit)
·	Shift management: open shift → transact → close shift → reconcile
·	End-of-shift cash count with variance reporting
·	Offline operation: sales recorded without internet, synced on reconnection
·	Receipt printing (thermal printer compatible) or digital receipt sharing
·	Product sales report by shift, day, location
·	Multi-location POS (each branch has its own shift management)
·	Customer lookup and credit sale recording

5.11 SUSU / ROSCA Savings Groups
Africa's most powerful ROSCA and savings group management platform — the first enterprise-grade tool built for this specific financial instrument.
Core capabilities:
·	Group creation with configurable cycle (weekly, biweekly, monthly)
·	Member management (add, remove, member profiles, contribution history)
·	Contribution recording with late fee calculation
·	Payout order management (traditional rotation or custom order)
·	Payout tracking and confirmation
·	Late payment tracking with SMS reminder integration
·	Group analytics: collection rate, on-time payment rate, member performance
·	Multi-group support (one treasurer can manage multiple groups)
·	Enterprise features:
o	Loan tracking within groups (member-to-member lending)
o	Group treasurer delegation
o	Emergency payout workflows
o	Interest calculation on late payments
o	Group statement generation
o	Group savings target tracking
WhatsApp integration:

Group contribution reminders and payout notifications can be sent via WhatsApp.

5.12 Credit Book
Informal credit tracking for businesses that extend credit to customers.
Core capabilities:
·	Record credit sales — who owes you, how much, since when
·	Credit limit tracking per customer
·	Repayment recording with partial payment support
·	Credit aging view (0–30 days, 31–60 days, 60–90 days, 90+ days overdue)
·	WhatsApp reminder — one-tap payment reminder via WhatsApp with the balance amount
·	Credit statement per customer
·	Total credit exposure summary across all customers
·	Credit policy configuration (who can extend credit, maximum amounts)
·	Integration with customer profiles

5.13 Budget & Forecast
Financial planning and performance tracking tools.
Budgeting:
·	Monthly budget by income and expense category
·	Actual vs budget variance tracking in real time
·	Budget alert when spending approaches category limit
·	FX-adjusted budget comparison for multi-currency businesses
·	Annual budget planning view
Forecasting:
·	Scenario modelling (base, optimistic, pessimistic)
·	Revenue forecast based on historical trends
·	Cash flow projection
·	Days of cash runway calculation
·	What-if analysis (what happens if revenue drops 20%?)

5.14 Reconciliation
Bank and mobile money reconciliation to ensure SBB books match external statements.
Core capabilities:
·	Bank statement import — upload CSV or PDF statements; SBB matches transactions automatically
·	Unmatched item identification and resolution workflow
·	Manual match and unmatch for complex transactions
·	Statement-level reconciliation summary
·	Period reconciliation lock (prevent changes once reconciled)
·	Reconciliation history and audit trail
·	Multi-account reconciliation (each money location reconciled independently)
·	Reconciliation difference analysis

5.15 Purchase Orders
Formal procurement workflow for businesses that purchase inventory or services.
Core capabilities:
·	Create purchase orders with line items, quantities, and unit prices
·	Supplier selection from master records
·	PO approval workflow (configurable approval thresholds)
·	PO status tracking: Draft → Sent → Acknowledged → Received → Invoiced
·	Goods receipt recording against PO
·	Bill generation from received PO (three-way matching)
·	PO analytics: supplier lead times, order frequency, value per supplier

5.16 Fixed Assets
Asset register and depreciation management.
Core capabilities:
·	Asset registration (name, category, purchase date, purchase price, useful life)
·	Depreciation method selection (straight-line, reducing balance)
·	Automatic depreciation journal entries on schedule
·	Asset disposal recording
·	Asset impairment write-down
·	Fixed asset register report
·	Net book value per asset and category
·	Capital expenditure tracking

5.17 Multi-Business & Workspaces
Run multiple businesses from a single login without confusion.
Core capabilities:
·	Up to unlimited businesses per account (tier-dependent)
·	Business switcher in sidebar — switch workspaces without re-logging
·	Each business is completely isolated (transactions, contacts, products, payroll)
·	Role and permission system per business
·	Employee access — employees get limited access scoped to their role
·	Module-level access grants (e.g. employee can see payroll but not financial reports)
·	Business invitation workflow (invite collaborators by email)
·	Cross-business visibility for owners (aggregate dashboards — coming soon)
·	Business branding per workspace (logo, accent colour)

5.18 Collaboration & Review
Structured workflow for team-based business management and external collaboration.
Internal collaboration:
·	Discussion threads on any transaction, invoice, bill, or business record
·	@mention colleagues in threads (notification triggered)
·	Task assignment on records ("resolve this discrepancy by Friday")
·	Decision logging (who approved what and why)
·	SLA tracking on open collaboration threads
·	File/attachment support on threads
External collaboration:
·	Share external threads with clients, suppliers, or auditors
·	External parties respond via email without creating an account
·	Evidence attachment (photos, documents) to external threads
·	Thread closure with decision summary
Review workflow:
·	Customisable approval policies (what requires approval, who can approve)
·	AI-flagged transactions enter review queue automatically
·	Batch approval of routine items
·	Rejection with reason and auto-notification to originator
·	Audit trail of all approval decisions

5.19 Alerts & Signals
Proactive intelligence that surfaces problems before they become crises.
Alert types:
·	Low cash balance alerts
·	Overdue invoice alerts (configurable days)
·	Overdue bill payment alerts
·	Low stock / reorder alerts
·	Product expiry alerts
·	Duplicate transaction detection
·	Unusual spending pattern detection
·	Large transaction alerts (above configurable threshold)
·	Failed payment webhook alerts
·	Tax filing deadline alerts
·	Grant compliance calendar alerts (NGO Mode)
Signal processing:
·	SMS ingestion signals from mobile money operators
·	Webhook events from payment providers (Paystack, Flutterwave, M-Pesa)
·	Recurring rule triggers (automated bill and invoice generation)
·	Kiongozi proactive intelligence signals

5.20 NGO Mode
A complete impact-finance layer exclusively for NGOs, foundations, churches, schools, community groups, and healthcare organisations. This is SBB's most differentiated feature for the non-profit sector.
Who qualifies: Nonprofit, foundation, church, community_group, healthcare_ngo, education, healthcare business types.
Feature set:
Donor Registry:
·	Complete donor database (foundations, bilateral agencies, governments, individuals)
·	Donor types: Foundation, Government, Bilateral, Multilateral, Corporate, Individual
·	Contact person, email, phone, website per donor
·	Per-currency total computation from linked grants (never uses stale stored values)
·	Expandable relationship panel showing all linked grants with utilisation rings
Grant Lifecycle Management:
·	Grant records with title, reference number, currency, total amount, start/end dates
·	Fund type classification: Restricted, Unrestricted, Temporarily Restricted
·	Reporting cycles: Monthly, Quarterly, Semi-Annual, Annual
·	Status lifecycle: Pending → Active → Completed → Suspended → Closed
·	Budget lines: break the grant into approved spending categories
·	Budget vs actual bars per category with % utilisation
·	Budget line revision with revision note stored in activity log
·	Disbursement recording (when funds arrive from donor)
·	Expenditure tagging: link SBB expense transactions to specific grants
·	Cross-currency expenditure safety (never mixes minor units across currencies)
Fund Accounting:
·	Per-currency restricted vs unrestricted fund breakdown (never commingled)
·	Burn rate per currency with months-of-runway projection
·	Per-grant fund position table
·	Fund accounting summary (restricted vs unrestricted totals as separate cards)
Compliance Calendar:
·	Auto-generated from grant reporting cycles and end dates
·	Urgency tiers: Overdue (red), Urgent ≤14 days (amber), Upcoming (neutral)
·	Always visible with "all on track" green state when no deadlines
·	Milestone due dates tracked alongside reporting deadlines
Donor Report Generation (4 templates):
·	Standard — full financial narrative
·	USAID Standard — adds Results Framework and USAID-specific sections
·	EU DEVCO — Financial Statement by Budget Category in EU format
·	Foundation Narrative — narrative-first, lighter financial detail
·	Compiles: grant overview, budget vs actual table, expenditure by category, utilisation rate, programme narrative
·	Print to PDF via browser print (A4, no nav chrome, donor-ready formatting)
Milestones & Deliverables:
·	Expandable milestone checklist per grant
·	Mark complete/pending with one tap
·	Due date tracking with overdue highlighting
·	Delete milestones when no longer applicable
Document Attachments:
·	Upload MOUs, contracts, disbursement receipts, audit reports, correspondence
·	Document types: MOU, Contract, Receipt, Audit Report, Correspondence, Other
·	10MB file size limit; accepts PDF, JPG, PNG, XLSX, DOCX
·	Stored on VPS filesystem with database record
Analytics Dashboard:
·	Grant pipeline bar chart by status
·	Average utilisation gauge across active grants
·	Burn rate + months of runway per currency
·	Top 5 donors ranked by total funding with proportional bars
Activity Log (per grant):
·	Synthetic event timeline: grant created, budget lines added/revised, disbursements received, expenses tagged, reports generated/submitted
·	Currency-correct formatting (UGX 3,400,000 not UGX 34,000.00)
·	Expandable section per grant card
Onboarding Tour:
·	7-step workflow guide auto-shown on first visit
·	Stored in localStorage, re-openable via ? button
·	Deep-links into each step
CSV Import:
·	Bulk import donors from CSV (name, type, country, email, currency)
·	Bulk import grants from CSV (title, donor-name lookup, currency, amount, dates)
·	Per-row error reporting with row number and reason
Kiongozi NGO Intelligence:
·	Dedicated feature catalog entry with 7-step workflow description
·	Live data injection (active grants, received, overdue reports)
·	Agentic actions: create_ngo_donor, create_ngo_grant, record_ngo_disbursement
Database tables: donors, grants, grant_disbursements, grant_expenditures, grant_budget_lines, grant_reports, grant_milestones, grant_documents (8 tables, migrations 000094–000095)
API endpoints: 31 live endpoints under /ngo/*

5.21 Kiongozi AI Copilot
Kiongozi (Swahili: leader) is SBB's embedded AI copilot — not a generic chatbot, but a 25-agent AI workforce that operates with full context of the business's live financial data.
Architecture:
·	25+ specialised agent roles across: Executive & Control, Finance & Economic, Operations, Supply Chain, Customer & Growth, Data & Analytics, People, Intelligence Core, Autonomy & Action, Security & Governance, External Intelligence
·	Full business context in every conversation: live transactions, balances, alerts, invoices, alerts, grants, payroll
·	Persistent memory system per business (kiongozi_memory table) — remembers preferences, patterns, and past conversations
·	Feature catalog: 30+ registered features with purpose, workflow, and suggested prompts
Capabilities:
·	Answer any financial question using live data: "What is my cash position?", "Which customer owes the most?", "What is my profit margin this month?"
·	Proactive anomaly surfacing: "Also notable — Thursday sales are 40% below your weekly average"
·	Step-by-step workflow guidance for any SBB feature
·	Report narrative drafting: "Help me write the programme narrative for my Q2 USAID report"
·	Agentic mode — in confirmed execution mode, Kiongozi can create transactions, invoices, employees, customers, donors, grants, disbursements directly
·	WhatsApp briefing integration — 7am daily business summary delivered to WhatsApp
·	NGO intelligence: grant deadlines, fund utilisation, donor status
Feature catalog (30 registered entries):

Home, AI Brief, Ledger, Transactions, Balances, Alerts, Reports, Accounting, Tax, Assets, Adjustments, Collaboration, Settings, Forecast, AI Brief, Close, Reconciliation, Search, Ledger, Export, Recurring, HR, HR Inbox, HR Analytics, HR Access, Payroll, Bills, Aging, Locations, Products, POS, Invoices, Customers, Subscription, Budget, Credit, Suppliers, Purchase Orders, SUSU/ROSCA, Signals, NGO Mode

5.22 WhatsApp Integration
WhatsApp is the primary business communication channel across Africa. SBB integrates deeply.
WhatsApp capabilities:
·	Send invoices with payment link via WhatsApp (one-tap from invoice page)
·	Send customer statements via WhatsApp
·	Send payment reminders to overdue customers via WhatsApp
·	ROSCA group payment reminders via WhatsApp
·	Employee payslip delivery via WhatsApp
·	Kiongozi WhatsApp briefing — 7am daily summary on WhatsApp
·	WhatsApp chatbot — capture transactions via WhatsApp message to Kiongozi
·	External thread responses (suppliers or clients respond to SBB threads via WhatsApp)

5.23 Payment Infrastructure
Supported payment providers:
Provider	Coverage	Use cases
Paystack	Nigeria, Ghana, Kenya, South Africa	Invoice payment checkout, card + mobile money
Flutterwave	Pan-Africa (20+ countries)	Invoice payment checkout, multi-currency
M-Pesa (STK Push)	Kenya	Invoice payment, Lipa na M-Pesa online

SMS Money Parsers (auto-ingestion):
Parser	Operator	Market
M-Pesa KE	Safaricom	Kenya
MTN Mobile Money GH	MTN	Ghana
MTN Nigeria / OPay	MTN / OPay	Nigeria
Airtel Money	Airtel	Uganda, Kenya, Zambia, others

Infrastructure:
·	Webhook event processing for all providers
·	Idempotency keys prevent duplicate payment recording
·	Payment checkout sessions with state machine (pending → success/failed)
·	Public payment links (no account required for payers)
·	Configurable payment provider per business (not global)
·	Platform-level provider management with admin override

5.24 Support System
Help desk:
·	12 knowledge base categories with 56 seeded articles
·	Full-text article search
·	Helpful/not helpful voting per article (feedback loop)
·	Support ticket submission from any page
·	Ticket status tracking (open → in_progress → resolved → closed)
·	Internal ticket messaging between customer and support team
·	Platform admin support queue management
Knowledge base categories:

Getting Started, Invoicing & Billing, Expenses & Bills, Products & Inventory, Customers & CRM, Reports & Analytics, Payments & Collections, Savings Groups & Credit, Payroll & HR, Settings & Account, Troubleshooting, NGO Mode (12 categories)

6. Subscription Plans & Pricing
Plan overview
Plan	Monthly Price	Trial	Max Users	Businesses
Starter	Free	—	1	1
Basic	$7 / month	14 days	2	1
Growth	$29 / month	14 days	5	1
Pro	$54 / month	14 days	10	3
Business	$79 / month	14 days	25	Unlimited
Enterprise	Custom	—	Unlimited	Unlimited

Feature access by tier
Feature	Starter	Basic	Growth	Pro	Business	Enterprise
Transactions/month	50	Unlimited	Unlimited	Unlimited	Unlimited	Unlimited
Kiongozi AI tokens	0	2,000	5,000	10,000	20,000	99,000
Kiongozi agents	—	Review	25	25	25	25 + custom
Daily WhatsApp briefing	—	—	✅	✅	✅	✅
Payroll	—	—	✅	✅	✅	✅
Advanced exports	—	Export history	Scheduled	Scheduled	Scheduled	Full API
Collaboration	—	—	✅	✅	✅	✅
What-if simulations	—	—	—	✅	✅	✅
YoY analytics	—	—	—	✅	✅	✅
Multi-location	—	—	—	—	✅	✅
API access	—	—	—	—	Partial	Full
White-label	—	—	—	—	—	✅
NGO Mode	✅	✅	✅	✅	✅	✅

Add-ons
Add-on	Price	What it adds
Copilot Lite	$4 / month	+10,000 AI tokens/month
Copilot Pro	$7 / month	+25,000 AI tokens/month

Pricing notes
·	All plans billed monthly (annual billing coming)
·	NGO Mode is included in all plans at no extra cost
·	Trial plans are full-featured at the paid tier level
·	Enterprise pricing is negotiated based on seat count and feature requirements

7. Geographic Coverage & Localisation
Country coverage
·	Total countries: 199 (all countries where the platform is available)
·	African countries: 94 (all African nations and territories)
·	Primary markets: Uganda, Kenya, Nigeria, Ghana, Tanzania, Rwanda
Currency support
Every country's standard currency is supported. The platform stores all monetary amounts in minor units (integer) to prevent floating-point errors. Display formatting is currency-aware (UGX has 0 decimal places; USD has 2).
Localisation features
·	Country-specific tax rules — PAYE brackets, VAT rates, statutory deductions per country
·	eTIMS compliance — Kenya KRA and Nigeria FIRS electronic invoice compliance
·	Multi-currency — businesses can operate in multiple currencies; amounts never mixed across currency contexts
·	Timezone support — all dates and reports respect the business's configured timezone
·	Phone number formats — international format with country detection
Language
Currently English only. French and Swahili planned (deferred to dedicated localisation sprint).

8. Technical Architecture
Overview
SBB follows a four-layer architectural model:
┌─────────────────────────────────────────────────────┐
│  CLIENT LAYER                                        │
│  Next.js 16.2 web app (sbb.finance)                 │
│  Flutter mobile app (iOS + Android)                  │
└──────────────────────┬──────────────────────────────┘
                       │ HTTPS / REST
┌──────────────────────▼──────────────────────────────┐
│  API LAYER                                           │
│  FastAPI 0.115+ — 62 route groups, 43+ prefixes     │
│  JWT authentication, role-based access control       │
│  Idempotency keys on all write operations            │
└──────────────────────┬──────────────────────────────┘
                       │ SQLAlchemy ORM
┌──────────────────────▼──────────────────────────────┐
│  DATA LAYER                                          │
│  PostgreSQL — 136 tables, 98 migrations              │
│  Double-entry ledger (immutable event posting)       │
│  Alembic migration management                        │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│  INFRASTRUCTURE LAYER                                │
│  VPS: 147.93.72.240 (96GB disk, 100GB+ available)   │
│  Nginx reverse proxy (port 80/443 → 8200/3200)      │
│  systemd service management                          │
│  APScheduler for background jobs                     │
│  File storage: /var/www/sbb.finance/uploads/         │
└─────────────────────────────────────────────────────┘

Backend
Component	Technology	Version
API framework	FastAPI	0.115+
ORM	SQLAlchemy	2.0+
Database	PostgreSQL	15+
Migrations	Alembic	1.14+
Server	Uvicorn	0.32+
Scheduler	APScheduler	3.10+
HTTP client	httpx	0.28+
Currency conversion	currencyconverter	0.18+
Validation	Pydantic v2	2.x
Auth	JWT (HS256) + OTP	—

Frontend
Component	Technology	Version
Framework	Next.js	16.2.1
Runtime	React	19.2.4
Language	TypeScript	5.x
Styling	Tailwind CSS	4.x
Animations	Framer Motion	12.38+
Charts	Recharts	3.8+
Build	Turbopack	—
QR	@zxing	0.21+

Mobile
Component	Technology
Framework	Flutter (Dart)
SDK	≥3.3.0, <4.0.0
HTTP	http ^1.2.2
Internationalisation	intl ^0.20.2

Design patterns
Service-first architecture: All business logic lives in services/ — routes are thin wrappers that handle HTTP concerns only.
Double-entry ledger: Every confirmed financial transaction posts immutable ledger entries. The ledger is append-only; corrections are made via counter-entries, not edits.
Idempotency: All write operations accept idempotency keys, ensuring webhook retries and client retries never create duplicates.
Multi-tenancy: Full data isolation per business via business_id foreign keys on all business-owned tables. Cross-business queries require explicit permission.
Offline-first POS: POS shifts operate without network connectivity; sales are queued and synced on reconnection.

9. Data Model Overview
Scale
·	136 database tables across all business domains
·	98 Alembic migrations from initial schema (March 2026) through NGO Mode (May 2026)
Domain groupings
Domain	Key tables	Purpose
Identity	users, otp_requests, session_tokens, email_verification_requests	Auth and access
Business	businesses, business_memberships, business_invites, business_audit_events	Multi-tenancy
Subscriptions	subscription_packages, business_subscriptions, subscription_events	Billing and limits
Transactions	transactions, transaction_categories, transaction_activities, transaction_tasks	Core money movement
Ledger	ledger_accounts, ledger_entries, accounting_journals, accounting_journal_lines	Double-entry accounting
Invoicing	invoices, invoice_lines, invoice_templates, invoice_checkout_sessions, invoice_payments	Revenue
Payroll	payroll_runs, payroll_run_lines, payroll_employees, payroll_work_inputs	Payroll
HR	hr_departments, hr_job_roles, hr_leave_requests, hr_attendance_records, hr_shift_schedules, hr_performance_reviews	People ops
Products	products, product_categories, product_location_stocks, product_stock_movements	Inventory
Customers	customers, customer_credit_ledger, crm_contacts, crm_conversations	CRM
Suppliers	suppliers, supplier_bills, supplier_bill_payments	Payables
Purchase Orders	purchase_orders, purchase_order_lines	Procurement
ROSCA	rosca_groups, rosca_members, rosca_contributions, rosca_payouts	Savings groups
NGO	donors, grants, grant_disbursements, grant_expenditures, grant_budget_lines, grant_reports, grant_milestones, grant_documents	Impact finance
AI	ai_copilot_sessions, ai_copilot_messages, ai_feedback_events, kiongozi_memory	Kiongozi AI
Collaboration	module_threads, external_threads, collaboration_attachments	Team workflow
Platform Admin	platform_admins, platform_admin_sessions, platform_admin_audit_events	Operations
Content	support_categories, support_articles, support_tickets, landing_testimonials	Knowledge base


10. Infrastructure & Deployment
Production environment
Resource	Value
Provider	VPS (147.93.72.240)
OS	Ubuntu Linux (kernel 6.17)
Disk	96GB (35% used, 63GB available)
API Port	8200 (Uvicorn)
Web Port	3200 (Next.js)
Proxy	Nginx (443 → 8200/3200)
SSL	Let's Encrypt (auto-renew)
App path	/var/www/sbb.finance/app
Uploads	/var/www/sbb.finance/uploads/
Env	/var/www/sbb.finance/shared/backend.env

Service management
sbb-api.service    →  Uvicorn FastAPI (Python)
sbb-web.service    →  Next.js (Node.js)

Both managed via systemd. Auto-restart on failure (configured with restart counter).
Deploy procedure
# Atomic deploy script
/var/www/sbb.finance/scripts/deploy.sh

Steps: git pull → alembic upgrade head → npm run build → restart sbb-api → restart sbb-web
CI/CD
Currently manual deploy via SSH. GitHub Actions pipeline planned.

11. Security & Compliance
Authentication
·	Phone OTP — primary auth method; no password required
·	Email auth — secondary option for email-preferring users
·	JWT tokens — short-lived access tokens (HS256)
·	Session management — token rotation and invalidation
·	Email verification — required before full account access
Authorisation
·	Role-based access control per business:
o	Owner — full access
o	Admin — management-level access
o	Member — standard access
o	Employee — self-service access (own payslips, leave requests)
·	Module-level access grants for employee profiles
·	Platform admin — separate identity with separate session management
·	Permission gating on all write operations at route level
Data protection
·	All data stored per-business with business_id isolation
·	No cross-business data leakage by design
·	Passwords not used — eliminates password breach vector
·	OTP has expiry and single-use enforcement
·	Idempotency keys prevent replay attacks on payment operations
NGO Mode security
·	_require_ngo() gate on all 31 NGO endpoints — returns 403 for non-qualifying businesses
·	NGO Mode UI hidden from non-qualifying accounts at shell level (not merely CSS)
Financial data integrity
·	All monetary amounts stored as integers (minor units) — no floating-point
·	Double-entry ledger is append-only (no edits, only counter-entries)
·	Period locks prevent retroactive modification of closed periods
·	Transaction nullification creates audit trail, not deletion
·	Idempotency enforced on all payment operations

12. Integrations & APIs
Payment providers
Provider	Status	Markets	Capability
Paystack	✅ Live	NG, GH, KE, ZA	Card, Mobile Money, Bank
Flutterwave	✅ Live	Pan-Africa	Card, Mobile Money, Bank transfer
M-Pesa (STK Push)	✅ Live	KE	Mobile money push

SMS / Mobile Money parsers
Parser	Operator	Market	Status
M-Pesa KE	Safaricom	Kenya	✅ Live
MTN Ghana	MTN	Ghana	✅ Live
MTN Nigeria / OPay	MTN / OPay	Nigeria	✅ Live
Airtel Money	Airtel	Uganda, KE, Zambia	✅ Live
Orange Money	Orange	West Africa	❌ Planned
EcoCash	Econet	Zimbabwe	❌ Planned
Wave	Wave	Senegal, Côte d'Ivoire	❌ Planned

Tax compliance
Integration	Status	Coverage
eTIMS Kenya (KRA)	✅ Live	VAT invoice signing + QR
eTIMS Nigeria (FIRS)	✅ Live	Electronic invoice registration
NSSF Uganda	✅ Live	Statutory deduction computation
NHIF Kenya	✅ Live	Statutory deduction computation
NSSF Kenya	✅ Live	Statutory deduction computation
Housing Levy Kenya	✅ Live	Statutory deduction computation

Communication
Integration	Status	Capability
WhatsApp Cloud API	✅ Live	Invoice sharing, reminders, Kiongozi briefing
Email (Transactional)	✅ Live	Invoices, invitations, OTP, alerts

SBB API
·	REST API available under /api/*
·	API access: Enterprise plan required for full access; partial on Business plan
·	Authentication: Bearer token (JWT)
·	All 62 route groups are API-accessible to authenticated clients
·	Developer documentation: available to Enterprise partners

13. Mobile Application
Status
The Flutter mobile app is in active development. It covers the core day-to-day user journey.
What the mobile app covers
·	Phone OTP sign-in
·	Business setup flow
·	Dashboard with summary (money in, money out, net)
·	Balance list (all money locations)
·	Transaction feed
·	Pending review list
·	Review actions (confirm, correct, reject)
What it does not yet cover
Full parity with the web app (payroll, HR, reports, NGO Mode, ROSCA, invoicing, inventory) — these are planned in subsequent mobile releases.
Build status
·	Flutter SDK ≥3.3.0
·	flutter analyze passes
·	APK build blocked by Android NDK requirement (Gradle: NDK 28.2.13676358 download required)
·	Deployment to app stores: Not yet released

14. Platform Administration
The platform admin panel (/platform-admin) is a separate-identity, operator-only interface for the SBB team.
Admin capabilities
Section	Purpose
Overview	Platform health: active businesses, users, recent transactions, payment webhooks
Users	User lookup, account status, access management
Businesses	Workspace portfolio, business details, plan assignment
Subscriptions	Package management, billing events, active subscription details
CRM	Admin contact management and campaign tooling
Performance	Platform activity KPIs and usage metrics
Audit	Admin action history with full audit trail
Payments	Provider configuration, session review, webhook events
API Configuration	Paystack, Flutterwave, M-Pesa, eTIMS key management
System Users	Platform admin team members and role assignments
Support	Help desk queue, ticket management, knowledge base management
Announcements	Broadcast messages to all or specific users
Testimonials	Landing page testimonial management (36 seeded, active/hidden toggle)
Feature Flags	Platform configuration — enable/disable features per plan
Legal Documents	Privacy policy, Terms of Service, Security policy, Cookies
Security	Admin credential management and access controls


15. Competitive Position
Key competitors
Competitor	Strength	Weakness vs SBB
Kippa	Ultra-simple	No accounting, no payroll, AI, tax, payroll
OZe	SME-focused	Pivoting to lending, limited features
QuickBooks	Brand recognition	$35–235/month, not Africa-native, no SMS, no mobile money
Sage Africa	Enterprise features	Expensive, complex, accountant-required
Zoho Books	Growing Africa presence	Not mobile-money native, no offline, limited SMS
Wave	Free accounting	No payroll, no inventory, no Africa payment rails

SBB's moats
1.	SMS auto-ingestion — M-Pesa, MTN, Airtel parsers turning raw SMS into transactions. No competitor matches this.
2.	Kiongozi AI — 25-agent workforce with full live business context. ChatGPT doesn't know what your balance is.
3.	NGO Mode — Complete impact-finance platform. No African competitor has this.
4.	ROSCA/Susu — Enterprise-grade savings group management. Category-defining.
5.	eTIMS compliance — Kenya KRA and Nigeria FIRS built in. Regulatory moat.
6.	Payroll localisation — Country-specific statutory deductions for UG, KE, NG, GH built in.
7.	Offline POS — Sells when there's no internet. Critical for field operations.
8.	Multi-business — Run a hardware store and a Chama from one login.
9.	One platform, full stack — Replacing 6+ software products at 1/10th the combined cost.
Pricing advantage
At $7–29/month, SBB is 5–10x cheaper than QuickBooks or Sage while delivering equivalent or superior feature depth for African business contexts.

16. Strategic Roadmap
Current state (May 2026)
·	Platform live and in production
·	Core stack complete: transactions, invoices, payroll, HR, inventory, POS, ROSCA, CRM, reports, reconciliation, tax, NGO Mode
·	Kiongozi AI with 25 agents and memory system
·	12 African + 105 global countries on platform
·	6 subscription tiers operational
Near-term priorities (Next 90 days)
Priority	Feature	Impact
🔴 Critical	Dashboard intelligence (days of cash runway, top 3 tasks)	Daily retention
🔴 Critical	Tax computation engine (real-time liability estimation)	Compliance revenue
🔴 Critical	PDF management accounts export	Enterprise readiness
🟡 High	French + Swahili localisation	Francophone Africa expansion
🟡 High	Additional SMS parsers (Orange Money, EcoCash, Wave)	West + Southern Africa
🟡 High	Mobile app parity (invoicing, payroll, inventory)	Mobile-first users
🟡 High	Donor portal (shareable NGO report links)	NGO stickiness
🟢 Medium	Grant application tracker	NGO pipeline management
🟢 Medium	Consolidated NGO financial statements	IFRS compliance
🟢 Medium	Annual billing	Cash flow improvement

Long-term vision (12–24 months)
·	100,000+ businesses on platform
·	Native mobile apps (iOS + Android) with full parity
·	WhatsApp-first entry point (sign up and transact entirely in WhatsApp)
·	Embedded lending (credit decisioning from business financial data)
·	Cross-business intelligence (aggregate insights while maintaining privacy)
·	IFRS/IPSAS compliance mode for institutional clients
·	Pan-Africa expansion with country-specific compliance for all 54 nations

17. Key Metrics & Statistics
Platform scale
Metric	Value
API route groups	62
API prefixes	43+
Database tables	136
Alembic migrations	98
Next.js application pages	68
Support articles	56
Support categories	12
Testimonials seeded	36 (covering 17 modules)
Countries supported	199 (94 African)
Business types	40 across 6 categories

NGO Mode
Metric	Value
API endpoints	31
Database tables	8
Report templates	4 (Standard, USAID, EU DEVCO, Foundation)
Eligible org types	7
Support articles	6

Tech stack summary
Layer	Technology	Version
Backend	FastAPI + Python	0.115+
Database	PostgreSQL	15+
Frontend	Next.js + React	16.2.1 / 19.2.4
Mobile	Flutter	≥3.3.0
Animation	Framer Motion	12.38+
Charts	Recharts	3.8+
Language (FE)	TypeScript	5.x
Styling	Tailwind CSS	4.x

Subscription plans
Plans	Tiers	Add-ons
6 subscription tiers	Free → Enterprise	2 (Copilot Lite $4/mo, Copilot Pro $7/mo)


18. Contact & Support
Support channels
Channel	Details
Knowledge base	sbb.finance/support — 56 articles across 12 categories
In-app support	Submit a ticket from any page (? button)
Email	support@sbb.finance
WhatsApp	Available via in-app WhatsApp button
Kiongozi	Ask Kiongozi in-app — "How do I generate a donor report?"

Response times
·	Basic/Growth plan: Next business day
·	Pro/Business plan: Same business day
·	Enterprise: Priority 4-hour response
Platform status
·	Live at: https://sbb.finance
·	Platform admin: https://sbb.finance/platform-admin
Company
Sisi Labs

Building Africa's business infrastructure.

Document maintained by the SBB engineering and product team. Last updated May 2026. For corrections or additions, update this file and commit.
