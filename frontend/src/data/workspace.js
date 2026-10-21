/**
 * Data brought over from the CreativeVox "Workspace" site:
 *  - the four Google Drive videos (AI + real footage)
 *  - the detail text shown when a service card is opened
 *
 * To add or change a video, edit `videos` below. The id is the long code in a
 * Drive link:  drive.google.com/file/d/<ID>/view   (the file must be shared as
 * "Anyone with the link can view").
 */

export const driveEmbed = (id) => `https://drive.google.com/file/d/${id}/preview`;
export const driveOpen = (id) => `https://drive.google.com/file/d/${id}/view`;

export const videos = {
  ai: {
    title: 'AI Videos',
    intro: 'AI-generated videos and promotional concepts created for CreativeVox Media.',
    items: [
      { title: 'AI Video Project 1', id: '11iIcxwsR4xGtDBxRsnYDwWwf0qRKPYcw' },
      { title: 'AI Video Project 2', id: '1J7h3GPDpOj9Nx-TVB2d9odih8Q3fHm-T' },
    ],
  },
  real: {
    title: 'Real Videos',
    intro: 'Real-footage videos and edits, kept separate from AI-generated projects.',
    items: [
      { title: 'Real Video Project 1', id: '14qSGMZakHOBjLFcpZbqFU2Dja2J-GUw_' },
      { title: 'Real Video Project 2', id: '1A1bFcgNVtV_2uqrQTbBJdZju4dsMMyeJ' },
    ],
  },
};

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;

// Keys must match the service titles in src/data/content.js
export const serviceDetails = {
  'Website Development': {
    image: img('photo-1498050108023-c5249f4df085'),
    intro:
      'We build responsive business websites that explain what you offer, establish credibility and guide visitors toward contacting you. The exact scope is agreed before work begins.',
    deliverables: [
      'Business website pages and navigation',
      'Responsive desktop, tablet and mobile layouts',
      'Contact buttons, email links and WhatsApp CTA',
      'Basic on-page SEO structure and metadata',
      'Performance, link and form checks',
      'Launch support and handover',
    ],
    process:
      'We discover your goals, agree the page structure and content, create the design, develop the site, review it with you, then make agreed refinements before launch.',
    inputs:
      'Your business details, services, logo and brand assets, preferred domain/hosting access when needed, contact details, and any text or photos you want included.',
  },
  'Website & Landing Page Design': {
    image: img('photo-1558655146-9f40138edfeb'),
    intro:
      'We design clear, modern website pages and focused landing pages around your audience and one primary goal, such as enquiries, bookings, sign-ups or product discovery.',
    deliverables: [
      'Page layout and visual direction',
      'Mobile-first responsive design',
      'Clear headings and calls to action',
      'Brand-aligned colors, typography and imagery',
      'Landing-page content structure',
      'Design review and refinement',
    ],
    process:
      'We define the target audience and action, map the content hierarchy, design the page, review it with you, and prepare the approved design for development.',
    inputs:
      'Your brand identity, audience, offer or campaign goal, required sections, reference websites you like, and the main action visitors should take.',
  },
  'Social Media Marketing': {
    image: img('photo-1611162616475-46b635cb6868'),
    intro:
      'We help your business maintain a consistent social presence with planned content, profile improvements and campaign ideas suited to your audience. Paid advertising or influencer costs are scoped separately.',
    deliverables: [
      'Profile and brand-presence review',
      'Monthly content calendar proposal',
      'Post and reel topic planning',
      'Captions, hashtags and publishing support',
      'Engagement and performance review',
      'Campaign recommendations based on goals',
    ],
    process:
      'We review your current profiles, agree objectives and content pillars, plan a calendar, prepare content for approval, publish or hand over as agreed, and review performance.',
    inputs:
      'Your social profile links, business goals, target audience, offers, brand assets, preferred posting frequency and access/permissions required for agreed tasks.',
  },
  'Creative Posts & Posters': {
    image: img('photo-1558655146-d09347e92766'),
    intro:
      'We create brand-aligned graphics for promotions, announcements, offers and everyday social content so your message looks clear and consistent across platforms.',
    deliverables: [
      'Instagram and Facebook post designs',
      'Promotional posters and offer creatives',
      'Campaign or event announcement graphics',
      'Brand-aligned colors and typography',
      'Platform-ready image exports',
      'Revision rounds agreed in the project scope',
    ],
    process:
      'We confirm the message, audience, platform and dimensions, create a visual direction, share a draft for feedback, then export the approved artwork.',
    inputs:
      'Logo, exact text and offer details, required dimensions/platforms, preferred colors or references, and any product or campaign images.',
  },
  'Reel & Video Editing': {
    image: img('photo-1574717024653-61fd2cf4d44d'),
    intro:
      'We edit short-form videos and reels for social platforms, shaping supplied footage into clear, engaging content that fits your brand voice.',
    deliverables: [
      'Short-form reel and video edits',
      'Cuts, pacing and transitions',
      'Text overlays and subtitles when supplied or agreed',
      'Music and sound balancing using suitable assets',
      'Basic color and framing adjustments',
      'Platform-ready export formats',
    ],
    process:
      'We agree the goal and format, review the footage, prepare an edit, collect your feedback, then deliver the approved export within the agreed scope.',
    inputs:
      'Raw footage, target platform and duration, key message or script, brand assets, reference style, and any required music or footage rights.',
  },
  'Content Creation': {
    image: img('photo-1542435503-956c469947f6'),
    intro:
      'We develop practical content ideas and copy that help businesses communicate their value consistently across websites and social channels.',
    deliverables: [
      'Content pillars and topic ideas',
      'Social captions and post copy',
      'Website section and service-page copy',
      'Campaign messaging and content hooks',
      'Content calendar suggestions',
      'Editing for clarity, tone and consistency',
    ],
    process:
      'We learn about your business and audience, define messaging themes, draft content, revise it with your feedback and prepare the approved copy for use.',
    inputs:
      'Business background, services, target audience, tone of voice, key offers, facts that must be included and any existing brand guidelines.',
  },
};