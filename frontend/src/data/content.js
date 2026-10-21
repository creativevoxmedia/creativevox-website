/**
 * ============================================================
 * CreativeVox Media — SITE CONTENT CONFIG
 * ------------------------------------------------------------
 * This single file holds every piece of text on the website.
 * Edit the copy here — you never need to touch the components.
 * ============================================================
 */

export const site = {
  name: 'CreativeVox Media',
  tagline: 'Stop blending in.',
  descriptor: 'Creative · Digital · Technology',
  descriptorWords: ['CREATIVE', 'DIGITAL', 'TECHNOLOGY'],
  location: 'Bareilly, Uttar Pradesh, India',
  email: 'team@creativevoxmedia.com',
  audience: 'For businesses, startups & individuals',
  url: 'https://www.creativevoxmedia.com',
};

export const nav = {
  links: [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Our Work', href: '#work' },
    { label: 'Our Approach', href: '#approach' },
  ],
  cta: { label: "Let's Talk", href: '#contact' },
};

export const hero = {
  eyebrow: 'YOUR IDEAS. OUR CREATIVE EXECUTION.',
  headlineWhite: 'Stop blending in.',
  headlineGradient: 'Start standing out.',
  description:
    'We help businesses build a stronger digital presence through thoughtful design, modern websites and creative marketing that puts their brand in the spotlight.',
  primaryCta: { label: 'Start a Project', href: '#contact' },
  secondaryCta: { label: 'Explore Services', href: '#services' },
  avatars: ['CV', 'D', '+'],
  avatarsLine: 'Creative thinking. Practical digital solutions.',
  visual: {
    image: '/hero-artwork.jpg',
    imageAlt: 'Abstract colorful 3D sculpture representing creative ideas, in red, orange, pink and purple tones',
    cardTitle: 'MAKE IT MATTER.',
    cardSubtitle: 'IDEAS INTO IMPACT',
    cardBrand: 'CREATIVEVOX / STUDIO',
    chips: ['✳ Creative by design', '↗ Built for growth'],
  },
};

export const ticker = {
  items: [
    'Website Development',
    'Landing Pages',
    'Social Media',
    'Posters',
    'Reels',
    'Content',
    'Strategy',
    'Branding',
  ],
  separator: '✦',
};

export const services = {
  eyebrow: '01 — Our Services',
  heading: ['Digital services that', 'move you forward.'],
  sub: 'From your first online presence to your next campaign, we bring design, technology and content together under one roof.',
  items: [
    {
      number: '01',
      category: 'DEVELOPMENT',
      icon: 'Globe',
      title: 'Website Development',
      description:
        'Responsive, user-friendly websites designed to present your business clearly and help visitors take action.',
    },
    {
      number: '02',
      category: 'DESIGN',
      icon: 'LayoutTemplate',
      title: 'Website & Landing Page Design',
      description:
        'Modern layouts and focused landing pages that communicate your value and support your business goals.',
    },
    {
      number: '03',
      category: 'MARKETING',
      icon: 'Megaphone',
      title: 'Social Media Marketing',
      description:
        'Consistent social media planning, page management and campaign support to strengthen your online presence.',
    },
    {
      number: '04',
      category: 'CREATIVE',
      icon: 'Palette',
      title: 'Creative Posts & Posters',
      description:
        'Brand-aligned social posts and promotional creatives that make your message clear and memorable.',
    },
    {
      number: '05',
      category: 'VIDEO',
      icon: 'Clapperboard',
      title: 'Reel & Video Editing',
      description:
        'Short-form video editing for social platforms, designed to keep content engaging and on-brand.',
    },
    {
      number: '06',
      category: 'CONTENT',
      icon: 'PenTool',
      title: 'Content Creation',
      description:
        'Creative content ideas and copy to help businesses communicate with the right audience.',
    },
  ],
  featured: {
    eyebrow: 'FEATURED SERVICE',
    title: 'Website Development',
    description:
      'Responsive, user-friendly websites designed to present your business clearly and help visitors take action. We plan, design and build sites that feel modern, load fast and represent your brand with confidence.',
    checklist: [
      'Responsive, user-friendly layouts',
      'Your business presented clearly',
      'Built to help visitors take action',
    ],
    cta: { label: 'Learn More', href: '#contact' },
    mockupUrl: 'creativevoxmedia.com',
  },
};

export const about = {
  eyebrow: '02 — About Us',
  quote:
    'Good ideas deserve a digital presence that does them justice.',
  quoteAttribution: 'THE CREATIVEVOX APPROACH',
  heading: ['Creative thinking.', 'Real-world solutions.'],
  paragraphs: [
    'CreativeVox Media is a digital services agency based in Bareilly, Uttar Pradesh, India. We bring creative execution and technology together to help businesses, startups and individuals present themselves confidently online.',
    'Our approach is straightforward: understand the goal, create with purpose, and deliver digital experiences that feel clear, useful and consistent with your brand.',
  ],
  pills: [
    'Purpose-led creativity',
    'Business-first thinking',
    'Modern digital solutions',
    'Collaborative approach',
  ],
};

export const stats = {
  eyebrow: 'IN NUMBERS',
  items: [
    { value: 6, suffix: '+', label: 'Services' },
    { value: 4, suffix: '-Step', label: 'Process' },
    { value: 100, suffix: '%', label: 'Custom Work' },
    { value: 24, suffix: 'h', label: 'Response Time' },
  ],
};

export const work = {
  eyebrow: '03 — Our Work',
  heading: ['Ideas made for the', 'digital world.'],
  sub: 'A look at the kinds of solutions we can create for your business. Project examples can be added here as our portfolio grows.',
};

export const bring = {
  eyebrow: '04 — Our Approach',
  heading: ['One creative partner.', 'Multiple ways to grow.'],
  sub: 'We combine practical thinking, creative execution and digital know-how to help your business show up with confidence.',
  items: [
    {
      number: '01',
      title: 'Strategy first',
      description: 'Clear goals, thoughtful planning and business-focused decisions.',
      image: '/images/approach-1.jpeg',
    },
    {
      number: '02',
      title: 'Creative execution',
      description: 'Consistent visuals and content shaped around your brand.',
      image: '/images/approach-2.jpeg',
    },
    {
      number: '03',
      title: 'Digital delivery',
      description: 'Modern web experiences and digital solutions built for your needs.',
      image: '/images/approach-3.jpeg',
    },
  ],
};

export const process = {
  eyebrow: '05 — How We Work',
  heading: ['Simple process.', 'Clear direction.'],
  steps: [
    {
      step: 'STEP 01',
      title: 'Discover',
      description: 'We learn about your business, audience and goals.',
    },
    {
      step: 'STEP 02',
      title: 'Plan',
      description: 'We define the right approach, deliverables and direction.',
    },
    {
      step: 'STEP 03',
      title: 'Create',
      description: 'We turn the agreed direction into a thoughtful digital solution.',
    },
    {
      step: 'STEP 04',
      title: 'Refine',
      description: 'We review the work and make improvements based on feedback.',
    },
  ],
};

export const testimonials = {
  eyebrow: '06 — What Our Clients Say',
  heading: ['Our happy customers.'],
  sub: 'Placeholder reviews below — replace them with real client words as your first projects wrap (see README).',
};

export const contact = {
  eyebrow: '06 — Contact',
  heading: ["Let's make something", 'stand out.'],
  text: "Tell us what you're building, what you want to improve or where you need creative support. Let's explore the right solution for your business.",
  primaryCta: { label: 'Email Our Team', href: 'mailto:team@creativevoxmedia.com' },
  secondaryCta: { label: 'Discuss Your Project', href: '#contact-form' },
  info: [
    { icon: 'Mail', label: 'EMAIL US', value: 'team@creativevoxmedia.com', href: 'mailto:team@creativevoxmedia.com' },
    { icon: 'MapPin', label: 'OUR LOCATION', value: 'Bareilly, Uttar Pradesh, India' },
    { icon: 'Users', label: 'WORKING TOGETHER', value: 'For businesses, startups & individuals' },
  ],
  serviceOptions: [
    'Website Development',
    'Website & Landing Page Design',
    'Social Media Marketing',
    'Creative Posts & Posters',
    'Reel & Video Editing',
    'Content Creation',
    'Something else',
  ],
  budgetOptions: [
    'Under ₹10,000',
    '₹10,000 – ₹25,000',
    '₹25,000 – ₹50,000',
    '₹50,000+',
    'Not sure yet',
  ],
};

export const footer = {
  bigLine: 'STOP BLENDING IN.',
  copyright: '© 2026 CreativeVox Media. All rights reserved.',
  links: [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'Email', href: 'mailto:team@creativevoxmedia.com' },
  ],
  socials: [
    // Add your real profile URLs here — empty url renders a non-link icon.
    { icon: 'Instagram', label: 'Instagram', url: '' },
    { icon: 'Linkedin', label: 'LinkedIn', url: '' },
    { icon: 'Twitter', label: 'X (Twitter)', url: '' },
    { icon: 'Mail', label: 'Email', url: 'mailto:team@creativevoxmedia.com' },
  ],
};
