import { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const showMessage = (type, text) => {
    setMessage({ type, text });

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <MessageContext.Provider value={{ message, showMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};
