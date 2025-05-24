import type { PageSlug } from '@/types/pages';

export enum PAGE_TEXT {
  HOME = 'Home',
  ABOUT = 'About',
  PORTFOLIO = 'Portfolio',
  RESUME = 'Resume',
  CONTACT = 'Contact',
}

export const PAGES: Array<{
  params: { slug: PageSlug };
  props: { text: PAGE_TEXT };
}> = [
  {
    params: { slug: 'about' },
    props: { text: PAGE_TEXT.ABOUT },
  },
  {
    params: {
      slug: 'portfolio',
    },
    props: { text: PAGE_TEXT.PORTFOLIO },
  },
  {
    params: { slug: 'resume' },
    props: { text: PAGE_TEXT.RESUME },
  },
  {
    params: { slug: 'contact' },
    props: { text: PAGE_TEXT.CONTACT },
  },
] as const;
