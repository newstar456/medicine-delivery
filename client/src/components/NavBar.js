import React from 'react'
import Link from 'next/link'


const CustomLink = ({href, title, className=""}) => {

  return(
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span className={`h-[1px] inline-block w-0 bg-dark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300`}>&nbsp;</span>
    </Link>
  )
}

const NavBar = () => {
  return (
    <header className='w-full px-32 py-8 font-medium flex item-center justify-start bg-[#F7CE2D] fixed z-1000'>
    
      <nav className='text-[#303841] font-semibold'>
        <CustomLink href='/' title="SHOPS" className='mr-4'/>
        <CustomLink href='/cart' title='SHOPPING CART' className='mx-4'/>
      </nav>


    </header>
  )
}

export default NavBar