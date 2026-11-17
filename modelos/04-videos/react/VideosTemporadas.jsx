import { useRef, useEffect, useState } from 'react'
import { Box, Flex, Grid, Text, Image, AspectRatio } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { FaPlay } from 'react-icons/fa'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { playerData } from '../../data/playerData'
import useScrubReveal from '../../hooks/useScrubReveal'

gsap.registerPlugin(ScrollTrigger)

const MotionBox = motion(Box)

// Videos "Temporadas": cada video bajo su año gigante (en contorno) con el escudo
// del club. El primero (el más reciente) va relleno con el acento.
function SeasonVideo({ video, onOpen }) {
  const title = (video.fullTitle || video.title).split('|').pop().trim()
  return (
    <Box data-season role="group">
      <Flex align="flex-end" justify="space-between" pb={3} mb={{ base: 4, md: 5 }} borderBottom="1px solid" borderColor="brand.amberLight">
        <Text
          aria-hidden="true"
          fontFamily="heading"
          fontWeight="bold"
          fontSize={{ base: '96px', md: 'clamp(90px, 10vw, 150px)' }}
          lineHeight={0.78}
          color="transparent"
          sx={{ WebkitTextStroke: '1.5px var(--chakra-colors-brand-amber)' }}
          className="season-year"
        >
          '{video.year}
        </Text>
        <Box textAlign="right">
          {video.clubLogo && <Image src={video.clubLogo} alt={`Escudo de ${video.club}`} boxSize="40px" objectFit="contain" ml="auto" />}
          <Text mt={2} fontSize="11px" letterSpacing="0.2em" color="brand.gray" textTransform="uppercase">{video.club}</Text>
        </Box>
      </Flex>

      <Box
        as="button"
        type="button"
        onClick={() => onOpen(video)}
        aria-label={`Ver ${title} (${video.club})`}
        position="relative"
        display="block"
        w="100%"
        overflow="hidden"
        bg="black"
        textAlign="left"
        sx={{
          aspectRatio: { base: '4 / 4.4', md: '4 / 5' },
          '&:focus-visible': { outline: '2px solid', outlineColor: 'brand.dorado', outlineOffset: '4px' },
          '@media (hover: hover) and (pointer: fine)': {
            '&:hover img.cover': { transform: 'scale(1.05)' },
            '&:hover .play': { transform: 'scale(1.1)' },
          },
        }}
      >
        <Image className="cover" src={video.cover || video.thumbnail} alt="" loading="lazy" w="100%" h="100%" objectFit="cover"
               transition="transform .6s cubic-bezier(0.23,1,0.32,1)" />
        <Box position="absolute" inset={0} bg="linear-gradient(transparent 50%, rgba(12,14,10,0.94))" />
        <Flex className="play" position="absolute" top={4} right={4} boxSize="54px" borderRadius="full" align="center" justify="center"
              bg="rgba(12,14,10,0.8)" color="brand.amber" border="1.5px solid" borderColor="brand.amber"
              transition="transform .3s cubic-bezier(0.23,1,0.32,1)">
          <Box as={FaPlay} fontSize="16px" ml="3px" />
        </Flex>
        <Box position="absolute" left="18px" right="18px" bottom={4}>
          <Text fontFamily="heading" fontWeight="bold" fontSize="22px" textTransform="uppercase" lineHeight={1} color="white">{title}</Text>
          <Text mt={1} fontSize="12px" color="#d6dccd">{video.league}</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default function VideosSection() {
  const videos = playerData.videos

  const wrapRef = useRef(null)

  const [openVideo, setOpenVideo] = useState(null)

  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  useScrubReveal(sectionRef, {
    elements: [{ ref: headerRef, fromVars: { y: 50, opacity: 0 }, vars: { y: 0, opacity: 1 } }],
    start: 'top 80%',
    end: 'top 40%',
  })

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
        }
      )

      const cards = gsap.utils.toArray('[data-season]', wrapRef.current)
      if (reduced) {
        gsap.set(cards, { autoAlpha: 1, y: 0 })
      } else {
        gsap.fromTo(
          cards,
          { y: 55, autoAlpha: 0, rotateX: 6, transformPerspective: 1200 },
          {
            y: 0,
            autoAlpha: 1,
            rotateX: 0,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: { trigger: wrapRef.current, start: 'top 82%', once: true },
          }
        )
      }

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!openVideo) return
    const onKey = (e) => e.key === 'Escape' && setOpenVideo(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openVideo])

  if (!videos.length) return null

  return (
    <Box
      as="section"
      id="videos"
      ref={sectionRef}
      position="relative"
      minH="100vh"
      bg="brand.dark"
      px={{ base: 2, md: 12, lg: 40 }}
      pt={{ base: 20, md: '10%' }}
      pb={{ base: 12, md: '10%' }}
      overflow="hidden"
    >
      {/* glows ambientales */}
      <Box
        position="absolute"
        top={{ base: '10%', md: '-5%' }}
        right="-12%"
        w="55vw"
        h="55vw"
        background="radial-gradient(ellipse, rgba(189,167,142,0.16) 0%, transparent 70%)"
        pointerEvents="none"
      />

      <Box maxW="1240px" mx="auto" position="relative" zIndex={1}>
        {/* ── Header ── */}
        <Flex direction="column" align="flex-start" justify="flex-start" ref={headerRef} mb={{ base: 8, md: 12 }}>
          <Text fontFamily='mono' fontSize="10px" color="brand.bone" textTransform="uppercase" letterSpacing="widest">
            Highlights por temporada
          </Text>
          <Text as="h2" fontFamily='heading' fontWeight="bold" fontSize={{ base: '4xl', lg: '5xl' }} color="brand.amber" lineHeight={1}>
            Videos
          </Text>
        </Flex>

        {/* ── Temporadas: un video por año, con el escudo del club ── */}
        <Grid ref={wrapRef} templateColumns={{ base: '1fr', md: `repeat(${Math.min(videos.length, 3)}, 1fr)` }} gap={{ base: 10, md: 7 }}
          sx={{ '& > [data-season]:first-of-type .season-year': { color: 'brand.amber', WebkitTextStroke: 0 } }}>
          {videos.map((v) => (
            <SeasonVideo key={v.id} video={v} onOpen={setOpenVideo} />
          ))}
        </Grid>
      </Box>

      {/* ── Modal fullscreen (embed de Instagram) ── */}
      <AnimatePresence>
        {openVideo && (
          <MotionBox
            position="fixed"
            inset={0}
            zIndex={2000}
            bg="rgba(3,6,10,0.95)"
            backdropFilter="blur(12px)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={{ base: 4, md: 12 }}
            onClick={() => setOpenVideo(null)}
          >
            <Box
              as="button"
              position="absolute"
              top={{ base: 16, md: 14 }}
              right={{ base: 4, md: 60 }}
              zIndex={2100}
              aria-label="Cerrar video"
              borderRadius="full"
              p={1}
              bg="brand.bgRef"
              backdropFilter="blur(10px)"
              color="white"
              onClick={() => setOpenVideo(null)}
              transition="color 0.3s ease, transform 0.3s ease"
              _hover={{ color: 'brand.gray2', transform: 'rotate(90deg)' }}
            >
              <Box as={FiX} fontSize="32px" />
            </Box>
            <MotionBox
              w="100%"
              maxW={{ base: '100%', md: '420px' }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              boxShadow="0 40px 120px rgba(0,0,0,0.7)"
              borderRadius="16px"
              overflow="hidden"
              bg="#000"
              mt={{ base: 0, md: '5%' }}
            >
              <AspectRatio ratio={{ base: 9 / 16, md: 9 / 15 }}>
                <Box
                  as="iframe"
                  src={`https://www.instagram.com/reel/${openVideo.instagramId}/embed`}
                  title={openVideo.fullTitle}
                  border="none"
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  w="100%"
                  h="100%"
                />
              </AspectRatio>
            </MotionBox>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  )
}
