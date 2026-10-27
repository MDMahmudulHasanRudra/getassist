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
    /** OWNER_CONFIRMED (27 Oct 2026): run by its two founders. */
    founders: ['MD Mahmudul Hasan Rudra', 'Sifat A Rabbi'] as string[],
    /** Street or service address. Owner chose not to publish one; tracked in LAUNCH_BLOCKERS.md. */
    address: null as string | null,
    /** OWNER_CONFIRMED: operating from Dhaka, Bangladesh. */
    location: 'Dhaka, Bangladesh',
  },

  /** OWNER_CONFIRMED (planned). Owner must create and test each mailbox before launch. */
  emails: {
    privacy: fact('privacy@getassist.pro', 'privacy contact email'),
    support: fact('support@getassist.pro', 'support email'),
    general: fact('contact@getassist.pro', 'general contact email'),
  },

  legal: {
    /** OWNER_CONFIRMED (27 Oct 2026). Update both when the text changes after legal review. */
    effectiveDate: fact('27 October 2026', 'effective date'),
    lastUpdated: fact('27 October 2026', 'last-updated date'),
    /** OWNER_CONFIRMED as a proposal; LEGAL_REVIEW. */
    governingLaw: fact(
      'These terms are governed by the laws of Bangladesh. Disputes are subject to the courts of Bangladesh, without limiting any mandatory consumer rights that apply to you.',
      'governing law and jurisdiction',
    ),
    /** OWNER_CONFIRMED; VPS provider and region from a public IP lookup of the server. */
    storageLocation: fact(
      'on a virtual private server provided by Hostinger in Kuala Lumpur, Malaysia. This includes the database, files sent in conversations and backups.',
      'where customer data is stored',
    ),
    deletionTimeframe: fact('30 days', 'number of days to complete a verified deletion request'),
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
    /** OWNER_CONFIRMED: no online payments yet. */
    paymentProvider: fact(
      'none at present. Payments are arranged directly with us, for example by invoice or bank transfer, so no payment provider holds your card details.',
      'payment provider',
    ),
    /** OWNER_CONFIRMED (27 Oct 2026); not yet code-verified (see FACT_VERIFICATION_REPORT.md). */
    securityMeasures: fact(
      'All traffic to the app uses HTTPS. AI provider keys that workspaces add are stored encrypted. Staff access is limited by the role each person is given, and each workspace’s data is kept separate from every other workspace.',
      'security measures',
    ),
    /** OWNER_CONFIRMED: plain disclosure, no contractual safeguards claimed. */
    transferSafeguards: fact(
      'Our servers are in Malaysia. When a workspace turns on AI features, relevant content is sent to the AI provider that workspace chose, which may process it in other countries, such as the United States, under that provider’s own terms.',
      'international transfers',
    ),
    /** OWNER_CONFIRMED: NextAuth sign-in cookies only. */
    appCookies: fact(
      'The app uses only the cookies it needs to sign you in and keep you signed in: a session cookie, a security (CSRF) cookie and a cookie that remembers where to return after signing in. It uses no analytics or advertising cookies.',
      'app cookies',
    ),
    /** OWNER_CONFIRMED; LEGAL_REVIEW. */
    liabilityCap: fact(
      'Our total liability for all claims relating to Get Assist is limited to the fees you paid us for Get Assist in the 12 months before the claim arose.',
      'liability cap',
    ),
    /** OWNER_CONFIRMED. */
    afterDisconnect: fact(
      'they stay in your workspace until an authorised workspace owner asks us to delete them.',
      'what happens to stored conversations after disconnecting',
    ),
    /** OWNER_CONFIRMED: Meta's automated deletion callback is not built yet. */
    metaDeletionCallback: fact(
      'this stops Get Assist’s access straight away, but it does not yet delete stored data automatically. To delete it, send a deletion request as described above.',
      'Meta data deletion callback behaviour',
    ),
  },

  /** OWNER_CONFIRMED (27 Oct 2026). */
  retention: {
    messages: fact(
      'kept while the workspace uses Get Assist, and after that until an authorised workspace owner asks us to delete them.',
      'retention period for conversation messages',
    ),
    account: fact(
      'kept until an authorised workspace owner asks us to delete it, so the account can be reactivated.',
      'account retention',
    ),
    logs: fact('kept for 90 days, then deleted.', 'retention period for logs'),
    backups: fact('kept for 30 days, then deleted.', 'retention period for backups'),
  },

  /** Commitments published only once confirmed. */
  commitments: {
    /** OWNER_CONFIRMED: Get Assist does not sell customer data. */
    noSellingData: true,
    /** Broad claim; the specific HTTPS statement is in legal.securityMeasures instead. */
    encryptionInTransit: false,
    /** Set true only if verified for all customer data, not just access tokens. */
    encryptionAtRest: false,
    /** Set true once code shows AI calls use only the workspace's own provider and never run with AI off. */
    aiIsolationVerified: false,
  },

  /** Owner designates Telegram as beta; shown only once verified accessible to users. */
  telegramLive: false,
} as const;
