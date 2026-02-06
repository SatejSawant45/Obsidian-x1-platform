"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Components ---

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => {
    return (
        <div className="mb-12">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex items-center gap-2 mb-2"
            >
                <span className="w-8 h-[1px] bg-cyan-400" />
                <p className="text-cyan-400 text-sm font-mono tracking-widest uppercase">
                    {subtitle}
                </p>
            </motion.div>
            <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-white tracking-tight"
            >
                {title}
            </motion.h3>
        </div>
    );
};

const SpecGrid = ({ specs }: { specs: { label: string; value: string; detail?: string }[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {specs.map((spec, i) => (
                <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="border-l border-white/10 pl-6 group hover:border-cyan-500/50 transition-colors duration-500 relative"
                >
                    {/* Animated accent on hover */}
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-cyan-400 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />

                    <h4 className="text-white/40 text-sm uppercase tracking-wider mb-1 group-hover:text-cyan-400 transition-colors">{spec.label}</h4>
                    <p className="text-xl md:text-2xl text-white font-medium">{spec.value}</p>
                    {spec.detail && <p className="text-white/60 text-sm mt-1 font-mono">{spec.detail}</p>}
                </motion.div>
            ))}
        </div>
    );
};

const ParticleBackground = () => {
    // Generate static random positions for particles
    const particles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 20 + 10,
    }));

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 0.5, 0]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        position: "absolute",
                        top: p.top,
                        left: p.left,
                        width: p.size,
                        height: p.size,
                        backgroundColor: "rgba(34, 211, 238, 0.3)", // Cyan tint
                        borderRadius: "50%",
                    }}
                />
            ))}
        </div>
    );
};

const Section = ({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <section className={cn("min-h-screen py-24 flex items-center relative overflow-hidden", className)}>
            <div className="container mx-auto px-6 relative z-10">
                {children}
            </div>

            {/* Background Grid - subtle engineering paper effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-50" />

            {/* Scanning Line Effect */}
            <motion.div
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent pointer-events-none z-0"
            />

            {/* Floating Particles */}
            <ParticleBackground />
        </section>
    );
};

const ParallaxImage = ({ src, alt }: { src: string; alt: string }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax effect: image moves slightly slower than scroll
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

    return (
        <div ref={ref} className="relative h-[400px] w-full rounded-lg overflow-hidden border border-white/10 group">
            {/* Tech Overlay Lines */}
            <div className="absolute inset-0 z-20 pointer-events-none p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="border border-cyan-400/30 w-full h-full relative">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400" />
                </div>
            </div>

            <motion.div style={{ y, scale }} className="relative w-full h-[120%] -top-[10%]">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                />
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        </div>
    );
};

// --- Subsections ---

const Powertrain = () => (
    <Section className="bg-black">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <SectionHeader title="Tri-Motor E-Core" subtitle="Powertrain & Propulsion" />
                <div className="space-y-8 text-white/70 leading-relaxed mb-10">
                    <p>
                        The Obsidian X1 utilizes a bespoke <strong>Tri-Motor Axial Flux</strong> architecture.
                        Dual independent rear motors provide precise torque vectoring, while a high-density
                        front motor ensures superior turn-in response and regenerative efficiency.
                    </p>
                </div>
                <SpecGrid specs={[
                    { label: "Configuration", value: "Tri-Motor AWD", detail: "2 Rear (Ind.), 1 Front" },
                    { label: "Peak Output", value: "1,450 HP / 1,080 kW", detail: "Overboost Mode" },
                    { label: "Total Torque", value: "1,850 Nm", detail: "0-100% in 5ms" },
                    { label: "Power Density", value: "8.2 kW/kg", detail: "Segment-leading efficiency" },
                ]} />
            </motion.div>
            <ParallaxImage
                src="/Static_engineering_images/Powertrain_and_propulsion_image.jpeg"
                alt="Tri-Motor E-Core Powertrain"
            />
        </div>
    </Section>
);

const Energy = () => (
    <Section className="bg-zinc-950">
        <div className="grid lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
            <ParallaxImage
                src="/Static_engineering_images/Energy_storage_image.jpeg"
                alt="Solid-State Matrix Energy Storage"
            />
            <div>
                <SectionHeader title="Solid-State Matrix" subtitle="Energy Storage" />
                <div className="space-y-8 text-white/70 leading-relaxed mb-10">
                    <p>
                        Next-generation <strong>Silicon-Anode Solid State</strong> cells form the backbone of the X1.
                        Integrated directly into the chassis (Cell-to-Chassis), the pack offers
                        unparalleled structural rigidity while minimizing weight.
                    </p>
                </div>
                <SpecGrid specs={[
                    { label: "Chemistry", value: "Silicon-Anode Solid State", detail: "Zero-Cobalt formulation" },
                    { label: "Charging", value: "900V Architecture", detail: "10-80% in 12 mins" },
                    { label: "Thermal", value: "Direct Immersion Cooling", detail: "Dielectric fluid management" },
                    { label: "Voltage", value: "950V Peak", detail: "Sustained high-output delivery" },
                ]} />
            </div>
        </div>
    </Section>
);

const Chassis = () => (
    <Section className="bg-black">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <SectionHeader title="Carbon-Titanium Weave" subtitle="Chassis & Monocoque" />
                <div className="space-y-8 text-white/70 leading-relaxed mb-10">
                    <p>
                        The central tub is a single-piece <strong>Carbo-Titanium Monocoque</strong>, weighing just 85kg.
                        Utilizing aerospace-grade bonding, it integrates the battery structure as a stressed
                        member to achieve F1-levels of torsional rigidity.
                    </p>
                </div>
                <SpecGrid specs={[
                    { label: "Structure", value: "Carbo-Titanium Monocoque", detail: "Grade 5 Titanium inserts" },
                    { label: "Rigidity", value: "65,000 Nm/deg", detail: "Torsional stiffness" },
                    { label: "Weight", value: "85kg", detail: "Excluding subframes" },
                    { label: "Safety", value: "FIA LMP1 Spec", detail: "Crash energy absorption" },
                ]} />
            </div>
            <ParallaxImage
                src="/Static_engineering_images/Chesis_and_monocoque_image.jpeg"
                alt="Carbon-Titanium Weave Chassis"
            />
        </div>
    </Section>
);

const Suspension = () => (
    <Section className="bg-zinc-950">
        <div className="grid lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
            <ParallaxImage
                src="/Static_engineering_images/Suspension_and_handling_image.jpeg"
                alt="Adaptive Push-Rod Suspension"
            />
            <div>
                <SectionHeader title="Adaptive Push-Rod" subtitle="Suspension & Handling" />
                <SpecGrid specs={[
                    { label: "Type", value: "Active Push-Rod", detail: "Inboard dampers" },
                    { label: "Damping", value: "MagneRide 4.0", detail: "1000 adjustments/sec" },
                    { label: "Ride Height", value: "Variable (+/- 50mm)", detail: "GPS-linked auto-lift" },
                    { label: "Modes", value: "Track / GT / Drift", detail: "Software-defined geometry" },
                ]} />
            </div>
        </div>
    </Section>
);

const Aerodynamics = () => (
    <Section className="bg-black">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <SectionHeader title="Active Flow Control" subtitle="Aerodynamics" />
                <p className="text-white/70 mb-10 block">
                    The X1 breathes with the road. Active front flaps and a dynamic rear wing work in unison
                    to balance low-drag efficiency with massive cornering downforce.
                </p>
                <SpecGrid specs={[
                    { label: "Drag Coeff.", value: "0.22 Cd", detail: "In VMAX Mode" },
                    { label: "Downforce", value: "1,200 kg @ 250km/h", detail: "Active wing deployment" },
                    { label: "System", value: "ALA (Active Aero)", detail: "Vectoring air flaps" },
                    { label: "Management", value: "Internal Ducting", detail: "Through-body airflow" },
                ]} />
            </div>
            <ParallaxImage
                src="/Static_engineering_images/Aerodynamics_image.jpeg"
                alt="Active Flow Control Aerodynamics"
            />
        </div>
    </Section>
);

const Braking = () => (
    <Section className="bg-zinc-950">
        <div className="grid lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
            <ParallaxImage
                src="/Static_engineering_images/Bearking_system_image.jpeg"
                alt="Carbon-Ceramic Matrix Braking System"
            />
            <div>
                <SectionHeader title="Carbon-Ceramic Matrix" subtitle="Braking System" />
                <SpecGrid specs={[
                    { label: "Material", value: "CCM-R Discs", detail: "420mm Front / 390mm Rear" },
                    { label: "Calipers", value: "Titanium Monobloc", detail: "10-piston front / 8-piston rear" },
                    { label: "Regen", value: "0.4g Decel", detail: "Up to 300kW recovery" },
                    { label: "Temp Limit", value: "1,200°C", detail: "Fadeless performance" },
                ]} />
            </div>
        </div>
    </Section>
);

const Electronics = () => (
    <Section className="bg-black">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <SectionHeader title="Neural Core" subtitle="Electronics & Control" />
                <SpecGrid specs={[
                    { label: "Architecture", value: "Zonal Compute", detail: "Ethernet backbone" },
                    { label: "Processing", value: "250 TOPS", detail: "Dual AI Accelerators" },
                    { label: "Fusion", value: "Lidar + Radar + Vision", detail: "360° situational awareness" },
                    { label: "Update", value: "Global OTA", detail: "Continuous drive-train optimization" },
                ]} />
            </div>
            <ParallaxImage
                src="/Static_engineering_images/Electronics_and_control_image.jpeg"
                alt="Neural Core Electronics"
            />
        </div>
    </Section>
);


const Thermal = () => (
    <Section className="bg-zinc-950">
        <div className="grid lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
            <ParallaxImage
                src="/Static_engineering_images/Thermal_systems_image.jpeg"
                alt="Cryo-Flow Thermal Management"
            />
            <div>
                <SectionHeader title="Cryo-Flow Management" subtitle="Thermal Systems" />
                <SpecGrid specs={[
                    { label: "Loops", value: "4 Distinct Circuits", detail: "Battery, Motors, Inverters, Cabin" },
                    { label: "Radiators", value: "Vector-Flow Radiators", detail: "Low-drag positioning" },
                    { label: "Logic", value: "Predictive Pre-Cooling", detail: "GPS-based track anticipation" },
                    { label: "Heat Pump", value: "Octovalve System", detail: "Waste heat scavenging" },
                ]} />
            </div>
        </div>
    </Section>
);

const Materials = () => (
    <Section className="bg-black">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <SectionHeader title="Exotic Composition" subtitle="Materials & Manufacturing" />
                <SpecGrid specs={[
                    { label: "Primary", value: "Pre-preg Carbon Fiber", detail: "T1100 Grade" },
                    { label: "Metals", value: "Inconel & Titanium", detail: "Exhaust & Suspension" },
                    { label: "Interior", value: "Alcantara & Carbon", detail: "Sustainable vegan options" },
                    { label: "Precision", value: "0.5mm Tolerance", detail: "Laser-scanned assembly" },
                ]} />
            </div>
            <ParallaxImage
                src="/Static_engineering_images/Materials_and_manifacturing_image.jpeg"
                alt="Exotic Composition Materials"
            />
        </div>
    </Section>
);

const Safety = () => (
    <Section className="bg-zinc-950">
        <div className="grid lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
            <ParallaxImage
                src="/Static_engineering_images/Safety_and_reliablity.jpeg"
                alt="Guardian Cell Safety System"
            />
            <div>
                <SectionHeader title="Guardian Cell" subtitle="Safety & Reliability" />
                <SpecGrid specs={[
                    { label: "Monocoque", value: "Driver Survival Cell", detail: "F1 Safety Standards" },
                    { label: "High Voltage", value: "Pyro-Fuse Isolation", detail: "2ms cut-off time" },
                    { label: "Testing", value: "2M km Validated", detail: "Arctic to Desert conditions" },
                    { label: "Redundancy", value: "Triple-Redundant", detail: "Critical control systems" },
                ]} />
            </div>
        </div>
    </Section>
);


export default function Engineering() {
    return (
        <div className="bg-black text-white relative z-10">
            <Powertrain />
            <Energy />
            <Chassis />
            <Suspension />
            <Aerodynamics />
            <Braking />
            <Electronics />
            <Thermal />
            <Materials />
            <Safety />
        </div>
    );
}
