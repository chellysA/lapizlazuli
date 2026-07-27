"use client";

import { useEffect } from "react";

const Template = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return <>{children}</>;
};
export default Template;
