import { ReactNode, createContext, useEffect, useState } from "react";
import api from "@/services/api";
import { iAnnouncement } from "@/schemas/announcement.schema";

interface filterProps {
  children: ReactNode;
}

interface IFilterContext {
  FilterInput: (price: string, mileage: string) => void;
  FilterBrand: (brand: string) => void;
  FilterModel: (model: string) => void;
  FilterColor: (color: string) => void;
  FilterYear: (year: string) => void;
  FilterFuel: (fuel: string) => void;
}

export const FilterContext = createContext<IFilterContext>({} as IFilterContext);

export function FilterProvider({ children }: filterProps) {
  const [allAnnouncements, setAllAnnouncements] = useState<iAnnouncement[]>([]);
  const [filterList, setFilterList] = useState<iAnnouncement[]>([]);

  useEffect(() => {
    api
      .get("/announcements")
      .then((response) => {
        setAllAnnouncements(response.data);
        setFilterList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function FilterBrand(brand: string) {
    console.log(brand);
    if (brand === "") {
      return setFilterList(allAnnouncements);
    }
    const goFilter = allAnnouncements.filter((element) => {
      const bolena = newIncludes(element.brand, brand);
      if (bolena) {
        return element;
      }
    });
    setFilterList(goFilter);
  }

  function FilterModel(model: string) {
    console.log(model);
    if (model === "") {
      return setFilterList(allAnnouncements);
    }
    const goFilter = allAnnouncements.filter((element) => {
      const bolena = newIncludes(element.model, model);
      if (bolena) {
        return element;
      }
    });
    setFilterList(goFilter);
  }

  function FilterColor(color: string) {
    console.log(color);
    if (color === "") {
      return setFilterList(allAnnouncements);
    }
    const goFilter = allAnnouncements.filter((element) => {
      const bolena = newIncludes(element.color, color);
      if (bolena) {
        return element;
      }
    });
    setFilterList(goFilter);
  }

  function FilterYear(year: string) {
    console.log(year);
    if (year === "") {
      return setFilterList(allAnnouncements);
    }
    const goFilter = allAnnouncements.filter((element) => {
      const bolena = newIncludes(element.year, year);
      if (bolena) {
        return element;
      }
    });
    setFilterList(goFilter);
  }

  function FilterFuel(fuel: string) {
    console.log(fuel);
    if (fuel === "") {
      return setFilterList(allAnnouncements);
    }
    const goFilter = allAnnouncements.filter((element) => {
      const bolena = newIncludes(element.fuel, fuel);
      if (bolena) {
        return element;
      }
    });
    setFilterList(goFilter);
  }

  function FilterInput(price: string, mileage: string) {
    let filteredList = [...allAnnouncements];

    if (price !== "") {
      filteredList = filteredList.filter((element) => element.price.includes(price));
    }

    if (mileage !== "") {
      filteredList = filteredList.filter((element) => element.mileage.includes(mileage));
    }

    setFilterList(filteredList);
  }

  function newIncludes(arr: string, item: string, startFrom = 0) {
    let res = false;
    for (let i = startFrom; i < arr.length; i++) {
      if (arr[i] === item) {
        return (res = true);
      }
    }
    return res;
  }

  return (
    <FilterContext.Provider
      value={{ FilterInput, FilterBrand, FilterModel, FilterColor, FilterYear, FilterFuel }}>
      {children}
    </FilterContext.Provider>
  );
}
