"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Scroll progress within the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll (0-1) to frame index (0-39)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 39]);

    // Opacity transforms for text
    const textOpacity1 = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);
    const textOpacity2 = useTransform(scrollYProgress, [0.5, 0.7, 0.9], [0, 1, 1]);

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const imageCount = 40;

            for (let i = 1; i <= imageCount; i++) {
                const img = new Image();
                const frameNumber = i.toString().padStart(3, "0");
                img.src = `/obsidian_sequence_images/ezgif-frame-${frameNumber}.jpg`;
                await new Promise((resolve) => {
                    img.onload = resolve;
                    // Continue even if error to avoid hanging, maybe show placeholder
                    img.onerror = resolve;
                });
                loadedImages.push(img);
            }

            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    // Render loop
    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (!canvasRef.current || images.length === 0) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        const index = Math.min(Math.floor(latest), images.length - 1);
        const image = images[index];

        if (image) {
            // Draw image to cover canvas while maintaining aspect ratio
            const canvas = canvasRef.current;
            const hRatio = canvas.width / image.width;
            const vRatio = canvas.height / image.height;
            const ratio = Math.max(hRatio, vRatio);

            const centerShift_x = (canvas.width - image.width * ratio) / 2;
            const centerShift_y = (canvas.height - image.height * ratio) / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                image,
                0,
                0,
                image.width,
                image.height,
                centerShift_x,
                centerShift_y,
                image.width * ratio,
                image.height * ratio
            );
        }
    });

    // Initial draw & Resize handler
    useEffect(() => {
        if (!isLoaded || images.length === 0 || !canvasRef.current) return;

        const handleResize = () => {
            if (!canvasRef.current) return;
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            // Trigger a re-draw effectively by forcing a small map update or mapped function?
            // Actually, the useMotionValueEvent handles changes, but static resize needs manual redraw
            // We can just manually draw the current frame
            const currentFrame = Math.min(Math.floor(frameIndex.get()), images.length - 1);
            const image = images[currentFrame];
            if (image) {
                const ctx = canvasRef.current.getContext("2d");
                if (ctx) {
                    const canvas = canvasRef.current;
                    const hRatio = canvas.width / image.width;
                    const vRatio = canvas.height / image.height;
                    const ratio = Math.max(hRatio, vRatio);
                    const centerShift_x = (canvas.width - image.width * ratio) / 2;
                    const centerShift_y = (canvas.height - image.height * ratio) / 2;
                    ctx.drawImage(image, 0, 0, image.width, image.height, centerShift_x, centerShift_y, image.width * ratio, image.height * ratio);
                }
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial sizing

        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, images, frameIndex]);

    return (
        <div ref={containerRef} className="relative h-[300vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Canvas for Image Sequence */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Loading State */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black text-cyan-500 font-mono animate-pulse">
                        INITIALIZING SYSTEMS...
                    </div>
                )}

                {/* Cinematic Overlays */}
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10">
                    <motion.div
                        style={{ opacity: textOpacity1 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            Engineering <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                                The Impossible
                            </span>
                        </h1>
                        <p className="text-gray-400 text-sm md:text-lg tracking-[0.5em] uppercase">
                            Beyond Aerodynamics
                        </p>
                    </motion.div>

                    <motion.div
                        style={{ opacity: textOpacity2 }}
                        className="absolute text-center"
                    >
                        <h2 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 uppercase tracking-tighter shadow-2xl">
                            OBSIDIAN X1
                        </h2>
                        <p className="text-cyan-400 text-xs md:text-base tracking-[1em] uppercase mt-2 font-bold drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                            Precision • Power • Perfection
                        </p>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity: textOpacity1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
                >
                    <span className="text-[10px] uppercase tracking-widest">Initial Sequence</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-400 to-transparent" />
                </motion.div>
            </div>
        </div>
    );
}
