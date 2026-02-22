import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { MenuIcon } from 'lucide-react';
import { navLinks } from '@/constants';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const [active, setActive] = useState('#hero');

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='m-4 fixed top-4 right-4 z-50 border-2 hover:border-primary bg-neutral-800 px-5 py-5 rounded-full hover:text-primary cursor-pointer'
          >
            <MenuIcon size={30} />
          </Button>
        </SheetTrigger>
        <SheetContent
          side='right'
          className='w-84 bg-neutral-900 text-white py-6 pl-10'
        >
          <SheetTitle className='text-2xl font-semibold'>Menu</SheetTitle>
          <nav className='flex flex-col gap-4'>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.link}
                  onClick={() => setActive(link.link)}
                  className={cn(
                    'text-neutral-300 flex items-center gap-2 hover:text-primary transition-colors duration-200 text-base ',
                    active == link.link && 'text-primary',
                  )}
                >
                  <Icon className='size-4' /> {link.label}
                </a>
              );
            })}
          </nav>
          <div className="mt-30">
            <p className="pb-2">socials</p>
            <div className="flex gap-3 text-neutral-500">
              
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
