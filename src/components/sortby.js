"use client";
import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";

export default function SortBy() {

  return (
    <div className="flex grow-0 col-end-5 justify-self-end relative">
      <div className="flex gap-3 items-center p-1 border border-transparent hover:border-black cursor-pointer">
        <p>Sort By: </p>
        <SlArrowDown/>
      </div>
    </div>
  )
}