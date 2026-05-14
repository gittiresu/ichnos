import { motion } from 'motion/react';
import { useState } from "react";
import Modal from "../ui/Modal";
import { POSITIONS } from '@utils/positions/positions';
import type { ImageMetadata } from "astro";

const positions = POSITIONS;
type Feature = (typeof POSITIONS)[number];

export default function VacancyShowcase() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Feature | null>(null);

  const openModal = (item: Feature) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const images = import.meta.glob("../../utils/positions/images/*.{png,jpg,jpeg,svg,webp,gif}", {
    eager: true,
    import: "default"
  });
  
  function getRelatedImage(img: string): ImageMetadata | null {
    const keys = Object.keys(images);
    for (const key of keys) {
      const path = key.split("/").pop() || "";
      if (path === img) return images[key] as ImageMetadata;
    }
    return null;
  }
  
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {positions.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-slate-100"
          onClick={() => openModal(feature)}
        >
          <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <motion.img
                src={getRelatedImage(feature.image)?.src}
                alt={feature.title}
                className="w-full h-full object-cover"
                loading="lazy"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-200 opacity-90">{feature.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
    <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={selectedItem}
        type="positions"
      />
    </>
  );
}

