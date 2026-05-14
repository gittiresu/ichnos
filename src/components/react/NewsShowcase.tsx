import { NEWS} from '@customizations/news/news';
import Modal from "../ui/Modal";
import { useState } from "react";
import { motion } from 'motion/react';

const news = NEWS;
const arrowPath = "M9 5l7 7-7 7";

type Feature = (typeof NEWS)[number];

export default function NewsShowcase() {

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
  
  const images = import.meta.glob("../../customizations/news/images/*.{png,jpg,jpeg,svg,webp,gif}", {
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

  const newsClass = function(index: number, type: string) {
    const even = index % 2 === 0;
    switch (type) {
      case "border":
        return even ? "hover:border-blue-500" : "hover:border-teal-500";
      case "gradient":
        return even ? "from-blue-600/90" : "from-teal-600/90";
      case "text":
        return even ? "text-blue-600" : "text-teal-700";
    }
    return "";
  };
  
  return (
    <>    
    <div className="relative">
      
      <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-linear-to-r from-blue-200 via-teal-200 to-blue-200"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {news.map((item, index) => (
          <div className="relative h-full">
            <div className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-slate-100 ${newsClass(index, "border")} relative z-10 flex flex-col h-full`}>
              <div className="relative h-48 overflow-hidden">                
                <motion.img
                  src={getRelatedImage(item.image)?.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={800}
                  height={400}
                />
                <div className={`absolute inset-0 bg-linear-to-t ${newsClass(index, "gradient")} to-transparent`}></div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed flex-1">
                  {item.teaser}
                </p>
                <div id={`news-${index+1}`} data-item={JSON.stringify(item)} onClick={() => openModal(item)}
                  className={`mt-6 flex items-center text-sm ${newsClass(index, "text")} news-item font-semibold cursor-pointer hover:underline`}
                >
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={arrowPath} />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={selectedItem}
        type="news"
      />
    </>
  );
}

