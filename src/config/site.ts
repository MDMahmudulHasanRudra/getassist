import { fact } from './owner';

/**
 * Every business fact used on the site lives here. Pages never hard-code
 * operator or contact details. Replace `null` with the confirmed value.
 */
export const site = {
  brand: 'Get Assist',
  domain: 'getassist.pro',
  url: 'https://getassist.pro',
  appUrl: 'https://app.getassist.pro',
  heroTitle: 'Customer support, simplified with AI.',
  heroLead:
    'Bring your customer conversations, support team and AI-powered assistance together in one workspace.',
  description:
    'Get Assist brings Facebook Messenger and Instagram conversations into one inbox, with AI-assisted replies from your knowledge base and handover to your team.',

  operator: {
    legalName: fact(null, 'legal operator name'),
    address: fact(null, 'registered address'),
    country: fact(null, 'country of registration'),
  },

  emails: {
    privacy: fact(null, 'privacy contact email'),
    support: fact(null, 'support email'),
    general: fact(null, 'general contact email'),
  },

  legal: {
    effectiveDate: fact(null, 'effective date of the legal documents'),
    lastUpdated: fact(null, 'last-updated date of the legal documents'),
    governingLaw: fact(null, 'governing law and jurisdiction'),
    storageLocation: fact(null, 'where customer data is stored (country/region and provider)'),
    deletionTimeframe: fact(null, 'how many days a deletion request takes to complete'),
    aiProviderPolicy: fact(
      null,
      'AI provider data policy, e.g. whether customer messages are used to train models',
    ),
    pricingAndRefunds: fact(null, 'pricing, renewal, cancellation and refund terms'),
    eligibility: fact(null, 'who may use the service (minimum age, business use only, etc.)'),
    complaints: fact(null, 'complaints process and any dispute-resolution body'),
  },

  retention: {
    messages: fact(null, 'retention period for conversation messages'),
    account: fact(null, 'retention period for account data after the account is closed'),
    logs: fact(null, 'retention period for logs'),
    backups: fact(null, 'retention period for backups'),
  },

  /** Commitments published only once the owner confirms them. */
  commitments: {
    noSellingData: false,
    encryptionInTransit: false,
    encryptionAtRest: false,
  },

  /** Telegram is mentioned only when the owner confirms it is live. */
  telegramLive: false,
} as const;
