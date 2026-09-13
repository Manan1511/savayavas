/**
 * Video counterpart to Figure — same reserved-box, no-CLS treatment, for the
 * rare spot where a looping clip stands in for a photo. Always silent
 * autoplay: there is no audio track to begin with (stripped at encode time),
 * and a muted, looping, playsInline video is the only kind a browser will
 * autoplay without a user gesture.
 */
export function VideoFigure({
  src,
  poster,
  aspect,
  className = '',
  rounded = false,
}: {
  src: string
  poster: string
  aspect: number
  className?: string
  rounded?: boolean
}) {
  return (
    <div className={`overflow-hidden bg-greige ${rounded ? 'rounded-sm' : ''} ${className}`} style={{ aspectRatio: aspect }}>
      <video
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden
        className="h-full w-full object-cover"
      />
    </div>
  )
}
