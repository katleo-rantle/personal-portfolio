import type { LinksType } from "@/types";
import {
  Briefcase,
  Code,
  FileText,
  Home,
  Mail,
  MessageCircle,
  Settings,
  User
} from 'lucide-react';

import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';


const navLinks: LinksType[] = [
  { label: 'Home', link: '#hero', icon: Home },
  {
    label: 'Projects',
    link: '#projects',
    icon: Briefcase,
  },
  { label: 'About', link: '#about', icon: User },
  {
    label: 'Skills',
    link: '#Skills',
    icon: Code,
  },
  { label: 'Resume', link: '#resume', icon: FileText },
  // {
  //   label: 'Reviews',
  //   link: '#testimonials',
  //   icon: MessageCircle,
  // },
  { label: 'Contact', link: '#contact', icon: Mail },
];

const socialLinks: LinksType[] = [
  // {
  //   icon: Facebook,
  //   label: 'Facebook',
  //   link: '/#',
  // },
  // {
  //   icon: Instagram,
  //   label: 'Instagram',
  //   link: '/#',
  // },
  // {
  //   icon: Twitter,
  //   label: 'Twitter',
  //   link: '/#',
  // },
  {
    icon: FaYoutube,
    label: 'Youtube',
    link: '/#',
  },

  {
    icon: FaGithub,
    label: 'GitHub',
    link: '/#',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    link: '/#',
  },
];

export {
 navLinks
, socialLinks
}