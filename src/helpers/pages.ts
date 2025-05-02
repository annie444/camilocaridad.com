import type { NavBarLink } from '@/components/NavBar';
import { PAGES_CONFIG } from '@/constants/pages';
import type { PageKey } from '@/types/pages';

export const getPagesLinks = ({
  excludeKey,
}: {
  excludeKey: PageKey;
}): NavBarLink[] => {
  return Object.entries(PAGES_CONFIG)
    .filter(([key]) => key !== excludeKey)
    .map(([_, value]) => value);
};
