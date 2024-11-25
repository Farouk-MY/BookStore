import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

const Loading = () => {
  const lottieContainer = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: lottieContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/animation/bee.json", // Ensure this path is correct
    });

    // Stop the animation after 10 seconds
    setTimeout(() => {
      animation.stop();
    }, 3000); // 10000 milliseconds = 10 seconds

    return () => {
      animation.destroy(); // Cleanup when unmounting
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-yellow-50">
      <div
        ref={lottieContainer}
        className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80"
      ></div>
      <p className="mt-4 text-lg font-semibold text-center">
        Books <br /> EveryWhere <br /> EveryTime
      </p>
    </div>
  );
};

export default Loading;
