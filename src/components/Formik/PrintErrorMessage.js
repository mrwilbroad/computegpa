import React, { useEffect } from "react";
const PrintErrorMessage = ({ children, ...props }) => {
  useEffect(() => {}, [children, props]);
  return (
    <p className="text-danger" {...props}>
      {children}
    </p>
  );
};
export default PrintErrorMessage;
