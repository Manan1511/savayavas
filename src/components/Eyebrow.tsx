/**
 * The brass label that sits above every section headline in the design —
 * "ABOUT US", "HOW WE CREATE", "OUR QUALITY", "KIND WORDS". The single most
 * repeated device on the site, so it exists exactly once.
 */
export function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`u-eyebrow ${className}`}>{children}</p>
}
