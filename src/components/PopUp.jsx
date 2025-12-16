const PopUp =  ({ message, visible, onClose }) =>{

    return(
        <>
        <div
            className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-[1000] transition-opacity duration-300 ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <div
                className="bg-white p-5 rounded-xl text-center w-[300px] shadow-lg">
                <p className="text-gray-800 mb-4">{message}</p>

                <button
                    onClick={onClose}
                    className="mt-2 px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300">OK</button>
            </div>
        </div>
        </>
    );
                                                                                              
}

export default PopUp;