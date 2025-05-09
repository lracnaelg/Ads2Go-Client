import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const vehicles = [
    {
      image: '/image/car.png',
      label: 'Cars',
      desc: 'Perfect for urban areas with high traffic',
      option: 'Option: LCD Monitor'
    },
    {
      image: '/image/motor.png',
      label: 'E-Bikes',
      desc: 'Eco-friendly option for downtown areas',
    },
    {
      image: '/image/jeep.png',
      label: 'Jeeps',
      desc: 'High visibility for suburban and rural areas',
    },
    {
      image: '/image/bus.png',
      label: 'Buses',
      desc: 'Maximum exposure with large format displays',
    },
  ];

  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (current === -1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(vehicles.length - 1);
      }, 500);
    } else if (current === vehicles.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(0);
      }, 500);
    }
  }, [current, vehicles.length]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrent(prev => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrent(prev => prev - 1);
  };

  const getVisibleItems = () => {
    const items = [];
    const totalItems = vehicles.length;
    const prevIndex = (current - 1 + totalItems) % totalItems;
    items.push({ ...vehicles[prevIndex], className: 'opacity-20 scale-100 -translate-x-10' });
    items.push({ ...vehicles[current % totalItems], className: 'z-10' });
    const nextIndex = (current + 1) % totalItems;
    items.push({ ...vehicles[nextIndex], className: 'opacity-0 scale-90 translate-x-10' });
    return items;
  };

  return (
    <div className="min-h-screen pt-10">
      {/* Hero Section */}
      <section className="bg-cover bg-center bg-no-repeat py-20 px-4 text-center text-white min-h-[90vh] animate-fadeIn" style={{ backgroundImage: "url('/image/image.jpeg')" }}>
        <div className="container mx-auto relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeDown">Advertise On The Go</h1>
          <p className="text-xl md:text-2xl mb-8 animate-fadeDown delay-100">Connect your business with mobile advertising solutions</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/client-inquiry">
              <button className="px-6 py-3 text-lg font-semibold bg-white text-[#578FCA] border border-[#578FCA] rounded hover:bg-white/10 hover:scale-105 transition-all duration-300">
                Advertise Your Business
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Vehicle Options Carousel */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 animate-fadeDown">Advertising Vehicle Options</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto animate-fadeDown delay-100">
            Choose from a variety of vehicle types to best reach your target audience
          </p>

          <div className="relative overflow-hidden max-w-6xl mx-auto">
            <div className="relative h-96 flex items-center justify-center">
              {getVisibleItems().map((vehicle, index) => (
                <div
                  key={`${vehicle.label}-${index}`}
                  className={`absolute transition-all duration-500 ease-in-out ${vehicle.className} ${isTransitioning ? 'transitioning' : ''}`}
                  style={{ width: '80%', left: `${(index - 1) * 30 + 50}%`, transform: `translateX(-50%)` }}>
                  <div className="flex flex-col md:flex-row items-center">
                    <img src={vehicle.image} alt={vehicle.label} className="w-full md:w-1/2 rounded-md mb-6 md:mb-0 md:mr-8" />
                    <div className={`text-center md:text-left ${index !== 1 ? 'opacity-0 md:opacity-100' : ''}`}>
                      <h3 className="text-2xl font-semibold mb-2">{vehicle.label}</h3>
                      <p className="text-gray-600 mb-4">{vehicle.desc}</p>
                      {vehicle.option && <p className="text-gray-600 mb-4">{vehicle.option}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
              <ChevronLeft className="w-6 h-6 text-[#FF9D3D]" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
              <ChevronRight className="w-6 h-6 text-[#FF9D3D]" />
            </button>

            <div className="flex justify-center mt-8 gap-2">
              {vehicles.map((_, index) => (
                <button key={index} onClick={() => { setIsTransitioning(true); setCurrent(index); }} className={`w-3 h-3 rounded-full ${current % vehicles.length === index ? 'bg-[#FF9D3D]' : 'bg-gray-300'}`} aria-label={`Go to slide ${index + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
