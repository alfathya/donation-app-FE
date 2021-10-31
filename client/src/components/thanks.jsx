
import React from 'react'
import image from './asset/donationimg.jpg'
import {useHistory} from 'react-router-dom'

function Thanks() {
    const history = useHistory()
    const donate = ()=>{
        localStorage.removeItem("donate")
        history.push('/')
    }
    return (
        <div className=" w-full h-screen flex flex-col bg-white justify-center items-center">
                <h1 className="text-blue-400 font-extrabold text-2xl">THANK YOU FOR DONATING</h1>
                <img className="w-2/3 md:w-2/3 lg:w-2/3 xl:w-1/2" src={image} alt="" />
                <button onClick={donate} className="donate w-32 h-10 bg-black hover:bg-gray-700 rounded-md text-white">Donate Again</button>
        </div>
    )
}

export default Thanks