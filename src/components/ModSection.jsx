import { useState, useEffect } from "react";
import ListSection from "../components/ListSection.jsx"
import {Gamepad2, Send } from "lucide-react";

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

    useEffect(() => {
    if (ModLink.length < 10 || !ModLink.startsWith('http')) return;

    if (ModLink.includes('gtainside.com')) {
        try {
            const urlParts = ModLink.split('/').filter(Boolean); 
            const slug = urlParts[urlParts.length - 1];

            let formattedName = slug.replace(/^\d+-/, '').replace(/-/g, ' ');

            formattedName = formattedName.replace(/\b\w/g, char => char.toUpperCase());


            setModName(formattedName);

            return;
        } catch (e) {
            console.log("Failed to parse URL, falling back to proxy...");
        }
    }

    const fetchTitle = async () => {
        try {
            const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(ModLink)}`;
            const response = await fetch(proxyUrl);
                
            if (!response.ok) throw new Error("Network response was not ok");
            
            const data = await response.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, "text/html");
            const rawTitle = doc.querySelector("title")?.innerText;

            const match = data.contents.match(/<title>(.*?)<\/title>/i);
                
            if (rawTitle) {
                let cleanTitle = rawTitle  
                    .replace(/^GTA San Andreas /i, '')
                    .replace(/ Mod - GTAinside\.com/i, '')
                    .replace(/ - Nexus Mods.*/i, '')
                    .replace(/Steam Workshop::/i, '')
                    .replace(/ - Mod DB.*/i, '')
                    .trim();
    
            setModName(cleanTitle);
        }
        } catch (error) {
            console.log("Could not auto-fetch title, user will need to input manually.", error);
        }
    };

        const delaySearch = setTimeout(() => {
            fetchTitle();
        }, 1000);

        return () => clearTimeout(delaySearch);
    }, [ModLink]);

    const handleSubmit = (e) =>{
        e.preventDefault();

         if (!savedGameName || !savedGameName.name) {
            showPopup("Please set a game first!");
            return;
        }

        if (!ModName || !ModLink) {
            showPopup("Please fill in both fields.");
            return;
        }


        const mods = {
            ModName, ModLink, Game: savedGameName.name, background_image: savedGameName.image
        }

        setListOfMods([...ListOfMods, mods]);

        console.log(ListOfMods);
        setModName("");
        setModLink("");
    }


    return(
        <>
             <section className="bg-white m-3 mb-5 mt-5 md:ml-30 md:mr-30 md:mt-8 xl:ml-50 xl:mr-50 xl:mt-8 shadow-md rounded-4xl p-6 font-serif">
              <div className="flex items-center gap-2">
                <Gamepad2 className="text-indigo-600" size={28} />
                <h3 className="text-[22px] font-bold">List your Mods</h3>
              </div>
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
                            onChange={(e) => {
                                    const newLinkValue = e.target.value;
                                    setModLink(newLinkValue);
                                    if (newLinkValue.trim() === "") {
                                        setModName("");
                                }
                            }}
                            className="m-[10px] w-full border rounded-xl px-3 py-2"
                        />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center gap-2 mt-4">
                            <Send  className="text-white" size={20} />
                            Submit
                        </button>
                    </form>
                </section>

                <ListSection mods={ListOfMods} removeMod={handleDeleteMod}/>
        </>
        
    );
                                                                                              
}

export default ModSection;