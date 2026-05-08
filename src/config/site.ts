// Site configuration
export const SITE = {
  title: 'Ichnos Consultancy Ltd',
  description: 'Recruitment, human resources, mergers and acquisitions.',
  url: 'https://www.ichnosconsultancy.com/',
  author: 'Ichnos Consultancy Ltd',
  email: 'gittires@gmail.com',
  CBID: 'bb608901-c6b3-4a4d-8e0d-06f3de527241'
} as const;

export const RECAPTCHA = {
  siteKey: '6Lfakt8sAAAAAIGy5TI0MdGsr3_EQfOTMnoiR7Y0',
  secretKey: '6Lfakt8sAAAAAG7znnRNcki1V8SO7FxS-EV_Sqj_'
} as const;

export const RESEND = {
  apiKey: 're_5MJnuSjA_Me7AdL6Y6u6AAsoifEAUKwYA'
} as const;

export const COOKIEBOT = {
  apiKey: 're_5MJnuSjA_Me7AdL6Y6u6AAsoifEAUKwYA'
} as const;

export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/#about-us' },
  { name: 'Partners', href: '/#partners' },
  { name: 'Vacancy', href: '/#vacancy' },
  { name: 'M&A', href: '/#mergers-and-acquisitions' },
  { name: 'News', href: '/#news' },
] as const;

export const SOCIAL_LINKS = {
  luca: 'https://www.linkedin.com/in/luca-ittiresu-42188432/',
  linkedin: 'https://linkedin.com/company/yourcompany',
  twitter: 'https://twitter.com/yourcompany',
  facebook: 'https://facebook.com/yourcompany',
} as const;

