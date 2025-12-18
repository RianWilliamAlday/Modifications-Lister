import { useState, useEffect } from "react";
import ListSection from "../components/ListSection.jsx"

const ModSection =  ({ savedGameName, showPopup }) =>{
    const [ModName, setModName] = useState('');
    const [ModLink, setModLink] = useState('');

    const [ListOfMods, setListOfMods] = useState(() => {
        const stored = localStorage.getItem("mods");
        return stored ? JSON.parse(stored) : [];
    });


    useEffect(() => {
        localStorage.setItem("mods", JSON.stringify(ListOfMods));
    }, [ListOfMods]);

    const handleDeleteMod = (index) => {
    setListOfMods(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

         if (!savedGameName) {
            showPopup("Please set a game first!");
            return;
        }

        if (!ModName || !ModLink) {
            showPopup("Please fill in both fields.");
            return;
        }


        const mods = {
            ModName, ModLink, Game: savedGameName,
        }

        setListOfMods([...ListOfMods, mods]);

        console.log(ListOfMods);
        setModName("");
        setModLink("");
    }


    return(
        <>
             <section className="bg-white m-3 mb-5 mt-5 md:ml-30 md:mr-30 md:mt-8 xl:ml-50 xl:mr-50 xl:mt-8 shadow-md rounded-4xl p-6 font-serif">
                <h3 className="text-[22px] font-bold">List your Mods</h3>
                <p className="text:[14px] md:text-[16px] xl:text-[18px]">Enter the name of the mod and the link.</p>
                    <form onSubmit={handleSubmit} id="ModForm">
                        <label htmlFor="ModName" className="text-[18px] font-bold">Modification Name: </label>
                        <input 
                            type="text"
                            id="ModName" 
                            name="ModName"
                            value={ModName}
                            onChange={(e) => setModName(e.target.value)}
                            className="m-[10px] w-full border rounded-xl px-3 py-2"
                        />
                        <label htmlFor="ModLink" className="text-[18px] font-bold">Modification Link: </label>
                        <input 
                            type="url"
                            id="ModLink" 
                            name="ModLink"
                            value={ModLink}
                            onChange={(e) => setModLink(e.target.value)}
                            className="m-[10px] w-full border rounded-xl px-3 py-2"
                        />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">Submit</button>
                    </form>
                </section>

                <ListSection mods={ListOfMods} removeMod={handleDeleteMod}/>
        </>
        
    );
                                                                                              
}

export default ModSection;