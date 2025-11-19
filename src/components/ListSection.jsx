import { useState } from "react";

const ListSection =  ({mods}) =>{

    return(
        <>
        <section className="bg-white m-10 xl:ml-50 xl:mr-50 shadow-md rounded-4xl p-6 font-serif">
            <h2 className="text-[25px] font-bold">Mods List</h2>
             <div id="ModsList">
                <p className="text-center text-[20] italic text-gray-700" id="emptyMessage">No mods listed yet.</p></div>

        <ul>
            {mods && mods.map((mod, index) =>(
                <li key={index}>{mod.ModName}, {mod.ModLink}</li>
        ))}
        </ul>
        </section>

        
        </>
    );
                                                                                              
}

export default ListSection;