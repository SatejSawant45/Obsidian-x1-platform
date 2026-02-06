"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                isScrolled
                    ? "bg-black/80 backdrop-blur-md border-white/10 shadow-lg py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group">
                    <span className="text-2xl font-bold tracking-widest text-white uppercase group-hover:text-cyan-400 transition-colors">
                        Obsidian <span className="text-cyan-400">X1</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {["Engineering", "Inside the Machine", "Design", "About the Brand"].map(
                        (item) => (
                            <Link
                                key={item}
                                href={`/#${item.toLowerCase().replace(/ /g, "-")}`}
                                className="text-sm uppercase tracking-wider text-gray-300 hover:text-white transition-colors relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        )
                    )}
                </div>

                {/* CTA Button */}
                <Link href="/reserve">
                    <button
                        className={cn(
                            "relative px-6 py-2 rounded-full text-sm font-semibold tracking-wide uppercase transition-all duration-300 overflow-hidden group",
                            "bg-transparent border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]"
                        )}
                    >
                        <span className="relative z-10">Prebook</span>
                    </button>
                </Link>
            </div>

            {/* Mobile Menu Toggle (Simplified for now) */}
            <div className="md:hidden absolute right-6 top-1/2 -translate-y-1/2 text-white">
                {/* Burger icon placeholder */}
            </div>
        </motion.nav>
    );
}
