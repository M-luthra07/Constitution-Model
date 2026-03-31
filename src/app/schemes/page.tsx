"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Filter, Share2 } from "lucide-react";
import { motion } from "framer-motion";

interface Scheme {
  id: string;
  name: string;
  hindi_name?: string;
  state: string;
  sector: string;
  ministry?: string; // New: Ministry of Health, WCD, etc.
  launchYear?: string; // New: Since 2001
  gender: string;
  ageGroup: string;
  category?: string;
  status: string;
  description: string;
  hindi_description?: string;
  eligibility: string;
  hindi_eligibility?: string;
  helpline: string;
  website: string;
}

const translations = {
  en: {
    title: "National Welfare Encyclopedia",
    subtitle: "Tracking thousands of government schemes from 2001 to 2025. Search by ministry, sector, or life-stage to find your benefits.",
    searchPlaceholder: "Search 20,000+ schemes (Launch year, ministry, or keyword)...",
    jurisdiction: "State/Region",
    allRegions: "All of India",
    central: "Central Government",
    ministry: "Ministry / Department",
    allMinistries: "All Ministries",
    sector: "Main Sector",
    allSectors: "All Sectors",
    gender: "Gender",
    allGenders: "All Genders",
    male: "Male",
    female: "Female",
    universal: "Universal",
    ageGroup: "Age Group",
    allAges: "All Ages",
    children: "Children/Youth",
    adults: "Adults (18+)",
    working: "Working Age (21-60)",
    seniors: "Seniors (60+)",
    allGroups: "All Groups",
    category: "Caste/Category",
    allCategories: "All Categories",
    sc_st: "SC / ST",
    obc: "OBC",
    ews: "EWS / BPL",
    general: "General",
    clearAll: "Clear Filters",
    apply: "Apply / Details →",
    noSchemes: "No schemes found for these precise demographics. Try broadening your filters!",
    loading: "Syncing with National Database...",
    eligibility: "Targeted Eligibility",
    sectorLabel: "Domain",
    forLabel: "Beneficiary",
    statusLabel: "Status",
    ministryLabel: "Department",
    yearLabel: "Launched"
  },
  hi: {
    title: "राष्ट्रीय कल्याण विश्वकोश",
    subtitle: "2001 से 2025 तक हजारों सरकारी योजनाओं की ट्रैकिंग। अपने लाभ खोजने के लिए मंत्रालय, क्षेत्र या जीवन-चरण द्वारा खोजें।",
    searchPlaceholder: "20,000+ योजनाएं खोजें (लॉन्च वर्ष, मंत्रालय, या कीवर्ड)...",
    jurisdiction: "राज्य/क्षेत्र",
    allRegions: "पूरा भारत",
    central: "केंद्र सरकार",
    ministry: "मंत्रालय / विभाग",
    allMinistries: "सभी मंत्रालय",
    sector: "मुख्य क्षेत्र",
    allSectors: "सभी क्षेत्र",
    gender: "लिंग",
    allGenders: "सभी लिंग",
    male: "पुरुष",
    female: "महिला",
    universal: "सार्वभौमिक",
    ageGroup: "आयु वर्ग",
    allAges: "सभी आयु",
    children: "बच्चे/युवा",
    adults: "वयस्क (18+)",
    working: "कार्यशील आयु",
    seniors: "वरिष्ठ (60+)",
    allGroups: "सभी समूह",
    category: "जाति/श्रेणी",
    allCategories: "सभी श्रेणियां",
    sc_st: "अनूसूचित जाति/जनजाति (SC/ST)",
    obc: "अन्य पिछड़ा वर्ग (OBC)",
    ews: "EWS/किफायती (BPL)",
    general: "सामान्य (General)",
    clearAll: "फ़िल्टर हटाएं",
    apply: "आवेदन / विवरण →",
    noSchemes: "इन जनसांख्यिकीय के लिए कोई योजना नहीं मिली। कृपया व्यापक फ़िल्टर आज़माएँ!",
    loading: "राष्ट्रीय डेटाबेस के साथ सिंक हो रहा है...",
    eligibility: "लक्षित पात्रता",
    sectorLabel: "डोमेन",
    forLabel: "लाभार्थी",
    statusLabel: "स्थिति",
    ministryLabel: "विभाग",
    yearLabel: "शुरू हुआ"
  }
};

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    state: "",
    sector: "",
    ministry: "", // Added
    gender: "",
    ageGroup: "",
    category: "",
    status: ""
  });

  const [syncing, setSyncing] = useState(false);

  const t = translations[lang];

  // Fetch schemes
  useEffect(() => {
    fetchSchemes();
  }, [filters]);

  const fetchSchemes = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams(filters);
      // Dynamically use the current hostname (useful for mobile access)
      const host = window.location.hostname;
      const response = await fetch(`http://${host}:5000/api/schemes?${params}`);
      const data = await response.json();
      setSchemes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching schemes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      const host = window.location.hostname;
      const res = await fetch(`http://${host}:5000/api/sync-schemes`, { method: 'POST' });
      const data = await res.json();
      if (data.status === 'success') {
        alert(lang === 'hi' ? `सफलता! ${data.added} नई योजनाएं जोड़ी गईं।` : `Success! ${data.added} new schemes added by AI.`);
        fetchSchemes();
      }
    } catch (error) {
      console.error("Sync error:", error);
    } finally {
      setSyncing(false);
    }
  };

  const filteredSchemes = useMemo(() => {
    return schemes.filter(scheme => {
      const name = (lang === "hi" ? (scheme.hindi_name || scheme.name) : scheme.name) || "";
      const sector = (typeof scheme.sector === "string" ? scheme.sector : "") || "";
      const nameMatch = name.toLowerCase().includes(searchQuery.toLowerCase());
      const sectorMatch = sector.toLowerCase().includes(searchQuery.toLowerCase());
      return nameMatch || sectorMatch;
    });
  }, [schemes, searchQuery, lang]);

  if (loading && schemes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Premium Header Section */}
      <div className="bg-slate-900 text-white pt-16 pb-24 px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-400">
                {schemes.length} {lang === "hi" ? "योजनाएं लाइव" : "SCHEMES LIVE"}
              </span>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight mb-4">
              {lang === "hi" ? (<>{t.title.split(' ')[0]} <span className="text-amber-400">{t.title.split(' ').slice(1).join(' ')}</span></>) : (<>Government <span className="text-amber-400">Schemes</span> Directory</>)}
            </h1>
            <p className="text-slate-400 text-xl max-w-2xl">
              {t.subtitle}
            </p>
          </motion.div>

          <div className="flex flex-col items-end gap-3 relative z-30">
            <div className="flex bg-slate-800 p-1 rounded-xl shadow-inner">
              <button 
                onClick={() => setLang("en")}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${lang === "en" ? "bg-amber-500 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
              >
                English
              </button>
              <button 
                onClick={() => setLang("hi")}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${lang === "hi" ? "bg-amber-500 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
              >
                हिन्दी
              </button>
            </div>
            
            <button 
              onClick={handleSync}
              disabled={syncing}
              className="group flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-sm font-bold transition-all backdrop-blur-md disabled:opacity-50"
            >
              {syncing ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <div className="w-4 h-4 rounded-full bg-amber-500 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
              )}
              {lang === "hi" ? "AI के साथ अपडेट करें" : "Update with AI"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 -mt-12 relative z-20 pb-20">
        {/* Search Bar */}
        <div className="relative mb-8 group max-w-2xl">
          <div className="absolute inset-0 bg-amber-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all" />
          <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <Search className="w-6 h-6 text-slate-400 ml-6" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-5 px-4 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-lg"
            />
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-10">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-500 ml-1">{t.jurisdiction}</label>
            <select
              value={filters.state}
              onChange={(e) => setFilters({ ...filters, state: e.target.value })}
              className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="">{t.allRegions}</option>
              <option value="All">{t.central}</option>
              {[
                "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
                "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
                "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
                "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir"
              ].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-500 ml-1">{t.sector}</label>
            <select
              value={filters.sector}
              onChange={(e) => setFilters({ ...filters, sector: e.target.value })}
              className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="">{t.allSectors}</option>
              {[
                { val: "Agriculture", lab: "Agriculture & Farmers (खेती और किसान)" },
                { val: "Health", lab: "Health & Medicine (दवा और अस्पताल)" },
                { val: "Education", lab: "Education & School (पढ़ाई और स्कूल)" },
                { val: "Marriage & Wedding", lab: "Marriage & Wedding (शादी)" },
                { val: "Financial Services", lab: "Money & Bank (पैसे और बैंक)" },
                { val: "Housing", lab: "House & Roof (घर और मकान)" },
                { val: "Women Empowerment", lab: "Women (महिलाएं)" },
                { val: "Pensions & Seniors", lab: "Elderly & Pensions (बुजुर्ग)" },
                { val: "Employment", lab: "Jobs & Work (काम और नौकरी)" },
                { val: "Differently Abled", lab: "Differently Abled (दिव्यांग)" },
                { val: "Energy", lab: "Gas & Electricity (गैस और बिजली)" },
                { val: "Food Security", lab: "Food & Ration (राशन)" },
                { val: "Social Welfare", lab: "Social Welfare (समाज कल्याण)" }
              ].map(s => (
                <option key={s.val} value={s.val}>{s.lab}</option>
              ))}
            </select>
          </div>

          {/* New Category Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-500 ml-1">{t.category}</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="">{t.allCategories}</option>
              <option value="General">{t.general}</option>
              <option value="SC">{t.sc_st} (SC)</option>
              <option value="ST">{t.sc_st} (ST)</option>
              <option value="OBC">{t.obc}</option>
              <option value="BPL">{t.ews}</option>
            </select>
          </div>

          {/* New Ministry Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-500 ml-1">{t.ministry}</label>
            <select
              value={filters.ministry}
              onChange={(e) => setFilters({ ...filters, ministry: e.target.value })}
              className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="">{t.allMinistries}</option>
              {["Agriculture", "Health (MoHFW)", "Women & Child (MWCD)", "Finance", "Social Justice", "Rural Development", "Education", "MSME", "Labour", "Skill Development"].map(m => 
                <option key={m} value={m}>{m}</option>
              )}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-500 ml-1">{t.gender}</label>
            <select
              value={filters.gender}
              onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
              className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="">{t.allGenders}</option>
              <option value="Male">{t.male}</option>
              <option value="Female">{t.female}</option>
              <option value="All">{t.universal}</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-500 ml-1">{t.ageGroup}</label>
            <select
              value={filters.ageGroup}
              onChange={(e) => setFilters({ ...filters, ageGroup: e.target.value })}
              className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option value="">{t.allAges}</option>
              <option value="0-18">{t.children}</option>
              <option value="18+">{t.adults}</option>
              <option value="21-60">{t.working}</option>
              <option value="60+">{t.seniors}</option>
              <option value="All">{t.allGroups}</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setFilters({ state: "", sector: "", ministry: "", gender: "", ageGroup: "", category: "", status: "" });
                setSearchQuery("");
              }}
              className="w-full px-6 py-3.5 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center gap-2 text-sm font-medium transition-colors"
            >
              <Filter className="w-4 h-4 text-amber-600" />
              {t.clearAll}
            </button>
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSchemes.map((scheme) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-500 relative flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex flex-col">
                  <div className="flex gap-2 mb-3">
                    <span className="px-3 py-1 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-amber-200/50 dark:border-amber-800/30">
                      {scheme.state}
                    </span>
                    <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-emerald-200/50 dark:border-emerald-800/30">
                      {scheme.status}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-amber-600">
                      {lang === "hi" ? (scheme.hindi_name || scheme.name) : scheme.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {scheme.launchYear && (
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold rounded uppercase tracking-wider border border-slate-200 dark:border-slate-700">
                          {t.yearLabel}: {scheme.launchYear}
                        </span>
                      )}
                      {scheme.ministry && (
                        <span className="px-2 py-0.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-[10px] font-bold rounded uppercase tracking-wider border border-amber-100 dark:border-amber-900/30">
                          {scheme.ministry}
                        </span>
                      )}
                      <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded uppercase tracking-wider border border-emerald-100 dark:border-emerald-900/30">
                        {scheme.state}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 mb-6 italic text-sm text-slate-600 dark:text-slate-400 border-l-4 border-amber-500">
                &quot;{lang === "hi" && scheme.hindi_description ? scheme.hindi_description : scheme.description}&quot;
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {t.eligibility}
                  </h4>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                    {lang === "hi" && scheme.hindi_eligibility ? scheme.hindi_eligibility : scheme.eligibility}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.sectorLabel}</h4>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{scheme.sector}</span>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.forLabel}</h4>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{scheme.gender === "All" ? t.universal : scheme.gender} / {scheme.ageGroup}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6 mt-auto border-t border-slate-100 dark:border-slate-800">
                <a
                  href={scheme.website}
                  target="_blank"
                  className="flex-1 text-center py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl hover:bg-amber-600 dark:hover:bg-amber-400 hover:text-white transition-all text-sm font-black shadow-lg shadow-slate-200 dark:shadow-none"
                >
                  {t.apply}
                </a>
                <button 
                  className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors"
                  title={lang === "hi" ? "योजना साझा करें" : "Share Scheme"}
                  onClick={async () => {
                    const shareText = `${scheme.name}\n\n${scheme.description}\n\nEligibility: ${scheme.eligibility}\n\nApply: ${scheme.website}`;
                    if (navigator.share) {
                      try {
                        await navigator.share({ title: scheme.name, text: shareText, url: scheme.website });
                      } catch (err) { /* user cancelled */ }
                    } else {
                      await navigator.clipboard.writeText(shareText);
                      alert(lang === "hi" ? "✅ योजना की जानकारी कॉपी हो गई!" : "✅ Scheme details copied to clipboard!");
                    }
                  }}
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredSchemes.length === 0 && !loading && (
          <div className="text-center py-32 bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                <Search className="w-10 h-10" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xl font-medium">
                {t.noSchemes}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
