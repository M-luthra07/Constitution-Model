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
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-amber-200 dark:selection:bg-amber-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-legal-navy text-white pb-20 pt-16 sm:pt-24">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-amber-500/10 blur-3xl" />
                    <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-blue-500/10 blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex justify-center mb-6">
                            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                                <Scale className="w-10 h-10 text-amber-400" />
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
                            <span className="block text-white">Know Your Rights</span>
                            <span className="block text-amber-400 mt-2">State by State</span>
                        </h1>
                        <a href="/schemes" className="inline-flex items-center px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-full shadow-2xl border border-slate-200 dark:border-slate-700 hover:shadow-3xl transition-all mt-6">
                            <span className="font-semibold">📋 Explore Government Schemes →</span>
                        </a>
                        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 mb-10">
                            Explore the essential laws and legal provisions specific to every State and Union Territory of India.
                        </p>

                        {/* Search Box */}
                        <div className="max-w-xl mx-auto relative group">
                            <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                            <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-full shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                                <Search className="w-6 h-6 text-slate-400 ml-6" />
                                <input
                                    type="text"
                                    placeholder="Search for your State or UT..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full py-4 px-4 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-lg"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Grid Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredStates.map((state, index) => (
                        <motion.button
                            key={state.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.03 }}
                            onClick={() => handleStateClick(state)}
                            className="group relative flex flex-col items-start p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-2xl border border-slate-100 dark:border-slate-800 hover:border-amber-200 dark:hover:border-amber-800 transition-all duration-300 text-left w-full overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <MapPin className="w-16 h-16 text-slate-900 dark:text-white transform rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                            </div>

                            <div className="relative z-10 w-full">
                                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 mb-4">
                                    {state.type}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                    {state.name}
                                </h3>
                                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mt-auto group-hover:translate-x-1 transition-transform duration-300">
                                    <span>View Laws</span>
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-amber-500 group-hover:w-full transition-all duration-300" />
                        </motion.button>
                    ))}
                </div>

                {filteredStates.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-500 dark:text-slate-400 text-lg">
                            No states found matching &quot;{searchQuery}&quot;
                        </p>
                    </div>
                )}
            </div>

            {/* Welfare Schemes Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        Government Welfare Schemes
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                        Explore <span className="text-amber-500">Welfare Schemes</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 text-lg">
                        Discover thousands of central and state government schemes across health, education, housing, employment and more.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {[
                        { icon: Heart, label: "Health & Medicine", hindi: "स्वास्थ्य और चिकित्सा", sector: "Health", color: "from-rose-500 to-pink-600", bg: "bg-rose-50 dark:bg-rose-950/20", border: "border-rose-200 dark:border-rose-800", desc: "Ayushman Bharat, PMJAY & more" },
                        { icon: GraduationCap, label: "Education & Scholarships", hindi: "शिक्षा और छात्रवृत्ति", sector: "Education", color: "from-blue-500 to-indigo-600", bg: "bg-blue-50 dark:bg-blue-950/20", border: "border-blue-200 dark:border-blue-800", desc: "Scholarships, mid-day meal & more" },
                        { icon: HomeIcon, label: "Housing & Shelter", hindi: "आवास और मकान", sector: "Housing", color: "from-emerald-500 to-teal-600", bg: "bg-emerald-50 dark:bg-emerald-950/20", border: "border-emerald-200 dark:border-emerald-800", desc: "PM Awas Yojana & housing grants" },
                        { icon: Briefcase, label: "Jobs & Employment", hindi: "नौकरी और रोजगार", sector: "Employment", color: "from-violet-500 to-purple-600", bg: "bg-violet-50 dark:bg-violet-950/20", border: "border-violet-200 dark:border-violet-800", desc: "MGNREGA, skill programs & more" },
                        { icon: Leaf, label: "Agriculture & Farmers", hindi: "कृषि और किसान", sector: "Agriculture", color: "from-lime-500 to-green-600", bg: "bg-lime-50 dark:bg-lime-950/20", border: "border-lime-200 dark:border-lime-800", desc: "PM-KISAN, crop insurance & more" },
                        { icon: Users, label: "Women Empowerment", hindi: "महिला सशक्तिकरण", sector: "Women Empowerment", color: "from-amber-500 to-orange-600", bg: "bg-amber-50 dark:bg-amber-950/20", border: "border-amber-200 dark:border-amber-800", desc: "Ladli Behna, Ujjwala & more" },
                    ].map((item, index) => (
                        <motion.a
                            key={item.sector}
                            href={`/schemes?sector=${encodeURIComponent(item.sector)}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className={`group relative flex flex-col p-6 ${item.bg} rounded-2xl border ${item.border} hover:shadow-2xl transition-all duration-300 overflow-hidden`}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
                                <item.icon className="w-full h-full" />
                            </div>
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                <item.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                {item.label}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{item.hindi}</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-auto">{item.desc}</p>
                            <div className="flex items-center text-sm text-amber-600 dark:text-amber-400 mt-3 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                                <span>View Schemes</span>
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </div>
                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-amber-400 to-orange-500 group-hover:w-full transition-all duration-500" />
                        </motion.a>
                    ))}
                </div>

                <div className="text-center">
                    <a href="/schemes" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-lg hover:bg-amber-600 dark:hover:bg-amber-400 hover:text-white transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
                        📋 Browse All Schemes
                        <ChevronRight className="w-5 h-5" />
                    </a>
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
