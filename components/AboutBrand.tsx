"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const FadeReveal = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const SectionBlock = ({ number, title, content }: { number: string; title: string; content: string }) => {
    return (
        <FadeReveal className="group border-t border-white/10 pt-8 md:pt-12">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-12">
                <div className="flex items-baseline gap-4 md:w-1/3">
                    <span className="font-mono text-cyan-500/50 text-xs tracking-widest">{number}</span>
                    <h3 className="text-2xl md:text-3xl text-white font-medium tracking-tight group-hover:text-cyan-400 transition-colors duration-500">{title}</h3>
                </div>
                <div className="md:w-2/3 max-w-xl">
                    <p className="text-white/60 leading-relaxed text-lg font-light">
                        {content}
                    </p>
                </div>
            </div>
        </FadeReveal>
    );
};

export default function AboutBrand() {
    return (
        <section className="bg-zinc-950 py-32 relative z-10">
            <div className="container mx-auto px-6">

                {/* Main Header */}
                <div className="mb-32 max-w-4xl">
                    <FadeReveal>
                        <p className="text-cyan-500 font-mono text-sm tracking-widest uppercase mb-4">The Obsidian Philosophy</p>
                        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-tight">
                            Precision is not an act. <br />
                            <span className="text-white/40">It is a standard.</span>
                        </h2>
                    </FadeReveal>
                </div>

                {/* Content Blocks */}
                <div className="space-y-24">
                    <SectionBlock
                        number="01"
                        title="Vision"
                        content="Obsidian exists to challenge the excess of the hypercar world. We do not chase numbers for marketing; we chase the purity of driving physics. Every gram of weight, every degree of camber, and every line of code serves a singular purpose: absolute connection between driver and machine."
                    />

                    <SectionBlock
                        number="02"
                        title="Philosophy"
                        content="Form follows force. We believe that true beauty in automotive design is the result of aerodynamic necessity. There are no fake vents, no decorative wings. If a feature does not enhance performance or cooling, it does not belong on the X1."
                    />

                    <SectionBlock
                        number="03"
                        title="Engineering"
                        content="Power is nothing without control. Our engineering mindset prioritizes system-level optimization over isolated peak statistics. The integration of our tri-motor powertrain with the active chassis creates a vehicle that feels organic, responsive, and alive."
                    />

                    <SectionBlock
                        number="04"
                        title="Craftsmanship"
                        content="We combine the precision of advanced robotics with the soul of human touch. From the laser-aligned carbon weave to the hand-stitched Alcantara interfaces, every Obsidian X1 is a testament to the uncompromising standards of modern manufacturing."
                    />

                    <SectionBlock
                        number="05"
                        title="Future"
                        content="The X1 is not a static object; it is an evolving platform. Through modular hardware architecture and software-defined dynamics, we ensure that the vehicle remains at the bleeding edge of performance long after it leaves the factory."
                    />
                </div>

                {/* Footer Signature */}
                <div className="mt-40 border-t border-white/5 pt-12 flex justify-between items-end opacity-50">
                    <p className="text-xs font-mono tracking-widest text-white/40 uppercase">Obsidian Automotive <br /> Est. 2026</p>
                    <div className="h-1 w-12 bg-white/20" />
                </div>

            </div>
        </section>
    );
}
