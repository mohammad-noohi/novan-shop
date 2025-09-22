import React from "react";

export default function DotStatus({ color = "zinc" }) {
  return (
    <span class="relative flex size-3">
      <span class={`absolute inline-flex h-full w-full animate-ping rounded-full bg-${color}-400 opacity-75`}></span>
      <span class={`relative inline-flex size-3 rounded-full bg-${color}-500`}></span>
    </span>
  );
}
