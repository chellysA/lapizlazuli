"use client";

import { useEffect } from "react";

const Template = ({ children }: any) => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return <>{children}</>;
};
export default Template;
