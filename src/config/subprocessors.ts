export interface Subprocessor {
  name: string;
  purpose: string;
  location: string;
}

/**
 * Service providers that process personal data for Get Assist (VPS host, AI
 * provider, email, payments, monitoring). Owner to supply. An empty list
 * renders a visible placeholder on the Privacy Policy.
 */
export const subprocessors: Subprocessor[] = [];
