import React from 'react';
import bannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
      <div className='md:w-1/2 w-full flex items-center md:justify-end'>
        <img src={bannerImg} alt="" />
      </div>
      
      <div className='md:w-1/2 w-full'>
        <h1 className='md:text-5xl text-2xl font-medium mb-7'>New Releases This Week</h1>
        <p className='mb-10'>It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone</p>
        <button className='btn-primary'>Subscribe</button>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16 mb-16 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="feature-card flex flex-col items-center text-center p-4 border rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 duration-300">
        <img src="assets/delivery.svg" alt="Quick Delivery" className="w-16 h-16 mx-auto mb-4" />
        <h3 className="font-cinzel text-lg md:text-xl">Quick Delivery</h3>
        <p className="text-gray-500 text-sm md:text-base font-dosis">
          Swift delivery to your doorstep in just 7-10 days.
        </p>
      </div>

      <div className="feature-card flex flex-col items-center text-center p-4 border rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 duration-300">
        <img src="assets/secure.svg" alt="Secure Payment" className="w-16 h-16 mx-auto mb-4" />
        <h3 className="font-cinzel text-lg md:text-xl">Secure Payment</h3>
        <p className="text-gray-500 text-sm md:text-base font-dosis">
          Shop confidently with secure payment for worry-free transactions.
        </p>
      </div>

      <div className="feature-card flex flex-col items-center text-center p-4 border rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 duration-300">
        <img src="assets/quality.svg" alt="Best Quality" className="w-16 h-16 mx-auto mb-4" />
        <h3 className="font-cinzel text-lg md:text-xl">Best Quality</h3>
        <p className="text-gray-500 text-sm md:text-base font-dosis">
          Unsurpassed excellence, delivering premium quality products.
        </p>
      </div>

      <div className="feature-card flex flex-col items-center text-center p-4 border rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 duration-300">
        <img src="assets/return.svg" alt="Return Guarantee" className="w-16 h-16 mx-auto mb-4" />
        <h3 className="font-cinzel text-lg md:text-xl">Return Guarantee</h3>
        <p className="text-gray-500 text-sm md:text-base font-dosis">
          30-day hassle-free return. Your satisfaction is our commitment.
        </p>
      </div>
    </div>
  );
};

const ShopPage = () => {
  return (
    <div>
      <Banner />
      <Features />
    </div>
  );
};

export default ShopPage;
