import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Button } from './ui/button';
import { SparkleIcon } from 'lucide-react';

const Hero = () => {
  const container = useRef<HTMLDivElement>(null);
  const headingText = "I'm Katleo software developer";

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 1. Fade up the introduction badge
      tl.from('.hero-intro', {
        opacity: 0,
        y: 20,
        duration: 0.6,
      });

      // 2. Stagger each WORD in the heading
      tl.from(
        '.hero-word',
        {
          opacity: 0,
          y: 30,
          duration: 1,
          stagger: 0.2,
          ease: 'power4.out',
        },
        '-=0.4',
      ); // Overlap with previous animation by 0.4s

      // 3. Fade up the buttons
      tl.from(
        '.hero-btns',
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
        },
        '-=0.8',
      );
    },
    { scope: container },
  );

  return (
    <section id='hero' className='pt-20' ref={container}>
      <p className='hero-intro flex items-center justify-center py-1 gap-2 border border-neutral-600 rounded-sm w-32'>
        <SparkleIcon /> <span>introduction</span>
      </p>

      <h1 className='text-4xl md:text-5xl lg:text-6xl font-semibold capitalize mt-2 max-w-3xl md:leading-16'>
        {headingText.split(' ').map((word, i) => (
          <span key={i} className='hero-word inline-block mr-[0.25em]'>
            {word === 'Katleo' ? (
              <span className='text-neutral-500'>{word}</span>
            ) : (
              word
            )}
          </span>
        ))}
      </h1>

      <div className='hero-btns mt-5 flex gap-2'>
        <Button asChild>
          <a href='#projects'>My Projects</a>
        </Button>
        <Button variant='outline'>Download CV</Button>
      </div>
    </section>
  );
};


export default Hero;