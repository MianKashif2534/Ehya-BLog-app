import React from 'react'
import AriticleCard from '../../components/AriticleCard'
import { FiArrowRightCircle } from "react-icons/fi";

function Ariticles() {
  return (
    <div className={`container lg:justify-center mx-auto flex flex-wrap md:gap-x-5 gap-y-5 px-5 py-10`}>
        <div className='flex flex-wrap md:gap-x-5 gap-y-5 pb-10'>
        <AriticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33%-21px)]"/>
        <AriticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33%-21px)]"/>
        <AriticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33%-21px)]"/>
        <AriticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33%-21px)]"/>
        <AriticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33%-21px)]"/>
        <AriticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33%-21px)]"/>
        </div>
        <button className='flex mx-auto text-primary px-6 py-2 rounded-lg items-center gap-x-3 font-semibold border-2 border-primary hover:text-white hover hover:bg-primary'>
          <span>More articles</span>
          <FiArrowRightCircle className='h-7 w-7 p-0.5 rounded-full'/>
        </button>
    </div>
  )
}

export default Ariticles