"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Zap,
  Globe,
  Palette,
  Smartphone,
  Menu,
  X,
  ArrowRight,
  Check,
  Sparkles,
  Monitor,
  Layers,
  Star,
  Code,
  Rocket,
  Shield,
  Clock,
  Award,
} from "lucide-react"
import Link from "next/link"

export default function LaunchLayerWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isClient, setIsClient] = useState(false)

  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorTrailRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  // Set client-side flag
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Enhanced mouse tracking with cursor variants
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = e.clientX
    const y = e.clientY

    setMousePosition({ x, y })

    requestAnimationFrame(() => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0)`
      }
      if (cursorTrailRef.current) {
        cursorTrailRef.current.style.transform = `translate3d(${x - 24}px, ${y - 24}px, 0)`
      }
    })
  }, [])

  useEffect(() => {
    if (!isClient) return
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove, isClient])

  // Enhanced scroll tracking with direction detection
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    setIsScrollingDown(currentScrollY > lastScrollY)
    setLastScrollY(currentScrollY)

    requestAnimationFrame(() => {
      setScrollY(currentScrollY)
    })
  }, [lastScrollY])

  useEffect(() => {
    if (!isClient) return
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll, isClient])

  // Smooth loading with staggered animations
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  // Advanced intersection observer with staggered animations
  useEffect(() => {
    if (!isClient) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-in")
            }, index * 100)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    const elements = document.querySelectorAll(".scroll-animate")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [isClient])

  // Ultra-smooth scroll function
  const scrollToSection = useCallback((sectionId: string) => {
    if (!isClient) return
    
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 100
      const startPosition = window.scrollY
      const distance = offsetTop - startPosition
      const duration = 1200
      let start: number | null = null

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime
        const timeElapsed = currentTime - start
        const progress = Math.min(timeElapsed / duration, 1)

        // Advanced easing function
        const ease =
          progress < 0.5 ? 8 * progress * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 4) / 2

        window.scrollTo(0, startPosition + distance * ease)

        if (progress < 1) {
          requestAnimationFrame(animation)
        }
      }

      requestAnimationFrame(animation)
      setActiveSection(sectionId)
      setIsMenuOpen(false)
    }
  }, [isClient])

  const scrollToTop = useCallback(() => {
    if (!isClient) return
    
    const duration = 1000
    const startPosition = window.scrollY
    let start: number | null = null

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime
      const timeElapsed = currentTime - start
      const progress = Math.min(timeElapsed / duration, 1)

      const ease =
        progress < 0.5 ? 8 * progress * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 4) / 2

      window.scrollTo(0, startPosition * (1 - ease))

      if (progress < 1) {
        requestAnimationFrame(animation)
      }
    }

    requestAnimationFrame(animation)
    setActiveSection("home")
  }, [isClient])

  // Advanced interactive particles with physics
  const InteractiveParticles = () => {
    if (!isClient) return null
    
    const vw = window.innerWidth
    const vh = window.innerHeight
    const particles = Array.from({ length: 40 }, (_, i) => {
      const baseX = Math.random() * 100
      const baseY = Math.random() * 100
      const mouseInfluence = 0.0001
      const time = Date.now() * 0.0008

      const offsetX = (mousePosition.x - vw / 2) * mouseInfluence
      const offsetY = (mousePosition.y - vh / 2) * mouseInfluence

      const floatX = Math.sin(time + i * 0.8) * 3
      const floatY = Math.cos(time + i * 0.6) * 3

      const size = 0.5 + Math.sin(time * 2 + i) * 0.3
      const opacity = 0.2 + Math.sin(time + i * 0.5) * 0.15

      return (
        <div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-2000 ease-out"
          style={{
            left: `calc(${baseX}% + ${offsetX + floatX}px)`,
            top: `calc(${baseY}% + ${offsetY + floatY}px)`,
            width: `${size}px`,
            height: `${size}px`,
            opacity,
            transform: `scale(${0.8 + Math.sin(time * 1.5 + i) * 0.4})`,
            filter: `blur(${0.5 + Math.sin(time + i) * 0.3}px)`,
          }}
        />
      )
    })

    return <div className="absolute inset-0 overflow-hidden pointer-events-none">{particles}</div>
  }

  // Professional magnetic button with advanced physics
  const MagneticButton = ({ children, onClick, className = "", variant = "primary", ...props }: {
    children: React.ReactNode
    onClick?: () => void
    className?: string
    variant?: "primary" | "secondary" | "ghost"
    [key: string]: any
  }) => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 })
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
      if (!buttonRef.current) return

      const rect = buttonRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const maxDistance = 150

      if (distance < maxDistance) {
        const strength = (maxDistance - distance) / maxDistance
        const moveX = deltaX * strength * 0.3
        const moveY = deltaY * strength * 0.3

        setMagneticOffset({ x: moveX, y: moveY })
      }
    }, [])

    const handleMouseLeave = useCallback(() => {
      setMagneticOffset({ x: 0, y: 0 })
      setIsHovered(false)
      setCursorVariant("default")
    }, [])

    const handleMouseEnter = useCallback(() => {
      setIsHovered(true)
      setCursorVariant("button")
    }, [])

    const createRipple = useCallback((e: React.MouseEvent) => {
      if (!buttonRef.current) return

      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const newRipple = { id: Date.now(), x, y }
      setRipples((prev) => [...prev, newRipple])

      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
      }, 1000)
    }, [])

    const baseClasses = "relative overflow-hidden transition-all duration-500 ease-out font-semibold tracking-wide"
    const variantClasses: Record<string, string> = {
      primary:
        "bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white shadow-2xl hover:shadow-blue-500/30",
      secondary:
        "bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 text-white hover:bg-gray-800/80",
      ghost: "text-gray-300 hover:text-blue-400 hover:bg-blue-500/10",
    }

    return (
      <button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={onClick}
        onMouseDown={createRipple}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        style={{
          transform: `translate3d(${magneticOffset.x}px, ${magneticOffset.y}px, 0) scale(${isHovered ? 1.05 : 1})`,
          filter: isHovered ? "drop-shadow(0 20px 40px rgba(59, 130, 246, 0.4))" : "none",
        }}
        {...props}
      >
        <span className="relative z-10">{children}</span>

        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none animate-ping"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: 50,
              height: 50,
              background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />

        {/* Border glow */}
        <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
      </button>
    )
  }

  // Advanced floating elements
  const FloatingElements = () => {
    if (!isClient) return null
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full"
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + (i % 3) * 20}%`,
              animation: `float-${i % 3} ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen bg-black text-white overflow-x-hidden transition-all duration-1000 ease-out ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Advanced cursor system */}
      {isClient && (
        <>
          <div
            ref={cursorRef}
            className={`fixed pointer-events-none z-50 mix-blend-screen transition-all duration-300 ${
              cursorVariant === "button" ? "w-12 h-12 bg-blue-400/60" : "w-6 h-6 bg-blue-500/40"
            } rounded-full`}
            style={{
              opacity: mousePosition.x > 0 ? 1 : 0,
              willChange: "transform",
            }}
          />

          <div
            ref={cursorTrailRef}
            className={`fixed pointer-events-none z-40 transition-all duration-700 ${
              cursorVariant === "button" ? "w-20 h-20 border-2 border-blue-400/40" : "w-12 h-12 border border-blue-500/20"
            } rounded-full`}
            style={{
              opacity: mousePosition.x > 0 ? 1 : 0,
              willChange: "transform",
            }}
          />
        </>
      )}

      {/* Enhanced navigation with glass morphism */}
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-700 ${
          scrollY > 50
            ? "bg-black/90 backdrop-blur-2xl border-b border-gray-800/50 shadow-2xl shadow-blue-500/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center h-24">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-4 group cursor-pointer transition-all duration-500 hover:scale-105"
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl flex items-center justify-center group-hover:rotate-180 transition-all duration-700 ease-out shadow-2xl group-hover:shadow-blue-500/40">
                  <Layers className="h-7 w-7 text-white transition-transform duration-700" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10" />
              </div>
              <div>
                <span className="text-3xl font-black text-white tracking-tight group-hover:text-blue-400 transition-colors duration-500">
                  LaunchLayer
                </span>
                <div className="text-xs text-gray-400 font-medium tracking-wider uppercase opacity-80">
                  Premium Web Studio
                </div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {["home", "services", "pricing", "contact"].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  onMouseEnter={() => setCursorVariant("button")}
                  onMouseLeave={() => setCursorVariant("default")}
                  className={`relative px-8 py-4 text-base font-bold transition-all duration-500 hover:text-blue-400 group rounded-2xl ${
                    activeSection === item ? "text-blue-400 bg-blue-500/15 border border-blue-500/30" : "text-gray-300 hover:bg-gray-800/50"
                  }`}
                  style={{
                    transform: `translateY(${isScrollingDown ? "2px" : "0px"})`,
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <span className="relative z-10 tracking-wider uppercase text-sm">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                  <span
                    className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500 ease-out group-hover:w-12 ${
                      activeSection === item ? "w-12" : ""
                    }`}
                  />
                  <div className="absolute inset-0 bg-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              ))}
              <MagneticButton
                onClick={() => scrollToSection("pricing")}
                className="px-10 py-4 rounded-2xl text-base font-bold"
                variant="primary"
              >
                Get Started
              </MagneticButton>
            </div>

            {/* Enhanced mobile menu */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-blue-400 transition-all duration-500 p-3 rounded-xl hover:bg-blue-500/10"
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <div className="relative w-6 h-6">
                  <Menu
                    className={`absolute inset-0 w-6 h-6 transition-all duration-500 ease-out ${
                      isMenuOpen ? "rotate-180 opacity-0 scale-75" : "rotate-0 opacity-100 scale-100"
                    }`}
                  />
                  <X
                    className={`absolute inset-0 w-6 h-6 transition-all duration-500 ease-out ${
                      isMenuOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-180 opacity-0 scale-75"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        <div
          className={`lg:hidden bg-black/95 backdrop-blur-2xl border-t border-gray-800/30 transition-all duration-700 ease-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-8 py-8 space-y-4">
            {["home", "services", "pricing", "contact"].map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left py-4 px-6 text-lg font-medium text-gray-300 hover:text-blue-400 transition-all duration-500 hover:translate-x-4 hover:bg-blue-500/10 rounded-xl"
                style={{
                  transform: isMenuOpen ? "translateY(0)" : "translateY(-20px)",
                  transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 100}ms`,
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero section with advanced animations */}
      <section
        ref={heroRef}
        id="home"
        className="relative pt-32 pb-32 px-8 min-h-screen flex items-center"
      >
        <InteractiveParticles />
        <FloatingElements />

        {/* Dynamic background with multiple layers */}
        <div ref={backgroundRef} className="absolute inset-0 opacity-30">
          <div
            className="absolute top-20 left-20 w-[600px] h-[600px] bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-full mix-blend-multiply filter blur-3xl transition-all duration-2000 ease-out"
            style={{
              transform: `translate3d(${scrollY * 0.3}px, ${scrollY * 0.4}px, 0) scale(${1 + Math.sin(Date.now() * 0.0008) * 0.15})`,
              opacity: 0.4 + Math.sin(Date.now() * 0.001) * 0.15,
            }}
          />
          <div
            className="absolute bottom-20 right-20 w-[700px] h-[700px] bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700 rounded-full mix-blend-multiply filter blur-3xl transition-all duration-2000 ease-out"
            style={{
              transform: `translate3d(${scrollY * -0.2}px, ${scrollY * -0.3}px, 0) scale(${1 + Math.cos(Date.now() * 0.0009) * 0.15})`,
              opacity: 0.35 + Math.cos(Date.now() * 0.0012) * 0.15,
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mix-blend-multiply filter blur-2xl transition-all duration-1500 ease-out"
            style={{
              transform: `translate3d(${scrollY * 0.1}px, ${scrollY * 0.15}px, 0) scale(${1 + Math.sin(Date.now() * 0.0006) * 0.1})`,
              opacity: 0.25 + Math.sin(Date.now() * 0.0008) * 0.1,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          {/* Premium badge */}
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-full text-sm mb-16 hover:scale-105 hover:border-blue-500/50 transition-all duration-700 cursor-pointer group scroll-animate opacity-0 translate-y-8">
            <Star className="h-5 w-5 mr-3 text-yellow-400 group-hover:animate-spin transition-all duration-500" />
            <span className="text-gray-300 font-medium tracking-wide mr-3">Premium Web Design Studio</span>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
              ))}
            </div>
            <div className="ml-3 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>

          {/* Main heading with advanced typography */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black mb-16 leading-[0.9] tracking-tight scroll-animate opacity-0 translate-y-8">
            <span className="inline-block text-white hover:scale-105 transition-all duration-700 cursor-pointer relative group">
              Beautiful
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
            </span>
            <br />
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 hover:scale-105 transition-all duration-700 cursor-pointer relative group">
              Web Design
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
            </span>
          </h1>

          {/* Enhanced subtitle */}
          <p className="text-2xl sm:text-3xl text-gray-400 mb-16 max-w-4xl mx-auto leading-relaxed scroll-animate opacity-0 translate-y-8 font-light">
            Crafting <span className="text-blue-400 font-medium">premium landing pages</span> that convert
            visitors into loyal customers
          </p>

          {/* CTA buttons with advanced styling */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center scroll-animate opacity-0 translate-y-8">
            <MagneticButton
              onClick={() => scrollToSection("pricing")}
              className="px-12 py-4 text-lg rounded-2xl"
              variant="primary"
            >
              <Rocket className="mr-4 h-6 w-6 group-hover:rotate-12 transition-transform duration-500" />
              <span className="font-bold tracking-wide">Start Your Project</span>
              <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform duration-500" />
            </MagneticButton>

            <MagneticButton
              onClick={() => scrollToSection("services")}
              className="px-8 py-4 text-lg rounded-2xl"
              variant="secondary"
            >
              <Code className="mr-3 h-5 w-5" />
              View Services
            </MagneticButton>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-12 mt-16 scroll-animate opacity-0 translate-y-8">
            {[
              { icon: <Shield className="h-6 w-6" />, text: "100% Secure" },
              { icon: <Clock className="h-6 w-6" />, text: "2 Day Delivery" },
              { icon: <Award className="h-6 w-6" />, text: "Premium Quality" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-500 group"
              >
                <div className="p-2 rounded-lg bg-blue-600/20 mr-3 group-hover:bg-blue-600/30 transition-colors duration-300">
                  {item.icon}
                </div>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced services section */}
      <section id="services" className="py-24 px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-animate opacity-0 translate-y-8">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-12 tracking-tight">
              <span className="text-white">What We</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500">
                Create
              </span>
            </h2>
            <p className="text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
              Professional front-end web design services crafted for modern businesses and ambitious entrepreneurs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Monitor className="h-12 w-12" />,
                title: "Business Websites",
                description:
                  "Professional sites that convert visitors into loyal customers with modern design and optimized performance",
                features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Mobile First"],
              },
              {
                icon: <Smartphone className="h-12 w-12" />,
                title: "Mobile Experience",
                description: "Perfect experience across all devices and screen sizes with touch-optimized interactions",
                features: ["Touch Optimized", "App-like Feel", "Offline Support", "PWA Ready"],
              },
              {
                icon: <Palette className="h-12 w-12" />,
                title: "Custom Design",
                description: "Unique designs that perfectly reflect your brand identity and stand out from competitors",
                features: ["Brand Identity", "Custom Graphics", "UI/UX Design", "Style Guide"],
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-xl border-gray-700/40 hover:border-blue-500/50 transition-all duration-700 hover:scale-105 hover:-translate-y-8 cursor-pointer group scroll-animate opacity-0 translate-y-8 relative overflow-hidden"
                style={{
                  willChange: "transform",
                }}
                onMouseEnter={() => {
                  setHoveredCard(index)
                  setCursorVariant("button")
                }}
                onMouseLeave={() => {
                  setHoveredCard(null)
                  setCursorVariant("default")
                }}
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-blue-700/5 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-2xl" />

                <CardHeader className="text-center pb-8 relative z-10 pt-12">
                  <div
                    className={`inline-flex p-8 rounded-3xl bg-gradient-to-br from-blue-600/30 to-blue-700/30 text-blue-400 mb-10 mx-auto transition-all duration-700 shadow-2xl ${
                      hoveredCard === index ? "scale-110 rotate-6 bg-blue-600/40 shadow-blue-500/40" : ""
                    }`}
                  >
                    {service.icon}
                  </div>
                  <CardTitle className="text-3xl font-bold text-white mb-6 group-hover:text-blue-400 transition-colors duration-500 tracking-tight">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="text-center relative z-10 pb-12">
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-500 text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-500"
                      >
                        <Check className="h-4 w-4 text-blue-400 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced pricing section */}
      <section id="pricing" className="py-24 px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 scroll-animate opacity-0 translate-y-8">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-12 tracking-tight">
              <span className="text-white">Simple</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500">
                Pricing
              </span>
            </h2>
            <p className="text-2xl text-gray-400 font-light">
              One transparent price, everything included. No hidden fees.
            </p>
          </div>

          <div className="max-w-2xl mx-auto scroll-animate opacity-0 translate-y-8">
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border-gray-700/50 hover:border-blue-500/50 transition-all duration-700 hover:scale-105 hover:-translate-y-8 relative overflow-hidden group cursor-pointer">
              {/* Premium glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-blue-700/5 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30 opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-2xl" />

              <CardHeader className="text-center pb-12 relative z-10 pt-16">
                <div className="inline-flex p-8 rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white mb-12 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-2xl group-hover:shadow-blue-500/40">
                  <Globe className="h-10 w-10" />
                </div>

                <CardTitle className="text-4xl font-bold text-white mb-8 group-hover:text-blue-400 transition-colors duration-500 tracking-tight">
                  Premium Web Design
                </CardTitle>

                <div className="relative mb-8">
                  <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 mb-4 group-hover:scale-110 transition-transform duration-500">
                    $100
                  </div>
                  <div className="text-gray-400 text-lg">One-time payment</div>
                </div>

                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-500 text-xl leading-relaxed max-w-md mx-auto">
                  Everything you need for a professional web presence
                </p>
              </CardHeader>

              <CardContent className="relative z-10 pb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                  {[
                    "Custom Design",
                    "Mobile Responsive",
                    "Lightning Fast",
                    "Modern Aesthetics",
                    "Source Files Included",
                    "2 Day Delivery",
                    "SEO Optimized",
                    "Free Revisions",
                  ].map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-gray-300 group-hover:text-white transition-all duration-500 hover:translate-x-3 text-lg"
                      style={{ transitionDelay: `${idx * 50}ms` }}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mr-4 group-hover:scale-125 transition-transform duration-500 shadow-lg">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="https://buy.stripe.com/test_your_payment_link" className="block w-full">
                  <MagneticButton className="w-full py-4 text-lg rounded-2xl" variant="primary">
                    <Sparkles className="w-6 h-6 mr-4 group-hover:animate-spin transition-transform duration-500" />
                    <span className="font-bold tracking-wide">Start Your Project Now</span>
                    <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform duration-500" />
                  </MagneticButton>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced contact section */}
      <section id="contact" className="py-16 px-8 border-t border-gray-800/30 relative">
        <div className="max-w-6xl mx-auto text-center scroll-animate opacity-0 translate-y-8">
          <h3 className="text-5xl font-bold text-white mb-16 hover:text-blue-400 transition-colors duration-500 cursor-pointer tracking-tight">
            Get in Touch
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="flex flex-col items-center group hover:scale-105 transition-all duration-500 cursor-pointer p-8 rounded-2xl hover:bg-gray-900/30">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/30 to-blue-700/30 mb-6 group-hover:bg-blue-600/40 transition-colors duration-500 group-hover:scale-110">
                <Globe className="h-8 w-8 text-blue-400 group-hover:animate-pulse" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                Email Us
              </h4>
              <span className="text-lg text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                support@launchlayer.com
              </span>
            </div>

            <div className="flex flex-col items-center group hover:scale-105 transition-all duration-500 cursor-pointer p-8 rounded-2xl hover:bg-gray-900/30">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/30 to-blue-700/30 mb-6 group-hover:bg-blue-600/40 transition-colors duration-500 group-hover:scale-110">
                <Zap className="h-8 w-8 text-blue-400 group-hover:animate-bounce" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                Quick Response
              </h4>
              <span className="text-lg text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                24 hour response time
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced footer */}
      <footer className="py-12 px-8 border-t border-gray-800/30 bg-gradient-to-b from-transparent to-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-4 mb-8 md:mb-0 group cursor-pointer transition-all duration-500 hover:scale-105"
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center group-hover:rotate-180 group-hover:scale-110 transition-all duration-700 shadow-2xl group-hover:shadow-blue-500/30">
                <Layers className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-500 tracking-tight">
                  LaunchLayer
                </span>
                <div className="text-xs text-gray-500 font-medium tracking-wider">Premium Web Studio</div>
              </div>
            </button>

            <div className="text-gray-400 hover:text-gray-300 transition-colors duration-500 font-medium">
              &copy; {new Date().getFullYear()} LaunchLayer. Crafted with passion.
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(90deg); }
        }
        
        .scroll-animate {
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .scroll-animate.animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  )
}
