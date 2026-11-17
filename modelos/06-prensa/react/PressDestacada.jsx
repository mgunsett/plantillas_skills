import { useRef, useEffect } from 'react'
import { Box, Flex, Grid, Text, Image } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { playerData } from '../../data/playerData'

gsap.registerPlugin(ScrollTrigger)

// Prensa "Nota destacada": la primera nota grande con foto de fondo y las
// demás al costado. Los datos salen de playerData.press.

const EASE = 'cubic-bezier(0.23,1,0.32,1)'

function Source({ note, size = '38px' }) {
  return (
    <Flex align="center" gap={3} fontSize="12px" fontWeight="bold" letterSpacing="0.16em" textTransform="uppercase" flexWrap="wrap">
      <Image src={note.logo} alt="" boxSize={size} borderRadius="8px" objectFit="cover" flexShrink={0} />
      <Text as="span">{note.outlet}</Text>
      {note.date && (
        <Text as="span" color="brand.gray" fontWeight="normal" whiteSpace="nowrap">· {note.date}</Text>
      )}
    </Flex>
  )
}

const linkProps = (note) => ({
  as: 'a',
  href: note.url,
  target: '_blank',
  rel: 'noopener noreferrer',
  'aria-label': `Leer en ${note.outlet}: ${note.title}`,
  _focusVisible: { outline: '2px solid', outlineColor: 'brand.dorado', outlineOffset: '2px' },
})

export default function PressSection() {
  const sectionRef = useRef(null)
  const [featured, ...rest] = playerData.press || []

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        gsap.utils.toArray('[data-reveal]', sectionRef.current),
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      )
    })
    return () => mm.revert()
  }, [])

  if (!featured) return null

  return (
    <Box as="section" id="press" ref={sectionRef} position="relative" bg="brand.dark" px={{ base: 4, md: 12, lg: 20 }} py={{ base: 16, md: 28 }}>
      <Box maxW="1400px" mx="auto">
        <Box data-reveal mb={{ base: 7, md: 10 }}>
          <Text fontFamily="mono" fontSize="10px" color="brand.bone" textTransform="uppercase" letterSpacing="widest">
            En los medios
          </Text>
          <Text as="h2" fontFamily="heading" fontWeight="bold" fontSize={{ base: '4xl', lg: '5xl' }} color="brand.amber" lineHeight={1}>
            Prensa
          </Text>
        </Box>

        <Grid templateColumns={{ base: '1fr', lg: rest.length ? '1.5fr 1fr' : '1fr' }} gap={3}>
          {/* Nota destacada */}
          <Box
            {...linkProps(featured)}
            data-reveal
            role="group"
            position="relative"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            gridRow={{ lg: rest.length ? `span ${rest.length}` : 'auto' }}
            minH={{ base: '480px', lg: 'clamp(520px, 44vw, 640px)' }}
            p={{ base: 6, lg: 10 }}
            bg="#141810"
            color="white"
          >
            {featured.photo && (
              <Image
                src={featured.photo}
                alt=""
                position="absolute"
                inset={0}
                w="100%"
                h="100%"
                objectFit="cover"
                objectPosition="50% 20%"
                transition={`transform .9s ${EASE}`}
                sx={{ '@media (hover: hover) and (pointer: fine)': { '[role=group]:hover &': { transform: 'scale(1.04)' } } }}
              />
            )}
            <Box position="absolute" inset={0} bg="linear-gradient(0deg, #0C0E0A 8%, #0C0E0A99 45%, transparent 75%)" />
            <Text position="absolute" top={{ base: 5, lg: 7 }} left={{ base: 5, lg: 7 }} bg="brand.amber" color="#0C0E0A" fontSize="11px" fontWeight="bold" letterSpacing="0.2em" textTransform="uppercase" px={3} py={2}>
              Nota destacada
            </Text>
            <Box position="relative">
              <Source note={featured} />
              <Text as="h3" mt={4} fontFamily="heading" fontWeight="bold" fontSize={{ base: '28px', lg: 'clamp(30px, 3.4vw, 52px)' }} lineHeight={1} textTransform="uppercase" maxW="18ch">
                {featured.title}
              </Text>
              {featured.summary && (
                <Text mt={3} fontSize="15px" color="#d6dccd" maxW="48ch" lineHeight={1.5}>{featured.summary}</Text>
              )}
              <Text mt={5} fontSize="11px" fontWeight="bold" letterSpacing="0.18em" textTransform="uppercase" color="brand.amber">
                Leer la nota ↗
              </Text>
            </Box>
          </Box>

          {/* Resto de las notas */}
          {rest.map((note) => (
            <Box
              key={note.title}
              {...linkProps(note)}
              data-reveal
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              minH={{ base: '200px', lg: '260px' }}
              p={{ base: '22px', lg: 7 }}
              border="1px solid"
              borderColor="brand.amberLight"
              color="white"
              transition={`background .3s ${EASE}`}
              sx={{ '@media (hover: hover) and (pointer: fine)': { '&:hover': { bg: '#1b2014' } } }}
            >
              <Source note={note} />
              <Text as="h3" mt={3} fontFamily="heading" fontWeight="bold" fontSize={{ base: '18px', lg: 'clamp(18px, 1.6vw, 24px)' }} lineHeight={1.12} textTransform="uppercase">
                {note.title}
              </Text>
              <Text mt={4} fontSize="11px" fontWeight="bold" letterSpacing="0.18em" textTransform="uppercase" color="brand.amber">
                Leer ↗
              </Text>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
