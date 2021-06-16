import React, { createContext, useState } from 'react';

export const ModalContext = createContext();
export const ModalContextProvider = ({ children }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const data = { loginModalOpen, setLoginModalOpen };
  return <ModalContext.Provider value={data}>{children}</ModalContext.Provider>;
};
