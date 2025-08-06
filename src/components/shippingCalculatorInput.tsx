"use client";

import { Input } from "./ui/input";
import { z } from "zod";
import { Button } from "./ui/button";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

export default function ShippingCalculatorInput() {
  return (
    <div className="flex flex-row gap-1 ">
      <Input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            console.log("enter pressed");
          }
        }}
        className="max-w-48 border-primary bg-secondary"
      ></Input>

      <Button className="rounded-lg hover:cursor-pointer">OK</Button>
    </div>
  );
}
