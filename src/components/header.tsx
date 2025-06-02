import { Button } from "./ui/button"
import HeaderImage from "@/food-header.avif"

export default function Header() {
	return (
		<div className="gap-8 mb-8 text-start">
			<h1 className="text-4xl font-bold text-red-500 ">cursus</h1>
			<div className=" p-6 relative bg-black -z-2 h-[60vh] max-h-[500px] rounded-xl">
				<h2 className="text-5xl tracking-tight text-white font-bold z-[99999] ml-0 max-w-sm">
					El teu plat abans de penjar el telèfon
				</h2>
				<p className="py-10 max-w-xl text-gray-200 font-semibold">
					Et portem els plats des de la cuina més propera a casa teva, perquè puguis
					gaudir de la millor gastronomia sense moure't del sofà.
				</p>
				<Button className="px-8  py-6 bg-white text-black">Veure menú</Button>
				<img
					src={HeaderImage}
					alt=""
					className="w-full h-[60vh] max-h-[500px] object-cover rounded-xl absolute top-0 left-0 -z-1 opacity-60 bg-black"
				/>
			</div>
		</div>
	)
}
