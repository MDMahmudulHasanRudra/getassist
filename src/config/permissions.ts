import { fact } from './owner';

export interface Permission {
  name: string;
  why: string;
  allows: string;
  /** Set to true only after checking the Meta App Dashboard and the review screencast. */
  confirmed: boolean;
}

export const loginFlow = fact(
  null,
  'confirm the login flow (Facebook Login or Instagram Login) and the exact permissions requested',
);

/** Candidate list from the brief, to be confirmed by the owner. */
export const facebookPermissions: Permission[] = [
  {
    name: 'public_profile',
    why: 'To know which person connected their Facebook account to Get Assist.',
    allows: 'Reading your basic public profile, such as your name.',
    confirmed: false,
  },
  {
    name: 'pages_show_list',
    why: 'So you can choose which of your Facebook Pages to connect.',
    allows: 'Listing the Pages you manage.',
    confirmed: false,
  },
  {
    name: 'pages_manage_metadata',
    why: 'So new messages to the Page you chose are delivered to your Get Assist inbox.',
    allows: 'Managing message subscriptions and settings for that Page.',
    confirmed: false,
  },
  {
    name: 'pages_messaging',
    why: 'To show messages sent to your Page and send the replies you or the AI write.',
    allows: 'Reading and sending Messenger conversations for that Page.',
    confirmed: false,
  },
];

/** Assumes Facebook Login. Instagram Login uses instagram_business_* permissions instead. */
export const instagramPermissions: Permission[] = [
  {
    name: 'instagram_basic',
    why: 'To know which Instagram professional account you connected.',
    allows: 'Reading the account’s basic profile information, such as its username.',
    confirmed: false,
  },
  {
    name: 'instagram_manage_messages',
    why: 'To show direct messages sent to your account and send the replies you or the AI write.',
    allows: 'Reading and sending Instagram direct messages for that account.',
    confirmed: false,
  },
];
