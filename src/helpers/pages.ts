import type { NavBarLink } from '@/components/NavBar';
import { PAGES } from '@/constants/pages';
import type { PageSlug } from '@/types/pages';

export const getPagesLinks = ({
  excludeSlug,
}: {
  excludeSlug?: PageSlug;
}): NavBarLink[] => {
  return PAGES.filter(({ slug }) => slug !== excludeSlug).map(
    ({ slug, text }) => ({
      href: slug ? `/${slug}` : '/',
      text,
    })
  ) as NavBarLink[];
};
