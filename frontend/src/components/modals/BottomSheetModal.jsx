import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';

const BottomSheetModal = ({ isOpen, onClose, children }) => {
  const [initiallyOpened, setInitiallyOpened] = useState(false);

  // Menggunakan react-spring untuk animasi
  const springProps = useSpring({
    from: { opacity: 0, transform: 'translateY(100%)' },
    to: {
      opacity: isOpen || initiallyOpened ? 1 : 0,
      transform: isOpen || initiallyOpened ? 'translateY(0%)' : 'translateY(100%)'
    }
  });

  useEffect(() => {
    // Setelah komponen dimuat, atur initiallyOpened ke true setelah beberapa waktu
    const timeout = setTimeout(() => {
      setInitiallyOpened(true);
    }, 1000); // Sesuaikan dengan waktu yang Anda inginkan

    return () => clearTimeout(timeout);
  }, []); // useEffect akan dijalankan sekali saat komponen dimuat

  return (
    <BottomSheet
      open={isOpen || initiallyOpened} // Gunakan nilai initiallyOpened
      onDismiss={onClose}
      blocking={false}
      snapPoints={({ maxHeight }) => [150, 400]} // Menyesuaikan snapPoints
      defaultSnap={({ maxHeight }) => 400} // Menyesuaikan defaultSnap (tinggi awal saat page di-load)
    >
      {/* Konten bottom sheet */}
      <animated.div style={springProps}>{children}</animated.div>
    </BottomSheet>
  );
};

export default BottomSheetModal;
