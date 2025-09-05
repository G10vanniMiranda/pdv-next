"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function Page() {

  const [isOpen, setIsOpen] = useState("hidden");

  const mudar = () => {
    setIsOpen(isOpen === "hidden" ? "flex" : "hidden");
  };

  return (
    <div className="bg-slate-700 h-screen">

      <button onClick={mudar}>Mudar</button>

      <Collapsible className="bg-slate-900 hover:bg-slate-800 w-96 h-20">
        <CollapsibleTrigger className="text-white h-20 w-full flex">

          <div className="w-16 h-20 flex items-center justify-center">

            <div className="bg-black w-10 h-10 rounded-full flex items-center justify-center">
              <h2>1</h2>
            </div>

          </div>

          <div className="flex-1 flex flex-col items-start justify-center">

            <h1 className="text-lg">Primeiros passos</h1>

            <p className="text-sm">1 aula * 02:47</p>

          </div>

          <div className="bg-green-400 w-16 h-20">

            <IoIosArrowDown className={isOpen} />
            <IoIosArrowUp className={isOpen} />

          </div>

        </CollapsibleTrigger>

        <CollapsibleContent className="text-white">
          Yes. Free to use for personal and commercial projects. No attribution
          required.
        </CollapsibleContent>
      </Collapsible>

    </div>
  );
}