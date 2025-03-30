'use client'

import {
    PopoverGroup
} from '@headlessui/react'
import Logo from '../img/logo.png'

export default function Header() {
  const isAuthenticated = localStorage.getItem("isAuthenticated")

  return (
    <header className="bg-black">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt="Novalyze logo"
              src={Logo}
              className="h-15 w-auto"
            />
          </a>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">

          <a href="/" className="text-sm/6 font-semibold text-secondary">
            Home
          </a>
          <a href="#" className="text-sm/6 font-semibold text-secondary">
            Marketplace
          </a>
          <a href="#" className="text-sm/6 font-semibold text-secondary">
            Company
          </a>
        </PopoverGroup>
        {!isAuthenticated ?<div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="/login" className="text-sm/6 font-semibold text-secondary">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>: <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a onClick={()=>localStorage.removeItem("isAuthenticated")} href="/login" className="text-sm/6 font-semibold text-secondary">
            Log out <span aria-hidden="true">&rarr;</span>
          </a>
        </div>}
        
       
      </nav>
    </header>
  )
}
