import { fact } from './owner';

export interface Permission {
  name: string;
  why: string;
  allows: string;
  /** Set to true only after checking the Meta App Dashboard and the review screencast. */
  confirmed: boolean;
}

/**
 * OWNER_CONFIRMED (from product planning): one platform-owned Meta app using
 * Facebook Login; Instagram is reached through a Facebook Page linked to an
 * Instagram professional account. Still to be checked against release code.
 */
export const loginFlow =
  'Get Assist uses Facebook Login. Instagram accounts are connected through the Facebook Page they are linked to.';

/** Shown while any permission below is still a candidate; blocks production builds. */
export const permissionsPending = fact(
  null,
  'confirm each permission against the Meta App Dashboard and the review screencast, then set confirmed: true',
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
