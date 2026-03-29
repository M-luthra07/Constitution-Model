import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Legal India - Know Your Rights",
    description: "Explore laws of Indian States and Union Territories",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <nav className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <a href="/" className="text-xl font-bold text-slate-900 dark:text-white">
                                Legal India
                            </a>
                            <div className="flex space-x-2 sm:space-x-4">
                                <a href="/" className="px-2 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-sm sm:text-base">
                                    States
                                </a>
                                <a href="/schemes" className="px-2 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold bg-amber-100 text-amber-800 text-sm sm:text-base">
                                    Schemes
                                </a>
                                <a href="http://localhost:5000/read" target="_blank" className="px-2 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-sm sm:text-base">
                                    Constitution
                                </a>
                                <a href="http://localhost:5000/preamble" target="_blank" className="px-2 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-sm sm:text-base">
                                    Preamble
                                </a>
                                <a href="http://localhost:5000/virtual-court" target="_blank" className="px-2 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-sm sm:text-base">
                                    Virtual Court
                                </a>
                                <a href="http://localhost:5000/flashcards/" target="_blank" className="px-2 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-sm sm:text-base">
                                    Flashcards
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
                {children}
            </body>
        </html>
    );
}
