import React from 'react';
import { socialLinks } from '../constants';
import { Button } from './ui/button';
const Profile = () => {
  return (
    <aside
      className='
  max-w-3xl border m-4 border-neutral-600 bg-neutral-900 text-white 
  p-5 rounded-lg
  lg:sticky lg:top-6  lg:w-80 lg:max-h-[90vh] lg:overflow-hidden
'
    >
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between gap-x-6'>
          <h1 className='text-lg font-bold'>katleo</h1>
          <p className='text-xs'>Full stack developer</p>
        </div>

        <img
          src='/images/profile.jpeg'
          alt='katleo'
          className='w-full rounded-2xl object-cover h-96 lg:h-56' // ← reduced from h-80
        />

        <div className='mt-4'>
          <p className='text-xs text-neutral-300'>specialization</p>
          <p className='text-base capitalize'>backend development</p>
        </div>

        <div className='mt-4'>
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
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>

        <Button className='mt-1'>Contact Me</Button>
      </div>
    </aside>
  );
};

export default Profile;
