import type { NavBarLink } from '@/components/NavBar';
import type { PageKey } from '@/types/pages';

export enum PageText {
  Home = 'Home',
  About = 'About',
  Portfolio = 'Portfolio',
  Resume = 'Resume',
  Contact = 'Contact',
}

export const PAGES_CONFIG: Record<PageKey, NavBarLink> = {
  home: { href: '/', text: PageText.Home },
  about: { href: '/about', text: PageText.About },
  portfolio: { href: '/portfolio', text: PageText.Portfolio },
  resume: { href: '/resume', text: PageText.Resume },
  contact: { href: '/contact', text: PageText.Contact },
};
