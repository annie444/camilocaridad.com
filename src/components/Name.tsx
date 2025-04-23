import { useRef, useEffect, type ReactNode, type RefObject } from 'react';

class Name {
  private current: string;
  private currIndex: number;
  private target: string;
  private element?: RefObject<HTMLElement>;

  constructor(value: string, obj: RefObject<HTMLElement>) {
    this.current = '';
    this.currIndex = 0;
    this.target = value;
    this.element = obj;
  }

  tick() {
    this.currIndex += 1;
    this.current = this.target.slice(0, this.currIndex);
    if (this.element) {
      this.element.current.innerText = this.current;
    }
  }

  get done(): boolean {
    return this.currIndex === this.target.length;
  }

  get value(): string {
    return this.current;
  }

  get length(): number {
    return this.target.length + 1;
  }
}

export function CamiloCaridadPineda(props: {}): ReactNode {
  const name1: RefObject<HTMLHeadingElement> = useRef();
  const name2: RefObject<HTMLHeadingElement> = useRef();
  const name3: RefObject<HTMLHeadingElement> = useRef();

  useEffect(() => {
    const camilo = new Name('Camilo', name1);
    const caridad = new Name('Caridad', name2);
    const pineda = new Name('Pineda', name3);

    while (!camilo.done) {
      setTimeout(camilo.tick, 100);
    }
    while (!caridad.done) {
      setTimeout(caridad.tick, 100);
    }
    while (!pineda.done) {
      setTimeout(pineda.tick, 100);
    }
  });

  return (
    <>
      <div className="text-center">
        <h1 ref={name1} className="text-3xl font-bold"></h1>
        <h1 ref={name2} className="text-3xl font-bold"></h1>
        <h1 ref={name3} className="text-3xl font-bold"></h1>
      </div>
    </>
  );
}
