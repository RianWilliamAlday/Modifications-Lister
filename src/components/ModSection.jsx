import { useState } from "react";
import ListSection from "../components/ListSection.jsx"

const ModSection =  () =>{
    const [ModName, setModName] = useState('');
    const [ModLink, setModLink] = useState('');
    const [ListOfMods, setListOfMods] = useState([]);

    const handleSubmit = (e) =>{
        e.preventDefault();

        const mods = {
            ModName, ModLink
        }

        setListOfMods([...ListOfMods, mods]);

        console.log(ListOfMods);
    }


    return(
        <>
             <section className="bg-white m-10 xl:ml-50 xl:mr-50 shadow-md rounded-4xl p-6 font-serif">
                <h3 className="text-[22px] font-bold">List your Mods</h3>
                <p className="text-[18px]">Enter the name of the mod and the link.</p>
                    <form onSubmit={handleSubmit} id="ModForm">
                        <label htmlFor="ModName" className="text-[18px] font-bold">Modification Name: </label>
                        <input 
                            type="text"
                            id="ModName" 
                            name="ModName"
                            onChange={(e) => setModName(e.target.value)}
                            className="m-[10px] w-full border rounded-xl px-3 py-2"
                        />
                        <label htmlFor="ModLink" className="text-[18px] font-bold">Modification Link: </label>
                        <input 
                            type="url"
                            id="ModLink" 
                            name="ModLink"
                            onChange={(e) => setModLink(e.target.value)}
                            className="m-[10px] w-full border rounded-xl px-3 py-2"
                        />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">Submit</button>

                        <h1>{ModName}</h1>
                        <h1>{ModLink}</h1>
                    </form>
                </section>

                <ListSection mods={ListOfMods}/>
        </>
        
    );
                                                                                              
}

export default ModSection;