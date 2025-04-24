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
  let waited = false;

  useEffect(() => {
    if (wait && !waited) {
      waited = true;
      const timeout = setTimeout(() => {}, wait);
      return () => clearTimeout(timeout);
    }
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <h1 className="text-9xl font-bold">{currentText}</h1>;
}

export function Typewriter({ text, delay }: TypewriterProps): ReactNode {
  let wait = 0;
  const waits = new Array(text.length).map((_, i) => {
    if (i > 0) {
      wait += text[i - 1].length * delay;
      return wait;
    } else {
      return wait;
    }
  });
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
