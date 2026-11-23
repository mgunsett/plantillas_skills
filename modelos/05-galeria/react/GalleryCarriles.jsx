import { useState, useEffect, useRef, useCallback } from 'react'
import { Box, Flex, Text, Image } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { playerData } from '../../data/playerData'

gsap.registerPlugin(ScrollTrigger)

const MotionBox = motion(Box)

// Galería "Carriles": dos filas de fotos que corren solas en sentidos opuestos.
// Se frenan con el mouse (o al tabular) y cualquier foto se abre en el visor.

const LANE_CSS = {
  '@keyframes gc-mq': { to: { transform: 'translateX(-100%)' } },
  '.gc-lane': {
    display: 'flex',
    overflow: 'hidden',
    marginBottom: '10px',
    WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)',
    maskImage: 'linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)',
  },
  '.gc-track': { display: 'flex', gap: '10px', paddingRight: '10px', flexShrink: 0, animation: 'gc-mq var(--d,60s) linear infinite' },
  '.gc-lane.r .gc-track': { animationDirection: 'reverse' },
  '.gc-lane:hover .gc-track, .gc-lane:focus-within .gc-track': { animationPlayState: 'paused' },
  '.gc-ph': {
    flexShrink: 0, height: { base: '46vw', md: 'clamp(180px,22vw,300px)' }, padding: 0, border: 0,
    background: '#000', overflow: 'hidden', cursor: 'zoom-in', position: 'relative',
  },
  '.gc-ph img': {
    width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 25%',
    filter: 'grayscale(.6) brightness(.8)', transition: 'filter .4s cubic-bezier(0.23,1,0.32,1), transform .7s cubic-bezier(0.23,1,0.32,1)',
  },
  '.gc-ph:focus-visible': { outline: '2px solid', outlineColor: 'brand.dorado', outlineOffset: '-2px' },
  '@media (hover: hover) and (pointer: fine)': { '.gc-ph:hover img': { filter: 'none', transform: 'scale(1.04)' } },
  '@media (hover: none)': { '.gc-ph img': { filter: 'none' } },
  '@media (prefers-reduced-motion: reduce)': { '.gc-track': { animation: 'none' }, '.gc-lane': { overflowX: 'auto' } },
}

function Lane({ photos, all, reverse, duration, onOpen }) {
  const items = (hidden) => photos.map((p, i) => (
    <Box
      as="button"
      type="button"
      key={`${hidden ? 'b' : 'a'}${p.id}`}
      className="gc-ph"
      tabIndex={hidden ? -1 : 0}
      aria-label={hidden ? undefined : `Ampliar: ${p.alt}`}
      style={{ aspectRatio: i % 3 === 1 ? '16 / 11' : '4 / 5' }}
      onClick={() => onOpen(all.indexOf(p))}
    >
      <img src={p.src} alt={hidden ? '' : p.alt} loading="lazy" draggable={false} />
    </Box>
  ))
  return (
    <div className={`gc-lane${reverse ? ' r' : ''}`} style={{ '--d': `${duration}s` }}>
      <div className="gc-track">{items(false)}</div>
      <div className="gc-track" aria-hidden="true">{items(true)}</div>
    </div>
  )
}

function Viewer({ photos, index, onClose, onMove }) {
  const photo = photos[index]
  const touch = useRef(0)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onMove(1)
      if (e.key === 'ArrowLeft') onMove(-1)
    }
    window.addEventListener('keydown', onKey)
    window.__lenis?.stop()
    return () => { window.removeEventListener('keydown', onKey); window.__lenis?.start() }
  }, [onClose, onMove])

  const btn = {
    as: 'button', type: 'button', position: 'absolute', boxSize: '46px', borderRadius: 'full',
    border: '1.5px solid', borderColor: 'whiteAlpha.700', color: 'white', display: 'flex',
    alignItems: 'center', justifyContent: 'center', fontSize: '20px',
    _hover: { bg: 'whiteAlpha.200' },
  }

  return (
    <MotionBox
      position="fixed" inset={0} zIndex={2000} bg="rgba(10,18,38,0.95)"
      display="flex" alignItems="center" justifyContent="center"
      px={{ base: 3, md: '70px' }} py={{ base: '70px', md: '60px' }}
      role="dialog" aria-label="Foto ampliada"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touch.current
        if (Math.abs(dx) > 50) onMove(dx < 0 ? 1 : -1)
      }}
    >
      <MotionBox
        key={photo.id}
        as="img" src={photo.src} alt={photo.alt}
        maxW="100%" maxH="100%" objectFit="contain"
        initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        onClick={(e) => e.stopPropagation()}
      />
      <Box {...btn} top={4} right={4} aria-label="Cerrar" onClick={onClose}><FiX /></Box>
      <Box {...btn} left={{ base: 4, md: '14px' }} top={{ base: 'auto', md: '50%' }} bottom={{ base: 3, md: 'auto' }}
           aria-label="Anterior" onClick={(e) => { e.stopPropagation(); onMove(-1) }}><FiChevronLeft /></Box>
      <Box {...btn} right={{ base: 4, md: '14px' }} top={{ base: 'auto', md: '50%' }} bottom={{ base: 3, md: 'auto' }}
           aria-label="Siguiente" onClick={(e) => { e.stopPropagation(); onMove(1) }}><FiChevronRight /></Box>
      <Text position="absolute" bottom="18px" left={0} right={0} textAlign="center" fontSize="13px" color="whiteAlpha.700" pointerEvents="none">
        {index + 1} / {photos.length} · {photo.alt}
      </Text>
    </MotionBox>
  )
}

export default function GalleryCarriles() {
  const photos = playerData.gallery
  const [open, setOpen] = useState(null)
  const headRef = useRef(null)

  const half = Math.ceil(photos.length / 2)
  const rows = [photos.slice(0, half), photos.slice(half)]
  const count = (g) => photos.filter((p) => p.group === g).length
  const caps = [['u', playerData.currentClub], ['s', 'Selección'], ['c', 'Clubes anteriores']].filter(([g]) => count(g))

  const move = useCallback((d) => setOpen((i) => (i + d + photos.length) % photos.length), [photos.length])
  const close = useCallback(() => setOpen(null), [])

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(headRef.current, { y: 40, opacity: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true } })
    })
    return () => mm.revert()
  }, [])

  if (!photos.length) return null

  return (
    <Box as="section" id="galeria" bg="brand.dark" py={{ base: 16, md: 24 }} overflow="hidden" sx={LANE_CSS}>
      <Box ref={headRef} px={{ base: 5, md: 12, lg: 16 }} mb={{ base: 7, md: 11 }} maxW="1528px" mx="auto">
        <Text fontSize="11px" fontWeight="bold" letterSpacing="0.28em" textTransform="uppercase" color="brand.dorado">Fotos</Text>
        <Text as="h2" fontFamily="heading" fontWeight="bold" fontSize={{ base: '4xl', lg: '5xl' }} color="brand.amber" lineHeight={1}>
          Galería
        </Text>
      </Box>

      <Lane photos={rows[0]} all={photos} duration={70} onOpen={setOpen} />
      <Lane photos={rows[1]} all={photos} duration={80} reverse onOpen={setOpen} />

      <Flex gap={{ base: 4, md: 6 }} justify="center" wrap="wrap" mt={6} px={5} fontSize="11px" letterSpacing="0.2em" textTransform="uppercase" color="brand.gray">
        {caps.map(([g, label]) => (
          <Text as="span" key={g}><Text as="b" color="brand.amber">{count(g)}</Text> {label}</Text>
        ))}
      </Flex>

      <AnimatePresence>
        {open !== null && <Viewer photos={photos} index={open} onClose={close} onMove={move} />}
      </AnimatePresence>
    </Box>
  )
}
