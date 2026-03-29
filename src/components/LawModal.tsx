"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Gavel, Shield } from "lucide-react";
import { StateEntity } from "../data/states";
import ChatBot from "./ChatBot";

interface LawModalProps {
    isOpen: boolean;
    onClose: () => void;
    stateData: StateEntity | null;
}

export default function LawModal({ isOpen, onClose, stateData }: LawModalProps) {
    if (!stateData) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-700"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <Gavel className="w-6 h-6 text-amber-600" />
                                    {stateData.name}
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    {stateData.type} • Key Legal Provisions
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                            >
                                <X className="w-6 h-6 text-slate-500" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto max-h-[calc(85vh-100px)] custom-scrollbar">
                            <div className="grid gap-4 md:grid-cols-2">
                                {stateData.laws.map((law, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-amber-200 dark:hover:border-amber-900/50 transition-colors group"
                                    >
                                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-start gap-2">
                                            <Shield className="w-4 h-4 text-amber-600 mt-1 shrink-0" />
                                            {law.title}
                                        </h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {law.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="mt-8">
                                <ChatBot stateName={stateData.name} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
