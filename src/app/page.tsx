"use client";

import { useState, useMemo } from "react";
import { Search, Scale, ChevronRight, MapPin, Heart, GraduationCap, Home as HomeIcon, Briefcase, Leaf, Users } from "lucide-react";
import { motion } from "framer-motion";
import { statesAndUTs, StateEntity } from "../data/states";
import LawModal from "../components/LawModal";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedState, setSelectedState] = useState<StateEntity | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredStates = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return statesAndUTs.filter((state) =>
            state.name.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const handleStateClick = (state: StateEntity) => {
        setSelectedState(state);
        setIsModalOpen(true);
    };

    return (
        <main className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-purple-500/30">
            {/* Premium Aura Hero Section */}
            <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-white/5">
                {/* Dynamic Background Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-[100px]" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 py-24 text-center z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-amber-400 text-sm font-medium mb-8 backdrop-blur-xl">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                            </span>
                            Latest Legislative Data Sync: April 2025
                        </div>

                        <h1 className="text-6xl md:text-8xl font-outfit font-extrabold tracking-tight mb-8 leading-[1.1]">
                            Digital Justice <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-amber-400">
                                Across Every State
                            </span>
                        </h1>
                        
                        <p className="max-w-3xl mx-auto text-xl text-slate-400 mb-12 font-light leading-relaxed">
                            Navigate India's complex legal landscape with AI-powered clarity. Access state-specific laws, municipal rules, and union territory provisions in simplified language.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                            <a href="http://localhost:5000/" className="group relative px-8 py-4 bg-white text-black rounded-2xl font-bold shadow-2xl hover:scale-105 transition-all duration-300">
                                Launch Main Dashboard
                            </a>
                            <a href="/schemes" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-semibold backdrop-blur-xl transition-all">
                                Welfare Engine
                            </a>
                        </div>

                        {/* Search Intersection */}
                        <motion.div 
                            className="max-w-2xl mx-auto relative group"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500" />
                            <div className="relative flex items-center bg-white/5 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-2xl">
                                <Search className="w-6 h-6 text-slate-500 ml-6" />
                                <input
                                    type="text"
                                    placeholder="Search for your State or Union Territory..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full py-6 px-6 bg-transparent text-white placeholder-slate-600 focus:outline-none text-lg font-outfit"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Premium Grid Section */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredStates.map((state, index) => (
                        <motion.button
                            key={state.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleStateClick(state)}
                            className="group relative p-8 bg-white/5 hover:bg-white/[0.08] backdrop-blur-xl rounded-[32px] border border-white/10 hover:border-purple-500/50 transition-all duration-500 text-left overflow-hidden h-[240px]"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full group-hover:bg-purple-500/10 transition-all" />
                            
                            <div className="relative z-10 flex flex-col h-full">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-slate-400 mb-6 w-fit">
                                    {state.type}
                                </span>
                                <h3 className="text-2xl font-bold font-outfit text-white mb-2 group-hover:text-purple-400 transition-colors">
                                    {state.name}
                                </h3>
                                <div className="mt-auto flex items-center text-sm font-medium text-slate-500 group-hover:text-white transition-all">
                                    <span>Explore Provisions</span>
                                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>


                {filteredStates.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-slate-100/50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 mt-10 backdrop-blur-sm"
                    >
                        <Search className="w-12 h-12 text-slate-400 mx-auto mb-4 opacity-50" />
                        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">No results found</h3>
                        <p className="text-slate-500 dark:text-slate-500">
                            We couldn't find any state matching &quot;<span className="text-amber-600 dark:text-amber-400 font-medium">{searchQuery}</span>&quot;
                        </p>
                    </motion.div>
                )}
            </div>

            {/* Premium Welfare Schemes Section */}
            <div className="max-w-7xl mx-auto px-6 py-32 relative">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 text-amber-400 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-white/10 backdrop-blur-md">
                        National Welfare Initiatives
                    </div>
                    <h2 className="text-5xl md:text-6xl font-outfit font-extrabold text-white mb-8">
                        Global Access to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Public Welfare</span>
                    </h2>
                    <p className="max-w-3xl mx-auto text-slate-400 text-lg font-light leading-relaxed">
                        Intelligent discovery of central and state government schemes. 
                        We match your profile with 2000+ legislative benefits across health, education, and empowerment.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {[
                        { icon: Heart, label: "Health & Care", sector: "Health", color: "from-rose-500 to-pink-600", desc: "Ayushman Bharat, PMJAY & Healthcare Grants" },
                        { icon: GraduationCap, label: "Education Hub", sector: "Education", color: "from-blue-500 to-indigo-600", desc: "Digital India Scholarships & Skill Development" },
                        { icon: HomeIcon, label: "Housing & Infrastructure", sector: "Housing", color: "from-emerald-500 to-teal-600", desc: "PM Awas Yojana & Smart City Housing" },
                        { icon: Briefcase, label: "Employment & MSME", sector: "Employment", color: "from-violet-500 to-fuchsia-600", desc: "Startup India, MGNREGA & Job Training" },
                        { icon: Leaf, label: "Agri-Tech & Farmers", sector: "Agriculture", color: "from-lime-500 to-green-600", desc: "PM-KISAN, Crop Insurance & Soil Health" },
                        { icon: Users, label: "Women Empowerment", sector: "Women Empowerment", color: "from-amber-500 to-orange-600", desc: "Lakhpati Didi, Ujjwala & Safety Programs" },
                    ].map((item, index) => (
                        <motion.a
                            key={item.sector}
                            href={`/schemes?sector=${encodeURIComponent(item.sector)}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative p-8 bg-white/5 rounded-[40px] border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
                        >
                            <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700`} />
                            
                            <div className="relative z-10">
                                <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-2xl mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                    <item.icon className="w-8 h-8 text-white" />
                                </div>
                                
                                <h3 className="text-2xl font-bold font-outfit text-white mb-3 group-hover:text-amber-400 transition-colors">
                                    {item.label}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    {item.desc}
                                </p>
                                
                                <div className="flex items-center text-xs font-bold text-slate-500 group-hover:text-white transition-all uppercase tracking-widest">
                                    Explore Benefits
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                <div className="text-center">
                    <motion.a 
                        whileHover={{ scale: 1.05 }}
                        href="/schemes" 
                        className="inline-flex items-center gap-4 px-12 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
                    >
                        Browse All 2025 Schemes
                        <ChevronRight className="w-6 h-6" />
                    </motion.a>
                </div>
            </div>


            <LawModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                stateData={selectedState}
            />
        </main>
    );
}
