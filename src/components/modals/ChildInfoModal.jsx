import React, { useState } from 'react';
import BottomSheetModal from './BottomSheetModal';

function ChildInfoModal() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <BottomSheetModal isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet}>
      {/* Konten bottom sheet di sini */}
      <div>
        <h2>Bottom Sheet Content</h2>
        <p>Isi konten bottom sheet...</p>
      </div>
    </BottomSheetModal>
  );
}

export default ChildInfoModal;
