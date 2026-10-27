export interface Subprocessor {
  name: string;
  purpose: string;
  location: string;
}

/**
 * Service providers that process personal data for Get Assist.
 * OWNER_CONFIRMED (27 Oct 2026). AI providers are chosen by each workspace and
 * are listed as independent platforms on the subprocessors page, not here.
 */
export const subprocessors: Subprocessor[] = [
  {
    name: 'Hostinger International Ltd.',
    purpose:
      'Server hosting for the Get Assist app, its database, files sent in conversations and backups',
    location: 'Kuala Lumpur, Malaysia',
  },
  {
    name: 'Cloudflare, Inc.',
    purpose: 'DNS and hosting for the getassist.pro website',
    location: 'Global network (United States company)',
  },
];
