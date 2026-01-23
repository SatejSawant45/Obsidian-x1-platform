"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Twitter, Instagram, Linkedin, Youtube, ArrowRight } from "lucide-react";

export default function Footer() {
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <footer className="relative bg-black text-white pt-24 pb-12 overflow-hidden border-t border-white/5">
            {/* Background Gradient/Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/20 via-black to-black pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

            <motion.div
                className="container mx-auto px-6 relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
                    {/* Brand Column */}
                    <motion.div variants={itemVariants} className="md:col-span-4 space-y-6">
                        <Link href="/" className="inline-block">
                            <span className="text-3xl font-bold tracking-widest uppercase">
                                Obsidian <span className="text-cyan-400">X1</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            redefining the boundaries of automotive engineering.
                            The intersection of art, physics, and raw power.
                        </p>
                        <div className="flex space-x-6">
                            {[Twitter, Instagram, Linkedin, Youtube].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="text-gray-500 hover:text-cyan-400 transition-colors duration-300"
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Navigation Links */}
                    {[
                        { title: "Explore", links: ["Engineering", "Design", "Performance", "Gallery"] },
                        { title: "Company", links: ["About Us", "Careers", "Press", "Contact"] },
                        { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
                    ].map((section, idx) => (
                        <motion.div key={idx} variants={itemVariants} className="md:col-span-2 space-y-6">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400/80">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <Link
                                            href="#"
                                            className="text-gray-400 hover:text-white transition-colors text-sm"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}

                    {/* Newsletter */}
                    <motion.div variants={itemVariants} className="md:col-span-2 space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400/80">
                            Stay Updated
                        </h4>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400/50 transition-colors placeholder:text-gray-600"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors">
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 border-t border-white/5 pt-8"
                >
                    <p>© {new Date().getFullYear()} OBSIDIAN MOTORS. All rights reserved.</p>
                    <div className="flex items-center space-x-2 mt-4 md:mt-0">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span>System Status: Online</span>
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    );
}
