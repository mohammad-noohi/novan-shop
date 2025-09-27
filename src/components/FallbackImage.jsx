export default function FallbackImage({ src, alt = "Image", replaceSrc = "/images/products/No-Image-Placeholder.png", className, ...props }) {
  function handleError(e) {
    e.currentTarget.src = replaceSrc;
    e.currentTarget.alt = "No Image Available";
    e.currentTarget.onerror = null; // avoid onerror event loop
  }

  return <img className={className} src={src} alt={alt} onError={handleError} {...props} />;
}
