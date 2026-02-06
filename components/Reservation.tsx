"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

// --- Types ---
interface ReservationForm {
    name: string;
    email: string;
    region: string;
    interest: "road" | "track" | "both";
    message: string;
}

// --- Components ---

const HeroSection = () => {
    return (
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/Static_reservation_images/reservation_hero.jpg"
                    alt="Obsidian X1 Reservation Hero"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 text-center px-6">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6"
                >
                    Reserve the Obsidian <span className="text-cyan-400">X1</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-xl md:text-2xl text-white/60 font-light tracking-wide max-w-2xl mx-auto"
                >
                    A limited-production hypercar. <br className="hidden md:block" />
                    Engineered without compromise.
                </motion.p>
            </div>
        </section>
    );
};

const TrustHighlights = () => {
    const highlights = [
        { title: "Limited Production", desc: "Strictly limited to 500 units worldwide." },
        { title: "Hand-Built Precision", desc: "assembled by master technicians in Munich." },
        { title: "Priority Allocation", desc: "Direct access to build slots and customization." },
        { title: "Concierge Service", desc: "Personal liaison for the entire ownership journey." },
    ];

    return (
        <section className="bg-black py-24 border-y border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {highlights.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="text-center md:text-left"
                        >
                            <h3 className="text-white text-lg font-medium mb-3">{item.title}</h3>
                            <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ConfigPreview = () => {
    const [color, setColor] = useState<string>("obsidian");
    const [interior, setInterior] = useState<string>("carbon");

    const colors = [
        { id: "obsidian", name: "Obsidian Black", hex: "#111" },
        { id: "nebula", name: "Nebula White", hex: "#eee" },
        { id: "supernova", name: "Supernova Red", hex: "#900" },
    ];

    return (
        <section className="bg-zinc-950 py-32">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl text-white font-bold mb-4">Your Vision</h2>
                    <p className="text-white/50">Preliminary configuration preferences.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Visual Placeholder */}
                    <motion.div
                        key={color}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="aspect-[4/3] bg-zinc-900 rounded-lg flex items-center justify-center relative overflow-hidden border border-white/5"
                    >
                        <p className="text-white/20 font-mono text-sm uppercase tracking-widest z-10">
                            Preview: {colors.find(c => c.id === color)?.name}
                        </p>
                        {/* In a real implementation, dynamic images based on state would go here */}
                        <div
                            className="absolute inset-0 opacity-20 transition-colors duration-700"
                            style={{ backgroundColor: colors.find(c => c.id === color)?.hex }}
                        />
                    </motion.div>

                    {/* Controls */}
                    <div className="space-y-12">
                        <div>
                            <label className="block text-white/70 text-sm uppercase tracking-wider mb-4">Exterior Finish</label>
                            <div className="flex gap-4">
                                {colors.map((c) => (
                                    <button
                                        key={c.id}
                                        onClick={() => setColor(c.id)}
                                        className={cn(
                                            "w-12 h-12 rounded-full border-2 transition-all duration-300",
                                            color === c.id ? "border-cyan-400 scale-110" : "border-white/10 hover:border-white/30"
                                        )}
                                        style={{ backgroundColor: c.hex }}
                                        title={c.name}
                                    />
                                ))}
                            </div>
                            <p className="mt-3 text-white/40 text-sm font-mono">{colors.find(c => c.id === color)?.name}</p>
                        </div>

                        <div>
                            <label className="block text-white/70 text-sm uppercase tracking-wider mb-4">Interior Theme</label>
                            <div className="flex gap-4">
                                {["Carbon Black", "Lunar Grey", "Solar Tan"].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setInterior(t.toLowerCase().split(" ")[0])}
                                        className={cn(
                                            "px-4 py-2 rounded border text-sm transition-all duration-300",
                                            interior === t.toLowerCase().split(" ")[0]
                                                ? "bg-white text-black border-white"
                                                : "bg-transparent text-white/50 border-white/10 hover:border-white/30"
                                        )}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ReservationForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <section className="py-24 bg-black flex items-center justify-center min-h-[50vh]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-lg px-6"
                >
                    <div className="w-16 h-16 rounded-full bg-cyan-400/10 flex items-center justify-center mx-auto mb-8">
                        <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl text-white font-bold mb-4">Interest Received.</h2>
                    <p className="text-white/60 leading-relaxed mb-8">
                        Thank you for your interest in the Obsidian X1. A concierge team member will review your profile and contact you within 24 hours to discuss allocation availability.
                    </p>
                    <button onClick={() => window.location.href = "/"} className="text-cyan-400 hover:text-cyan-300 text-sm uppercase tracking-widest transition-colors">
                        Return to Home
                    </button>
                </motion.div>
            </section>
        );
    }

    return (
        <section className="bg-black py-24 relative overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 max-w-2xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl text-white font-bold mb-4">Join the Allocation List</h2>
                    <p className="text-white/50">Begin your journey with Obsidian.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-white/40">Full Name</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder-white/10"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-white/40">Email Address</label>
                            <input
                                required
                                type="email"
                                className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder-white/10"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-white/40">Region</label>
                            <select className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors [&>option]:bg-black">
                                <option value="" disabled selected>Select Region</option>
                                <option value="na">North America</option>
                                <option value="eu">Europe</option>
                                <option value="asia">Asia Pacific</option>
                                <option value="me">Middle East</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-white/40">Primary Usage</label>
                            <select className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors [&>option]:bg-black">
                                <option value="road">Road Focused</option>
                                <option value="track">Track Focused</option>
                                <option value="collection">Collection / Investment</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-white/40">Message (Optional)</label>
                        <textarea
                            rows={4}
                            className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none placeholder-white/10"
                            placeholder="Any specific configuration requests or questions?"
                        />
                    </div>

                    <div className="pt-8">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={cn(
                                "w-full py-4 text-center uppercase tracking-widest font-semibold text-sm transition-all duration-300",
                                isSubmitting
                                    ? "bg-white/10 text-white/50 cursor-wait"
                                    : "bg-cyan-400 text-black hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                            )}
                        >
                            {isSubmitting ? "Processing..." : "Request Reservation"}
                        </button>
                        <p className="text-center text-white/20 text-[10px] uppercase tracking-wider mt-6">
                            Secure 256-bit SSL Data Transmission • Privacy Protected
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default function Reservation() {
    return (
        <div className="bg-black min-h-screen text-white pt-20">
            <HeroSection />
            <TrustHighlights />
            <ConfigPreview />
            <ReservationForm />

            {/* Footer specific to this page (or reuse main footer) */}
            <footer className="bg-zinc-950 border-t border-white/5 py-12 text-center">
                <p className="text-white/20 text-xs">
                    © 2026 Obsidian Automotive. All rights reserved. <br />
                    Legal • Privacy Policy • Terms of Service
                </p>
            </footer>
        </div>
    );
}
