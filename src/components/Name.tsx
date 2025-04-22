import { useRef, type ReactNode, type RefObject } from 'react';
import { gsap, useGSAP } from '@lib/gsap.ts';

export function CamiloCaridadPineda(props: {}): ReactNode {
  const container: RefObject<HTMLDivElement> = useRef();
  const name1: RefObject<HTMLDivElement> = useRef();
  const name2: RefObject<HTMLDivElement> = useRef();
  const name3: RefObject<HTMLDivElement> = useRef();

  useGSAP(
    () => {
      let tl = gsap.timeline();
      tl.to(name1.current, {
        duration: 0.6,
        text: 'Camilo',
      })
        .to(name2.current, {
          duration: 0.7,
          text: 'Caridad',
        })
        .to(name3.current, {
          duration: 0.6,
          text: 'Pineda',
        });
    },
    { scope: container }
  );

  return (
    <>
      <div ref={container} className="text-center">
        <h1 ref={name1} className="text-3xl font-bold"></h1>
        <h1 ref={name2} className="text-3xl font-bold"></h1>
        <h1 ref={name3} className="text-3xl font-bold"></h1>
      </div>
    </>
  );
}
