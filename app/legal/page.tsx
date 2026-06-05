"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Printer, Link2, ChevronRight, ArrowLeft, Check } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Section = { id: string; title: string };
type Document = {
  id: string;
  label: string;
  effectiveDate: string;
  lastReviewed: string;
  sections: Section[];
  content: React.ReactNode;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Clause({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-32 mb-12 print:mb-8">
      <h2 className="font-display font-semibold text-softwhite text-xl mb-5 print:text-gray-900 print:text-lg flex items-start gap-3">
        <span className="text-emerald-deep/60 font-mono text-sm mt-1 flex-shrink-0 print:text-gray-400">§</span>
        {title}
      </h2>
      <div className="space-y-4 text-platinum/65 text-sm leading-relaxed print:text-gray-700 print:text-sm">
        {children}
      </div>
    </div>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return <p className="text-platinum/65 print:text-gray-700">{children}</p>;
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pl-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-platinum/60 print:text-gray-700">
          <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-deep flex-shrink-0 print:bg-gray-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h3 className="font-display font-medium text-softwhite/90 text-sm mb-3 tracking-wide print:text-gray-800">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Table({ rows }: { rows: [string, string][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <tbody>
          {rows.map(([label, value], i) => (
            <tr key={i} className="border-b border-white/5 print:border-gray-200">
              <td className="py-3 pr-6 font-display text-platinum/50 uppercase tracking-wider w-1/3 print:text-gray-500">
                {label}
              </td>
              <td className="py-3 text-platinum/70 print:text-gray-700">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Legal Content ────────────────────────────────────────────────────────────

const privacySections: Section[] = [
  { id: "overview", title: "Overview" },
  { id: "controller", title: "Data Controller" },
  { id: "collection", title: "Data We Collect" },
  { id: "purpose", title: "Purposes & Legal Basis" },
  { id: "sharing", title: "Data Sharing" },
  { id: "retention", title: "Retention" },
  { id: "security", title: "Security" },
  { id: "rights", title: "Your Rights" },
  { id: "international", title: "International Transfers" },
  { id: "children", title: "Children" },
  { id: "changes", title: "Policy Changes" },
  { id: "contact", title: "Contact Us" },
];

const PrivacyContent = () => (
  <>
    <Clause id="overview" title="Overview">
      <Para>
          ECADEL GROUP LIMITED (&ldquo;ECADEL GROUP&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting
          the privacy and security of personal data entrusted to us in the course of our operations.
          This Privacy Policy explains how we collect, process, store, share, and protect personal
          information across our platforms, including SafeRoad and PROSEQ, as well as our corporate
          website and any associated services.
        </Para>
      <Para>
        This Policy is issued in compliance with the <strong className="text-softwhite/80 print:text-gray-900">Uganda Data Protection and Privacy Act, 2019
        (PDPA)</strong> and applicable international data protection standards. By accessing or using our
        services, you acknowledge that you have read and understood this Policy.
      </Para>
    </Clause>

    <Clause id="controller" title="Data Controller">
      <Para>The data controller responsible for your personal information is:</Para>
      <Table rows={[
        ["Legal Name", "ECADEL GROUP LIMITED"],
        ["Registration", "Registered in Uganda"],
        ["Headquarters", "Kampala, Uganda"],
        ["Email", "privacy@ecadelgroup.com"],
        ["General Contact", "ecadelgroup@ecadelgroup.com"],
      ]} />
      <Para>
        For enterprise deployments, ECADEL GROUP LIMITED may act as a data processor on behalf of a
        government agency, enterprise, or institutional partner who is the data controller. In such
        cases, data processing is governed by a separate Data Processing Agreement.
      </Para>
    </Clause>

    <Clause id="collection" title="Data We Collect">
      <Sub title="1. Data You Provide Directly">
        <List items={[
          "Identity data: full name, national identification number (where required by regulation)",
          "Contact data: email address, telephone number, postal address",
          "Account credentials: username, hashed password",
          "Professional information: organisation name, job title, industry",
          "Inquiry data: content of messages submitted through our contact or partnership forms",
        ]} />
      </Sub>
      <Sub title="2. Data Collected Automatically (SafeRoad Platform)">
        <List items={[
          "Real-time GPS location and route data during active vehicle sessions",
          "Accelerometer and gyroscope sensor data for driving behaviour analysis",
          "Speed, braking, cornering, and acceleration event data",
          "Vehicle identification, registration, and fleet metadata",
          "SOS activation events, timestamps, and location at time of activation",
          "Device identifiers (IMEI, device model, OS version)",
          "Session start and end times, trip duration, and distance",
        ]} />
      </Sub>
      <Sub title="3. Data Collected Automatically (PROSEQ Platform)">
        <List items={[
          "Institutional query data and scenario parameters submitted for analysis",
          "Interaction logs, session identifiers, and API access records",
          "Uploaded datasets and documents (subject to enterprise DPA)",
          "Dashboard usage patterns and feature access logs",
        ]} />
      </Sub>
      <Sub title="4. Technical & Device Data (Website & Platforms)">
        <List items={[
          "IP address and approximate geolocation derived from IP",
          "Browser type, version, and operating system",
          "Referring URLs, pages viewed, and time on site",
          "Cookie identifiers (see our Cookie Policy)",
        ]} />
      </Sub>
    </Clause>

    <Clause id="purpose" title="Purposes & Legal Basis for Processing">
      <Para>
        We process personal data only where we have a lawful basis to do so. The following table
        sets out our primary processing activities and their legal basis under the Uganda PDPA and
        applicable standards:
      </Para>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/10 print:border-gray-300">
              <th className="py-3 pr-4 text-left font-display text-platinum/40 uppercase tracking-wider print:text-gray-500">Purpose</th>
              <th className="py-3 pr-4 text-left font-display text-platinum/40 uppercase tracking-wider print:text-gray-500">Legal Basis</th>
            </tr>
          </thead>
          <tbody className="space-y-1">
            {[
              ["Provision of SafeRoad safety and fleet intelligence services", "Performance of contract"],
              ["Provision of PROSEQ consequence intelligence analytics", "Performance of contract"],
              ["AI-powered driver safety scoring and incident detection", "Legitimate interests / Contractual necessity"],
              ["Government dashboard reporting and regulatory compliance", "Legal obligation / Public interest"],
              ["SOS emergency response and dispatch coordination", "Vital interests of data subject"],
              ["Insurance partner API data provision (anonymised)", "Legitimate interests / Contractual necessity"],
              ["Account management and customer support", "Performance of contract"],
              ["Platform security, fraud detection, and abuse prevention", "Legitimate interests"],
              ["Analytics to improve service performance", "Legitimate interests"],
              ["Marketing communications (with opt-in)", "Consent"],
              ["Compliance with legal obligations and court orders", "Legal obligation"],
            ].map(([purpose, basis], i) => (
              <tr key={i} className="border-b border-white/5 print:border-gray-100">
                <td className="py-3 pr-4 text-platinum/65 print:text-gray-700">{purpose}</td>
                <td className="py-3 text-emerald-deep/80 font-display text-[11px] print:text-gray-600">{basis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Clause>

    <Clause id="sharing" title="Data Sharing & Disclosure">
      <Para>
        We do not sell personal data. We share personal data only in the following circumstances,
        and only to the minimum extent necessary:
      </Para>
      <Sub title="Authorised Partners & Integrations">
        <List items={[
          "Government road safety agencies and transport ministries: aggregated, de-identified fleet and incident data pursuant to public safety mandates",
          "Insurance company partners: anonymised or pseudonymised driving score data via secure API, subject to data sharing agreements",
          "Emergency response services: location data provided in real time only during active SOS events, for the sole purpose of coordinating emergency assistance",
          "Smart city initiatives and infrastructure agencies: aggregated, non-personal analytics datasets",
        ]} />
      </Sub>
      <Sub title="Service Providers (Data Processors)">
        <List items={[
          "Cloud infrastructure providers for secure data hosting and processing",
          "Telecommunications partners for SMS and push notification delivery",
          "Mapping and geospatial data providers for route visualisation",
          "Analytics and monitoring tooling providers",
        ]} />
        <Para>All service providers are bound by data processing agreements and may not use your data for their own purposes.</Para>
      </Sub>
      <Sub title="Legal Requirements">
        <Para>
          We may disclose personal data to law enforcement, regulatory authorities, or courts where
          required by law, or where necessary to protect the vital interests of individuals or the
          security of our systems. We will, where legally permissible, notify affected individuals
          of such disclosures.
        </Para>
      </Sub>
    </Clause>

    <Clause id="retention" title="Data Retention">
      <Para>
        We retain personal data for no longer than is necessary for the purposes for which it was
        collected, taking into account legal, regulatory, operational, and reporting requirements.
      </Para>
      <Table rows={[
        ["Active account data", "For the duration of the account or contractual relationship"],
        ["Trip and telemetry data (SafeRoad)", "24 months from date of capture, then anonymised or deleted"],
        ["Safety incident and SOS records", "7 years (regulatory and insurance requirements)"],
        ["Government dashboard reports", "As specified in the applicable government contract"],
        ["PROSEQ scenario and query data", "Per enterprise DPA; default 12 months"],
        ["Contact and inquiry data", "3 years from last interaction"],
        ["Website analytics data", "13 months on a rolling basis"],
        ["Financial and billing records", "7 years (statutory accounting obligations)"],
        ["Legal hold data", "Until resolution of the applicable matter"],
      ]} />
    </Clause>

    <Clause id="security" title="Data Security">
      <Para>
        ECADEL GROUP LIMITED implements appropriate technical and organisational measures to protect
        personal data against unauthorized access, accidental loss, destruction, or damage.
        Our security programme includes:
      </Para>
      <List items={[
        "Encryption of data in transit using TLS 1.2 or higher across all API and web endpoints",
        "Encryption of sensitive data fields at rest using AES-256",
        "Role-based access controls with the principle of least privilege enforced throughout",
        "Multi-factor authentication required for all administrative and platform access",
        "Regular penetration testing and vulnerability assessments by qualified security practitioners",
        "Dedicated incident response procedures with defined notification timelines",
        "Data minimisation and pseudonymisation practices where technically feasible",
        "Vendor security assessments for all data sub-processors",
      ]} />
      <Para>
        In the event of a personal data breach that is likely to result in a risk to the rights
        and freedoms of individuals, we will notify the relevant supervisory authority within
        72 hours of becoming aware of the breach, and affected individuals without undue delay.
      </Para>
    </Clause>

    <Clause id="rights" title="Your Data Protection Rights">
      <Para>
        Subject to applicable law and certain limited exceptions, you have the following rights
        in relation to your personal data under the Uganda Data Protection and Privacy Act, 2019:
      </Para>
      <List items={[
        "Right of access — to receive a copy of the personal data we hold about you",
        "Right to rectification — to request correction of inaccurate or incomplete data",
        "Right to erasure — to request deletion of your data where no overriding legal basis exists",
        "Right to restriction of processing — to request that we limit how we use your data",
        "Right to data portability — to receive your data in a structured, machine-readable format",
        "Right to object — to object to processing based on legitimate interests or for direct marketing",
        "Right to withdraw consent — where processing is based on consent, to withdraw it at any time without affecting prior processing",
        "Right to lodge a complaint — with the Personal Data Protection Office of Uganda or your applicable supervisory authority",
      ]} />
      <Para>
        To exercise any of these rights, contact us at{" "}
        <span className="text-emerald-deep print:text-gray-800">privacy@ecadelgroup.com</span>.
        We will respond within 30 days. We may require verification of your identity before
        fulfilling a request.
      </Para>
    </Clause>

    <Clause id="international" title="International Data Transfers">
      <Para>
        Where personal data is transferred outside Uganda, we ensure appropriate safeguards are
        in place, including contractual clauses approved by the relevant data protection authority,
        or transfers to jurisdictions deemed to provide an adequate level of protection.
        We do not transfer personal data to jurisdictions that do not provide adequate protections
        without explicit data subject consent or a compelling legal basis.
      </Para>
    </Clause>

    <Clause id="children" title="Children&apos;s Privacy">
      <Para>
        Our platforms and services are directed at businesses, institutions, and adult individuals.
        We do not knowingly collect or process personal data from children under the age of 18
        without verifiable parental or guardian consent. If you believe we have inadvertently
        collected data relating to a child, please contact us immediately at{" "}
        <span className="text-emerald-deep print:text-gray-800">privacy@ecadelgroup.com</span>.
      </Para>
    </Clause>

    <Clause id="changes" title="Changes to This Policy">
      <Para>
        We may update this Privacy Policy from time to time to reflect changes in our practices,
        technology, legal requirements, or other factors. When we make material changes, we will
        provide notice via email to registered account holders, in-platform notification, or a
        prominent notice on our website, at least 14 days prior to the change taking effect.
        Continued use of our services after that date constitutes acceptance of the revised Policy.
      </Para>
    </Clause>

    <Clause id="contact" title="Contact Us">
      <Para>For all privacy-related queries, requests, or concerns, contact our Privacy Officer:</Para>
      <Table rows={[
        ["Privacy Officer", "ECADEL GROUP LIMITED — Privacy Office"],
        ["Email", "privacy@ecadelgroup.com"],
        ["General", "ecadelgroup@ecadelgroup.com"],
        ["Address", "Kampala, Uganda"],
      ]} />
    </Clause>
  </>
);

// ─── Terms of Service ─────────────────────────────────────────────────────────

const termsSections: Section[] = [
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "services", title: "Description of Services" },
  { id: "accounts", title: "Accounts & Access" },
  { id: "obligations", title: "User Obligations" },
  { id: "ip", title: "Intellectual Property" },
  { id: "prohibited", title: "Prohibited Conduct" },
  { id: "data", title: "Data & Privacy" },
  { id: "uptime", title: "Availability & SLAs" },
  { id: "fees", title: "Fees & Payment" },
  { id: "disclaimers", title: "Disclaimers" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "indemnity", title: "Indemnification" },
  { id: "termination", title: "Termination" },
  { id: "governing", title: "Governing Law" },
  { id: "disputes", title: "Dispute Resolution" },
  { id: "general", title: "General Provisions" },
];

const TermsContent = () => (
  <>
    <Clause id="acceptance" title="Acceptance of Terms">
      <Para>
        These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between
        you (&ldquo;User&rdquo;, &ldquo;you&rdquo;, or &ldquo;your&rdquo;) and ECADEL GROUP LIMITED, a company registered in Uganda
        (&ldquo;ECADEL GROUP LIMITED&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
      </Para>
      <Para>
        By accessing our website, registering an account, or using any ECADEL GROUP LIMITED platform
        or service — including SafeRoad, PROSEQ, and any associated APIs or dashboard products —
        you confirm that you have read, understood, and agree to be bound by these Terms, our
        Privacy Policy, and any additional terms applicable to specific services.
      </Para>
      <Para>
        If you are accepting these Terms on behalf of a legal entity (such as a company, government
        agency, or non-governmental organisation), you represent and warrant that you have authority
        to bind that entity. In such a case, &ldquo;you&rdquo; refers to that entity.
      </Para>
      <Para>
        If you do not agree to these Terms, you must immediately cease using our services.
      </Para>
    </Clause>

    <Clause id="services" title="Description of Services">
      <Para>
        ECADEL GROUP LIMITED provides intelligence infrastructure platforms and related services,
        including but not limited to:
      </Para>
      <List items={[
        "SafeRoad — a national road safety intelligence platform providing real-time fleet monitoring, AI driver scoring, SOS emergency response, road hazard intelligence, and government-grade safety dashboards",
        "PROSEQ — a consequence intelligence platform providing systemic foresight analysis, predictive consequence modelling, scenario simulation, and institutional decision support",
        "Data APIs — programmatic access to platform data for integration with third-party systems including insurance platforms, government portals, and enterprise tools",
        "Consulting and implementation services — advisory, integration, and deployment support for enterprise and government clients",
        "The ECADEL GROUP LIMITED corporate website and associated informational resources",
      ]} />
      <Para>
        Services are subject to change. We may introduce new features, modify existing
        functionality, or discontinue services with reasonable notice to active subscribers.
      </Para>
      <Para>
        Certain services require account registration. You agree to provide accurate, current,
        and complete information during registration and to keep your account information updated.
        You are responsible for maintaining the confidentiality of your credentials.
      </Para>
      <Sub title="Enterprise Accounts">
        <Para>
          Enterprise, government, and institutional accounts are subject to a separate Master
          Services Agreement or Government Services Agreement, the terms of which supplement and,
          in the event of conflict, supersede these Terms.
        </Para>
      </Sub>
      <Sub title="Account Security">
        <Para>
          You are solely responsible for all activity occurring under your account. You must
          notify us immediately at{" "}
          <span className="text-emerald-deep print:text-gray-800">ecadelgroup@ecadelgroup.com</span>{" "}
          if you become aware of any unauthorised access or security breach. We are not liable
          for losses arising from your failure to maintain account security.
        </Para>
      </Sub>
    </Clause>

    <Clause id="obligations" title="User Obligations">
      <Para>In using our services, you agree to:</Para>
      <List items={[
        "Comply with all applicable laws and regulations, including the Uganda Data Protection and Privacy Act 2019, the Computer Misuse Act 2011, and any sector-specific regulations applicable to your industry",
        "Use our services only for lawful purposes and in accordance with these Terms",
        "Ensure that any data you submit or upload does not infringe the rights of third parties, including intellectual property rights and privacy rights",
        "Implement appropriate access controls within your organisation to prevent unauthorised access to your account",
        "Promptly notify ECADEL GROUP LIMITED of any suspected vulnerability, breach, or misuse you become aware of in connection with our platforms",
        "Maintain records and audit trails as required by applicable law in connection with your use of our services",
      ]} />
    </Clause>

    <Clause id="ip" title="Intellectual Property">
      <Sub title="ECADEL GROUP LIMITED Property">
        <Para>
          All intellectual property rights in our platforms, services, algorithms, models,
          user interfaces, documentation, branding, and content — including SafeRoad, PROSEQ,
          and all underlying technology — are the exclusive property of ECADEL GROUP LIMITED or
          our licensors. Nothing in these Terms transfers ownership of any intellectual property
          to you.
        </Para>
      </Sub>
      <Sub title="Licence to You">
        <Para>
          Subject to these Terms and payment of applicable fees, we grant you a limited,
          non-exclusive, non-transferable, revocable licence to access and use the services
          for your internal business purposes during the term of your subscription.
        </Para>
      </Sub>
      <Sub title="Your Content">
        <Para>
          You retain ownership of data and content you submit to our platforms (&ldquo;Your Content&rdquo;).
          You grant us a limited licence to process Your Content solely as necessary to provide
          the services. We do not claim ownership of Your Content.
        </Para>
      </Sub>
      <Sub title="Feedback">
        <Para>
          If you provide feedback, suggestions, or ideas regarding our services, you grant us
          a perpetual, royalty-free licence to use that feedback without restriction or compensation.
        </Para>
      </Sub>
    </Clause>

    <Clause id="prohibited" title="Prohibited Conduct">
      <Para>You must not:</Para>
      <List items={[
        "Reverse engineer, decompile, disassemble, or attempt to derive the source code of any ECADEL GROUP LIMITED platform or algorithm",
        "Copy, reproduce, or create derivative works of our platforms or documentation without prior written consent",
        "Use our services to transmit malware, conduct denial-of-service attacks, or compromise the integrity of our systems or those of third parties",
        "Circumvent or attempt to bypass any authentication, access control, rate limiting, or security feature of our platforms",
        "Scrape, harvest, or systematically extract data from our platforms without written authorisation",
        "Use our services to conduct surveillance, monitoring, or intelligence activities against any individual without their lawful consent",
        "Represent that you are affiliated with or acting on behalf of ECADEL GROUP LIMITED without express written authorisation",
        "Use the services for any purpose that is unlawful, harmful, fraudulent, or violates the rights of any person or entity",
        "Sublicense, resell, or otherwise commercialise access to our platforms or APIs without a signed reseller or distribution agreement",
      ]} />
    </Clause>

    <Clause id="data" title="Data & Privacy">
      <Para>
        Your use of our services is also governed by our Privacy Policy, which is incorporated
        into these Terms by reference. For enterprise or government clients, data processing
        terms are set out in our Data Processing Agreement. In the event of a conflict between
        these Terms and the DPA, the DPA shall prevail with respect to data processing matters.
      </Para>
    </Clause>

    <Clause id="uptime" title="Service Availability & SLAs">
      <Para>
        We target high availability for our platforms. Specific service level commitments,
        including uptime guarantees, scheduled maintenance windows, and incident response
        obligations, are set out in the applicable Service Level Agreement (&ldquo;SLA&rdquo;)
        accompanying enterprise and government contracts.
      </Para>
      <Para>
        For standard accounts, services are provided on a best-effort basis. We do not warrant
        uninterrupted or error-free access. We reserve the right to conduct scheduled maintenance
        with reasonable advance notice.
      </Para>
    </Clause>

    <Clause id="fees" title="Fees & Payment">
      <Para>
        Fees for our services are specified in your order form, proposal, or subscription
        agreement. Unless otherwise stated:
      </Para>
      <List items={[
        "All fees are quoted in the currency specified in your agreement and are exclusive of applicable taxes",
        "Payment is due within 30 days of invoice date unless otherwise agreed in writing",
        "Late payments may accrue interest at the rate of 1.5% per month or the maximum permitted by law, whichever is lower",
        "We reserve the right to suspend access to services for accounts with outstanding payments overdue by more than 15 days, following written notice",
        "Subscription fees are non-refundable except as expressly provided in your agreement or as required by applicable law",
      ]} />
    </Clause>

    <Clause id="disclaimers" title="Disclaimers">
      <Para>
        To the fullest extent permitted by applicable law, our services are provided &ldquo;as is&rdquo;
        and &ldquo;as available&rdquo; without warranties of any kind, whether express, implied, or statutory.
        We specifically disclaim all implied warranties of merchantability, fitness for a
        particular purpose, and non-infringement.
      </Para>
      <Para>
        ECADEL GROUP LIMITED does not warrant that: (a) our services will meet your specific requirements;
        (b) our services will be uninterrupted, timely, secure, or error-free; (c) results obtained
        from use of the services will be accurate or reliable; or (d) any errors in the services
        will be corrected.
      </Para>
      <Para>
        AI-generated insights, safety scores, consequence analyses, and predictive outputs from
        our platforms are provided for informational and decision-support purposes only. They do
        not constitute professional legal, medical, financial, or governmental advice and must
        not be relied upon as the sole basis for consequential decisions.
      </Para>
    </Clause>

    <Clause id="liability" title="Limitation of Liability">
      <Para>
        To the maximum extent permitted by applicable law, ECADEL GROUP LIMITED and its directors,
        officers, employees, agents, and licensors shall not be liable for:
      </Para>
      <List items={[
        "Indirect, incidental, special, consequential, or punitive damages",
        "Loss of profits, revenue, data, business, or goodwill",
        "Damages resulting from unauthorised access to or alteration of your data or transmissions",
        "Damages resulting from reliance on AI-generated outputs for decisions outside the scope of the service",
        "Damages arising from third-party conduct or third-party services integrated with our platforms",
      ]} />
      <Para>
        Our aggregate liability to you for any claims arising under or related to these Terms
        shall not exceed the greater of: (a) the total fees paid by you in the 12 months
        preceding the event giving rise to the claim; or (b) USD 500.
      </Para>
      <Para>
        Some jurisdictions do not allow the exclusion or limitation of liability for
        consequential or incidental damages. In such jurisdictions, our liability is limited
        to the greatest extent permitted by law.
      </Para>
    </Clause>

    <Clause id="indemnity" title="Indemnification">
      <Para>
        You agree to indemnify, defend, and hold harmless ECADEL GROUP LIMITED and its officers,
        directors, employees, and agents from and against any claims, liabilities, damages,
        losses, and expenses (including reasonable legal fees) arising out of or relating to:
        (a) your breach of these Terms; (b) your use of our services in violation of applicable
        law; (c) Your Content; or (d) your infringement of any third-party rights.
      </Para>
    </Clause>

    <Clause id="termination" title="Termination">
      <Sub title="By You">
        <Para>
          You may terminate your account at any time by providing written notice to
            ecadelgroup@ecadelgroup.com. Termination does not entitle you to a refund of
          prepaid fees except as expressly agreed.
        </Para>
      </Sub>
      <Sub title="By ECADEL GROUP LIMITED">
        <Para>
          We may suspend or terminate your access immediately, without liability to you, if:
          (a) you materially breach these Terms and fail to remedy the breach within 7 days
          of written notice; (b) you engage in conduct that poses a security risk to our
          systems or other users; (c) required by applicable law or regulation; or (d) we
          determine that continued provision of services is commercially or legally untenable.
        </Para>
      </Sub>
      <Sub title="Effect of Termination">
        <Para>
          Upon termination, your right to use our services ceases immediately. We will retain
          your data for the period specified in our Privacy Policy and the applicable DPA,
          after which it will be deleted or anonymised. Provisions that by their nature should
          survive termination shall do so, including intellectual property, disclaimers,
          limitation of liability, and governing law.
        </Para>
      </Sub>
    </Clause>

    <Clause id="governing" title="Governing Law">
      <Para>
        These Terms shall be governed by and construed in accordance with the laws of the
        Republic of Uganda, without regard to its conflict of law principles. The United Nations
        Convention on Contracts for the International Sale of Goods (CISG) does not apply.
      </Para>
    </Clause>

    <Clause id="disputes" title="Dispute Resolution">
      <Para>
        In the event of any dispute, controversy, or claim arising out of or relating to these
        Terms or the breach, termination, or validity thereof, the parties shall first attempt
        to resolve the matter through good-faith negotiation for a period of 30 days following
        written notice of the dispute.
      </Para>
      <Para>
        If the dispute is not resolved through negotiation, it shall be referred to and finally
        resolved by arbitration conducted in Kampala, Uganda, under the rules of the Centre
        for Arbitration and Dispute Resolution (CADER), or such other mutually agreed
        arbitration body. The language of arbitration shall be English. The arbitral award
        shall be final and binding.
      </Para>
      <Para>
        Notwithstanding the foregoing, either party may seek urgent injunctive or other
        equitable relief from a court of competent jurisdiction to prevent irreparable harm.
      </Para>
    </Clause>

    <Clause id="general" title="General Provisions">
      <List items={[
        "Entire Agreement — These Terms, together with the Privacy Policy and any executed order forms or agreements, constitute the entire agreement between the parties regarding their subject matter",
        "Amendments — We may update these Terms at any time. Material changes will be communicated 14 days in advance. Continued use after that date constitutes acceptance",
        "Waiver — No waiver of any provision shall be effective unless in writing. Failure to enforce a right does not constitute waiver of that right",
        "Severability — If any provision is found unenforceable, the remaining provisions continue in full force and effect",
        "Assignment — You may not assign your rights or obligations under these Terms without our prior written consent. We may assign freely in connection with a merger, acquisition, or sale of assets",
        "Force Majeure — Neither party shall be liable for delays or failures in performance caused by events beyond their reasonable control",
        "Notices — Formal notices shall be in writing and delivered by email to the addresses specified in the applicable agreement or to ecadelgroup@ecadelgroup.com",
      ]} />
    </Clause>
  </>
);

// ─── Cookie Policy ────────────────────────────────────────────────────────────

const cookieSections: Section[] = [
  { id: "what", title: "What Are Cookies" },
  { id: "types", title: "Types We Use" },
  { id: "third-party", title: "Third-Party Cookies" },
  { id: "control", title: "Your Controls" },
  { id: "updates", title: "Policy Updates" },
];

const CookieContent = () => (
  <>
    <Clause id="what" title="What Are Cookies">
      <Para>
        Cookies are small text files that are placed on your device when you visit a website.
        They are widely used to make websites function properly, operate efficiently, and to
        provide reporting information. Cookies set by us are called &ldquo;first-party cookies&rdquo;.
        Cookies set by parties other than us are called &ldquo;third-party cookies&rdquo;.
      </Para>
      <Para>
        Our website uses cookies and similar tracking technologies (including local storage and
        session storage) to provide a functional, secure, and high-quality experience.
        We do not use cookies to build advertising profiles or to sell your data to any party.
      </Para>
    </Clause>

    <Clause id="types" title="Types of Cookies We Use">
      <Sub title="Strictly Necessary Cookies">
        <Para>
          These cookies are essential for the website to function and cannot be switched off.
          They are set in response to actions you take such as setting privacy preferences,
          logging in, or completing forms. These cookies do not store any personally identifiable
          information beyond what is operationally necessary.
        </Para>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 print:border-gray-300">
                {["Cookie Name", "Purpose", "Duration"].map(h => (
                  <th key={h} className="py-2 pr-4 text-left font-display text-platinum/40 uppercase tracking-wider print:text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["__session", "Maintains authenticated user session state", "Session"],
                ["csrf_token", "Protects against cross-site request forgery attacks", "Session"],
                ["cookie_consent", "Records your cookie preference choices", "12 months"],
              ].map(([name, purpose, duration], i) => (
                <tr key={i} className="border-b border-white/5 print:border-gray-100">
                  <td className="py-2 pr-4 font-mono text-emerald-deep/70 print:text-gray-600">{name}</td>
                  <td className="py-2 pr-4 text-platinum/60 print:text-gray-700">{purpose}</td>
                  <td className="py-2 text-platinum/50 print:text-gray-600">{duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Sub>
      <Sub title="Performance & Analytics Cookies">
        <Para>
          These cookies collect information about how visitors use our website — which pages are
          visited most often, how visitors arrive at the site, and whether error messages are
          received. All information collected is aggregated and therefore anonymous. These
          cookies help us understand and improve how our website performs.
        </Para>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 print:border-gray-300">
                {["Cookie Name", "Purpose", "Duration"].map(h => (
                  <th key={h} className="py-2 pr-4 text-left font-display text-platinum/40 uppercase tracking-wider print:text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["_za_analytics", "Measures page views and visitor journeys (anonymised)", "13 months"],
                ["_za_session", "Groups page views into sessions for analytics", "30 minutes"],
              ].map(([name, purpose, duration], i) => (
                <tr key={i} className="border-b border-white/5 print:border-gray-100">
                  <td className="py-2 pr-4 font-mono text-emerald-deep/70 print:text-gray-600">{name}</td>
                  <td className="py-2 pr-4 text-platinum/60 print:text-gray-700">{purpose}</td>
                  <td className="py-2 text-platinum/50 print:text-gray-600">{duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Sub>
      <Sub title="Functional Cookies">
        <Para>
          These cookies enable enhanced functionality and personalisation, such as remembering
          your language preference or interface settings. Disabling these cookies may affect
          functionality but will not prevent you from using our services.
        </Para>
      </Sub>
    </Clause>

    <Clause id="third-party" title="Third-Party Cookies">
      <Para>
        Our website may include content or features that set third-party cookies. We endeavour
        to use only trusted, privacy-conscious third-party services. We do not permit third
        parties to use cookies on our website for advertising, remarketing, or profiling purposes.
      </Para>
      <Para>
        Third-party service providers may include mapping and geospatial visualisation providers.
        Their use of cookies is governed by their own privacy policies.
      </Para>
    </Clause>

    <Clause id="control" title="Your Cookie Controls">
      <Para>
        You can control and manage cookies in the following ways:
      </Para>
      <List items={[
        "Browser settings — Most browsers allow you to refuse or delete cookies. Refer to your browser's help documentation. Note that disabling cookies may impair the functionality of our website",
        "Our consent manager — When you first visit our website, you may set your cookie preferences via our consent banner. You can update these at any time via the Cookie Settings link in our footer",
        "Opt-out tools — For analytics services, you may use available opt-out tools provided by those services",
      ]} />
      <Para>
        Strictly necessary cookies cannot be refused as they are required for the website to function.
      </Para>
    </Clause>

    <Clause id="updates" title="Policy Updates">
      <Para>
        We may update this Cookie Policy periodically to reflect changes in technology, law, or
        our practices. We will notify you of significant changes by posting a notice on our website.
        The effective date at the top of this Policy indicates when it was last revised.
      </Para>
      <Para>
        Questions about our use of cookies may be directed to{" "}
        <span className="text-emerald-deep print:text-gray-800">privacy@ecadelgroup.com</span>.
      </Para>
    </Clause>
  </>
);

// ─── Data Processing Agreement ────────────────────────────────────────────────

const dpaSections: Section[] = [
  { id: "background", title: "Background" },
  { id: "definitions", title: "Definitions" },
  { id: "scope", title: "Scope & Roles" },
  { id: "processor-obligations", title: "Processor Obligations" },
  { id: "controller-obligations", title: "Controller Obligations" },
  { id: "sub-processors", title: "Sub-processors" },
  { id: "security-dpa", title: "Security Measures" },
  { id: "breach", title: "Data Breach Notification" },
  { id: "dsr", title: "Data Subject Requests" },
  { id: "audit", title: "Audit Rights" },
  { id: "transfer", title: "International Transfers" },
  { id: "deletion", title: "Return & Deletion" },
  { id: "liability-dpa", title: "Liability" },
  { id: "duration", title: "Duration & Termination" },
];

const DPAContent = () => (
  <>
    <Clause id="background" title="Background">
      <Para>
        This Data Processing Agreement (&ldquo;DPA&rdquo;) forms part of the agreement between
        ECADEL GROUP LIMITED (&ldquo;Processor&rdquo;) and the contracting organisation (&ldquo;Controller&rdquo;)
        for the provision of intelligence infrastructure services including the SafeRoad and
        PROSEQ platforms.
      </Para>
      <Para>
        This DPA applies wherever ECADEL GROUP LIMITED processes personal data on behalf of the
        Controller in connection with the services described in the Master Services Agreement,
        Government Services Agreement, or any applicable order form (&ldquo;Principal Agreement&rdquo;).
        It is incorporated into and supplements the Principal Agreement.
      </Para>
      <Para>
        Both parties acknowledge their respective obligations under the Uganda Data Protection
        and Privacy Act 2019 (PDPA) and any other applicable data protection legislation.
      </Para>
    </Clause>

    <Clause id="definitions" title="Definitions">
      <Table rows={[
        ["Controller", "The organisation that determines the purposes and means of processing personal data"],
        ["Processor", "ECADEL GROUP LIMITED, which processes personal data on behalf of the Controller"],
        ["Data Subject", "An identified or identifiable natural person whose personal data is being processed"],
        ["Personal Data", "Any information relating to an identified or identifiable natural person"],
        ["Processing", "Any operation or set of operations performed on personal data"],
        ["Sub-processor", "Any third party engaged by the Processor to process personal data"],
        ["Data Breach", "A breach of security leading to accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to, personal data"],
        ["Services", "The intelligence infrastructure platforms and ancillary services provided under the Principal Agreement"],
      ]} />
    </Clause>

    <Clause id="scope" title="Scope & Processing Roles">
      <Sub title="Nature & Purpose">
        <Para>
          The Processor shall process personal data solely for the purpose of providing the
          Services as described in the Principal Agreement. The categories of data subjects
          and personal data types are as specified in Schedule A to the applicable order form.
        </Para>
      </Sub>
      <Sub title="Processing Instructions">
        <Para>
          The Processor shall process personal data only on documented instructions from the
          Controller, including with regard to transfers of personal data to a third country or
          an international organisation, unless required by applicable law. In that case, the
          Processor shall inform the Controller of that legal requirement before processing,
          unless the law prohibits such notification.
        </Para>
      </Sub>
    </Clause>

    <Clause id="processor-obligations" title="Processor Obligations">
      <Para>The Processor agrees to:</Para>
      <List items={[
        "Process personal data only on documented Controller instructions and for no other purpose",
        "Ensure that all persons authorised to process personal data have committed to confidentiality or are under an appropriate statutory obligation of confidentiality",
        "Implement and maintain appropriate technical and organisational security measures as specified in this DPA",
        "Respect the conditions for engaging sub-processors and notify the Controller of any intended changes",
        "Assist the Controller with data subject rights requests, privacy impact assessments, and breach notifications as required",
        "Delete or return all personal data at the conclusion of the services, at the Controller's documented instruction",
        "Make available to the Controller all information necessary to demonstrate compliance with this DPA and permit audits",
        "Immediately inform the Controller if an instruction appears to violate applicable data protection law",
      ]} />
    </Clause>

    <Clause id="controller-obligations" title="Controller Obligations">
      <Para>The Controller agrees to:</Para>
      <List items={[
        "Ensure it has a lawful basis for providing personal data to the Processor and for all processing it instructs",
        "Provide data subjects with appropriate privacy notices regarding the processing performed by the Processor",
        "Ensure that personal data provided is accurate, adequate, and not excessive for the stated purposes",
        "Not instruct the Processor to carry out any processing that would violate applicable law",
        "Promptly forward any data subject rights requests received relating to the Processor's processing",
      ]} />
    </Clause>

    <Clause id="sub-processors" title="Sub-processors">
      <Para>
        The Controller grants general authorisation for the Processor to engage sub-processors
        for the purposes of providing the Services. The Processor shall maintain and make
        available to the Controller a current list of sub-processors upon request.
      </Para>
      <Para>
        The Processor shall provide the Controller with at least 30 days&apos; prior written notice
        of any intended changes to sub-processors (addition or replacement). The Controller
        may object to such changes in writing within 14 days; the parties shall then cooperate
        in good faith to resolve the objection.
      </Para>
      <Para>
        Where the Processor engages sub-processors, it shall impose equivalent data protection
        obligations on them by contract, including obligations to implement appropriate
        technical and organisational security measures.
      </Para>
    </Clause>

    <Clause id="security-dpa" title="Security Measures">
      <Para>
        The Processor shall implement and maintain appropriate technical and organisational
        measures to ensure a level of security appropriate to the risk, including:
      </Para>
      <List items={[
        "Pseudonymisation and encryption of personal data where appropriate",
        "Ongoing confidentiality, integrity, availability, and resilience of processing systems",
        "Ability to restore availability of personal data in a timely manner following a physical or technical incident",
        "Processes for regularly testing, assessing, and evaluating the effectiveness of security measures",
        "Access controls, including multi-factor authentication for system access",
        "Audit logging of access to and processing of personal data",
        "Vendor security review processes for all sub-processors",
        "Staff training on data protection obligations and incident response",
      ]} />
      <Para>
        The specific technical and organisational measures in place at the date of execution
        of the Principal Agreement are set out in Schedule B (Security Annex).
      </Para>
    </Clause>

    <Clause id="breach" title="Data Breach Notification">
      <Para>
        The Processor shall notify the Controller without undue delay, and in any event within
        <strong className="text-softwhite/80 print:text-gray-900"> 48 hours</strong> of becoming
        aware of a personal data breach affecting Controller data, providing the Controller with
        sufficient information to enable it to meet its obligations to notify supervisory authorities
        and affected data subjects.
      </Para>
      <Para>The notification shall include, at minimum:</Para>
      <List items={[
        "A description of the nature of the breach, including categories and approximate numbers of data subjects and records affected",
        "The name and contact details of the data protection point of contact",
        "A description of the likely consequences of the breach",
        "A description of the measures taken or proposed to address the breach and to mitigate its possible adverse effects",
      ]} />
      <Para>
        Where not all information is available within 48 hours, the Processor shall provide
        available information and supplement it as further information becomes known.
      </Para>
    </Clause>

    <Clause id="dsr" title="Data Subject Requests">
      <Para>
        The Processor shall maintain appropriate technical and organisational measures to assist
        the Controller in fulfilling its obligation to respond to requests from data subjects
        exercising their rights under applicable data protection law.
      </Para>
      <Para>
        Where a data subject submits a request directly to the Processor, the Processor shall
        promptly forward that request to the Controller and shall not respond directly to the
        data subject without the Controller&apos;s prior authorisation, except to confirm that
        the request has been forwarded.
      </Para>
    </Clause>

    <Clause id="audit" title="Audit Rights">
      <Para>
        The Processor shall, upon the Controller&apos;s reasonable written request (with no less than
        30 days&apos; notice), make available all information necessary to demonstrate compliance with
        this DPA, and shall allow and contribute to audits or inspections conducted by the
        Controller or an auditor mandated by the Controller.
      </Para>
      <Para>
        Audits shall be conducted during normal business hours, in a manner that minimises
        disruption to the Processor&apos;s operations, and subject to reasonable confidentiality
        obligations. Audit costs shall be borne by the Controller unless the audit reveals a
        material non-compliance by the Processor.
      </Para>
    </Clause>

    <Clause id="transfer" title="International Data Transfers">
      <Para>
        The Processor shall not transfer personal data outside the Controller&apos;s jurisdiction
        without the Controller&apos;s prior written consent and, in any case, only where appropriate
        safeguards are in place as required by applicable law, including use of approved
        contractual mechanisms or transfers to jurisdictions with equivalent protection.
      </Para>
    </Clause>

    <Clause id="deletion" title="Return & Deletion of Data">
      <Para>
        Upon termination or expiry of the Principal Agreement, or upon the Controller&apos;s written
        instruction, the Processor shall, at the Controller&apos;s election:
      </Para>
      <List items={[
        "Securely delete or destroy all personal data (including all copies on backup systems) within 30 days; or",
        "Return to the Controller all personal data in a structured, commonly used, machine-readable format",
      ]} />
      <Para>
        The Processor shall provide written certification of deletion upon request. The
        Processor may retain personal data to the extent required by applicable law, in which
        case it shall inform the Controller of that legal requirement and continue to protect
        the data in accordance with this DPA.
      </Para>
    </Clause>

    <Clause id="liability-dpa" title="Liability">
      <Para>
        Each party&apos;s liability under this DPA is subject to the limitations and exclusions set
        out in the Principal Agreement. Where a data subject suffers damage as a result of
        non-compliant processing, the parties shall be liable to the extent that they are each
        responsible for the non-compliance, in accordance with applicable law.
      </Para>
    </Clause>

    <Clause id="duration" title="Duration & Termination">
      <Para>
        This DPA shall commence on the effective date of the Principal Agreement and shall
        continue for the duration of the Principal Agreement. Obligations regarding the
        processing of personal data shall survive termination or expiry for as long as the
        Processor retains any personal data in connection with the services.
      </Para>
      <Para>
        This DPA automatically terminates upon the permanent deletion or return of all
        personal data as confirmed in writing by the Processor.
      </Para>
    </Clause>
  </>
);

// ─── Document Registry ────────────────────────────────────────────────────────

const documents: Document[] = [
  {
    id: "privacy",
    label: "Privacy Policy",
    effectiveDate: "10 May 2025",
    lastReviewed: "10 May 2025",
    sections: privacySections,
    content: <PrivacyContent />,
  },
  {
    id: "terms",
    label: "Terms of Service",
    effectiveDate: "10 May 2025",
    lastReviewed: "10 May 2025",
    sections: termsSections,
    content: <TermsContent />,
  },
  {
    id: "cookies",
    label: "Cookie Policy",
    effectiveDate: "10 May 2025",
    lastReviewed: "10 May 2025",
    sections: cookieSections,
    content: <CookieContent />,
  },
  {
    id: "dpa",
    label: "Data Processing Agreement",
    effectiveDate: "10 May 2025",
    lastReviewed: "10 May 2025",
    sections: dpaSections,
    content: <DPAContent />,
  },
];

// ─── Page Component ───────────────────────────────────────────────────────────

export default function LegalPage() {
  const [activeDoc, setActiveDoc] = useState(documents[0]);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  // Sync URL hash with active document
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const found = documents.find((d) => d.id === hash);
    if (found) setActiveDoc(found);
  }, []);

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    const els = contentRef.current?.querySelectorAll("[id]");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeDoc]);

  const switchDoc = (doc: Document) => {
    setActiveDoc(doc);
    setActiveSection("");
    window.history.replaceState(null, "", `#${doc.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => window.print();

  return (
    <>
      {/* ── Print styles ── */}
      <style>{`
        @media print {
          body { background: white !important; color: #111 !important; font-size: 11pt; }
          .no-print { display: none !important; }
          .print-bg { background: white !important; }
          nav, .sidebar { display: none !important; }
          .print-area { max-width: 100% !important; padding: 0 !important; }
          h1, h2, h3 { color: #111 !important; }
          a { color: #111 !important; }
        }
      `}</style>

      <div className="min-h-screen bg-obsidian print-bg">
        {/* ── Top Bar ── */}
        <div className="no-print fixed top-0 inset-x-0 z-50 glass border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <ArrowLeft size={14} className="text-platinum/40 group-hover:text-emerald-glow transition-colors" />
              <Image
                src="/assets/ecadel_logos_icons/ecadel_logo_dark_512.png"
                alt="ECADEL GROUP"
                width={24}
                height={24}
                className="opacity-60 object-contain"
              />
              <span className="font-display text-xs tracking-[0.15em] text-platinum/50 group-hover:text-softwhite transition-colors uppercase">
                ECADEL GROUP
              </span>
            </Link>

            {/* Tab navigation */}
            <div className="flex items-center gap-1 overflow-x-auto">
              {documents.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => switchDoc(doc)}
                  className={`flex-shrink-0 px-4 py-1.5 text-xs tracking-wide font-display transition-all duration-200 ${
                    activeDoc.id === doc.id
                      ? "text-emerald-glow border-b border-emerald-deep bg-emerald-deep/5"
                      : "text-platinum/50 hover:text-softwhite"
                  }`}
                >
                  {doc.label}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={copyLink}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-platinum/50 hover:text-softwhite border border-white/8 hover:border-white/15 transition-all duration-200"
                title="Copy link"
              >
                {copied ? <Check size={12} className="text-emerald-glow" /> : <Link2 size={12} />}
                <span className="hidden sm:inline">{copied ? "Copied!" : "Share"}</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-platinum/50 hover:text-softwhite border border-white/8 hover:border-white/15 transition-all duration-200"
                title="Print"
              >
                <Printer size={12} />
                <span className="hidden sm:inline">Print</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Print Header ── */}
        <div className="hidden print:block pt-8 pb-6 border-b border-gray-200 mb-8">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">ECADEL GROUP LIMITED — Legal Document</p>
          <h1 className="text-2xl font-bold text-gray-900">{activeDoc.label}</h1>
          <p className="text-xs text-gray-500 mt-1">Effective: {activeDoc.effectiveDate}</p>
        </div>

        {/* ── Main Layout ── */}
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-24 print:pt-0 flex gap-12">

          {/* ── Sidebar TOC ── */}
          <aside className="no-print hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24 space-y-1">
              <p className="text-[10px] tracking-[0.3em] uppercase text-platinum/30 font-display mb-4">
                Contents
              </p>
              {activeDoc.sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`flex items-center gap-2 py-1.5 text-xs transition-all duration-150 group ${
                    activeSection === sec.id
                      ? "text-emerald-glow"
                      : "text-platinum/40 hover:text-platinum/70"
                  }`}
                >
                  <ChevronRight
                    size={10}
                    className={`flex-shrink-0 transition-opacity ${activeSection === sec.id ? "opacity-100 text-emerald-deep" : "opacity-0 group-hover:opacity-50"}`}
                  />
                  {sec.title}
                </a>
              ))}
            </div>
          </aside>

          {/* ── Document Content ── */}
          <main ref={contentRef} className="flex-1 min-w-0 print-area">

            {/* Document header */}
            <div className="mb-12 pb-8 border-b border-white/8 print:hidden">
              <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-emerald-glow font-display mb-4">
                Legal Document
              </span>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-softwhite mb-4">
                {activeDoc.label}
              </h1>
              <div className="flex flex-wrap gap-x-8 gap-y-1 text-xs text-platinum/40">
                <span>Effective: <span className="text-platinum/60">{activeDoc.effectiveDate}</span></span>
                <span>Last reviewed: <span className="text-platinum/60">{activeDoc.lastReviewed}</span></span>
                <span>Jurisdiction: <span className="text-platinum/60">Republic of Uganda</span></span>
              </div>
            </div>

            {/* Legal preamble notice */}
            <div className="mb-10 p-5 border border-emerald-deep/20 bg-emerald-deep/5 print:border-gray-300 print:bg-gray-50">
              <p className="text-xs text-platinum/55 leading-relaxed print:text-gray-600">
                <strong className="text-softwhite/70 print:text-gray-800">Important Notice:</strong>{" "}
                This document constitutes a legally binding agreement between you and ECADEL GROUP LIMITED.
                Please read it carefully. If you have questions, contact us at{" "}
                <span className="text-emerald-deep print:text-gray-800">ecadelgroup@ecadelgroup.com</span>{" "}
                before proceeding.
              </p>
            </div>

            {/* Document body */}
            <div className="max-w-3xl">
              {activeDoc.content}
            </div>

            {/* Document footer */}
            <div className="mt-16 pt-8 border-t border-white/8 print:border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="font-display font-semibold text-softwhite text-sm print:text-gray-900">
                    ECADEL GROUP LIMITED
                  </p>
                  <p className="text-platinum/40 text-xs mt-0.5 print:text-gray-500">
                    Kampala, Uganda · {activeDoc.label} · Effective {activeDoc.effectiveDate}
                  </p>
                </div>
                <div className="flex gap-4 no-print">
                  {documents
                    .filter((d) => d.id !== activeDoc.id)
                    .map((d) => (
                      <button
                        key={d.id}
                        onClick={() => switchDoc(d)}
                        className="text-xs text-platinum/40 hover:text-emerald-glow transition-colors"
                      >
                        {d.label}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
