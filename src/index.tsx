import { serve } from "bun"
import index from "./index.html"

const server = serve({
	routes: {
		// Serve index.html for all unmatched routes.
		"/*": index,
		"/product/*": index,
		"/product/:productId": async (req) => {
			const productId: number = parseInt(req.params.productId)

			const products = await Bun.file(__dirname + "/data/products.json").json()

			const product = products[productId - 1]

			if (!product) {
				return new Response("Product not found", { status: 404 })
			}
			
			return new Response(JSON.stringify(product), {
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "public, max-age=3600",
					"body": product,
				},
			})
		},
		// Serve static files from assets
		"/assets/*": async (req) => {
			const path =
				__dirname +
				("./assets" + req.url.replace(new URL(req.url).origin + "/assets", "")).replace(
					".",
					""
				)

			if (await Bun.file(path).exists()) {
				const file = Bun.file(path)
				const contentType = file.type
				return new Response(await file.arrayBuffer(), {
					headers: {
						"Content-Type": contentType,
					},
				})
			}

			return new Response("File not found", { status: 404 })
		},
	},
	fetch(req) {
		// Handle all other requests with the default fetch handler
		return new Response("Not Found", { status: 404 })
	},

	development: process.env.NODE_ENV !== "production" && {
		// Enable browser hot reloading in development
		hmr: false,

		// Echo console logs from the browser to the server
		console: true,
	},
})

console.log(`🚀 Server running at ${server.url}`)
