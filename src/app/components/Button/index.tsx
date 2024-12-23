"use client";

import React from "react";
import { toast } from "react-toastify";

export function Button({ title }: Readonly<{ title: string }>) {
  return (
    <button
      onClick={() => {
        toast.error("funcionalidade não foi implementada");
      }}
      className="bg-secondary text-white px-10 py-3 rounded-lg"
    >
      {title}
    </button>
  );
}
