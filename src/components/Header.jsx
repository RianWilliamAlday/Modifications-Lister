const Header =  ({webname}) =>{

    return(
        <>
        <header className="bg-blue-500 text-center p-4 font-serif text-shadow-lg shadow-sm shadow-black-700">
                <h1 className="m-2 text-3xl xl:text-4xl font-bold text-white">{webname}</h1>
                <p className="text-[20px]">List mods that you want to download for your apps!</p>
        </header>
        </>
    );
                                                                                              
}

export default Header;