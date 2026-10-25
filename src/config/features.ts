export type FeatureStatus = 'available' | 'beta' | 'coming-soon';
export type ChannelStatus = 'available' | 'pending-meta' | 'coming-soon';
export type Status = FeatureStatus | ChannelStatus;

export interface Feature {
  name: string;
  summary: string;
  status: FeatureStatus;
}

/** Status stays 'coming-soon' until the owner confirms it is live in the product. */
export const features: Feature[] = [
  {
    name: 'Unified inbox',
    summary: 'Messenger and Instagram conversations arrive in one shared inbox for your team.',
    status: 'coming-soon',
  },
  {
    name: 'AI support automation',
    summary:
      'AI replies based on your knowledge base, using the AI provider and model your workspace chooses.',
    status: 'coming-soon',
  },
  {
    name: 'Human handover',
    summary: 'A conversation can be passed from the AI to a person on your team.',
    status: 'coming-soon',
  },
  {
    name: 'Team management',
    summary: 'Invite teammates, give them roles and decide who works on which conversations.',
    status: 'coming-soon',
  },
  {
    name: 'Knowledge base',
    summary: 'Add the answers, policies and product details the AI should rely on.',
    status: 'coming-soon',
  },
  {
    name: 'Reports and insights',
    summary: 'See how conversations were handled across your team.',
    status: 'coming-soon',
  },
  {
    name: 'Multi-project workspaces',
    summary: 'Keep separate brands or clients in separate projects under one account.',
    status: 'coming-soon',
  },
  {
    name: 'Channel connections',
    summary: 'Connect a Facebook Page or an Instagram professional account to Get Assist.',
    status: 'coming-soon',
  },
];

/** Stays 'pending-meta' until the owner confirms Meta has approved the app. */
export const channels = {
  facebook: {
    name: 'Facebook Messenger',
    href: '/integrations/facebook',
    status: 'pending-meta' as ChannelStatus,
  },
  instagram: {
    name: 'Instagram Direct Messages',
    href: '/integrations/instagram',
    status: 'pending-meta' as ChannelStatus,
  },
};

export const statusLabel: Record<Status, string> = {
  available: 'Available',
  beta: 'Beta',
  'coming-soon': 'Coming soon',
  'pending-meta': 'Pending Meta approval',
};
