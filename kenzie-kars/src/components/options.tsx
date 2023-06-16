import React, { SetStateAction } from "react";

interface iOptions {
    options: string[] | undefined
    filter: string[]
    id: string
    setState: React.Dispatch<SetStateAction<string>>
    setCloseOptions: React.Dispatch<SetStateAction<boolean>>
}

const Options = ({ options, filter, id, setState, setCloseOptions }: iOptions) => {
    const DOMRect = document.getElementById( id )!.getBoundingClientRect();
    const width = `${DOMRect.width}px`
    const top = `${DOMRect.bottom}px`
    
    return(
        <div className={`w-[${width}] pt-[5px] pb-[10px] bg-grey-1 z-[1] top-[${top}] border-box rounded-b rounded-l`}>
            <ul className="w-full max-h-80 overflow-y-auto">
                { 
                    filter ? filter.map( (option: string, index: number) => {
                        return(
                            <React.Fragment key={index}>
                                <li className="w-full">
                                    <p 
                                        onClick={() => {
                                            setState( option )
                                            setCloseOptions( false )
                                        }} 
                                        className="w-full pt-[5px] pb-[5px] pr-[10px] pl-[10px] text-whiteFixed hover:text-grey-0 hover:bg-grey-6 hover:cursor-pointer"
                                    >{ option }</p>
                                </li>
                            </React.Fragment>
                        )}) : options ? options.map( (option: string, index: number ) => {
                            return(
                                <React.Fragment key={index}>
                                    <li className="w-full">
                                        <p 
                                            onClick={ () => {
                                                setState( option )
                                                setCloseOptions( false )
                                            }}
                                            className="w-full pt-[5px] pb-[5px] pr-[10px] pl-[10px] text-whiteFixed hover:text-grey-0 hover:bg-grey-6 hover:cursor-pointer"
                                        >{ option }</p>
                                    </li>
                                </React.Fragment>
                            )
                        }) : <><p>sem anúncios</p></>
                }
            </ul>
        </div>
    )
}

export default Options;
