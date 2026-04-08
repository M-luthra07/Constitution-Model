import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: "Legal India - Smart Civic Legal Platform",
    description: "Explore laws, welfare schemes, and civic rights for every Indian State and Union Territory.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
            <body className={`${inter.className} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-amber-500/30`}>
                <nav className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/20 dark:border-slate-800/50 sticky top-0 z-50 transition-all shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20 gap-3">
                            {/* Logo Area */}
                            <a href="/" className="group flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg group-hover:shadow-amber-500/25 transition-all duration-300 group-hover:scale-105">
                                    <span className="text-white font-bold text-xl font-outfit">L</span>
                                </div>
                                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 font-outfit tracking-tight">
                                    Legal India
                                </span>
                            </a>
                            
                            {/* Desktop Navigation Links */}
                            <div className="hidden md:flex items-center space-x-1">
                                {[
                                    { name: 'States', href: '/' },
                                    { name: 'Schemes', href: '/schemes', isHighlight: true },
                                    { name: 'Constitution', href: 'http://localhost:5000/read', external: true },
                                    { name: 'Preamble', href: 'http://localhost:5000/preamble', external: true },
                                    { name: 'Virtual Court', href: 'http://localhost:5000/virtual-court', external: true },
                                    { name: 'Flashcards', href: 'http://localhost:5000/flashcards/', external: true },
                                ].map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        target={item.external ? "_blank" : undefined}
                                        rel={item.external ? "noopener noreferrer" : undefined}
                                        className={`px-4 py-2 rounded-xl transition-all duration-300 font-medium text-sm
                                            ${item.isHighlight 
                                                ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-700 dark:text-amber-400 hover:from-amber-500/20 hover:to-orange-500/20 border border-amber-500/20' 
                                                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800/50 dark:hover:text-white'
                                            }
                                        `}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>

                            <div className="hidden lg:flex items-center gap-3">
                                <a
                                    href="http://localhost:5000/"
                                    className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-medium hover:opacity-90 transition"
                                >
                                    Dashboard
                                </a>
                            </div>
                        </div>
                        <details className="md:hidden pb-4">
                            <summary className="list-none inline-flex cursor-pointer items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800">
                                Menu
                            </summary>
                            <div className="mt-3 grid grid-cols-2 gap-2">
                                {[
                                    { name: "States", href: "/" },
                                    { name: "Schemes", href: "/schemes" },
                                    { name: "Constitution", href: "http://localhost:5000/read", external: true },
                                    { name: "Preamble", href: "http://localhost:5000/preamble", external: true },
                                    { name: "Virtual Court", href: "http://localhost:5000/virtual-court", external: true },
                                    { name: "Flashcards", href: "http://localhost:5000/flashcards/", external: true },
                                ].map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        target={item.external ? "_blank" : undefined}
                                        rel={item.external ? "noopener noreferrer" : undefined}
                                        className="px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 bg-white/60 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/70"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </details>
                    </div>
                </nav>
                <main className="min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}
