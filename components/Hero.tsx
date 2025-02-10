'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen bg-black text-white pt-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-8">
                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
                        Track Your Wealth Stack
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                        Take control, get stacked and build your legacy by tracking all your stocks, crypto, and more, all in one intuitive dashboard.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex items-center justify-center gap-6">
                        <Link href="/login">
                            <button className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors">
                                Get started
                            </button>
                        </Link>
                        <Link
                            href="/#login"
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            More info
                        </Link>
                    </div>

                    {/* Dashboard Image Section */}
                    <div className="relative mt-16 mx-auto max-w-5xl">
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none" />

                        {/* Dashboard Image */}
                        <div className="relative rounded-lg overflow-hidden">
                            <Image
                                src="/images/placeholder.png"
                                alt="Hero banner"
                                width={1200}
                                height={800}
                                className="w-full h-auto"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />
        </section>
    );
};

export default HeroSection;