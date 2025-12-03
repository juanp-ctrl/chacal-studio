import React from "react";
import { cn } from "@/lib/utils";
import { svgPaths } from "./Logo";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function LogoMinimal({ className, ...props }: LogoProps) {
  return (
    <div className={cn("relative w-full aspect-square", className)} aria-label="Chacal Studio Logo Icon" role="img">
      <svg
        className="block w-full h-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 106 106"
        {...props}
      >
        <g id="Logo chacal minimal">
          <path d={svgPaths.p28ee1a00} fill="currentColor" id="Vector_7" transform="translate(9, 0)" />
        </g>
      </svg>
    </div>
  );
}

