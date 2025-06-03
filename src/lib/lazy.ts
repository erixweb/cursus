// Lazy load images using Intersection Observer API
export function lazyLoadImages() {
	const images = document.querySelectorAll("img[data-src]")
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const img = entry.target as HTMLImageElement
					img.src = img.dataset.src || ""
					img.removeAttribute("data-src")
					observer.unobserve(img)
				}
			})
		},
		{
			rootMargin: "0px 0px 50px 0px",
			threshold: 0.1,
		}
	)
	images.forEach((img) => {
		if (img.dataset.src) {
			observer.observe(img)
		}
	})
	console.log(`Lazy loading ${images.length} images`)
}

window.addEventListener("load", () => {
	// Initialize lazy loading after the window has loaded
	lazyLoadImages()
})
