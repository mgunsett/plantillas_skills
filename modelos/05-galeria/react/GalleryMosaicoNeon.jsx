import { useState, useEffect, useRef, useCallback } from 'react'
import { Box, Flex, Text, Image, Portal, useBreakpointValue } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { playerData } from '../../data/playerData'

gsap.registerPlugin(ScrollTrigger)

// Galería "Mosaico con pestañas": grilla de 4 columnas (2 en mobile) con una
// foto grande cada cinco, filtro por club, "Ver más" y visor a pantalla completa.

const MotionBox = motion(Box)
const EASE = 'cubic-bezier(0.23,1,0.32,1)'
const BG = '#0C0E0A'

const CATS = [
  { key: 'all', label: 'Todas' },
  { key: 'u', label: playerData.currentClub },
  { key: 'c', label: 'Clubes anteriores' },
]

// Formas [columnas, filas] que cierran la grilla sin huecos: grupos de 5
// (una grande 2x2 + cuatro chicas) y el resto ajustado al ancho.
function shapesFor(n, cols) {
  const out = []
  while (n - out.length >= 5) out.push([2, 2], [1, 1], [1, 1], [1, 1], [1, 1])
  const rest = {
    4: { 1: [[4, 1]], 2: [[2, 1], [2, 1]], 3: [[2, 1], [1, 1], [1, 1]], 4: [[1, 1], [1, 1], [1, 1], [1, 1]] },
    2: { 1: [[2, 1]], 2: [[1, 1], [1, 1]], 3: [[2, 1], [1, 1], [1, 1]], 4: [[1, 1], [1, 1], [1, 1], [1, 1]] },
  }[cols][n - out.length]
  return rest ? out.concat(rest) : out
}

function Lightbox({ list, index, onClose, onMove }) {
  const closeRef = useRef(null)
  const touchX = useRef(0)
  const photo = list[index]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onMove(1)
      if (e.key === 'ArrowLeft') onMove(-1)
    }
    window.addEventListener('keydown', onKey)
    window.__lenis?.stop()
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      window.__lenis?.start()
    }
  }, [onClose, onMove])

  const btn = {
    as: 'button',
    position: 'absolute',
    boxSize: '46px',
    borderRadius: 'full',
    border: '1.5px solid',
    borderColor: 'brand.amber',
    color: 'brand.amber',
    bg: 'rgba(12,14,10,0.6)',
    fontSize: '18px',
    display: 'grid',
    placeItems: 'center',
    zIndex: 2,
  }

  return (
    <MotionBox
      position="fixed"
      inset={0}
      zIndex={2000}
      bg="rgba(12,14,10,0.95)"
      role="dialog"
      aria-modal="true"
      aria-label="Foto ampliada"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={{ base: 3, md: '70px' }}
      py={{ base: '70px', md: '60px' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) onMove(dx > 0 ? -1 : 1)
      }}
    >
      <Image
        key={photo.id}
        src={photo.src}
        alt={photo.alt}
        maxW="100%"
        maxH="100%"
        objectFit="contain"
        draggable={false}
        sx={{ animation: `lbIn .5s ${EASE} both`, '@keyframes lbIn': { from: { opacity: 0, transform: 'scale(.97)' } } }}
      />
      <Box {...btn} ref={closeRef} top={4} right={4} aria-label="Cerrar" onClick={onClose}>✕</Box>
      <Box {...btn} left={{ base: 'calc(50% - 56px)', md: '14px' }} top={{ base: 'auto', md: '50%' }} bottom={{ base: 3, md: 'auto' }} aria-label="Foto anterior" onClick={() => onMove(-1)}>←</Box>
      <Box {...btn} right={{ base: 'calc(50% - 56px)', md: '14px' }} top={{ base: 'auto', md: '50%' }} bottom={{ base: 3, md: 'auto' }} aria-label="Foto siguiente" onClick={() => onMove(1)}>→</Box>
      <Text position="absolute" top={7} left={0} right={0} textAlign="center" fontSize="13px" fontWeight="bold" letterSpacing="0.16em" color="#d6dccd" sx={{ fontVariantNumeric: 'tabular-nums' }}>
        {index + 1} / {list.length}
      </Text>
    </MotionBox>
  )
}

export default function GallerySection() {
  const sectionRef = useRef(null)
  const [cat, setCat] = useState('all')
  const [open, setOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const cols = useBreakpointValue({ base: 2, md: 4 }, { ssr: false }) || 4

  const list = playerData.gallery.filter((g) => cat === 'all' || g.cat === cat)
  const first = cols === 4 ? 10 : 5
  const shown = open ? list : list.slice(0, first)
  const shapes = shapesFor(shown.length, cols)

  const move = useCallback((d) => setLightbox((i) => (i + d + list.length) % list.length), [list.length])
  const close = useCallback(() => setLightbox(null), [])

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        gsap.utils.toArray('[data-reveal]', sectionRef.current),
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      )
    })
    return () => mm.revert()
  }, [])

  // Al abrir "Ver más" cambia el alto de la página: recalcular los triggers
  useEffect(() => { ScrollTrigger.refresh() }, [open, cat])

  const pick = (key) => { setCat(key); setOpen(false) }

  return (
    <Box
      as="section"
      id="galeria"
      ref={sectionRef}
      position="relative"
      bg="brand.dark"
      px={{ base: 4, md: 12, lg: 20 }}
      py={{ base: 16, md: 28 }}
    >
      <Box maxW="1400px" mx="auto">
        <Flex data-reveal justify="space-between" align={{ base: 'flex-start', md: 'flex-end' }} direction={{ base: 'column', md: 'row' }} gap={5} mb={{ base: 7, md: 9 }}>
          <Box>
            <Text fontFamily="mono" fontSize="10px" color="brand.bone" textTransform="uppercase" letterSpacing="widest">
              Fotos
            </Text>
            <Text as="h2" fontFamily="heading" fontWeight="bold" fontSize={{ base: '4xl', lg: '5xl' }} color="brand.amber" lineHeight={1}>
              Galería
            </Text>
          </Box>

          <Flex role="tablist" aria-label="Filtrar fotos" gap="6px" flexWrap="wrap">
            {CATS.map((c) => {
              const n = playerData.gallery.filter((g) => c.key === 'all' || g.cat === c.key).length
              const on = cat === c.key
              return (
                <Box
                  key={c.key}
                  as="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => pick(c.key)}
                  fontSize="11px"
                  fontWeight="bold"
                  letterSpacing="0.16em"
                  textTransform="uppercase"
                  px={4}
                  py="11px"
                  borderRadius="full"
                  border="1px solid"
                  borderColor={on ? 'brand.amber' : 'brand.amberLight'}
                  bg={on ? 'brand.amber' : 'transparent'}
                  color={on ? BG : 'brand.gray'}
                  transition={`background .25s ${EASE}, color .25s ${EASE}`}
                  _focusVisible={{ outline: '2px solid', outlineColor: 'brand.dorado', outlineOffset: '2px' }}
                >
                  {c.label}
                  <Box as="span" opacity={0.6} ml="6px">{n}</Box>
                </Box>
              )
            })}
          </Flex>
        </Flex>

        <Box
          data-reveal
          display="grid"
          gridTemplateColumns={`repeat(${cols}, 1fr)`}
          gridAutoRows={{ base: '42vw', md: 'clamp(150px, 15vw, 230px)' }}
          gridAutoFlow="dense"
          gap={{ base: '6px', md: 2 }}
        >
          {shown.map((g, i) => {
            const [w, h] = shapes[i]
            // En escritorio, la foto grande alterna de lado en cada grupo
            const flip = cols === 4 && Math.floor(i / 5) % 2 === 1 && i % 5 === 0
            return (
              <Box
                key={`${cat}-${g.id}`}
                as="button"
                aria-label={`Ampliar foto: ${g.alt}`}
                onClick={() => setLightbox(i)}
                position="relative"
                overflow="hidden"
                bg="black"
                cursor="zoom-in"
                gridColumn={`span ${w}`}
                gridRow={`span ${h}`}
                gridColumnEnd={flip ? -1 : undefined}
                _focusVisible={{ outline: '2px solid', outlineColor: 'brand.dorado', outlineOffset: '2px' }}
                sx={{
                  animation: `tileIn .7s ${EASE} both`,
                  animationDelay: `${(i % 10) * 0.04}s`,
                  '@keyframes tileIn': { from: { opacity: 0, transform: 'translateY(24px)' } },
                  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
                  '&::after': {
                    content: '""', position: 'absolute', inset: 0,
                    boxShadow: 'inset 0 0 0 0 #B4F32A', transition: `box-shadow .3s ${EASE}`,
                  },
                  '@media (hover: hover) and (pointer: fine)': {
                    '&:hover img': { transform: 'scale(1.05)' },
                    '&:hover::after': { boxShadow: 'inset 0 0 0 3px #B4F32A' },
                  },
                }}
              >
                <Image
                  src={g.src}
                  alt=""
                  loading="lazy"
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  objectPosition="50% 25%"
                  transition={`transform .7s ${EASE}`}
                  draggable={false}
                />
              </Box>
            )
          })}
        </Box>

        <Flex justify="space-between" align="center" mt={{ base: 5, md: 6 }} gap={4}>
          <Text fontSize="12px" color="brand.gray" letterSpacing="0.12em">
            {shown.length} de {list.length} fotos
          </Text>
          {list.length > first && (
            <Box
              as="button"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              fontSize="12px"
              fontWeight="bold"
              letterSpacing="0.18em"
              textTransform="uppercase"
              px="22px"
              py="14px"
              borderRadius="full"
              border="1.5px solid"
              borderColor="brand.amber"
              color="brand.amber"
              transition={`background .25s ${EASE}, color .25s ${EASE}`}
              sx={{ '@media (hover: hover) and (pointer: fine)': { '&:hover': { bg: 'brand.amber', color: BG } } }}
              _focusVisible={{ outline: '2px solid', outlineColor: 'brand.dorado', outlineOffset: '2px' }}
            >
              {open ? 'Ver menos' : 'Ver más fotos'}
            </Box>
          )}
        </Flex>
      </Box>

      {/* En un portal: la sección vive dentro de un contexto con z-index propio */}
      <Portal>
        <AnimatePresence>
          {lightbox !== null && <Lightbox list={list} index={lightbox} onClose={close} onMove={move} />}
        </AnimatePresence>
      </Portal>
    </Box>
  )
}
