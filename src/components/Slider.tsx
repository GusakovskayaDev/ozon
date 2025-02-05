import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Slider.module.css";

const slides = [
  "https://ir.ozone.ru/s3/cms/45/tb8/wc1450/2_dnya_1368_150.jpg",
  "https://ir.ozone.ru/s3/cms/51/ta1/wc1450/sezonnaya_banner_1416_100.jpg",
];

const Slider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slider}>
      <div className={styles.wrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className={styles.slide}
            style={{ backgroundImage: `url(${slides[index]})` }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Slider;
