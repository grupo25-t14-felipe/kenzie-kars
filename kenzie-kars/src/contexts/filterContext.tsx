import { ReactNode, createContext, useEffect, useState } from "react";
import api from "@/services/api";
import { iAnnouncement } from "@/schemas/announcement.schema";

interface filterProps {
  children: ReactNode;
}

interface IFilterContext {
  // ListAnnouncements: () => void;
  Filter: (brand: string, model: string, color: string, year: string, fuel: string) => void;
  FilterInput: (price: string, mileage: string) => void;
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

  function Filter(brand: string, model: string, color: string, year: string, fuel: string) {
    let filteredList = [...allAnnouncements];

    if (brand !== "") {
      filteredList = filteredList.filter((element) => newIncludes(element.brand, brand));
    }

    if (model !== "") {
      filteredList = filteredList.filter((element) => newIncludes(element.model, model));
    }

    if (color !== "") {
      filteredList = filteredList.filter((element) => newIncludes(element.color, color));
    }

    if (year !== "") {
      filteredList = filteredList.filter((element) => newIncludes(element.year, year));
    }

    if (fuel !== "") {
      filteredList = filteredList.filter((element) => newIncludes(element.fuel, fuel));
    }

    setFilterList(filteredList);
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
    <FilterContext.Provider value={{ Filter, FilterInput }}>{children}</FilterContext.Provider>
  );
}
