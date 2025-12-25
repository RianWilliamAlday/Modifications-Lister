import { Package, Download, Trash2 } from "lucide-react";

const ListSection =  ({mods, removeMod}) =>{

    return(
        <>
         <section className="bg-white m-3 mb-5 mt-5 md:ml-30 md:mr-30 md:mt-8 md:mb-8 xl:ml-50 xl:mr-50 xl:mt-8 xl:mb- shadow-md rounded-4xl p-6 font-serif">
          <div className="flex items-center gap-2">
            <Package className="text-indigo-600" size={28} />
            <h2 className="text-[25px] font-bold">Mods List</h2>
          </div>

            {mods.length === 0 && (
              <div className="text-center py-12">
                <Package size={64} className="mx-auto text-gray-300" />
                <p className="text-center text:[14px] md:text-[16px] xl:text-[20px] italic text-gray-700">
                    No mods listed yet.
                </p>
              </div>
            )}

            <div className="mt-4 space-y-4">
                {mods.map((mod, index) => (
                    <div
                        key={index}
                        className="bg-gray-200 border p-4 rounded-xl transition transform hover:scale-[1.03] hover:shadow-lg">
                        <p className="text-[15px] xl:text-lg font-semibold flex items-center gap-2">
                            <Package size={28} className="hidden md:block lg:block xl:block text-indigo-600" />
                            {mod.ModName}
                            <span className="text-gray-600"> (for {mod.Game})</span>
                        </p>

                        <div className="flex gap-3 mt-3">
                            <a
                                href={mod.ModLink}
                                target="_blank"
                                className="px-3 py-2 rounded-md bg-blue-600 text-white transition hover:bg-blue-700 hover:scale-105 flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                    Download
                            </a>

                            <button
                                onClick={() => removeMod(index)}
                                className="px-3 py-2 rounded-md bg-red-600 text-white transition hover:bg-red-700 hover:scale-105 flex items-center gap-2">
                                <Trash2 className="w-4 h-4" />
                                    Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        
        </>
    );
                                                                                              
}

export default ListSection;