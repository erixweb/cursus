import { useEffect, useRef, useState } from "react"

const LazyImage = ({ src, alt, placeholder = "/placeholder.png", ...props }) => {
	const [isInView, setIsInView] = useState(false)
	const imgRef = useRef<HTMLImageElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsInView(true)
						obs.disconnect() // Deja de observar una vez cargada la imagen
					}
				})
			},
			{
				root: null, // viewport
				threshold: 0.5, // 50% visible
			}
		)

		if (imgRef.current) {
			observer.observe(imgRef.current);
		}

		return () => {
			observer.disconnect()
		}
	}, [])

	return <img ref={imgRef} src={isInView ? src : placeholder} alt={alt} {...props} />
}

export default LazyImage
