"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Components ---

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => {
    return (
        <div className="mb-12">
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

const SpecGrid = ({ specs }: { specs: { label: string; value: string; detail?: string }[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {specs.map((spec, i) => (
                <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="border-l border-white/10 pl-6 group hover:border-cyan-500/50 transition-colors duration-500"
                >
                    <h4 className="text-white/40 text-sm uppercase tracking-wider mb-1 group-hover:text-cyan-400 transition-colors">{spec.label}</h4>
                    <p className="text-xl md:text-2xl text-white font-medium">{spec.value}</p>
                    {spec.detail && <p className="text-white/60 text-sm mt-1">{spec.detail}</p>}
                </motion.div>
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
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
        </section>
    );
};

// --- Subsections ---

const Powertrain = () => (
    <Section className="bg-black">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
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
            </div>
            {/* Abstract Visual: Glowing Core */}
            <div className="relative h-[400px] w-full bg-zinc-900/30 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15),transparent_70%)]" />
                <div className="relative w-48 h-48 rounded-full border border-cyan-500/30 animate-pulse flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-cyan-400/50 flex items-center justify-center">
                        <div className="w-16 h-16 bg-cyan-400/20 blur-xl rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    </Section>
);

const Energy = () => (
    <Section className="bg-zinc-950">
        <div className="grid lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
            <div className="order-2 lg:order-1 relative h-[400px] w-full bg-black/50 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center">
                {/* Abstract Visual: Battery Cells */}
                <div className="grid grid-cols-6 gap-2 opacity-50">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="w-8 h-12 border border-white/20 rounded-sm bg-white/5"
                        />
                    ))}
                </div>
            </div>
            <div className="order-1 lg:order-2">
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
            <div className="relative h-[400px] w-full bg-zinc-900/30 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center">
                {/* Visual: Wireframe */}
                <svg viewBox="0 0 200 100" className="w-3/4 opacity-40 stroke-cyan-500 fill-none stroke-[0.5]">
                    <path d="M20,80 L50,80 L60,50 L140,50 L150,80 L180,80 M60,50 L80,20 L120,20 L140,50" />
                    <path d="M30,80 L60,50 M140,50 L170,80" />
                </svg>
            </div>
        </div>
    </Section>
);

const Suspension = () => (
    <Section className="bg-zinc-950">
        <div className="grid lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
            {/* Visual */}
            <div className="order-2 lg:order-1 relative h-[400px] w-full bg-black/50 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center">
                <div className="w-1 bg-white/10 h-32 relative">
                    <motion.div
                        animate={{ height: ["20%", "60%", "20%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-full bg-cyan-500 absolute bottom-0"
                    />
                </div>
                <div className="w-32 h-1 bg-white/10 absolute opacity-50" />
            </div>
            <div className="order-1 lg:order-2">
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
            {/* Visual: Flow lines */}
            <div className="relative h-[400px] w-full bg-zinc-900/30 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center">
                <div className="space-y-4 w-full px-12 opacity-40">
                    <motion.div animate={{ x: [0, 100, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                    <motion.div animate={{ x: [0, 80, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="h-[1px] w-3/4 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                    <motion.div animate={{ x: [0, 120, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} className="h-[1px] w-5/6 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                </div>
            </div>
        </div>
    </Section>
);

const Braking = () => (
    <Section className="bg-zinc-950">
        <div className="grid lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
            <div className="order-2 lg:order-1 relative h-[400px] w-full bg-black/50 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border-4 border-dashed border-red-500/30 animate-spin-slow flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full border-2 border-white/10" />
                </div>
            </div>
            <div className="order-1 lg:order-2">
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
            <div className="relative h-[400px] w-full bg-zinc-900/30 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center">
                <div className="grid grid-cols-4 gap-8">
                    {[...Array(16)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-cyan-500/50 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                </div>
            </div>
        </div>
    </Section>
);


const Thermal = () => (
    <Section className="bg-zinc-950">
        <div className="grid lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
            <div className="order-2 lg:order-1 relative h-[400px] w-full bg-black/50 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center">
                <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.2),transparent)] opacity-50" />
            </div>
            <div className="order-1 lg:order-2">
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
            <div className="relative h-[400px] w-full bg-zinc-900/30 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center">
                <div className="w-full h-full opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg, #333 25%, transparent 25%, transparent 75%, #333 75%, #333), repeating-linear-gradient(45deg, #333 25%, #000 25%, #000 75%, #333 75%, #333)", backgroundSize: "10px 10px", backgroundPosition: "0 0, 5px 5px" }} />
            </div>
        </div>
    </Section>
);

const Safety = () => (
    <Section className="bg-zinc-950">
        <div className="grid lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
            <div className="order-2 lg:order-1 relative h-[400px] w-full bg-black/50 rounded-lg overflow-hidden border border-white/5 flex items-center justify-center">
                <div className="w-32 h-40 border-4 border-green-500/20 rounded-lg flex items-center justify-center">
                    <div className="w-24 h-32 border-2 border-white/10 rounded" />
                </div>
            </div>
            <div className="order-1 lg:order-2">
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
    const containerRef = useRef(null);

    return (
        <div ref={containerRef} className="bg-black text-white relative z-10">
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
