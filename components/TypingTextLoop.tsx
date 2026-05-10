import { useState, useEffect, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';

const TypingTextLoop = () => {
  // 1. Teks yang akan ditampilkan secara bergantian
  const textArray = useMemo(() => [
    <>
      Hi, I&apos;m <span className="text-orange-500 font-bold">Alicia Maharani</span>.
    </>,
    <>
      I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">physical</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">digital</span> systems.
    </>
  ], []);

  // 2. State untuk melacak teks mana yang sedang aktif
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // 3. Kontrol untuk animasi manual
  const controls = useAnimation();

  // 4. Effect untuk mengelola siklus animasi (loop)
  useEffect(() => {
    // Fungsi async untuk menjalankan urutan secara berurutan
    const sequence = async () => {
      // Loop tanpa henti (infinity loop)
      while (true) {
        // Phase 1: Ketik Masuk (Type In)
        await controls.start({
          clipPath: "inset(0 0 0 0)",
          transition: { duration: 2, ease: "linear" }
        });

        // Phase 2: Tahan (Hold) - Teks tetap terlihat selama 2 detik
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Phase 3: Hapus / Ketik Keluar (Type Out)
        await controls.start({
          clipPath: "inset(0 100% 0 0)",
          transition: { duration: 1, ease: "linear" }
        });

        // Phase 4: Ganti Teks
        // Ganti index teks berikutnya, looping kembali ke 0 jika mencapai akhir
        setCurrentTextIndex(prevIndex => (prevIndex + 1) % textArray.length);
      }
    };

    // Jalankan urutan animasi
    sequence();
  }, [controls, textArray.length]);

  return (
    // Satu elemen H1 tunggal untuk semua teks
    // className menggabungkan gaya H1 Anda sebelumnya
    <motion.h1
      className="text-4xl md:text-6xl font-bold text-slate-100 leading-tight mb-8 tracking-tight w-fit font-mono"
      initial={{ clipPath: "inset(0 100% 0 0)" }} // Mulai dalam keadaan tersembunyi
      animate={controls} // Gunakan kontrol animasi manual
    >
      {/* Tampilkan teks yang aktif saat ini */}
      {textArray[currentTextIndex]}
      
      {/* Kursor Kotak Berkedip */}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
        className="inline-block w-[12px] h-[1em] bg-slate-100 ml-2 align-middle"
      />
    </motion.h1>
  );
};

export default TypingTextLoop;