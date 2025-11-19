import { useState } from "react";


const GameSection =  () =>{
    const [GameName, setGameName] = useState('');
    const [ListOfGames, setListOfGames] = useState([]);

    const handleSubmit = (e) =>{
        e.preventDefault();

        setListOfGames([...ListOfGames, GameName]);

        console.log(ListOfGames);
    }


    return(
        <>
            <section className="bg-white m-10 xl:ml-50 xl:mr-50 shadow-md rounded-4xl p-6 font-serif">
                <h3 className="text-[22px] font-bold">Game</h3>
                <p className="text-[18px]">For which game is the mod?</p>
                    <form onSubmit={handleSubmit} className="text -[18px]" id="GameForm">
                        <label htmlFor="GameName" className="font-bold">Game Name: </label>
                        <input 
                            type="text" 
                            id="GameName" 
                            name="GameName"
                            onChange={(e) => setGameName(e.target.value)} 
                            className="m-[10px] w-full border rounded-xl px-3 py-2"
                        />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">Submit</button>
                        <h1>{GameName}</h1>  
                        </form>
                </section>
        </>
    );
                                                                                              
}

export default GameSection;