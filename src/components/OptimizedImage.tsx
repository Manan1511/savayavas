import type { ImgHTMLAttributes } from 'react'

type OptimizedImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
  src: string
  alt: string
  /** WebP source for supporting browsers; the img URL remains the fallback. */
  webpSrc?: string
  pictureClassName?: string
}

/** Serve a compact WebP where supported and retain the original URL as fallback. */
export function OptimizedImage({ src, alt, webpSrc, pictureClassName, ...imageProps }: OptimizedImageProps) {
  return (
    <picture className={pictureClassName}>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img src={src} alt={alt} {...imageProps} />
    </picture>
  )
}
