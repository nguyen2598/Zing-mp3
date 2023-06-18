import React from 'react'
import './Header.scss'
import icons from '../../ultis/icon'
import Search from '../Search/Search'
const {IcPrev,IcNext}=icons
export default function Header() {
  return (
    <div className='header'>
      <div className='header-left'>
        <div className='header-left--arrow'>
          <span className='arrow--prev'><IcPrev/></span>
          <span className='arrow--next'><IcNext/></span>
        </div>
        <div className="header-search">
          <Search/>
        </div>
      </div>
      <div className="header-right">Dang nhap</div>
    </div>
  )
}
