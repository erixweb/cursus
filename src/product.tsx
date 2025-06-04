import "./index.css"
import LazyImage from "./components/lazy-image.tsx"

export function Product({ product }: { product: any }) {
	return (
		<main className="container w-full mx-auto p-8 text-center relative z-10 flex">
			<LazyImage
				src={product.image}
				alt={product.title}
				className="w-full h-[100vh] max-h-[650px] object-cover rounded-lg shadow-lg"
			/>
			<div className="p-4 w-full">
				<h3 className="font-bold text-xl">{product.title}</h3>
				<p className="text-gray-600 mt-5 mb-5">{product.weight}</p>
				<span className="font-bold text-2xl">{product.price}</span>
				<div className="bg-gray-300 w-full p-4 mt-4 rounded-lg grid grid-cols-4 gap-4 text-center justify-center">
					<p className="flex flex-col w-full">
						<span>{product.kilocalories}</span>
						<small className="text-gray-600">Kilocalories</small>
					</p>
					<p className="flex flex-col w-full">
						<span>{product.fat}g</span>
						<small className="text-gray-600">Grasa</small>
					</p>
					<p className="flex flex-col w-full">
						<span>{product.carbohydrates}g</span>
						<small className="text-gray-600">Carbohidrats</small>
					</p>
					<p className="flex flex-col w-full">
						<span>{product.proteins}g</span>
						<small className="text-gray-600">Proteïnes</small>
					</p>
				</div>
			</div>
		</main>
	)
}
