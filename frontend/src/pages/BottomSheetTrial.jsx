import React, { useState } from 'react';
import BottomSheetModal from '../components/modals/BottomSheetModal';

function BottomSheetTrial() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenBottomSheet}>Buka Bottom Sheet</button>

      <BottomSheetModal isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet}>
        {/* Konten bottom sheet di sini */}
        <div>
          <h2>Bottom Sheet Content</h2>
          <p>Isi konten bottom sheet...</p>
          <button className="bg-red-300" onClick={handleCloseBottomSheet}>
            Tutup
          </button>
        </div>
      </BottomSheetModal>
    </div>
  );
}

export default BottomSheetTrial;
