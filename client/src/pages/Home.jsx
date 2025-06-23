import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import RoleListing from '../components/RoleListing'
import AppDownload from '../components/AppDownload'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <RoleListing />
      <AppDownload />
      <Footer />
    </div>
  )
}

export default Home