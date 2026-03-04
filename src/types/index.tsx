import type { JSX } from 'react';
import type { IconType } from 'react-icons';

export type ProjectType = {
  imgSrc: string;
  title: string;
  tags: string[];
  projectLink: string;
};

export type ExperienceType = {
  year: string;
  title: string;
  institute: string;
  desc: string;
};

export type ServiceType = {
  title: string;
  desc: string;
  projects: string;
  icon: JSX.Element;
};

export type ToolsType = {
  imgSrc: string;
  label: string;
};

export type StatsType = {
  number: string;
  label: string;
};

export type TestimonialsType = {
  name: string;
  role: string;
  image: string;
  text: string;
  link: string;
};

export type LinksType = {
  label: string;
  link: string;
  icon: IconType;
};
