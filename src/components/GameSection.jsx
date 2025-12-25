import { useState, useEffect, useRef } from "react";
import { Gamepad2, Send   } from "lucide-react";

const API_KEY = import.meta.env.VITE_GAMES;

const GameSection = ({ setSavedGameName, showNotification, showPopup }) => {
  const [gameName, setGameName] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    if (gameName.length < 2) {
      setResults([]);
      return;
    }

    const fetchGames = async () => {
      try {
        const url = new URL("https://api.rawg.io/api/games");
        url.searchParams.append("key", API_KEY);
        url.searchParams.append("search", gameName);
        url.searchParams.append("page_size", 5);

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch games");
        }

        const data = await res.json();
        setResults(data.results || []);
        setShowResults(true);
      } catch (err) {
        console.error("RAWG fetch error:", err);
      }
    };

    const delay = setTimeout(fetchGames, 300);
    return () => clearTimeout(delay);
    }, [gameName]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsFocused(false);
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectGame = (name) => {
    setGameName(name);
    setShowResults(false);
    setIsFocused(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!gameName) {
      showPopup("Please select a game.");
      return;
    }

    setSavedGameName(gameName);
    showNotification(`Game set to "${gameName}"`);
    setGameName("");  
    setShowResults(false);
  };

    return(
        <>
            <section
                ref={wrapperRef}
                className="bg-white m-3 mb-5 mt-5 md:ml-30 md:mr-30 md:mt-8 xl:ml-50 xl:mr-50 :mt-8 shadow-md rounded-4xl p-6 font-serif"
                >

              <div className="flex items-center gap-2">
                <Gamepad2 className="text-indigo-600" size={28} />
                <h3 className="text-[22px] font-bold">Game</h3>
              </div>
                <p className="text-[14px] md:text-[16px] xl:text-[18px]">For which game is the mod?</p>
                    <form onSubmit={handleSubmit} className="mt-3">
                        <label className="font-bold">Game Name:</label>
                            <input
                                type="text"
                                value={gameName}
                                onChange={(e) => setGameName(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                className="m-[10px] w-full border rounded-xl px-3 py-2"
                                placeholder="Search for a game..."
                            />

                            {isFocused && showResults && results.length > 0 && (
                                <ul className="absolute z-10 mt-1 bg-white border rounded-xl shadow-lg max-h-60 overflow-y-auto">
                                    {results.map((game) => (
                                    <li
                                        key={game.id}
                                        onClick={() => handleSelectGame(game.name)}
                                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                    >
                                    {game.name}
                                    {game.released && (
                                        <span className="text-xs text-gray-500 ml-2">
                                            ({game.released.slice(0, 4)})
                                        </span>
                                        )}
                                    </li>
                                ))}
                                </ul>
                            )}

                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center gap-2">
                            <Send  className="text-white" size={20} />
                            Submit
                        </button>
                        </form>
                </section>
        </>
    );                                                                                          
}

export default GameSection;