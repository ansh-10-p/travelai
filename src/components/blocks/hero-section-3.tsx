'use client'
import React from 'react'
import { Mail, SendHorizonal, Menu, X, Compass, MapPin, Star, Plane, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { motion, type Variants } from 'framer-motion'

const transitionVariants: { item: Variants } = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                <section className="relative">
                    {/* Background gradient mesh */}
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
                        <div className="absolute top-20 right-1/4 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-rose-100/25 rounded-full blur-3xl" />
                    </div>

                    <div className="relative mx-auto max-w-6xl px-6 pt-32 lg:pb-16 lg:pt-44">
                        <div className="relative z-10 mx-auto max-w-4xl text-center">
                            <AnimatedGroup
                                variants={{
                                    container: {
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.07,
                                                delayChildren: 0.3,
                                            },
                                        },
                                    },
                                    ...transitionVariants,
                                }}
                            >
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/70 rounded-full px-4 py-1.5 mb-6">
                                    <Plane className="w-3.5 h-3.5 text-amber-600" />
                                    <span className="text-xs font-semibold text-amber-700 tracking-wide uppercase">AI-Powered Travel Planning</span>
                                </div>

                                <h1 className="text-balance text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-gray-900">
                                    Plan Your{' '}
                                    <span className="relative inline-block">
                                        <span className="text-amber-600 italic">Dream</span>
                                    </span>{' '}
                                    Journey
                                    <br className="hidden sm:block" />
                                    <span className="text-gray-500"> With AI</span>
                                </h1>

                                <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-gray-500 leading-relaxed">
                                    Describe your destination, travel style, and budget. Our AI crafts a personalized day-by-day itinerary with hotels, activities, and local tips.
                                </p>

                                {/* Email CTA */}
                                <form action="" className="mt-10 mx-auto max-w-sm">
                                    <div className="relative flex items-center rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/50 overflow-hidden">
                                        <Mail className="pointer-events-none absolute left-4 size-4 text-gray-400" />
                                        <input
                                            placeholder="Enter your email to get started"
                                            className="h-12 w-full bg-transparent pl-11 pr-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
                                            type="email"
                                        />
                                        <div className="p-1">
                                            <Button
                                                aria-label="submit"
                                                size="sm"
                                                className="rounded-xl bg-amber-600 hover:bg-amber-700 text-white px-4">
                                                <span className="hidden md:block text-sm font-medium">Get Started</span>
                                                <SendHorizonal className="size-4 md:hidden" strokeWidth={2} />
                                            </Button>
                                        </div>
                                    </div>
                                </form>

                                {/* Social proof */}
                                <div className="mt-8 flex items-center justify-center gap-6">
                                    <div className="flex -space-x-2">
                                        {['🧑‍💻', '👩‍🦰', '👨‍🦱', '👩‍🦳'].map((emoji, i) => (
                                            <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-white flex items-center justify-center text-sm shadow-sm">
                                                {emoji}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-0.5 mb-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                            ))}
                                            <span className="text-xs text-gray-500 ml-1">4.9</span>
                                        </div>
                                        <p className="text-xs text-gray-500">Loved by <span className="font-semibold text-gray-700">12,000+</span> travelers</p>
                                    </div>
                                </div>

                                {/* Hero visual - destination preview cards */}
                                <div
                                    aria-hidden
                                    className="relative mx-auto mt-16 max-w-3xl text-left"
                                >
                                    <HeroVisual />
                                </div>
                            </AnimatedGroup>
                        </div>
                    </div>
                </section>
                <LogoCloud />
            </main>
        </>
    )
}

const HeroVisual = () => {
    return (
        <div className="relative h-[380px] sm:h-[420px]">
            {/* Main center card */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.7, ease: 'easeOut' }}
                className="absolute left-1/2 top-0 -translate-x-1/2 w-72 z-20"
            >
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                    <img
                        src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=220&fit=crop"
                        alt="Tokyo destination"
                        className="w-full h-40 object-cover"
                    />
                    <div className="bg-white p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <h3 className="font-bold text-gray-900">Tokyo, Japan</h3>
                                <div className="flex items-center gap-1 mt-0.5">
                                    <MapPin className="w-3 h-3 text-gray-400" />
                                    <span className="text-xs text-gray-400">Asia • Culture</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 bg-amber-50 rounded-full px-2 py-1">
                                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                <span className="text-xs font-semibold text-amber-700">4.9</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 7 days</span>
                            <span className="font-semibold text-gray-800">from $2,800</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Left card - Bali */}
            <motion.div
                initial={{ opacity: 0, x: -30, rotate: -4 }}
                animate={{ opacity: 1, x: 0, rotate: -5 }}
                transition={{ delay: 1.0, duration: 0.7, ease: 'easeOut' }}
                className="absolute left-0 top-16 w-52 z-10"
                style={{ rotate: '-5deg' }}
            >
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="rounded-xl overflow-hidden shadow-xl border border-white/30"
                >
                    <img
                        src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&h=150&fit=crop"
                        alt="Bali destination"
                        className="w-full h-28 object-cover"
                    />
                    <div className="bg-white p-3">
                        <h4 className="font-semibold text-gray-900 text-sm">Bali, Indonesia</h4>
                        <p className="text-xs text-gray-400 mt-0.5">from $1,200 / week</p>
                    </div>
                </motion.div>
            </motion.div>

            {/* Right card - Paris */}
            <motion.div
                initial={{ opacity: 0, x: 30, rotate: 4 }}
                animate={{ opacity: 1, x: 0, rotate: 5 }}
                transition={{ delay: 1.1, duration: 0.7, ease: 'easeOut' }}
                className="absolute right-0 top-16 w-52 z-10"
                style={{ rotate: '5deg' }}
            >
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    className="rounded-xl overflow-hidden shadow-xl border border-white/30"
                >
                    <img
                        src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&h=150&fit=crop"
                        alt="Paris destination"
                        className="w-full h-28 object-cover"
                    />
                    <div className="bg-white p-3">
                        <h4 className="font-semibold text-gray-900 text-sm">Paris, France</h4>
                        <p className="text-xs text-gray-400 mt-0.5">from $3,400 / week</p>
                    </div>
                </motion.div>
            </motion.div>

            {/* Floating AI badge */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
            >
                <div className="flex items-center gap-2.5 bg-white rounded-full px-4 py-2.5 shadow-xl border border-gray-100">
                    <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✨</span>
                    </div>
                    <p className="text-sm font-medium text-gray-700">AI itinerary ready in seconds</p>
                </div>
            </motion.div>

            {/* Dot grid overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_50%,transparent_100%)] opacity-40 pointer-events-none z-0" />
        </div>
    )
}

const menuItems = [
    { name: 'Features', href: '#features' },
    { name: 'Destinations', href: '#explore' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header>
            <nav
                data-state={menuState ? 'active' : undefined}
                className="fixed group z-50 w-full px-3">
                <div className={cn(
                    'mx-auto mt-3 max-w-6xl px-6 transition-all duration-300',
                    isScrolled && 'bg-white/80 max-w-4xl rounded-2xl border border-gray-200/60 backdrop-blur-xl shadow-lg shadow-gray-100/50 lg:px-5'
                )}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-3.5">
                        {/* Logo */}
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center gap-2.5">
                                <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center shadow-sm">
                                    <Compass className="w-4 h-4 text-white" strokeWidth={2} />
                                </div>
                                <span className="font-bold text-lg text-gray-900 tracking-tight">
                                    Travel<span className="text-amber-600">AI</span>
                                </span>
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className={cn('m-auto size-5 text-gray-600 duration-200', menuState && 'rotate-180 scale-0 opacity-0')} />
                                <X className={cn('absolute inset-0 m-auto size-5 text-gray-600 duration-200', menuState ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0')} />
                            </button>
                        </div>

                        {/* Desktop nav center */}
                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.name}
                                            className="text-gray-500 hover:text-gray-900 font-medium block duration-150 transition-colors">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Desktop nav right */}
                        <div className={cn(
                            'bg-white group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-2xl border border-gray-200 p-6 shadow-2xl shadow-gray-200/30 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-4 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none'
                        )}>
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-gray-500 hover:text-gray-900 font-medium block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Link
                                    href="/login"
                                    className={cn(
                                        'inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-all duration-200',
                                        isScrolled && 'lg:hidden'
                                    )}>
                                    Login
                                </Link>
                                <Link
                                    href="/create-trip"
                                    className={cn(
                                        'inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-sm transition-all duration-200',
                                        isScrolled && 'lg:hidden'
                                    )}>
                                    Start Trip
                                </Link>
                                <Link
                                    href="/create-trip"
                                    className={cn(
                                        'inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-sm transition-all duration-200',
                                        isScrolled ? 'lg:inline-flex' : 'hidden'
                                    )}>
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

const partnerLogos = [
    { name: 'Booking.com', src: 'https://html.tailus.io/blocks/customers/nvidia.svg' },
    { name: 'Airbnb', src: 'https://html.tailus.io/blocks/customers/github.svg' },
    { name: 'Skyscanner', src: 'https://html.tailus.io/blocks/customers/openai.svg' },
    { name: 'TripAdvisor', src: 'https://html.tailus.io/blocks/customers/nike.svg' },
    { name: 'Expedia', src: 'https://html.tailus.io/blocks/customers/column.svg' },
    { name: 'Kayak', src: 'https://html.tailus.io/blocks/customers/laravel.svg' },
    { name: 'Hotels', src: 'https://html.tailus.io/blocks/customers/lilly.svg' },
    { name: 'Viator', src: 'https://html.tailus.io/blocks/customers/lemonsqueezy.svg' },
]

const LogoCloud = () => {
    return (
        <section className="bg-white/40 py-12 md:py-16 border-t border-gray-100">
            <div className="group relative m-auto max-w-6xl px-6">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="inline md:max-w-44 md:border-r md:border-gray-200 md:pr-6 mb-6 md:mb-0">
                        <p className="text-sm text-gray-400 text-center md:text-end font-medium">Trusted by<br className="hidden md:block"/> top travel brands</p>
                    </div>
                    <div className="relative py-2 md:w-[calc(100%-11rem)]">
                        <InfiniteSlider
                            speedOnHover={20}
                            speed={40}
                            gap={80}>
                            {partnerLogos.map((logo) => (
                                <div key={logo.name} className="flex items-center">
                                    <img
                                        className="mx-auto h-5 w-fit grayscale opacity-50 hover:opacity-80 hover:grayscale-0 transition-all duration-300"
                                        src={logo.src}
                                        alt={logo.name}
                                        height="20"
                                    />
                                </div>
                            ))}
                        </InfiniteSlider>

                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-20"
                            direction="left"
                            blurIntensity={1}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-20"
                            direction="right"
                            blurIntensity={1}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
