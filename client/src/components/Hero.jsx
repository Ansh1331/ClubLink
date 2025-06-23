import { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {

    const { setSearchFilter, setIsSearched } = useContext(AppContext)

    const titleRef = useRef(null)
    const locationRef = useRef(null)

    const onSearch = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value
        })
        setIsSearched(true)
    }

    return (
        <div className='container 2xl:px-20 mx-auto my-10'>
            <div className='bg-gradient-to-r from-emerald-400 to-emerald-700 text-white py-16 text-center mx-2 rounded-xl'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Discover Your Place in Campus Clubs
                </h2>
                <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'>Explore open positions across student-run clubs. Whether you're a tech enthusiast, artist, leader, or creator — there's a role for you. Make your mark this semester!
                </p>
                <div className='flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto'>
                    <div className='flex items-center'>
                        <img className='h-4 sm:h-5' src={assets.search_icon} alt="" />
                        <input type="text"
                            placeholder='Search for clubs'
                            className='max-sm:text-xs p-2 rounded outline-none w-full'
                            ref={titleRef}
                        />
                    </div>
                    <div className='flex items-center'>
                        <img className='h-4 sm:h-5' src={assets.location_icon} alt="" />
                        <input type="text"
                            placeholder='Position'
                            className='max-sm:text-xs p-2 rounded outline-none w-full'
                            ref={locationRef}
                        />
                    </div>
                    <button onClick={onSearch} className='bg-blue-600 px-6 py-2 rounded text-white m-1'>Search</button>
                </div>
            </div>

            <div className="border border-gray-300 shadow-lg mx-2 mt-8 p-8 rounded-xl bg-white animate-fade-in">
  <div className="text-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
      🌟 Clubs Actively Recruiting on <span className="text-blue-600">ClubLink</span>
    </h2>
    <p className="text-gray-500 text-sm mt-2">Find your perfect fit — join a club that inspires you!</p>
  </div>

  <div className="flex justify-center gap-4 lg:gap-6 flex-wrap items-center text-sm text-gray-700">
    <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-900 px-5 py-2 rounded-full shadow-sm transition-transform duration-200 hover:scale-105">
      💻 CSI (Computer Society of India)
    </div>
    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900 px-5 py-2 rounded-full shadow-sm transition-transform duration-200 hover:scale-105">
      💃 Dance Club
    </div>
    <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-green-200 text-green-900 px-5 py-2 rounded-full shadow-sm transition-transform duration-200 hover:scale-105">
      ⚡ IEEE Student Chapter
    </div>
    <div className="flex items-center gap-2 bg-gradient-to-r from-red-100 to-red-200 text-red-900 px-5 py-2 rounded-full shadow-sm transition-transform duration-200 hover:scale-105">
      🎭 Drama Club
    </div>
    <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-900 px-5 py-2 rounded-full shadow-sm transition-transform duration-200 hover:scale-105">
      🚀 Entrepreneurship Cell
    </div>
    <div className="flex items-center gap-2 bg-gradient-to-r from-pink-100 to-pink-200 text-pink-900 px-5 py-2 rounded-full shadow-sm transition-transform duration-200 hover:scale-105">
      🎨 Art & Design Society
    </div>
  </div>
</div>




        </div>
    )
}

export default Hero