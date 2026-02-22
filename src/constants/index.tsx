import type { LinksType } from "@/types";
import { Briefcase, Code, FileText, GithubIcon, Home, Mail, MessageCircle, Settings, User } from "lucide-react";

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
  // {
  //   icon: Youtube,
  //   label: 'Youtube',
  //   link: '/#',
  // },

  {
    icon: GithubIcon,
    label: 'Twitter',
    link: '/#',
  },
  {
    icon: Linkedin,
    label: 'Youtube',
    link: '/#',
  },
];

export {
 navLinks
}