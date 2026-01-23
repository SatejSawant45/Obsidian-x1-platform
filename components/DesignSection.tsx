"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

// --- Data ---

const designDetails = [
    {
        title: "Aerodynamic Form",
        content: "Every curve is dictated by the wind. The X1’s silhouette is a result of thousands of hours of wind tunnel testing, ensuring laminar airflow attachment from the nose to the active rear diffuser."
    },
    {
        title: "Minimalist Cockpit",
        content: "The interior strips away distraction. A driver-focused layout places all critical controls on the steering yoke, while a holographic HUD projects telemetry directly onto the asphalt ahead."
    },
    {
        title: "Material Purity",
        content: "We use materials in their honest form. Exposed forged carbon fiber, cold-touch anodized aluminum, and sustainable Alcantara create a tactile environment that feels as engineered as the drivetrain."
    },
    {
        title: "Signature Lighting",
        content: "The X1 identifies itself with a predatory laser-matrix light signature. At night, the active aero elements are subtly illuminated, turning the car into a moving sculpture of light and shadow."
    }
];

const galleryImages = [
    {
        src: "/Static_design_images/Coastal Road Motion.png",
        alt: "Obsidian X1 on a coastal road",
        caption: "Dynamic Presence"
    },
    {
        src: "/Static_design_images/Desert Highway Speed.png",
        alt: "Obsidian X1 speeding on a desert highway",
        caption: "Unrelenting Speed"
    },
    {
        src: "/Static_design_images/Neon City Night Run.png",
        alt: "Obsidian X1 in a neon city at night",
        caption: "Nocturnal Predator"
    }
];

// --- Components ---

const DesignScrollSequence = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Config
    const frameCount = 40;
    const sequencePath = "/Car_Design_Sequence/";

    // Load images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises = [];

            for (let i = 1; i <= frameCount; i++) {
                const promise = new Promise<void>((resolve, reject) => {
                    const img = new window.Image();
                    const frameNumber = i.toString().padStart(3, '0');
                    img.src = `${sequencePath}ezgif-frame-${frameNumber}.jpg`;
                    img.onload = () => {
                        loadedImages[i - 1] = img;
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Failed to load frame ${i}`);
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
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    const drawImage = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx || !images[index]) return;

        const img = images[index];
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Conform to cover or contain? Design section usually wants "Contain" properly centered or "Cover" effectively.
        // Let's go with Contain to ensure the full car is seen without cropping.
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

    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (isLoaded && images.length > 0) {
            const index = Math.min(Math.max(Math.floor(latest), 0), images.length - 1);
            requestAnimationFrame(() => drawImage(index));
        }
    });

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                if (images.length > 0) {
                    const idx = Math.min(Math.max(Math.floor(frameIndex.get()), 0), images.length - 1);
                    drawImage(idx);
                }
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, images]);

    useEffect(() => {
        if (isLoaded && images.length > 0) drawImage(0);
    }, [isLoaded]);

    return (
        <div ref={containerRef} className="h-[500vh] relative z-0">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-contain" />

                {/* Overlay Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <motion.h2
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.8, 0.9], [0, 1, 1, 0]) }}
                        className="text-6xl md:text-9xl font-bold text-white tracking-tighter mix-blend-difference"
                    >
                        SCULPTED
                    </motion.h2>
                </div>

                <div className="absolute bottom-12 left-6 md:left-12 z-10 mix-blend-difference">
                    <motion.p
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
                        className="text-white/50 text-xs font-mono tracking-widest uppercase"
                    >
                        Design Philosophy
                    </motion.p>
                </div>
            </div>
        </div>
    );
};

const DesignPhilosophy = () => {
    return (
        <div className="bg-zinc-950 py-32 border-t border-white/5 relative z-10">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="mb-24 md:mb-32 max-w-4xl">
                    <p className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4">Aesthetics of Speed</p>
                    <h3 className="text-4xl md:text-6xl font-medium text-white leading-tight">
                        Design that does not apologize. <br />
                        <span className="text-white/40">Form follows force.</span>
                    </h3>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-x-16 gap-y-16 mb-32">
                    {designDetails.map((item, i) => (
                        <div key={i} className="group">
                            <h4 className="text-xl text-white font-medium mb-4 group-hover:text-purple-400 transition-colors">{item.title}</h4>
                            <p className="text-white/60 leading-relaxed text-lg">{item.content}</p>
                        </div>
                    ))}
                </div>

                {/* Static Gallery */}
                <div className="space-y-32">
                    {galleryImages.map((img, i) => (
                        <GalleryImage key={i} src={img.src} alt={img.alt} caption={img.caption} index={i} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const GalleryImage = ({ src, alt, caption, index }: { src: string; alt: string; caption: string; index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn(
                "relative w-full overflow-hidden rounded-sm",
                index % 2 === 0 ? "md:w-3/4" : "md:w-3/4 md:ml-auto" // Staggered layout
            )}
        >
            <div className="relative aspect-video w-full group">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6">
                    <p className="text-white text-lg font-medium tracking-wide">{caption}</p>
                </div>
            </div>
        </motion.div>
    );
};


export default function DesignSection() {
    return (
        <section className="relative bg-black text-white">
            <DesignScrollSequence />
            <DesignPhilosophy />
        </section>
    );
}
