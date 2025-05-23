import { type ReactNode, type RefObject, useRef, useEffect } from 'react';
import * as React from 'react';
import { animate, createScope, Scope, utils } from 'animejs';
import ReactCurvedText from 'react-curved-text';

export interface NavBarLink {
  href: string;
  text: string;
}

export interface NavBarProps {
  links: NavBarLink[];
}

export function NavBar({ links }: NavBarProps): ReactNode {
  const container: RefObject<HTMLElement | null> = useRef(null);
  const scope: RefObject<Scope | null> = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root: container }).add((self) => {
      animate('.nav-link', {
        translateY: '-50%',
        opacity: 1,
        ease: 'inExpo',
        duration: 700,
      });

      animate('.svg-link', {
        rotate: '360deg',
        loop: true,
        loopDelay: 0,
        ease: 'linear',
        duration: 1700,
      });

      setTimeout(() => {
        const navLinks = document.getElementsByClassName('nav-link');
        for (let i = 0; i < navLinks.length; i++) {
          const rect = navLinks[i].getBoundingClientRect();
          animate(`.svg-link-${i}`, {
            left: rect.left,
            top: rect.top,
          });
        }
      }, 2000);

      self.add('fadeOut', (input: number, x: number, y: number) => {
        console.log('fadeOut');
        animate(`.nav-link-${input}`, {
          opacity: 0,
          duration: 300,
        });
        animate(`.svg-link-${input}`, {
          top: y,
          left: x,
          opacity: 1,
          duration: 300,
        });
      });

      self.add('followCursor', (input: number, x: number, y: number) => {
        console.log('followCursor');
        animate(`.svg-link-${input}`, {
          top: y,
          left: x,
          opacity: 1,
        });
      });

      self.add('fadeIn', (input) => {
        console.log('fadeIn');
        animate(`.nav-link-${input}`, {
          opacity: 1,
          duration: 300,
        });
        animate(`.svg-link-${input}`, {
          opacity: 0,
          duration: 300,
        });
      });
    });
    return () => scope.current?.revert();
  }, []);

  const hoverIn = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    i: number
  ) => {
    scope.current?.methods.fadeOut(i, event.clientX - 25, event.clientY - 25);
  };

  const hovering = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    i: number
  ) => {
    scope.current?.methods.followCursor(
      i,
      event.clientX - 25,
      event.clientY - 25
    );
  };

  const hoverOut = (i: number) => {
    scope.current?.methods.fadeIn(i);
  };

  return (
    <nav ref={container} className="flex flex-row pointer-none">
      {links.map((link: NavBarLink, i: number) => (
        <>
          <a
            key={i}
            aria-label={link.text}
            className={`px-2 text-2xl cursor-pointer pointer-events-auto nav-link nav-link-${i} opacity-0 translate-y-1/2`}
            href={link.href}
            onMouseEnter={(e) => hoverIn(e, i)}
            onMouseLeave={() => hoverOut(i)}
            onMouseMove={(e) => hovering(e, i)}
            onClick={() => hoverOut(i)}
          >
            {link.text}
          </a>

          <ReactCurvedText
            width={70}
            height={70}
            cx={35}
            cy={35}
            rx={35}
            ry={35}
            reversed={false}
            text={`${link.text} ${link.text} ${link.text} ${link.text}`}
            textProps={{ style: { fontSize: 18 } }}
            svgProps={{
              className: `svg-link svg-link-${i} opacity-0 absolute cursor-none pointer-events-none`,
            }}
          />
        </>
      ))}
    </nav>
  );
}
