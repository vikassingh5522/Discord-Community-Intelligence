import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function EmojiTrends({ data }) {
    if (!data) return null;

    const { topEmojis, emojiUsageOverTime, categories, trending, channelBreakdown } = data;

    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
        >

            <div>
                <h2 className="text-2xl font-semibold mb-3">Top Emojis</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {topEmojis.map((e, i) => (
                        <div
                            key={i}
                            className="p-4 bg-white/10 border border-white/10 rounded-xl shadow-lg backdrop-blur-xl text-center"
                        >
                            <div className="text-4xl mb-2">{e.emoji}</div>
                            <div className="text-lg font-semibold">{e.count}</div>
                            <div className="text-sm text-white/60">uses</div>
                        </div>
                    ))}
                </div>
            </div>


            <div>
                <h2 className="text-2xl font-semibold mb-3">Trending Emojis</h2>
                <div className="flex flex-wrap gap-4">
                    {trending.map((t, i) => (
                        <div
                            key={i}
                            className="px-4 py-3 bg-purple-600/20 border border-purple-400/20 rounded-xl flex items-center gap-3"
                        >
                            <span className="text-3xl">{t.emoji}</span>
                            <span className="text-green-400 flex items-center gap-1">
                                <ArrowUpRight size={16} />
                                {t.growth}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

          
            <div>
                <h2 className="text-2xl font-semibold mb-3">Category Breakdown</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {Object.keys(categories).map((cat, i) => (
                        <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl">
                            <div className="text-sm text-white/60 capitalize">{cat}</div>
                            <div className="text-xl font-bold mt-1">{categories[cat]}</div>
                        </div>
                    ))}
                </div>
            </div>

         
            <div>
                <h2 className="text-2xl font-semibold mb-3">Top Emojis by Channel</h2>
                <div className="space-y-4">
                    {channelBreakdown.map((c, i) => (
                        <div
                            key={i}
                            className="p-4 bg-white/5 border border-white/10 rounded-xl flex justify-between"
                        >
                            <div className="font-semibold">#{c.channel}</div>
                            <div className="flex gap-3 text-2xl">{c.top.map((e, j) => <span key={j}>{e}</span>)}</div>
                        </div>
                    ))}
                </div>
            </div>

        </motion.div>
    );
}
