import { ReactNode, createContext, useEffect, useState } from "react";
import api from "@/services/api";
import { iAnnouncement } from "@/schemas/announcement.schema";

interface filterProps {
  children: ReactNode;
}

interface IFilterContext {
  FilterBrand: (brand: string) => void;
  FilterModel: (model: string) => void;
  FilterColor: (color: string) => void;
  FilterYear: (year: string) => void;
  FilterFuel: (fuel: string) => void;
  FilterInputPrice: (price: string) => void;
  FilterInputMileage: (mileage: string) => void;
  filterList: iAnnouncement[];
  setFilterList: React.Dispatch<React.SetStateAction<iAnnouncement[]>>;
  allAnnouncements: iAnnouncement[];
  setAllAnnouncements: React.Dispatch<React.SetStateAction<iAnnouncement[]>>;
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

    if (brand === "") {
      return setFilterList(allAnnouncements);
    }
    const goFilter = allAnnouncements.filter((element) => {

      const boolean = newIncludes(element.brand, brand);
      if (boolean) {
        return element;
      }
    });

    setFilterList(goFilter);
  }

  function FilterModel(model: string) {

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

    if (color === "") {
      return setFilterList(allAnnouncements);
    }
    const goFilter = allAnnouncements.filter((element) => {
      const bolena = newIncludes(element.color.toLowerCase(), color.toLowerCase());
      if (bolena) {
        return element;
      }
    });
    setFilterList(goFilter);
  }

  function FilterYear(year: string) {

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

  function FilterInputPrice(price: string) {
    if (price === "") {
      return setFilterList(allAnnouncements);
    }

    const goFilter = allAnnouncements.filter((element) =>
      element.mileage.toLowerCase().includes(price.toLowerCase())
    );

    setFilterList(goFilter);
  }

  function FilterInputMileage(mileage: string) {
    if (mileage === "") {
      return setFilterList(allAnnouncements);
    }

    const goFilter = allAnnouncements.filter((element) =>
      element.mileage.toLowerCase().includes(mileage.toLowerCase())
    );

    setFilterList(goFilter);
  }

  function newIncludes(arr: string, item: string, startFrom = 0) {
    let res = false;
      if (arr === item) {
        return (res = true);
      }
    return res;
  }

  return (
    <FilterContext.Provider
      value={{
        FilterBrand,
        FilterModel,
        FilterColor,
        FilterYear,
        FilterFuel,
        filterList,
        setFilterList,
        FilterInputPrice,
        FilterInputMileage,
        allAnnouncements,
        setAllAnnouncements
      }}>
      {children}
    </FilterContext.Provider>
  );
}
