import Header from "../src/components/Header.jsx"
import GameSection from "../src/components/GameSection.jsx"
import ModSection from "../src/components/ModSection.jsx"
import ListSection from "../src/components/ListSection.jsx"
import Footer from "../src/components/Footer.jsx"

function App() {

  return (
    <>
      <main className="bg-gray-300">
      <Header webname="Modifications Lister"/>
      <GameSection />
      <ModSection />
      <Footer />.
      </main>
    </>
  )
}

export default App
