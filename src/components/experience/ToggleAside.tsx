import React, { useState } from 'react';
import { Button } from '../ui/button';
import { socialLinks } from '@/constants';

// ─── Profile Content ────────────────────────────────────────────────────────
function ProfileContent() {
  return (
    <div className='fflex flex-col h-full'>
      <div className='flex items-center justify-between gap-x-6'>
        <h1 className='text-lg font-bold'>katleo</h1>
        <p className='text-xs'>Full stack developer</p>
      </div>
      <img
        src='/images/profile.jpeg'
        alt='katleo'
        className='w-full rounded-2xl object-cover h-56 lg:h-48'
      />
      <div className='mt-2'>
        <p className='text-xs text-neutral-300'>specialization</p>
        <p className='text-base capitalize'>backend development</p>
      </div>
      <div className='mt-2'>
        <p className='text-xs text-neutral-300'>based in</p>
        <p className='text-base capitalize'>Durban SA</p>
      </div>
      <div className='flex gap-2 pt-1 text-neutral-500'>
        {socialLinks.map((link, i) => {
          const Icon = link.icon;
          return (
            <a
              key={i}
              href={link.link}
              className='hover:text-primary border-2 border-neutral-500 p-2 rounded-full hover:border-primary transition duration-200'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Icon size={18} />
            </a>
          );
        })}
      </div>
      {/* <Button className="mt-2">Contact Me</Button> */}
    </div>
  );
}


// ─── Main Toggle Aside ──────────────────────────────────────────────────────
export default function ToggleAside() {
  const [showRobot, setShowRobot] = useState(false);

  return (
    <aside
      className='
        border m-4 border-neutral-600 bg-neutral-900 text-white
        p-5 rounded-lg  max-w-96 
        lg:sticky lg:top-6 md:w-[500px] lg:max-h-[90vh] lg:overflow-y-auto mx-auto md:mx-4
      '
    >
      {/* Toggle Header */}
      <div className='flex justify-between items-center mb-2'>
        <h2 className='text-lg font-semibold'>
          {showRobot ? 'Robot Chat' : ''}
        </h2>

        <Button
          variant='outline'
          size='sm'
          onClick={() => setShowRobot(!showRobot)}
          className='text-xs'
        >
          {showRobot ? 'Show Profile' : 'Open Chat'}
        </Button>
      </div>

      {/* Content */}
      {showRobot ? <RobotWithChat /> : <ProfileContent />}
    </aside>
  );
}
