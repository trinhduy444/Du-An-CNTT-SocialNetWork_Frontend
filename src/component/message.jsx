import React, { useState, useEffect } from 'react';

const Message = ({ type, content }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 8000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {visible && (
        <div className={`alert alert-${type}`} role="alert">
          {content}
        </div>
      )}
    </>
  );
};

export default Message;