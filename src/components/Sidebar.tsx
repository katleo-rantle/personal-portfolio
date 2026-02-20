import React from 'react';
import { Sheet, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Ghost, MenuIcon } from 'lucide-react';

const Sidebar = () => {
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
      </Sheet>
    </>
  );
};

export default Sidebar;
