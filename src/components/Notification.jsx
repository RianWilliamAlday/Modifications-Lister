const Notification =  ({ message, visible }) =>{

    return(
        <>
        <div
            className={`fixed bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-white shadow-lg bg-blue-600 text-sm pointer-events-none transition-all duration-400 ease-in-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}style={{ zIndex: 1000 }}>{message}</div>
        </>
    );
                                                                                              
}

export default Notification;