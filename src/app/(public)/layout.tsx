import type { ReactNode } from "react";

import { InteractiveCursor } from "@/components/InteractiveCursor";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <InteractiveCursor />
      <SmoothScroll>{children}</SmoothScroll>
    </>
  );
}
