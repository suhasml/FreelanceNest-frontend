import { BotMessageSquare } from "lucide-react";
import { AppWindow } from 'lucide-react';
import { Braces } from 'lucide-react';
import { PersonStanding } from 'lucide-react';
import { Signal } from 'lucide-react';
import { GlobeLock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Features", href: "#" },
  { label: "Workflow", href: "#" },
  { label: "Testimonials", href: "#" },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Tailored Opportunities",
    description:
      "Tailor your freelance journey with personalized job recommendations and advanced filtering for the perfect match",
  },
  {
    icon: <Braces />,
    text: "Diverse Marketplace",
    description:
      "Dive into a diverse range of freelance gigs across tech, design, marketing, and more, tailored to match your expertise.",
  },
  {
    icon: <PersonStanding />,
    text: "Verified Clients & Projects",
    description:
      "Connect with trusted clients and verified projects, ensuring a secure and reliable freelance experience.",
  },
  {
    icon: <AppWindow />,
    text: "Our Mission",
    description:
      "Empowering individuals globally through sustainable employment opportunities and community-driven initiatives.",
  },
  {
    icon: <Signal />,
    text: "Empowering Opportunity",
    description:
      "Empower individuals and communities through meaningful employment opportunities with Give Work initiatives, fostering economic independence and empowerment.",
  },
  {
    icon: <GlobeLock />,
    text: "Get Involved",
    description:
      "Join us in making a difference through volunteering, donations, or partnering with Give Work initiatives.",
  },
];

export const checklistItems = [
  {
    title: "Code merge made easy",
    description:
      "Streamline collaboration and code integration effortlessly with our simplified merge process.",
  },
  {
    title: "Review code without worry",
    description:
      "Review code worry-free with our AI-powered platform ensuring accuracy and security.",
  },
  {
    title: "AI Assistance to reduce time",
    description:
      "Efficient AI tools streamline tasks and minimize time investments for enhanced productivity.",
  },
  {
    title: "Share work in minutes",
    description:
      "Effortlessly distribute work assignments within minutes with our streamlined platform.",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "1 Time Mentoring",
      "Less reach area",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Private board sharing",
      "Weekly once mentoring",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Private board sharing",
      "Industry expert Mentoring",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
