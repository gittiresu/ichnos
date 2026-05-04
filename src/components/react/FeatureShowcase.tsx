import { motion } from 'motion/react';
import { Warehouse, Truck, Package, BarChart3, Shield, Headphones } from 'lucide-react';

import frontendDevImg from '@assets/frontend-dev.webp';
import backendDevImg from '@assets/backend-dev.jpg';
import packageImg from '@assets/photo-1581091226825-a6a2a5aee158.jpg';
import barChart3Img from '@assets/photo-1551288049-bebda4e38f71.jpg';
import shieldImg from '@assets/photo-1563013544-824ae1b704d3.jpg';
import headphonesImg from '@assets/photo-1486312338219-ce68d2c6f44d.jpg';

const features = [
  {
    title: 'FrontEnd Developer',
    description: 'Build fast, responsive interfaces and deliver seamless user experiences across modern web applications.',
    image: frontendDevImg,
  },
  {
    title: 'BackEnd Developer',
    description: 'Design scalable APIs and build robust server-side systems that power reliable, high-performance applications.',
    image: backendDevImg,
  },
  {
    title: 'SysAdmin',
    description: 'Maintain secure, stable, and efficient IT infrastructure to ensure seamless system operations.',
    image: packageImg,
  },
  {
    title: 'SEO Specialist',
    description: 'Drive organic growth and boost search visibility through data-driven SEO strategies.',
    image: barChart3Img,
  },
  {
    title: 'Cyber Security Specialist',
    description: 'Protect systems and data by identifying threats and implementing robust security solutions.',
    image: shieldImg,
  },
  {
    title: 'Customer Support',
    description: 'Deliver exceptional support and build lasting customer relationships through responsive, solution-focused service.',
    image: headphonesImg,
  },
];

export default function FeatureShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group cursor-pointer"
        >
          <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <motion.img
                src={feature.image.src}
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
  );
}

