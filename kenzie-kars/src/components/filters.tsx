import { useState, useContext } from "react";
import { FilterContext } from "@/contexts/filterContext";

const Filters = () => {
  const { Filter, FilterInput } = useContext(FilterContext);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [fuel, setFuel] = useState("");
  const [minKm, setMinKm] = useState("");
  const [maxKm, setMaxKm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilter = () => {
    Filter(brand, model, color, year, fuel);
    FilterInput(minPrice, maxPrice);
  };

  return (
    <aside className="flex flex-col justify-start gap-4 sm:w-full md:w-[25%] p-8">
      <h3 className="font-semibold text-lg">Marca</h3>
      <div className="flex flex-col gap-1 justify-start w-full pr-[250px]">
        <button
          className={`text-sm text-grey-2 ${brand === "General Motors" && "selected"}`}
          onClick={() => setBrand("General Motors")}>
          General Motors
        </button>
        <button
          className={`text-sm text-grey-2 ${brand === "Fiat" && "selected"}`}
          onClick={() => setBrand("Fiat")}>
          Fiat
        </button>
        <button
          className={`text-sm text-grey-2 ${brand === "Ford" && "selected"}`}
          onClick={() => setBrand("Ford")}>
          Ford
        </button>
        <button
          className={`text-sm text-grey-2 ${brand === "Honda" && "selected"}`}
          onClick={() => setBrand("Honda")}>
          Honda
        </button>
        <button
          className={`text-sm text-grey-2 ${brand === "Toyota" && "selected"}`}
          onClick={() => setBrand("Toyota")}>
          Toyota
        </button>
        <button
          className={`text-sm text-grey-2 ${brand === "Volkswagen" && "selected"}`}
          onClick={() => setBrand("Volkswagen")}>
          Volkswagen
        </button>
      </div>

      <h3 className="font-semibold text-lg">Modelo</h3>
      <div className="flex flex-col gap-1 justify-start pr-[250px]">
        <button
          className={`text-sm text-grey-2 ${model === "Civic" && "selected"}`}
          onClick={() => setModel("Civic")}>
          Civic
        </button>
        <button
          className={`text-sm text-grey-2 ${model === "Corolla" && "selected"}`}
          onClick={() => setModel("Corolla")}>
          Corolla
        </button>
        <button
          className={`text-sm text-grey-2 ${model === "Cruze" && "selected"}`}
          onClick={() => setModel("Cruze")}>
          Cruze
        </button>
        <button
          className={`text-sm text-grey-2 ${model === "Fit" && "selected"}`}
          onClick={() => setModel("Fit")}>
          Fit
        </button>
        <button
          className={`text-sm text-grey-2 ${model === "Gol" && "selected"}`}
          onClick={() => setModel("Gol")}>
          Gol
        </button>
        <button
          className={`text-sm text-grey-2 ${model === "Ka" && "selected"}`}
          onClick={() => setModel("Ka")}>
          Ka
        </button>
        <button
          className={`text-sm text-grey-2 ${model === "Onix" && "selected"}`}
          onClick={() => setModel("Onix")}>
          Onix
        </button>
        <button
          className={`text-sm text-grey-2 ${model === "Pulse" && "selected"}`}
          onClick={() => setModel("Pulse")}>
          Pulse
        </button>
      </div>

      <h3 className="font-semibold text-lg">Cor</h3>
      <div className="flex flex-col pr-[250px]">
        <button
          className={`text-sm text-grey-2 ${color === "Azul" && "selected"}`}
          onClick={() => setColor("Azul")}>
          Azul
        </button>
        <button
          className={`text-sm text-grey-2 ${color === "Branca" && "selected"}`}
          onClick={() => setColor("Branca")}>
          Branca
        </button>
        <button
          className={`text-sm text-grey-2 ${color === "Cinza" && "selected"}`}
          onClick={() => setColor("Cinza")}>
          Cinza
        </button>
        <button
          className={`text-sm text-grey-2 ${color === "Prata" && "selected"}`}
          onClick={() => setColor("Prata")}>
          Prata
        </button>
        <button
          className={`text-sm text-grey-2 ${color === "Preta" && "selected"}`}
          onClick={() => setColor("Preta")}>
          Preta
        </button>
        <button
          className={`text-sm text-grey-2 ${color === "Verde" && "selected"}`}
          onClick={() => setColor("Verde")}>
          Verde
        </button>
      </div>

      <h3 className="font-semibold text-lg">Ano</h3>
      <div className="flex flex-col gap-1 justify-start pr-[250px]">
        <button
          className={`text-sm text-grey-2 ${year === "2022" && "selected"}`}
          onClick={() => setYear("2022")}>
          2022
        </button>
        <button
          className={`text-sm text-grey-2 ${year === "2021" && "selected"}`}
          onClick={() => setYear("2021")}>
          2021
        </button>
        <button
          className={`text-sm text-grey-2 ${year === "2018" && "selected"}`}
          onClick={() => setYear("2018")}>
          2018
        </button>
        <button
          className={`text-sm text-grey-2 ${year === "2015" && "selected"}`}
          onClick={() => setYear("2015")}>
          2015
        </button>
        <button
          className={`text-sm text-grey-2 ${year === "2013" && "selected"}`}
          onClick={() => setYear("2013")}>
          2013
        </button>
        <button
          className={`text-sm text-grey-2 ${year === "2012" && "selected"}`}
          onClick={() => setYear("2012")}>
          2012
        </button>
        <button
          className={`text-sm text-grey-2 ${year === "2010" && "selected"}`}
          onClick={() => setYear("2010")}>
          2010
        </button>
      </div>

      <h3 className="font-semibold text-lg">Combustível</h3>
      <div className="flex flex-col gap-1 justify-start pr-[250px]">
        <button
          className={`text-sm text-grey-2 ${fuel === "Diesel" && "selected"}`}
          onClick={() => setFuel("Diesel")}>
          Diesel
        </button>
        <button
          className={`text-sm text-grey-2 ${fuel === "Gasolina" && "selected"}`}
          onClick={() => setFuel("Gasolina")}>
          Gasolina
        </button>
        <button
          className={`text-sm text-grey-2 ${fuel === "Etanol" && "selected"}`}
          onClick={() => setFuel("Etanol")}>
          Etanol
        </button>
        <button
          className={`text-sm text-grey-2 ${fuel === "Flex" && "selected"}`}
          onClick={() => setFuel("Flex")}>
          Flex
        </button>
      </div>

      <h3 className="font-semibold text-lg">Km</h3>
      <div className="flex gap-4">
        <input
          className="bg-grey-5 w-1/2 input-text text-center"
          type="text"
          placeholder="Mínima"
          value={minKm}
          onChange={(e) => setMinKm(e.target.value)}
        />
        <input
          className="bg-grey-5 w-1/2 input-text text-center"
          type="text"
          placeholder="Máxima"
          value={maxKm}
          onChange={(e) => setMaxKm(e.target.value)}
        />
      </div>

      <h3 className="font-semibold text-lg">Preço</h3>
      <div className="flex gap-4">
        <input
          className="bg-grey-5 w-1/2 input-text text-center"
          type="text"
          placeholder="Mínimo"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          className="bg-grey-5 w-1/2 input-text text-center"
          type="text"
          placeholder="Máximo"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <button className="mt-8 medium-brand-1" type="submit" onClick={handleFilter}>
        Ver anúncios
      </button>
    </aside>
  );
};

export default Filters;
