import { FilterContext } from "@/contexts/filterContext";
import { useState, useContext, useEffect } from "react";
import api from "@/services/api";

interface iModel {
  id: string;
  name: string;
  brand: string;
  year: string;
  fuel: string;
  value: number;
}

const Filters = () => {
  const { setFilterList, allAnnouncements } = useContext(FilterContext);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState<iModel | null>(null);
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [fuel, setFuel] = useState("");
  const [minKm, setMinKm] = useState("");
  const [maxKm, setMaxKm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<iModel[]>([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  const getBrands = async () => {
    return api
      .get("https://kenzie-kars.herokuapp.com/cars")
      .then((res) => Object.keys(res.data))
      .catch((err) => err);
  };

  const getModels = async (brand: string): Promise<iModel[]> => {
    try {
      const response = await api.get<iModel[]>(
        `https://kenzie-kars.herokuapp.com/cars?brand=${brand}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    let list = allAnnouncements;
    if (brand != "") {
      list = list.filter((e) => e.brand.toLowerCase() == brand.toLowerCase());
    }
    if (model != null) {
      list = list.filter((e) => e.model == model.name);
    }
    if (color != "") {
      list = list.filter((e) => e.color.toLowerCase() == color.toLowerCase());
    }
    if (year != "") {
      list = list.filter((e) => e.year.toLowerCase() == year.toLowerCase());
    }
    if (minKm != "") {
      list = list.filter((e) => e.mileage == minKm);
    }
    if (maxKm != "") {
      list = list.filter((e) => e.mileage == maxKm);
    }
    if (minPrice != "") {
      list = list.filter((e) => e.price == minPrice);
    }
    if (maxPrice != "") {
      list = list.filter((e) => e.price == maxPrice);
    }
    setFilterList(list);
  }, [brand, model, color, year, minKm, maxKm, minPrice, maxPrice]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await getBrands();
        console.log(response);
        setBrands(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await getModels(brand);
        setModels(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchModels();
  }, [brand]);

  return (
    <aside className="flex flex-col justify-start gap-4 sm:w-full md:w-[25%] p-8">
      <h3 className="font-semibold text-lg">Marca</h3>
      <div className="flex flex-col gap-1 justify-start w-full pr-[200px]">
        {brands.map((brand: any) => (
          <button
            key={""}
            type="button"
            className={`text-sm text-grey-2 ${
              brand === selectedBrand ? "selected" : "text-grey-2"
            }`}
            onClick={() => {
              if (brand === selectedBrand) {
                setBrand("");
                setSelectedBrand("");
              } else {
                setBrand(brand);
                setSelectedBrand(brand);
              }
              setModel(null);
            }}>
            {brand}
          </button>
        ))}
      </div>

      <h3 className="font-semibold text-lg">Modelo</h3>
      <div className="flex flex-col gap-1 justify-start w-full pr-[150px]">
        {Array.isArray(models) &&
          models.map((modelItem) => {
            if (allAnnouncements.find((item) => item.model === modelItem.name)) {
              return (
                <button
                  key={modelItem.id}
                  type="button"
                  className={`text-sm text-grey-2 ${
                    model && model.id === modelItem.id && "selected"
                  }`}
                  onClick={() => {
                    model?.id === modelItem.id ? setModel(null) : setModel(modelItem);
                  }}>
                  {modelItem.name}
                </button>
              );
            }
            return null;
          })}
      </div>

      <h3 className="font-semibold text-lg">Cor</h3>
      <div className="flex flex-col pr-[250px]">
        <button
          type="button"
          className={`text-sm text-grey-2 ${color === "Azul" && "selected"}`}
          onClick={(e) => {
            color === "Azul" ? setColor("") : setColor("Azul");
          }}>
          Azul
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${color === "Branco" && "selected"}`}
          onClick={(e) => {
            color === "Branco" ? setColor("") : setColor("Branco");
          }}>
          Branco
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${color === "Cinza" && "selected"}`}
          onClick={(e) => {
            color === "Cinza" ? setColor("") : setColor("Cinza");
          }}>
          Cinza
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${color === "Prata" && "selected"}`}
          onClick={(e) => {
            color === "Prata" ? setColor("") : setColor("Prata");
          }}>
          Prata
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${color === "Preta" && "selected"}`}
          onClick={(e) => {
            color === "Preta" ? setColor("") : setColor("Preta");
          }}>
          Preta
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${color === "Verde" && "selected"}`}
          onClick={(e) => {
            color === "Verde" ? setColor("") : setColor("Verde");
          }}>
          Verde
        </button>
      </div>

      <h3 className="font-semibold text-lg">Ano</h3>
      <div className="flex flex-col gap-1 justify-start pr-[250px]">
        <button
          type="button"
          className={`text-sm text-grey-2 ${year === "2022" && "selected"}`}
          onClick={(e) => {
            year === "2022" ? setYear("") : setYear("2022");
          }}>
          2022
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${year === "2021" && "selected"}`}
          onClick={(e) => {
            year === "2021" ? setYear("") : setYear("2021");
          }}>
          2021
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${year === "2018" && "selected"}`}
          onClick={(e) => {
            year === "2018" ? setYear("") : setYear("2018");
          }}>
          2018
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${year === "2015" && "selected"}`}
          onClick={(e) => {
            year === "2015" ? setYear("") : setYear("2015");
          }}>
          2015
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${year === "2013" && "selected"}`}
          onClick={(e) => {
            year === "2013" ? setYear("") : setYear("2013");
          }}>
          2013
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${year === "2012" && "selected"}`}
          onClick={(e) => {
            year === "2012" ? setYear("") : setYear("2012");
          }}>
          2012
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${year === "2010" && "selected"}`}
          onClick={(e) => {
            year === "2010" ? setYear("") : setYear("2010");
          }}>
          2010
        </button>
      </div>

      <h3 className="font-semibold text-lg">Combustível</h3>
      <div className="flex flex-col gap-1 justify-start pr-[250px]">
        <button
          type="button"
          className={`text-sm text-grey-2 ${fuel === "Diesel" && "selected"}`}
          onClick={(e) => {
            setFuel("Diesel");
          }}>
          Diesel
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${fuel === "Gasolina" && "selected"}`}
          onClick={(e) => {
            setFuel("Gasolina");
          }}>
          Gasolina
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${fuel === "Etanol" && "selected"}`}
          onClick={(e) => {
            setFuel("Etanol");
          }}>
          Etanol
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${fuel === "Flex" && "selected"}`}
          onClick={(e) => {
            setFuel("Flex");
          }}>
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
      <button
        className="mt-8 medium-brand-1"
        type="button"
        onClick={() => setFilterList(allAnnouncements)}>
        Limpar Filtros
      </button>
    </aside>
  );
};

export default Filters;
