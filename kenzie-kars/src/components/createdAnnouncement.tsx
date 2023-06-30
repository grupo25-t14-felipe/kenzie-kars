import React from "react";
import Link from "next/link";

const CreatedAnnouncement = ({ isVisible, onClose }: any) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-30">
      <div className="w-[520px] h-[287px] bg-whiteFixed">
        <div className="flex justify-between p-4">
          <h3 className="heading-7-500">Sucesso!</h3>
          <button onClick={() => onClose()}>x</button>
        </div>
        <div className="flex flex-col gap-6 p-4">
          <h3 className="heading-7-600">Seu anúncio foi criado com sucesso!</h3>
          <p className=" body-1-400">Agora você poderá ver seus negócios crescendo em grande escala</p>
        </div>
      </div>
    </div>
  );
};

export default CreatedAnnouncement;
