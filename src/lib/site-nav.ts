/** Shared navigation — studio (custom builds) + product shelf (subscriptions) */

export const STUDIO_NAV = [
  { href: "/services", label: "Services", hint: "Custom dev & design" },
  { href: "/work", label: "Work", hint: "Portfolio & case studies" },
  { href: "/start-project", label: "Start a project", hint: "Request a quote" },
] as const;

export const PRODUCT_NAV = [
  { href: "/products", label: "Products", hint: "13 licensed tools" },
  { href: "/telecom", label: "Telecom", hint: "Dialers & CRMs" },
  { href: "/demos", label: "Live demos", hint: "See products in action" },
  { href: "/pricing", label: "Pricing", hint: "Plans from $19/mo" },
  { href: "/compare", label: "Compare", hint: "Dialer tiers" },
] as const;

export const COMPANY_NAV = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
] as const;

export const FOOTER_PRODUCT_LINKS = [
  { href: "/products?cat=dialer", label: "Auto Dialers", hint: "From $29/mo" },
  { href: "/products?cat=email", label: "Email Tools", hint: "Verify & send" },
  { href: "/products?cat=scraper", label: "Web Scrapers", hint: "Lead extraction" },
  { href: "/products/mailforge", label: "Mailforge Bundle", hint: "All-in-one email" },
] as const;

export const FOOTER_STUDIO_LINKS = [
  { href: "/services", label: "Agency services" },
  { href: "/work", label: "Selected work" },
  { href: "/start-project", label: "Project inquiry" },
  { href: "/about", label: "About the studio" },
] as const;

export const PRODUCT_CATEGORIES = [
  { href: "/products?cat=dialer", label: "Auto Dialers", hint: "From $29/mo" },
  { href: "/products?cat=email", label: "Email Tools", hint: "Verify & send" },
  { href: "/products?cat=scraper", label: "Web Scrapers", hint: "Lead extraction" },
  { href: "/products?cat=bundle", label: "Bundles", hint: "Mailforge & more" },
] as const;

export const RESOURCE_NAV = [
  { href: "/guides", label: "Guides", hint: "SEO articles" },
  { href: "/telecom/crm-types", label: "CRM types", hint: "Telecom taxonomy" },
  { href: "/tools/dialer-calculator", label: "Dialer calculator", hint: "Free tool" },
  { href: "/resources/dialer-guide", label: "Comparison guide", hint: "Free download" },
] as const;

export const TELECOM_NAV = [
  { href: "/telecom", label: "Telecom hub", hint: "Outbound stack" },
  { href: "/telecom/best-auto-dialers", label: "Best dialers", hint: "Cold call & AI" },
  { href: "/telecom/use-cases", label: "Use cases", hint: "15 intents" },
  { href: "/telecom/auto-dialers", label: "Auto dialers", hint: "Google Voice plans" },
  { href: "/telecom/crm-types", label: "CRM types", hint: "14 categories" },
  { href: "/telecom/markets", label: "Markets", hint: "Global GEO" },
  { href: "/telecom/usa", label: "USA", hint: "US geo hub" },
  { href: "/telecom/canada", label: "Canada", hint: "CA geo hub" },
] as const;
