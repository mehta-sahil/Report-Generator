import { Link } from "react-router-dom";
import { useEffect } from "react"; // Ensure you import Link
import Typewriter from "typewriter-effect";
import "./Home.css";

const Home = () => {
  useEffect(() => {
    // Set body overflow to hidden
    document.body.style.overflowY = "hidden";

    // Cleanup function to reset the overflow when component unmounts
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center font-mono">
      <h2 className="text-lg md:text-xl mb-2">Bored of Assignments?</h2>
      <h1 className="text-3xl md:text-5xl font-bold relative whitespace-nowrap">
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("Your AI buddy is here!")
              .changeDelay(100)
              .pauseFor(1000)
              .deleteAll()
              .changeDelay(100)
              .typeString("Don't Worry We Got You")
              .changeDelay(100)
              .start();
          }}
        />
        <span className="bg-black inline-block ml-1"></span>
      </h1>
      <Link to="/core" className="mt-6">
        {" "}
        {/* Updated to Link */}
        <button className="bg-black text-white py-3 px-6 rounded-full transition-all duration-300 hover:bg-gray-700">
          Start Writing
        </button>
      </Link>
    </div>
  );
};

export default Home;
