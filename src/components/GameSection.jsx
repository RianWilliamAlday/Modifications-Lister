import { useState } from "react";
import { Gamepad2, Send   } from "lucide-react";

const GameSection =  ({ setSavedGameName, showNotification, showPopup }) =>{
    const [GameName, setGameName] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();

        if (!GameName) {
            showPopup("Please enter a game name.");
            return;
        }

        setSavedGameName(GameName);
        showNotification(`Game set to "${GameName}"`);
        setGameName("");
    };

    return(
        <>
            <section className="bg-white m-3 mb-5 mt-5 md:ml-30 md:mr-30 md:mt-8 xl:ml-50 xl:mr-50 :mt-8 shadow-md rounded-4xl p-6 font-serif">
              <div className="flex items-center gap-2">
                <Gamepad2 className="text-indigo-600" size={28} />
                <h3 className="text-[22px] font-bold">Game</h3>
              </div>
                <p className="text-[14px] md:text-[16px] xl:text-[18px]">For which game is the mod?</p>
                    <form onSubmit={handleSubmit} className="text -[18px]" id="GameForm">
                        <label htmlFor="GameName" className="font-bold">Game Name: </label>
                        <input 
                            type="text" 
                            id="GameName" 
                            name="GameName"
                            value={GameName}
                            onChange={(e) => setGameName(e.target.value)} 
                            className="m-[10px] w-full border rounded-xl px-3 py-2"
                        />
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