import React from 'react'
import useWindowDimensions from '../../react/hooks/useWindowDimensions'
import { motion, AnimatePresence } from 'framer-motion'
import { NavItem } from './NavItem'

export const Navbar = (props) => {
  const { height } = useWindowDimensions()
  const [showUpButton, setShowUpButton] = React.useState(false)
  const [openMenu, setOpenMenu] = React.useState(false)

  const toggle = () => {
    setOpenMenu(!openMenu)
  }

  const [lastScrollY, setLastScrollY] = React.useState(0)

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      // if (window.scrollY <= 5) {
      //   setPosition('relative')
      // } else {
      //   setPosition('fixed')
      // }
      if (window.scrollY > 10) {
        // if scroll down hide the navbar
        setShowUpButton(true)
      }

      if (window.scrollY <= 10) {
        setShowUpButton(false)
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY)
    }
  }

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar)

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar)
      }
    }
  }, [lastScrollY])

  return (
    <>
      <nav
        id='top'
        className={`flex items-center justify-between w-full min-h-fit p-4 shadow-sm`}
      >
        <i className=''></i>

        <i
          onClick={toggle}
          className='tablet:hidden ri-menu-fill text-3xl movil-lg:text-4xl px-2 text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-pink-500 cursor-pointer'
        ></i>

        {props.links}
      </nav>

      <AnimatePresence>
        {openMenu ? (
          <div
            onClick={toggle}
            className={`w-screen h-screen fixed tablet:hidden top-0 left-0`}
          >
            <motion.aside
              initial={{
                opacity: 0,
                x: '-100vw',
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                x: '-100vw',
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              onClick={(e) => {
                e.stopPropagation()
              }}
              className='w-fit h-full bg-white shadow-xl'
            >
              <ul
                className='flex flex-col w-full items-center justify-center'
                slot='links'
              >
                <NavItem onClick={() => setOpenMenu(false)} to={'#home'}>
                  Inicio
                </NavItem>
                <NavItem onClick={() => setOpenMenu(false)} to={'#about'}>
                  Sobre mi
                </NavItem>
                <NavItem onClick={() => setOpenMenu(false)} to={'#experiencie'}>
                  Experiencia
                </NavItem>
                <NavItem onClick={() => setOpenMenu(false)} to={'#techs'}>
                  Tecnologias
                </NavItem>
                <NavItem onClick={() => setOpenMenu(false)} to={'#projects'}>
                  Proyectos
                </NavItem>
                <NavItem onClick={() => setOpenMenu(false)} to={'#contact'}>
                  Contactame
                </NavItem>
              </ul>
            </motion.aside>
          </div>
        ) : (
          ''
        )}
      </AnimatePresence>

      {showUpButton ? (
        <a
          href='#top'
          className='ri-arrow-up-line fixed text-6xl font-extrabold bottom-16 right-10 p-4 rounded-full bg-slate-800 text-indigo-400 opacity-50 hover:opacity-100 shadow-md cursor-pointer z-20'
        ></a>
      ) : (
        ''
      )}
    </>
  )
}
