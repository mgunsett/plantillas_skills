import { useState, useEffect, useRef } from 'react'
import { Box, Flex, Text, Image, Link } from '@chakra-ui/react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { playerData } from '../../data/playerData'

// ─── Navbar "Índice a pantalla completa" (kit claro, opción 5) ───────
// Barra mínima (iniciales + dorsal, Contacto y MENÚ) con mix-blend
// difference, así se lee sobre fondos claros y oscuros. El menú abre a
// pantalla completa: links gigantes numerados con la sección activa en
// contorno, contactos abajo y el retrato a la derecha (arriba en mobile).

const MotionBox = motion(Box)
const EASE = [0.23, 1, 0.32, 1]

export const navLinks = [
  { label: 'Inicio',       href: '#hero' },
  { label: 'Estadísticas', href: '#estadisticas' },
  { label: 'Videos',       href: '#videos' },
  { label: 'Galería',      href: '#galeria' },
  { label: 'Prensa',       href: '#prensa' },
  { label: 'Contacto',     href: '#contact' },
]

function scrollTo(href) {
  const target = document.querySelector(href)
  if (!target) return
  if (window.__lenis) window.__lenis.scrollTo(target, { offset: href === '#hero' ? 0 : -20 })
  else target.scrollIntoView({ behavior: 'smooth' })
}

// Sección visible para marcarla en el índice
function useActiveSection() {
  const [active, setActive] = useState('#hero')
  useEffect(() => {
    const seen = {}
    const els = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean)
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { seen[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0 })
      let best = null, ratio = 0
      els.forEach((el) => { if ((seen[el.id] || 0) > ratio) { ratio = seen[el.id]; best = el.id } })
      if (best) setActive(`#${best}`)
    }, { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-20% 0px -40% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}

const contacts = [
  ...playerData.contact.map((c) => ({ role: c.title, name: c.label, url: c.url })),
  ...playerData.socialMedia.filter((s) => s.label === 'Instagram').map((s) => ({ role: 'Instagram', name: s.handle, url: s.url })),
]

export default function NavbarIndex() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection()
  const reduce = useReducedMotion()
  const btnRef = useRef(null)

  // Mientras está abierto: frena Lenis, bloquea el scroll y cierra con Escape
  useEffect(() => {
    if (!open) return
    window.__lenis?.stop()
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus() } }
    window.addEventListener('keydown', onKey)
    return () => {
      window.__lenis?.start()
      document.documentElement.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    // espera a que se libere el scroll antes de desplazar
    setTimeout(() => scrollTo(href), reduce ? 0 : 60)
  }

  const t = (d = 0, dur = 0.8) => (reduce ? { duration: 0 } : { duration: dur, ease: EASE, delay: d })

  return (
    <>
      <Flex
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        align="center"
        justify="space-between"
        px={{ base: 5, lg: 12 }}
        py={{ base: 4, lg: '22px' }}
        color="white"
        sx={{ mixBlendMode: 'difference' }}
      >
        <Link href="#hero" onClick={(e) => go(e, '#hero')} aria-label={`Inicio · ${playerData.displayName}`}
          fontWeight="700" fontSize="24px" letterSpacing="0.04em" _hover={{ textDecoration: 'none' }}>
          {playerData.initials}_{playerData.number}
        </Link>
        <Flex align="center" gap="26px">
          <Link href="#contact" onClick={(e) => go(e, '#contact')} display={{ base: 'none', md: 'block' }}
            fontSize="11px" fontWeight="500" letterSpacing="0.2em" textTransform="uppercase" _hover={{ textDecoration: 'none' }}>
            Contacto
          </Link>
          <Box
            as="button"
            ref={btnRef}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-indice"
            display="flex"
            alignItems="center"
            gap="12px"
            fontSize="11px"
            fontWeight="700"
            letterSpacing="0.24em"
            textTransform="uppercase"
            minH="44px"
            _focusVisible={{ outline: '2px solid', outlineColor: 'brand.dorado', outlineOffset: '3px' }}
          >
            <Box as="span" aria-hidden="true" position="relative" w="30px" h="12px">
              <Box as="span" position="absolute" left={0} right={0} top={0} h="2px" bg="currentColor"
                transition={`transform .5s cubic-bezier(0.23,1,0.32,1)`} transform={open ? 'translateY(5px) rotate(45deg)' : 'none'} />
              <Box as="span" position="absolute" left="10px" right={0} bottom={0} h="2px" bg="currentColor"
                transition={`transform .5s cubic-bezier(0.23,1,0.32,1)`} transform={open ? 'translate(-10px,-5px) rotate(-45deg)' : 'none'} />
            </Box>
            {open ? 'Cerrar' : 'Menú'}
          </Box>
        </Flex>
      </Flex>

      <AnimatePresence>
        {open && (
          <MotionBox
            id="menu-indice"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            position="fixed"
            inset={0}
            zIndex={999}
            display="grid"
            gridTemplateColumns={{ base: '1fr', lg: '1.25fr 1fr' }}
            gridTemplateRows={{ base: 'auto 1fr', lg: '1fr' }}
            bg="white"
            overflow="hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: t(0.15, 0.4) }}
          >
            {/* Cortina del acento que barre la pantalla al abrir */}
            <MotionBox position="absolute" inset={0} bg="brand.amber" zIndex={3} pointerEvents="none"
              initial={{ y: '-100%' }} animate={{ y: '100%' }} transition={t(0.05, 0.7)} />

            <Flex as="nav" aria-label="Principal" direction="column" justify={{ base: 'flex-start', lg: 'center' }}
              position="relative" pt={{ base: '22px', lg: '120px' }} pb={{ base: '30px', lg: '40px' }} px={{ base: 5, lg: 12 }}
              overflowY="auto">
              {navLinks.map((l, i) => {
                const on = active === l.href
                return (
                  <Link key={l.href} href={l.href} onClick={(e) => go(e, l.href)} aria-current={on ? 'true' : undefined}
                    display="flex" alignItems="baseline" gap={{ base: '14px', lg: '22px' }} overflow="hidden"
                    color="brand.amber" fontWeight="700" textTransform="uppercase" lineHeight={1.02}
                    fontSize={{ base: '11vw', lg: 'clamp(40px, 5.6vw, 92px)' }} _hover={{ textDecoration: 'none' }}
                    _focusVisible={{ outline: '2px solid', outlineColor: 'brand.dorado', outlineOffset: '2px' }}
                    sx={{ '@media (hover: hover) and (pointer: fine)': { '&:hover span.lbl': { color: 'brand.dorado' } } }}>
                    <MotionBox as="small" fontSize="12px" letterSpacing="0.16em" color="brand.dorado" fontWeight="500"
                      w="28px" flexShrink={0} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t(0.35, 0.6)}>
                      {String(i + 1).padStart(2, '0')}
                    </MotionBox>
                    <MotionBox as="span" className="lbl" display="inline-block"
                      color={on ? 'transparent' : 'brand.amber'}
                      sx={on ? { WebkitTextStroke: '1.5px var(--chakra-colors-brand-amber)' } : { transition: 'color .3s' }}
                      initial={{ y: '105%' }} animate={{ y: 0 }} transition={t(0.25 + i * 0.05)}>
                      {l.label}
                    </MotionBox>
                  </Link>
                )
              })}

              <MotionBox mt={{ base: '22px', lg: '34px' }} display="flex" flexWrap="wrap" gap="10px 28px"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t(0.6, 0.6)}>
                {contacts.map((c) => (
                  <Box key={c.url}>
                    <Text fontSize="9px" letterSpacing="0.24em" textTransform="uppercase" color="brand.gray" mb="4px">{c.role}</Text>
                    <Link href={c.url} isExternal fontSize="12px" fontWeight="700" letterSpacing="0.08em" color="brand.amber">{c.name}</Link>
                  </Box>
                ))}
              </MotionBox>
            </Flex>

            <Box position="relative" overflow="hidden" bg="#0A1226" order={{ base: -1, lg: 0 }}
              h={{ base: '30vh', lg: 'auto' }} minH={{ base: '190px', lg: 0 }}>
              <MotionBox as="img" src={playerData.menuPortrait} alt={playerData.menuPortraitAlt}
                position="absolute" inset={0} w="100%" h="100%" objectFit="cover" objectPosition="50% 20%"
                initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={t(0, 1.4)} />
              <Box position="absolute" inset={0} bgGradient="linear(to-t, rgba(10,18,38,0.9) 0%, transparent 45%)" />
              <Flex position="absolute" left={{ base: 5, lg: 8 }} right={{ base: 5, lg: 8 }} bottom={{ base: 4, lg: '30px' }}
                zIndex={2} color="white" align="flex-end" justify="space-between">
                <Box>
                  <Text fontSize="11px" letterSpacing="0.24em" textTransform="uppercase" opacity={0.8}>
                    {playerData.position} · #{playerData.number}
                  </Text>
                  <Text fontWeight="700" textTransform="uppercase" lineHeight={0.9} fontSize={{ base: '34px', lg: '56px' }}>
                    {playerData.name}<br />{playerData.fullName}
                  </Text>
                </Box>
                <Image src={playerData.logoCurrentClub} alt={playerData.currentClub} h={{ base: '40px', lg: '64px' }} />
              </Flex>
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  )
}
