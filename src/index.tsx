import { serve } from "bun"
import index from "./index.html"

const server = serve({
	routes: {
		// Serve index.html for all unmatched routes.
		"/*": index,

		"/api/hello": {
			async GET(req) {
				return Response.json({
					message: "Hello, world!",
					method: "GET",
				})
			},
			async PUT(req) {
				return Response.json({
					message: "Hello, world!",
					method: "PUT",
				})
			},
		},

		"/api/hello/:name": async (req) => {
			const name = req.params.name
			return Response.json({
				message: `Hello, ${name}!`,
			})
		},
		// Serve static files from assets
		"/assets/*": async (req) => {
			const path = __dirname + ("./assets" + req.url.replace(new URL(req.url).origin + "/assets", "")).replace(".", "")

			
			if (await (Bun.file(path).exists())) {
				const file = Bun.file(path)
				const contentType = file.type;
				return new Response(await file.arrayBuffer(), {
					headers: {
						"Content-Type": contentType,
					},
				})
			}
			
			return new Response("File not found", { status: 404 })
		},
	},

	development: process.env.NODE_ENV !== "production" && {
		// Enable browser hot reloading in development
		hmr: false,

		// Echo console logs from the browser to the server
		console: true,
	},
})

console.log(`🚀 Server running at ${server.url}`)
