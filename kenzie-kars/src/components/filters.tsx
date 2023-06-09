const Filters = () => {
  return (
    <aside className="flex flex-col gap-4 sm:w-full md:w-[25%] p-8">
      <h3 className=" font-semibold text-lg"> Marca</h3>
      <span>
        <p className="text-sm text-grey-2">General Motors</p>
        <p className="text-sm text-grey-2">General Motors</p>
        <p className="text-sm text-grey-2">General Motors</p>
        <p className="text-sm text-grey-2">General Motors</p>
      </span>

      <h3 className=" font-semibold text-lg">modelo</h3>
      <span>
        <p className="text-sm text-grey-2">Civic</p>
        <p className="text-sm text-grey-2">Civic</p>
        <p className="text-sm text-grey-2">Civic</p>
        <p className="text-sm text-grey-2">Civic</p>
      </span>

      <h3 className=" font-semibold text-lg">Cor</h3>
      <span>
        <p className="text-sm text-grey-2">Azul</p>
        <p className="text-sm text-grey-2">Azul</p>
        <p className="text-sm text-grey-2">Azul</p>
        <p className="text-sm text-grey-2">Azul</p>
      </span>

      <h3 className=" font-semibold text-lg">Ano</h3>
      <span>
        <p className="text-sm text-grey-2">2022</p>
        <p className="text-sm text-grey-2">2022</p>
        <p className="text-sm text-grey-2">2022</p>
        <p className="text-sm text-grey-2">2022</p>
      </span>

      <h3 className=" font-semibold text-lg">Combustível</h3>
      <span>
        <p className="text-sm text-grey-2">Diesel</p>
        <p className="text-sm text-grey-2">Diesel</p>
        <p className="text-sm text-grey-2">Diesel</p>
        <p className="text-sm text-grey-2">Diesel</p>
      </span>

      <h3 className=" font-semibold text-lg">Km</h3>

      <div className="flex gap-4">
        <input className="bg-grey-5 w-1/2 input-text text-center" type="text" placeholder="Mínima"/>
        <input className="bg-grey-5 w-1/2 input-text text-center" type="text" placeholder="Máxima"/>
      </div>

      <h3 className=" font-semibold text-lg">Preço</h3>

      <div className="flex gap-4">
        <input className="bg-grey-5 w-1/2 input-text text-center" type="text" placeholder="Mínimo"/>
        <input className="bg-grey-5 w-1/2 input-text text-center" type="text" placeholder="Máximo"/>
      </div>

      <button className="mt-8 medium-brand-1"> Ver anúncios</button>
    </aside>
  );
};

export default Filters;
