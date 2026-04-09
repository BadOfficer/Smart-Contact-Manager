import { useState } from 'react';

export const useModal = (initialValue = false) => {
  const [showModal, setShowModal] = useState(initialValue);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleOpen = () => {
    setShowModal(true);
  };

  return {
    isOpen: showModal,
    open: handleOpen,
    close: handleClose
  };
};
