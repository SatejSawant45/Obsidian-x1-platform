"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Types ---

interface SpecItem {
    title: string;
    description: string;
    detail?: string;
}

interface MachineSectionProps {
    partId: string;
    partNumber: string;
    partName: string;
    title: string; // e.g., "Structural Monocoque"
    titleHighlight?: string;
    specs: SpecItem[];
    sequencePath: string; // e.g., "/Chesis_Sequence/"
    frameCount: number;
    description: string;
}

// --- Data ---

const chassisSpecs: SpecItem[] = [
    {
        title: "Carbon-Fiber Monocoque",
        description: "A single-piece structural tub designed for F1-grade safety and rigidity, weighing only 85kg while bearing all primary loads.",
        detail: "T1100 Grade Carbon"
    },
    {
        title: "Structural Rigidity",
        description: "Engineered for maximum torsional stiffness (65,000 Nm/deg), ensuring suspension geometry remains precise under extreme cornering forces.",
        detail: "Zero Flex"
    },
    {
        title: "Low Center of Gravity",
        description: "The battery acts as a stressed member at the lowest point of the chassis, keeping the center of mass well below the wheel axles for planted stability.",
        detail: "Sub-Axle CG"
    },
    {
        title: "Crash Safety",
        description: "Front and rear impact structures utilizing varying modulus carbon fiber to control deformation and dissipate energy away from the driver cell.",
        detail: "FIA LMP1 Spec"
    },
    {
        title: "Powertrain Integration",
        description: "Direct mounting of the tri-motor assembly to the subframes reduces mechanical loss and increases immediate torque transfer to the road.",
        detail: "Stressed Member"
    },
    {
        title: "Precision Manufacturing",
        description: "Laser-aligned layup process with vacuum infusion ensures consistent resin distribution and eliminates structural imperfections.",
        detail: "0.5mm Tolerance"
    }
];

const engineSpecs: SpecItem[] = [
    {
        title: "Axial Flux Architecture",
        description: "Compact pan-cake style motors that deliver ultra-high torque density, allowing for a powertrain 50% lighter than traditional radial flux setups.",
        detail: "Tri-Motor AWD"
    },
    {
        title: "Peak Output",
        description: "The combined tri-motor system generates over 1,450 HP (1,080 kW) with near-instantaneous torque delivery from zero RPM.",
        detail: "1,450 HP / 1,850 Nm"
    },
    {
        title: "High-Density Windings",
        description: "Specialized rectangular copper hairpin windings maximize the slot fill factor, increasing magnetic flux and overall motor efficiency.",
        detail: "97% Efficiency"
    },
    {
        title: "SiC Power Electronics",
        description: "Next-gen Silicon Carbide inverters operate at high frequencies with minimal switching losses, enabling precise torque vectoring at the millisecond level.",
        detail: "900V System"
    },
    {
        title: "Thermal Management",
        description: "Direct oil cooling of the stator and rotor ensures consistent performance output even during sustained high-load track sessions.",
        detail: "Cryo-Stable"
    },
    {
        title: "Direct Drive",
        description: "Motors are coupled directly to the wheels via single-speed reduction gears, eliminating transmission lag and mechanical complexity.",
        detail: "1:9 Reduction"
    },
    {
        title: "Lightweight Housing",
        description: "Machined from aerospace-grade aluminum alloy to provide rigid support for the rotor while minimizing unsprung mass.",
        detail: "7075-T6 Alloy"
    },
    {
        title: "Durability",
        description: "Engineered for a million-mile service life with sealed bearings and redundant sensor arrays for failsafe operation.",
        detail: "Infinite Drive"
    }
];

// --- Components ---

const SectionHeader = ({ title, subtitle, className }: { title: string; subtitle: string; className?: string }) => {
    return (
        <div className={cn("mb-12", className)}>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-cyan-400 text-sm font-mono tracking-widest uppercase mb-2"
            >
                {subtitle}
            </motion.p>
            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-white tracking-tight"
            >
                {title}
            </motion.h3>
        </div>
    );
};

const SpecCard = ({ spec, index }: { spec: SpecItem; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="border-t border-white/10 pt-6 group hover:border-cyan-500/50 transition-colors duration-500"
        >
            <div className="flex justify-between items-start mb-3">
                <h4 className="text-white font-medium text-lg group-hover:text-cyan-400 transition-colors">{spec.title}</h4>
                {spec.detail && (
                    <span className="text-xs font-mono text-white/40 border border-white/10 px-2 py-1 rounded group-hover:border-cyan-500/30 group-hover:text-cyan-400/70 transition-colors">
                        {spec.detail}
                    </span>
                )}
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                {spec.description}
            </p>
        </motion.div>
    );
};

const MachineSection = ({ partId, partNumber, partName, title, titleHighlight, specs, sequencePath, frameCount, description }: MachineSectionProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises = [];

            for (let i = 1; i <= frameCount; i++) {
                const promise = new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    // Pad with zeros to match format (e.g. 001, 002)
                    const frameNumber = i.toString().padStart(3, '0');
                    img.src = `${sequencePath}ezgif-frame-${frameNumber}.jpg`;
                    img.onload = () => {
                        loadedImages[i - 1] = img;
                        resolve();
                    };
                    img.onerror = () => {
                        // Fallback often helps if a frame is missing
                        console.error(`Failed to load frame ${i} at ${sequencePath}`);
                        resolve();
                    };
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, [sequencePath, frameCount]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Map scroll range [0, 1] to frame index [0, frameCount - 1]
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    // Draw to canvas
    const drawImage = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx || !images[index]) return;

        const img = images[index];

        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw containment logic
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio);

        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        ctx.drawImage(img,
            0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
    };

    // Update canvas on scroll
    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (isLoaded && images.length > 0) {
            const index = Math.min(
                Math.max(Math.floor(latest), 0),
                images.length - 1
            );
            requestAnimationFrame(() => drawImage(index));
        }
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                if (images.length > 0) {
                    const currentScroll = frameIndex.get();
                    const index = Math.min(Math.max(Math.floor(currentScroll), 0), images.length - 1);
                    drawImage(index);
                }
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, images]);

    useEffect(() => {
        if (isLoaded && images.length > 0) {
            drawImage(0);
        }
    }, [isLoaded]);


    return (
        <section ref={containerRef} id={partId} className="relative bg-zinc-950">
            {/* Scroll Sequence Container - Sticky */}
            <div className="h-[500vh] relative z-0">
                <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-zinc-950">
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full object-contain opacity-80"
                    />

                    {/* Overlay Text for Sequence */}
                    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-end pb-24 px-6 md:px-12 bg-gradient-to-t from-black via-transparent to-transparent">
                        <div className="max-w-4xl mx-auto w-full">
                            <motion.p
                                style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
                                className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4"
                            >
                                Part {partNumber} — {partName}
                            </motion.p>
                            <motion.h2
                                style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
                                className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tighter"
                            >
                                {title} <br />
                                {titleHighlight && <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">{titleHighlight}</span>}
                            </motion.h2>
                        </div>
                    </div>

                    {/* Hint to scroll */}
                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] text-white/40 uppercase tracking-widest">Explore</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500 to-transparent" />
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative bg-zinc-950 border-t border-white/5">
                <div className="container mx-auto px-6 py-24">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                        {/* Title Col */}
                        <div>
                            <SectionHeader
                                title="Engineering the Core"
                                subtitle={`Inside the Machine — ${partName}`}
                                className="sticky top-24"
                            />
                            <div className="hidden lg:block mt-12">
                                <p className="text-white/60 leading-relaxed text-lg max-w-md">
                                    {description}
                                </p>
                            </div>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
                            {specs.map((spec, i) => (
                                <SpecCard key={i} spec={spec} index={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function InsideTheMachine() {
    return (
        <div className="bg-zinc-950 relative z-10">
            <MachineSection
                partId="chassis"
                partNumber="1"
                partName="Chassis"
                title="Structural"
                titleHighlight="Monocoque"
                specs={chassisSpecs}
                sequencePath="/Chesis_Sequence/"
                frameCount={40}
                description="The Obsidian X1 is built around a philosophy of absolute rigidity and integration. The chassis is not just a frame; it is the central nervous system of the vehicle, connecting power, control, and safety in a unified carbon-titanium structure."
            />
            <MachineSection
                partId="engine"
                partNumber="2"
                partName="Engine"
                title="Tri-Motor"
                titleHighlight="Architecture"
                specs={engineSpecs}
                sequencePath="/Engine_Sequence/"
                frameCount={40}
                description="At the heart of the X1 lies a revolutionary axial-flux powertrain. Designed for immediate torque and sustained high-RPM efficiency, this tri-motor system eliminates mechanical lag, delivering pure, unfiltered acceleration directly to the tarmac."
            />

        </div>
    );
}
