import { asset, type AssetKey } from '@/assets/registry'

/**
 * The only way an image reaches the page.
 *
 * Renders at the registry's declared aspect ratio and reserves that box before
 * the file loads, so swapping a placeholder for real photography changes what
 * is inside the frame but never the layout around it. Also means no CLS.
 */
export function Figure({
  name,
  className = '',
  imgClassName = '',
  priority = false,
  rounded = false,
}: {
  name: AssetKey
  className?: string
  imgClassName?: string
  /** Set on the hero image only; everything else stays lazy. */
  priority?: boolean
  rounded?: boolean
}) {
  const a = asset(name)

  return (
    <div className={`overflow-hidden bg-greige ${rounded ? 'rounded-sm' : ''} ${className}`} style={{ aspectRatio: a.aspect }}>
      <img
        src={a.src}
        alt={a.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={`h-full w-full object-cover ${imgClassName}`}
        // Decorative images carry alt="" and must be hidden from the a11y tree.
        aria-hidden={a.alt === '' ? true : undefined}
      />
    </div>
  )
}
