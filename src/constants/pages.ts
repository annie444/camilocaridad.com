import type { PageSlug } from '@/types/pages';

export enum PAGE_TEXT {
  HOME = 'Home',
  ABOUT = 'About',
  PORTFOLIO = 'Portfolio',
  RESUME = 'Resume',
  CONTACT = 'Contact',
}

export const PAGES: Array<{
  slug: PageSlug;
  text: PAGE_TEXT;
}> = [
  {
    slug: 'about',
    text: PAGE_TEXT.ABOUT,
  },
  {
    slug: 'portfolio',
    text: PAGE_TEXT.PORTFOLIO,
  },
  {
    slug: 'resume',
    text: PAGE_TEXT.RESUME,
  },
  {
    slug: 'contact',
    text: PAGE_TEXT.CONTACT,
  },
] as const;
