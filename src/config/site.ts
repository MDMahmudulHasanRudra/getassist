import { fact } from './owner';

/**
 * Every business fact used on the site lives here. Pages never hard-code
 * operator or contact details. Replace `null` with the confirmed value.
 * Source and verification status of each value: OWNER_DECISIONS_RESOLVED.md
 * and FACT_VERIFICATION_REPORT.md.
 */
export const site = {
  brand: 'Get Assist',
  domain: 'getassist.pro',
  url: 'https://getassist.pro',
  /** Current SaaS address. Moves to https://app.getassist.pro when the owner migrates the app. */
  appUrl: 'https://zoventio.udboy.com',
  heroTitle: 'Customer support, simplified with AI.',
  heroLead:
    'Bring your customer conversations, support team and AI-powered assistance together in one workspace.',
  tagline: 'Every Conversation. Every Team. Every Channel. One Place.',
  description:
    'Get Assist helps teams manage customer conversations, coordinate staff and use AI-assisted replies in one workspace.',

  operator: {
    /**
     * Owner's full legal name. Not yet supplied. While null, public pages use
     * `statement` instead, and the gap is tracked in LAUNCH_BLOCKERS.md
     * (owner instruction: do not show this gap on deployed public pages).
     */
    legalName: null as string | null,
    /** Street or service address. Not yet supplied; tracked in LAUNCH_BLOCKERS.md. */
    address: null as string | null,
    /** OWNER_CONFIRMED: sole proprietor operating from Dhaka, Bangladesh. */
    location: 'Dhaka, Bangladesh',
    statement:
      'Get Assist is a business software platform operated independently from Dhaka, Bangladesh.',
  },

  /** OWNER_CONFIRMED (planned). Owner must create and test each mailbox before launch. */
  emails: {
    privacy: fact('privacy@getassist.pro', 'privacy contact email'),
    support: fact('support@getassist.pro', 'support email'),
    general: fact('contact@getassist.pro', 'general contact email'),
  },

  legal: {
    /** Set on the day the final, reviewed version is first published. */
    effectiveDate: fact(null, 'effective date (set when the reviewed final version is published)'),
    lastUpdated: fact(null, 'last-updated date (set when the reviewed final version is published)'),
    /** OWNER_CONFIRMED as a proposal; LEGAL_REVIEW. */
    governingLaw: fact(
      'These terms are governed by the laws of Bangladesh. Disputes are subject to the courts of Bangladesh, without limiting any mandatory consumer rights that apply to you.',
      'governing law and jurisdiction',
    ),
    storageLocation: fact(
      null,
      'where customer data is stored: VPS provider, datacenter region and backup location',
    ),
    deletionTimeframe: fact(null, 'number of days to complete a verified deletion request'),
    /** OWNER_CONFIRMED: each workspace selects its own AI provider and model. */
    aiProviderPolicy: fact(
      'Each workspace chooses and configures its own AI provider and model. Each provider’s data handling and model-training terms differ, so workspace owners should review the terms of the provider they select.',
      'AI provider data policy',
    ),
    /** Interim wording allowed by the owner until the refund rules are resolved. */
    pricingAndRefunds: fact(
      'Plans, prices, trial terms and refund terms are provided on request at contact@getassist.pro and are confirmed in writing before you pay. Get Assist does not take payment through this website.',
      'pricing, renewal, cancellation and refund terms',
    ),
    /** OWNER_CONFIRMED as a proposal; LEGAL_REVIEW. Minimum age still open. */
    eligibility: fact(
      'Get Assist is for businesses and professional users. The person who opens an account must have the legal capacity to enter into a contract on behalf of their business.',
      'eligibility',
    ),
    complaints: fact(
      'Send complaints in writing to support@getassist.pro, or to privacy@getassist.pro for privacy matters.',
      'complaints process',
    ),
    paymentProvider: fact(null, 'payment provider used for subscriptions, or confirm none'),
    securityMeasures: fact(
      null,
      'security measures verified in the deployed app (tenant isolation, access control, TLS, credential encryption, backups)',
    ),
    transferSafeguards: fact(
      null,
      'regions of the VPS, AI providers and email provider, and the safeguards used for transfers',
    ),
    appCookies: fact(null, 'cookies the app (zoventio.udboy.com) sets, from a runtime audit'),
    liabilityCap: fact(null, 'liability cap, after legal review'),
    afterDisconnect: fact(
      null,
      'what happens to stored conversations after a Page or account is disconnected (verified in the app)',
    ),
    metaDeletionCallback: fact(
      null,
      'what the app’s Meta deauthorize and data deletion callbacks actually do (verified in the app)',
    ),
  },

  retention: {
    messages: fact(null, 'retention period for conversation messages'),
    account: fact(
      null,
      'inactive account retention: proposed up to 12 months for reactivation; confirm the period and whether it is purged automatically',
    ),
    logs: fact(null, 'retention period for logs'),
    backups: fact(null, 'retention period for backups'),
  },

  /** Commitments published only once confirmed. */
  commitments: {
    /** OWNER_CONFIRMED: Get Assist does not sell customer data. */
    noSellingData: true,
    /** Set true only after verifying deployed TLS on public and backend paths. */
    encryptionInTransit: false,
    /** Set true only if verified for all customer data, not just access tokens. */
    encryptionAtRest: false,
    /** Set true once code shows AI calls use only the workspace's own provider and never run with AI off. */
    aiIsolationVerified: false,
  },

  /** Owner designates Telegram as beta; shown only once verified accessible to users. */
  telegramLive: false,
} as const;
