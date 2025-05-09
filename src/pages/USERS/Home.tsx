import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const vehicles = [
    {
      image: '/image/car1.png',
      label: 'Cars',
      desc: 'Perfect for urban areas with high traffic',
      material: 'Options: Vinyl Sticker and LCD Display',
      name: { name1: 'Duration', name2: 'Price', name3: 'Area' },
      stats: { months: 'Upto 3 Months', price: '100k per year', area: 'NCR' },
    },
    {
      image: '/image/motor1.png',
      label: 'E-Bikes',
      desc: 'Eco-friendly option for downtown areas',
      material: 'Vinyl Sticker, LCD Display',
      name: { name1: 'Duration', name2: 'Price', name3: 'Area' },
      stats: { months: 'Upto 3 Months', price: '100k per year', area: 'NCR' },
    },
    {
      image: '/image/jeep1.png',
      label: 'Jeeps',
      desc: 'High visibility for suburban and rural areas',
      material: 'Vinyl Sticker, LCD Display',
      name: { name1: 'Duration', name2: 'Price', name3: 'Area' },
      stats: { months: 'Upto 3 Months', price: '100k per year', area: 'NCR' },
    },
    {
      image: '/image/bus1.png',
      label: 'Buses',
      desc: 'Maximum exposure with large format displays',
      material: 'Vinyl Sticker, LCD Display',
      name: { name1: 'Duration', name2: 'Price', name3: 'Area' },
      stats: { months: 'Upto 3 Months', price: '100k per year', area: 'NCR' },
    },
  ];

  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [current, isTransitioning]);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrent((prev) => (prev + 1) % vehicles.length);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrent((prev) => (prev - 1 + vehicles.length) % vehicles.length);
    }
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="bg-cover bg-center bg-no-repeat py-20 px-4 text-white min-h-[90vh] animate-fadeIn flex items-center"
        style={{ backgroundImage: "url('/image/bg1.png')" }}
      >
        <div className="container mx-auto">
          <div className="max-w-2xl text-left pl-12">
            <h1 className="text-black text-5xl md:text-7xl lg:text-8xl font-bold animate-fadeDown">Advertise On The Go</h1>
            <p className="text-black text-2xl md:text-xl mb-10 animate-fadeDown delay-100 lg:px-2">
              Connect your business with powerful, targeted mobile advertising solutions that drive visibility,
              engagement, and growth — anytime, anywhere.
            </p>
            <div className="flex flex-wrap justify-start gap-4">
              <Link to="/create-advertisement">
                <button className="px-6 py-3 text-sm font-semibold bg-[#F6C794] text-black/80 border 
                rounded-[8px] hover:bg-white/10 hover:scale-105 transition-all duration-300">
                  + Register Ad Campaign
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fadeDown">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Register", "Match", "Track & Earn"].map((title, index) => (
              <div
                key={title}
                className="p-6 rounded-lg shadow-sm text-center transition-transform hover:scale-105 duration-300"
              >
                <div className="bg-[#FF9D3D]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pop delay-100">
                  <span className="text-2xl font-bold text-[#FF9D3D]">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                <p className="text-gray-600">
                  {title === "Register" && "Drivers register their vehicles while businesses submit their advertising needs"}
                  {title === "Match" && "We match businesses with the right drivers and vehicles for their target audience"}
                  {title === "Track & Earn" && "Track campaign performance in real-time, drivers earn while on their regular routes"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Carousel */}
      <section className="py-16 px-4 bg-gray-50 relative">
        <div className="container relative">
          <h2 className="text-3xl font-bold text-center mb-4 animate-fadeDown">Advertising Vehicle Options</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto animate-fadeDown delay-100">
            Choose from a variety of vehicle types to best reach your target audience
          </p>

          {/* Carousel */}
          <div className="relative w-full h-[80vh]">
            {getVisibleItems().map((vehicle, index) => (
              <div
                key={`${vehicle.label}-${index}`}
                className={`absolute w-full h-full transition-all duration-500 ease-in-out ${vehicle.className}`}
                style={{ display: index === 1 ? 'block' : 'none' }}
              >
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${vehicle.image})` }}>
                  <div className="w-full h-full flex items-center justify-end p-4 sm:p-8 md:p-24">
                    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-opacity-80 rounded-lg p-4 bg-white shadow-lg">
                      <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 text-black">{vehicle.label}</h3>
                      <p className="text-sm sm:text-base md:text-lg mb-2 text-black">{vehicle.desc}</p>
                      <p className="text-sm sm:text-base md:text-lg mb-4 text-black">{vehicle.material}</p>
                      <div className="flex gap-4 mb-6">
                        <div>
                          <p className="text-base font-semibold text-black">{vehicle.name.name1}</p>
                          <p className="text-black">{vehicle.stats.months}</p>
                        </div>
                        <div>
                          <p className="text-base font-semibold text-black">{vehicle.name.name2}</p>
                          <p className="text-black">{vehicle.stats.price}</p>
                        </div>
                        <div>
                          <p className="text-base font-semibold text-black">{vehicle.name.name3}</p>
                          <p className="text-black">{vehicle.stats.area}</p>
                        </div>
                      </div>
                      <Link to="/create-advertisement">
                        <button className="px-6 py-3 text-sm font-semibold bg-[#F6C794] text-black/80 border rounded-[8px] hover:bg-white/10 hover:scale-105 transition-all duration-300">
                          Apply Ads Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute right-24 bottom-24 z-30 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <ChevronLeft className="w-6 h-6 text-[#FF9D3D]" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-11 bottom-24 z-30 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <ChevronRight className="w-6 h-6 text-[#FF9D3D]" />
            </button>

            {/* Thumbnails */}
            <div className="absolute bottom-20 left-24 flex items-center gap-4 z-30">
              {vehicles.map((vehicle, index) => (
                <button
                  key={index}
                  onClick={() => { setIsTransitioning(true); setCurrent(index); }}
                  className={`flex flex-col items-center p-2 rounded-lg overflow-hidden transition-all duration-300 ${current % vehicles.length === index ? 'ring-[#FF9D3D] bg-orange-200' : 'opacity-70'}`}
                >
                  <img src={vehicle.image} alt={vehicle.label} className="w-16 h-12 object-cover rounded" />
                  <p className="text-sm mt-1 text-gray-800">{vehicle.label}</p>
                </button>
              ))}
            </div>

            {/* Slide Indicator */}
            <div className="absolute right-20 bottom-4 text-3xl text-gray-600 z-20 p-20">
              {`0${(current % vehicles.length) + 1}`}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
