import { type ReactNode, type RefObject, useRef } from 'react';
import { gsap, useGSAP } from '@lib/gsap.ts';

export interface NavBarLink {
  href: string;
  text: string;
}

export interface NavBarProps {
  links: NavBarLink[];
}

export function NavBar({ links }: NavBarProps): ReactNode {
  const container: RefObject<HTMLElement> = useRef();
  useGSAP(
    () => {
      gsap.from('.nav-link', {
        yPercent: 50,
        opacity: 0,
        duration: 1,
      });
    },
    { scope: container }
  );
  return (
    <nav ref={container} className="flex flex-row pointer-none">
      {links.map((link: NavBarLink, i: number) => (
        <a
          key={i}
          className="px-2 text-xl cursor-pointer pointer-events-auto nav-link"
          href={link.href}
        >
          {link.text}
        </a>
      ))}
    </nav>
  );
}
