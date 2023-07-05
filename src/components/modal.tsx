import React from "react";
import Link from "next/link";

const Modal = ({ isVisible, onClose }: any) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[520px] h-[287px] bg-whiteFixed">
        <div className="flex justify-between p-4">
          <p>Sucesso!</p>
          <button onClick={() => onClose()}>x</button>
        </div>
        <div className="flex flex-col gap-6 p-4">
          <h4>Sua conta foi criada com sucesso</h4>
          <p>Agora você poderá ver seus negócios crescendo em grande escala</p>
        </div>
        <nav className="w-full mt-6 p-4">
          <Link className="whitespace-nowrap medium-brand-1" href={"/login"} onClick={()=> onClose()}>
            Ir para login
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Modal;
