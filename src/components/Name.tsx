import { useEffect, useState, type ReactNode } from 'react';

export interface TypewriterProps {
  text: string[];
  delay: number;
}

export interface TypewriterHeadingProps {
  text: string;
  delay: number;
  wait: number;
}

export function TypewriterHeading({
  text,
  delay,
  wait,
}: TypewriterHeadingProps): ReactNode {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const time = currentIndex === 0 ? wait : delay;
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, time);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text, wait]);

  return <h1 className="text-9xl font-bold">{currentText}</h1>;
}

export function Typewriter({ text, delay }: TypewriterProps): ReactNode {
  let wait = 0;
  const waits: number[] = [];
  for (let i = 0; i < text.length; i++) {
    if (i === 0) {
      waits.push(0);
    } else {
      wait += text[i].length * delay;
      waits.push(wait);
    }
  }
  console.log(waits);
  return (
    <div className="text-center">
      {text.map((txt, i) => {
        return (
          <TypewriterHeading key={i} text={txt} delay={delay} wait={waits[i]} />
        );
      })}
    </div>
  );
}
