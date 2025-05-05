import type { PageSlug } from '@/types/pages';

export enum PageText {
  Home = 'Home',
  About = 'About',
  Portfolio = 'Portfolio',
  Resume = 'Resume',
  Contact = 'Contact',
}

export const PAGES: Array<{
  slug: string;
  text: PageText;
}> = [
  {
    slug: 'about',
    text: PageText.About,
  },
  {
    slug: 'portfolio',
    text: PageText.Portfolio,
  },
  {
    slug: 'resume',
    text: PageText.Resume,
  },
  {
    slug: 'contact',
    text: PageText.Contact,
  },
] as const;
