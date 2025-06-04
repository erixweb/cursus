import Header from "./components/header"
import ProductCard from "./components/product-card"
import "./index.css"

export function App() {
	return (
		<div className="container w-full mx-auto p-8 text-center relative z-10">
			<Header />
			<main className="w-full text-start ">
				<h2 className="text-3xl font-bold mb-4">Benvingut a Cursus</h2>
				<p className="text-lg text-gray-700 mb-8">
					Descobreix els millors plats de la teva zona i gaudeix d'una experiència
					gastronòmica única.
				</p>
				<p className="text-md text-gray-500">
					Explora el nostre menú i fes la teva comanda ara mateix!
				</p>
				<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
					<ProductCard 
						product={{
							url: "/",
							image: "./assets/arroz-costilla-setas-frontal.webp",
							title: "Arroz con magro y setas",
							weight: "420g",
							price: "6,99€",
							kilocalories: "714",
							fat: "41g",
							carbohydrates: "64g",
							proteins: "23g"
						}}
					/>
				</section>
			</main>
		</div>
	)
}

export default App
