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
    <div className="">
      {/* Konten bottom sheet */}
      <BottomSheet
        open={isOpen || initiallyOpened} // Gunakan nilai initiallyOpened
        onDismiss={onClose}
        blocking={false}
        snapPoints={({ maxHeight }) => [105, (maxHeight / 10) * 5.5]} // Menyesuaikan snapPoints
        defaultSnap={({ maxHeight }) => (maxHeight / 10) * 5.5} // Menyesuaikan defaultSnap (tinggi awal saat page di-load)
        className="block lg:hidden"
      >
        <animated.div style={springProps}>{children}</animated.div>
      </BottomSheet>
    </div>
  );
};

export default BottomSheetModal;
