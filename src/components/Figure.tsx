import { asset, type AssetKey } from '@/assets/registry'

/**
 * The only way an image reaches the page.
 *
 * Renders at the registry's declared aspect ratio and reserves that box before
 * the file loads, so swapping a placeholder for real photography changes what
 * is inside the frame but never the layout around it. Also means no CLS.
 *
 * Crop anchor defaults to the top-right corner, not the CSS default of
 * center: every supplied photograph carries a "VAS LUXE FABRICS" watermark
 * in that corner, and declared aspect rarely matches the source exactly, so
 * a center crop was clipping into the logo from whichever side overflowed.
 * Anchoring top-right means overflow is always trimmed from the bottom
 * and/or left instead, so the watermark corner is never touched.
 */
export function Figure({
  name,
  className = '',
  imgClassName = '',
  priority = false,
  rounded = false,
  aspect,
}: {
  name: AssetKey
  className?: string
  imgClassName?: string
  /** Set on the hero image only; everything else stays lazy. */
  priority?: boolean
  rounded?: boolean
  /** Overrides the registry's declared aspect ratio for this usage only. */
  aspect?: number
}) {
  const a = asset(name)

  return (
    <div className={`overflow-hidden bg-greige ${rounded ? 'rounded-sm' : ''} ${className}`} style={{ aspectRatio: aspect ?? a.aspect }}>
      <img
        src={a.src}
        alt={a.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={`h-full w-full object-cover object-right-top ${imgClassName}`}
        // Decorative images carry alt="" and must be hidden from the a11y tree.
        aria-hidden={a.alt === '' ? true : undefined}
      />
    </div>
  )
}
