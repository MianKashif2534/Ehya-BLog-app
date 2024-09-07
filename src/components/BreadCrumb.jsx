import React from 'react'
import { Link } from 'react-router-dom'

function BreadCrumb({data}) {
  return (
    <div className='flex py-4 items-center overflow-auto whitespace-nowrap'>
        {data.map((item,index)=>{
            return <div key={index} className='text-black opacity-50 text-sm md:text-base'>
                <Link to={item.link}>{item.name}    
                {index !== data.length - 1 && <span className='px-5 '>/</span>}
                   </Link>
            </div>
        })} 
    </div>
  )
}

export default BreadCrumb