import { FilterContext } from "@/contexts/filterContext";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
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
  const {
    FilterInputPrice,
    FilterInputMileage,
    FilterBrand,
    FilterModel,
    FilterColor,
    FilterYear,
    FilterFuel,
    setFilterList,
    allAnnouncements
  } = useContext(FilterContext);
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

  const handleFilterBrand = (brand: string) => {
    FilterBrand(brand);
  };

  const handleFilterModel = (model: string) => {
    FilterModel(model);
  };

  const handleFilterColor = (color: string) => {
    FilterColor(color);
  };

  const handleFilterYear = (year: string) => {
    FilterYear(year);
  };

  const handleFilterFuel = (fuel: string) => {
    FilterFuel(fuel);
  };

  const handleInputPrice = (price: string) => {
    FilterInputPrice(price);
  };

  const handleInputMileage = (mileage: string) => {
    FilterInputMileage(mileage);
  };

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
              setBrand(brand);
              setSelectedBrand(brand);
              setModel(null);
              handleFilterBrand(brand);
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
                    setModel(modelItem);
                    handleFilterModel(modelItem.name);
                  }}>
                  {modelItem.name}
                </button>
              );
            }
            return null
          })}
      </div>

      <h3 className="font-semibold text-lg">Cor</h3>
      <div className="flex flex-col pr-[250px]">
        <button
          type="button"
          className={`text-sm text-grey-2 ${color === "Azul" && "selected"}`}
          onClick={(e) => {
            setColor("Azul");
            handleFilterColor(e.currentTarget.innerText.toString());
          }}>
          Azul
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${color === "Branco" && "selected"}`}
          onClick={(e) => {
            setColor("Branco");
            handleFilterColor(e.currentTarget.innerText.toString());
          }}>
          Branco
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${color === "Cinza" && "selected"}`}
          onClick={(e) => {
            setColor("Cinza");
            handleFilterColor(e.currentTarget.innerText.toString());
          }}>
          Cinza
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${color === "Prata" && "selected"}`}
          onClick={(e) => {
            setColor("Prata");
            handleFilterColor(e.currentTarget.innerText.toString());
          }}>
          Prata
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${color === "Preta" && "selected"}`}
          onClick={(e) => {
            setColor("Preta");
            handleFilterColor(e.currentTarget.innerText.toString());
          }}>
          Preta
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${color === "Verde" && "selected"}`}
          onClick={(e) => {
            setColor("Verde");
            handleFilterColor(e.currentTarget.innerText.toString());
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
            setYear("2022");
            handleFilterYear(e.currentTarget.innerText.toString());
          }}>
          2022
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${year === "2021" && "selected"}`}
          onClick={(e) => {
            setYear("2021");
            handleFilterYear(e.currentTarget.innerText.toString());
          }}>
          2021
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${year === "2018" && "selected"}`}
          onClick={(e) => {
            setYear("2018");
            handleFilterYear(e.currentTarget.innerText.toString());
          }}>
          2018
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${year === "2015" && "selected"}`}
          onClick={(e) => {
            setYear("2015");
            handleFilterYear(e.currentTarget.innerText.toString());
          }}>
          2015
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${year === "2013" && "selected"}`}
          onClick={(e) => {
            setYear("2013");
            handleFilterYear(e.currentTarget.innerText.toString());
          }}>
          2013
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${year === "2012" && "selected"}`}
          onClick={(e) => {
            setYear("2012");
            handleFilterYear(e.currentTarget.innerText.toString());
          }}>
          2012
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${year === "2010" && "selected"}`}
          onClick={(e) => {
            setYear("2010");
            handleFilterYear(e.currentTarget.innerText.toString());
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
            handleFilterFuel(e.currentTarget.innerText.toString());
          }}>
          Diesel
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${fuel === "Gasolina" && "selected"}`}
          onClick={(e) => {
            setFuel("Gasolina");
            handleFilterFuel(e.currentTarget.innerText.toString());
          }}>
          Gasolina
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${fuel === "Etanol" && "selected"}`}
          onClick={(e) => {
            setFuel("Etanol");
            handleFilterFuel(e.currentTarget.innerText.toString());
          }}>
          Etanol
        </button>
        <button
          type="button"
          className={`text-sm text-grey-2 ${fuel === "Flex" && "selected"}`}
          onClick={(e) => {
            setFuel("Flex");
            handleFilterFuel(e.currentTarget.innerText.toString());
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
          onChange={(e) => handleInputMileage(e.target.value)}
        />
        <input
          className="bg-grey-5 w-1/2 input-text text-center"
          type="text"
          placeholder="Máxima"
          onChange={(e) => handleInputMileage(e.target.value)}
        />
      </div>

      <h3 className="font-semibold text-lg">Preço</h3>
      <div className="flex gap-4">
        <input
          className="bg-grey-5 w-1/2 input-text text-center"
          type="text"
          placeholder="Mínimo"
          onChange={(e) => handleInputPrice(e.target.value)}
        />
        <input
          className="bg-grey-5 w-1/2 input-text text-center"
          type="text"
          placeholder="Máximo"
          onChange={(e) => handleInputPrice(e.target.value)}
        />
      </div>
      <button className="mt-8 medium-brand-1" type="button" onClick={() => setFilterList([])}>
        Limpar Filtros
      </button>
    </aside>
  );
};

export default Filters;
