/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"
import { useState, useEffect } from "react"
import { Product } from "./product.tsx"

const AppRouter = () => {
	const [route, setRoute] = useState(window.location.pathname)

	useEffect(() => {
		const handleRouteChange = () => {
			setRoute(window.location.pathname)
		}

		window.addEventListener("popstate", handleRouteChange)
		window.addEventListener("pushstate", handleRouteChange)

		return () => {
			window.removeEventListener("popstate", handleRouteChange)
			window.removeEventListener("pushstate", handleRouteChange)
		}
	}, [])

	const navigate = (path: string) => {
		window.history.pushState({}, path, path)
		setRoute(path)
	}

	let content
	switch (route) {
		case "/":
			const { App } = require("./App.tsx")
			content = <App />
			break
		case route.startsWith("/products/") ? route : undefined:
			const { Product } = require("./product.tsx")
			// Extract the product ID from the URL
			const productId = window.location.pathname.split("/").pop()

			// Fetch the product data based on the ID
			const [product, setProduct] = useState(null)

			useEffect(() => {
				const fetchProduct = async () => {
					try {
						const response = await fetch(`/product/${productId}`)

						if (!response.ok) {
							throw new Error(`HTTP error! Status: ${response.status}`)
						}

						const productData = await response.json()
						setProduct(productData)
					} catch (error) {
						console.error("Could not fetch product:", error)
						// Handle error appropriately, e.g., display an error message
					}
				}

				fetchProduct()
			}, [productId])

			if (!product) {
				return <div>No product found...</div> // Or a loading spinner
			}

			content = <Product product={product} />

			break
		default:
			content = <App />
	}

	return <>{content}</>
}

const elem = document.getElementById("root")!
const app = (
	<StrictMode>
		<AppRouter />
	</StrictMode>
)

if (import.meta.hot) {
	// With hot module reloading, `import.meta.hot.data` is persisted.
	const root = (import.meta.hot.data.root ??= createRoot(elem))
	root.render(app)
} else {
	// The hot module reloading API is not available in production.
	createRoot(elem).render(app)
}
