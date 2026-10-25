/**
 * An owner-supplied fact. `value: null` means the owner has not provided it yet;
 * the site then renders a visible [[OWNER: need]] placeholder, and
 * scripts/check-placeholders.mjs blocks a production deploy.
 */
export interface OwnerFact {
  value: string | null;
  need: string;
}

export const fact = (value: string | null, need: string): OwnerFact => ({ value, need });

export const placeholder = (need: string): string => `[[OWNER: ${need}]]`;

export const show = (f: OwnerFact): string => f.value ?? placeholder(f.need);
