import fs from "fs/promises";
import path from "path";

const dataDir = path.resolve("src", "data");

const readJson = async (filename) => {
  const p = path.join(dataDir, filename);
  const raw = await fs.readFile(p, "utf8");
  return JSON.parse(raw);
};


const toISODay = (isoString) => new Date(isoString).toISOString().slice(0, 10);

export const loadAllData = async () => {
  const [users, channels, messages] = await Promise.all([
    readJson("users.json"),
    readJson("channels.json"),
    readJson("messages.json")
  ]);
  return { users, channels, messages };
};

export const getSummary = async () => {
  const { users, channels, messages } = await loadAllData();


  const totalUsers = users.length;
  const totalMessages = messages.length;
  const totalChannels = channels.length;

  const messagesByUser = messages.reduce((acc, m) => {
    acc[m.userId] = (acc[m.userId] || 0) + 1;
    return acc;
  }, {});
  let mostActiveUserId = null;
  let maxMessages = 0;
  for (const [uid, count] of Object.entries(messagesByUser)) {
    if (count > maxMessages) { maxMessages = count; mostActiveUserId = uid; }
  }
  const mostActiveUser = users.find(u => u.id === mostActiveUserId) || null;


  const messagesByChannel = messages.reduce((acc, m) => {
    acc[m.channelId] = (acc[m.channelId] || 0) + 1;
    return acc;
  }, {});
  let mostActiveChannelId = null;
  let maxChannelMessages = 0;
  for (const [cid, count] of Object.entries(messagesByChannel)) {
    if (count > maxChannelMessages) { maxChannelMessages = count; mostActiveChannelId = cid; }
  }
  const mostActiveChannel = channels.find(c => c.id === mostActiveChannelId) || null;

  return {
    totalUsers,
    totalMessages,
    totalChannels,
    mostActiveUser: mostActiveUser ? { id: mostActiveUser.id, username: mostActiveUser.username, messages: maxMessages } : null,
    mostActiveChannel: mostActiveChannel ? { id: mostActiveChannel.id, name: mostActiveChannel.name, messages: maxChannelMessages } : null
  };
};

export const getGrowth = async () => {
  const { users } = await loadAllData();

  const joinCounts = {};
  users.forEach(u => {
    const day = toISODay(u.joinedAt);
    joinCounts[day] = (joinCounts[day] || 0) + 1;
  });


  const sortedDays = Object.keys(joinCounts).sort();


  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 6);
  let weeklyNew = 0;
  for (const [day, count] of Object.entries(joinCounts)) {
    const d = new Date(day);
    if (d >= weekAgo && d <= today) weeklyNew += count;
  }

  const getMonthKey = (d) => `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
  const monthCounts = {};
  users.forEach(u => {
    const m = getMonthKey(new Date(u.joinedAt));
    monthCounts[m] = (monthCounts[m] || 0) + 1;
  });
  const months = Object.keys(monthCounts).sort();
  const lastMonth = months[months.length - 2] || null;
  const thisMonth = months[months.length - 1] || null;
  const thisCount = thisMonth ? monthCounts[thisMonth] : 0;
  const lastCount = lastMonth ? monthCounts[lastMonth] : 0;
  const monthlyGrowth = lastCount === 0 ? (thisCount === 0 ? 0 : 100) : ((thisCount - lastCount) / lastCount) * 100;

  return {
    totalUsers: users.length,
    weeklyNewUsers: weeklyNew,
    monthlyGrowth: Number(monthlyGrowth.toFixed(2)),
    joinCounts
  };
};

export const getActiveUsers = async () => {
  const { users, messages } = await loadAllData();
  const now = new Date();


  const activeThreshold = new Date(now);
  activeThreshold.setDate(now.getDate() - 7);

  const activeUsers = users.filter(u => new Date(u.lastActive) >= activeThreshold);
  const inactiveUsers = users.filter(u => new Date(u.lastActive) < activeThreshold);


  const messagesPerDay = messages.reduce((acc, m) => {
    const day = toISODay(m.timestamp);
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});


  const hourCounts = new Array(24).fill(0);
  messages.forEach(m => {
    const h = new Date(m.timestamp).getUTCHours();
    hourCounts[h] += 1;
  });

  return {
    activeCount: activeUsers.length,
    inactiveCount: inactiveUsers.length,
    dailyActiveUsers: messagesPerDay,
    hourlyHeatmap: hourCounts
  };
};

export const getTopChannels = async (topN = 5) => {
  const { channels, messages } = await loadAllData();
  const channelCounts = messages.reduce((acc, m) => {
    acc[m.channelId] = (acc[m.channelId] || 0) + 1;
    return acc;
  }, {});
  const results = channels.map(c => ({
    id: c.id,
    name: c.name,
    messages: channelCounts[c.id] || 0
  })).sort((a, b) => b.messages - a.messages).slice(0, topN);
  return results;
};

export const getTrendingTopics = async (topN = 10) => {
  const { messages } = await loadAllData();
  const wordCounts = {};
  const hashtagCounts = {};
  messages.forEach(m => {
    const text = (m.content || "").toLowerCase();


    const tags = text.match(/#\w+/g) || [];
    tags.forEach(t => { hashtagCounts[t] = (hashtagCounts[t] || 0) + 1; });

    const words = text.replace(/[^\w\s#]/g, "").split(/\s+/).filter(Boolean);
    words.forEach(w => {
      if (w.startsWith("#")) return;
      if (w.length <= 2) return;
      wordCounts[w] = (wordCounts[w] || 0) + 1;
    });
  });

  const topWords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]).slice(0, topN).map(([w, c]) => ({ word: w, count: c }));
  const topHashtags = Object.entries(hashtagCounts).sort((a, b) => b[1] - a[1]).slice(0, topN).map(([h, c]) => ({ hashtag: h, count: c }));
  return { topWords, topHashtags };
};

export const getMessageActivity = async () => {
  const { messages } = await loadAllData();
  const perDay = {};
  const perHour = new Array(24).fill(0);
  messages.forEach(m => {
    const day = toISODay(m.timestamp);
    perDay[day] = (perDay[day] || 0) + 1;
    const h = new Date(m.timestamp).getUTCHours();
    perHour[h] += 1;
  });

  let peakHour = 0;
  let peakCount = 0;
  perHour.forEach((c, i) => { if (c > peakCount) { peakCount = c; peakHour = i; } });
  return { messagesPerDay: perDay, messagesPerHour: perHour, peakHour, peakCount };
};

export const getByChannel = async (channelId) => {
  const { channels, messages } = await loadAllData();
  const channel = channels.find(c => c.id === channelId);
  if (!channel) return null;
  const channelMessages = messages.filter(m => m.channelId === channelId);
  return {
    channel,
    totalMessages: channelMessages.length,
    messages: channelMessages
  };
};



export const getEmojiTrends = async () => {
  const { messages, channels } = await loadAllData();

  const emojiRegex = /\p{Emoji}/gu;

  const emojiCounts = {};
  const usageOverTime = {};
  const categoryCounts = {};
  const channelBreakdown = {};

  for (const m of messages) {
    const emojis = (m.content || "").match(emojiRegex) || [];


    for (const e of emojis) {
      emojiCounts[e] = (emojiCounts[e] || 0) + 1;


      const day = m.timestamp.slice(0, 10);
      usageOverTime[day] = (usageOverTime[day] || 0) + 1;

      const cat = /^[a-zA-Z0-9]+$/.test(e) ? "symbols" : "general";
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;

      if (!channelBreakdown[m.channelId]) {
        channelBreakdown[m.channelId] = {};
      }
      channelBreakdown[m.channelId][e] =
        (channelBreakdown[m.channelId][e] || 0) + 1;
    }
  }

  const topEmojis = Object.entries(emojiCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([emoji, count]) => ({ emoji, count }));

  const channelResults = Object.entries(channelBreakdown).map(
    ([channelId, emojiMap]) => {
      const top = Object.entries(emojiMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([e]) => e);

      const channel = channels.find((c) => c.id === channelId);

      return {
        channel: channel ? channel.name : "unknown",
        top,
      };
    }
  );

  return {
    topEmojis,
    emojiUsageOverTime: usageOverTime,
    categories: categoryCounts,
    trending: topEmojis.slice(0, 5),
    channelBreakdown: channelResults,
  };
};



export const getRoleDistribution = async () => {
  const { users } = await loadAllData();
  const roleMap = {};
  users.forEach(u => {
    const role = u.role || "Member";
    roleMap[role] = (roleMap[role] || 0) + 1;
  });
  const roles = Object.entries(roleMap).map(([role, count]) => ({ role, count }));
  return { roles };
};

export const assignRoleToUser = async (userId, role) => {
  const { users } = await loadAllData();
  const user = users.find(u => u.id === userId);
  if (!user) return null;

  user.role = role;
  await writeJson("users.json", users);
  return user;
};


export const getMemeTrends = async (topN = 10) => {
  const { messages } = await loadAllData();

  const memeCounts = {};
  messages.forEach((m) => {
    const text = (m.content || "").toLowerCase();
    if (text.includes("meme")) {
      memeCounts[text] = (memeCounts[text] || 0) + 1;
    }
  });

  const topMemes = Object.entries(memeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([meme, count]) => ({ meme, count }));

  return { topMemes };
};
export const getLinkSharing = async (topN = 10) => {
  const { users, channels, messages } = await loadAllData();

  const urlRegex = /(https?:\/\/[^\s]+)/g;

  let totalLinks = 0;

  const domainCounts = {};
  const userLinkCounts = {};
  const channelLinkCounts = {};
  const urlCounts = {};

  messages.forEach((m) => {


    let extracted = [];

    if (m.content) {
      const found = m.content.match(urlRegex);
      if (found) extracted.push(...found);
    }

    if (m.url) {
      extracted.push(m.url);
    }

    if (extracted.length === 0) return;

    extracted.forEach((url) => {
      totalLinks++;

      try {
        const domain = new URL(url).hostname.replace("www.", "");

        domainCounts[domain] = (domainCounts[domain] || 0) + 1;
        urlCounts[url] = (urlCounts[url] || 0) + 1;
        userLinkCounts[m.userId] = (userLinkCounts[m.userId] || 0) + 1;
        channelLinkCounts[m.channelId] = (channelLinkCounts[m.channelId] || 0) + 1;

      } catch (err) { }
    });
  });

  const topDomains = Object.entries(domainCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([domain, count]) => ({ domain, count }));

  const topUrls = Object.entries(urlCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([url, count]) => ({ url, count }));

  const topUsers = Object.entries(userLinkCounts)
    .map(([userId, count]) => {
      const u = users.find((x) => x.id === userId);
      return { userId, username: u?.username || "Unknown", count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);

  const topChannels = Object.entries(channelLinkCounts)
    .map(([channelId, count]) => {
      const c = channels.find((x) => x.id === channelId);
      return { channelId, channel: c?.name || "Unknown", count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);

  return {
    totalLinks,
    topDomains,
    topUrls,
    topUsers,
    topChannels
  };
};
export const getVoiceMetrics = async (topN = 10) => {
  const { users, channels, messages } = await loadAllData();

  let totalVoiceMessages = 0;
  let totalDuration = 0;

  const userVoiceCount = {};
  const channelVoiceCount = {};
  const emojiUsage = {};

  const voiceEmojis = ["🎤", "🎧", "🔊", "🎙️", "🔉", "🔈"];

  messages.forEach(m => {

    const hasVoice = m.voiceUrl && m.voiceUrl.trim() !== "";

    if (hasVoice) {
      totalVoiceMessages++;

      totalDuration += m.voiceDuration || 0;

      userVoiceCount[m.userId] = (userVoiceCount[m.userId] || 0) + 1;

      channelVoiceCount[m.channelId] = (channelVoiceCount[m.channelId] || 0) + 1;
    }

    (m.emojis || []).forEach(e => {
      if (voiceEmojis.includes(e)) {
        emojiUsage[e] = (emojiUsage[e] || 0) + 1;
      }
    });
  });

  const topUsers = Object.entries(userVoiceCount)
    .map(([userId, count]) => {
      const u = users.find(x => x.id === userId);
      return { userId, username: u?.username || "Unknown", count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);

  const topChannels = Object.entries(channelVoiceCount)
    .map(([channelId, count]) => {
      const c = channels.find(x => x.id === channelId);
      return { channelId, channel: c?.name || "Unknown", count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);

  const topEmojis = Object.entries(emojiUsage)
    .map(([emoji, count]) => ({ emoji, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);

  return {
    totalVoiceMessages,
    averageDuration:
      totalVoiceMessages > 0
        ? (totalDuration / totalVoiceMessages).toFixed(2)
        : 0,
    topUsers,
    topChannels,
    topEmojis
  };
};

export const getEngagementScores = async () => {
  const { users, messages } = await loadAllData();

  const scoreMap = {};

  users.forEach(u => {
    scoreMap[u.id] = {
      userId: u.id,
      username: u.username,
      messages: 0,
      reactions: u.reactions || 0,
      channelsJoined: u.channelsJoined || 0,
      score: 0
    };
  });

  messages.forEach(m => {
    if (scoreMap[m.userId]) scoreMap[m.userId].messages++;
  });

  Object.values(scoreMap).forEach(u => {
    u.score = (u.messages * 1) + (u.reactions * 0.5) + (u.channelsJoined * 0.3);
  });

  return {
    topUsers: Object.values(scoreMap)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
  };
};


export const getToxicityStats = async () => {
  const { users, messages } = await loadAllData();

  const toxicWords = ["bad", "idiot", "stupid", "ugly", "hate", "kill"];

  const stats = {};
  users.forEach(u => stats[u.id] = {
    userId: u.id,
    username: u.username,
    toxicMessages: 0
  });

  messages.forEach(m => {
    const text = (m.content || "").toLowerCase();
    if (toxicWords.some(w => text.includes(w))) {
      stats[m.userId].toxicMessages++;
    }
  });

  return {
    toxicity: Object.values(stats).sort((a, b) => b.toxicMessages - a.toxicMessages)
  };
};


export const getNewMemberRetention = async () => {
  const { users } = await loadAllData();

  const now = new Date();
  const last30 = new Date(now);
  last30.setDate(now.getDate() - 30);

  const newMembers = users.filter(u => new Date(u.joinedAt) >= last30);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  let retained = 0;
  newMembers.forEach(u => {
    if (new Date(u.lastActive) >= oneWeekAgo) retained++;
  });

  return {
    newMembers: newMembers.length,
    retained,
    retentionRate:
      newMembers.length > 0
        ? ((retained / newMembers.length) * 100).toFixed(2)
        : 0
  };
};


export const getModeratorEffectiveness = async () => {
  const { users } = await loadAllData();

  const mods = users.filter(u => u.role === "Moderator" || u.role === "Admin");

  return {
    moderators: mods
      .map(m => ({
        userId: m.id,
        username: m.username,
        warnings: m.warnings || 0,
        deletedMessages: m.deletedMessages || 0,
        spamRemoved: m.spamRemoved || 0,
        averageResponseTime: m.avgResponseTime || 0
      }))
      .sort((a, b) => b.deletedMessages - a.deletedMessages)
  };
};



export const getRaidDetections = async () => {
  const { users, messages } = await loadAllData();


  if (!messages || messages.length === 0) {
    return { totalRaids: 0, raids: [] };
  }


  const sorted = [...messages].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  const raids = [];
  const TIME_WINDOW = 10 * 60 * 1000;
  const MIN_USERS = 10;

  for (let start = 0; start < sorted.length; start++) {
    const startTime = new Date(sorted[start].timestamp);
    const uniqueUsers = new Set();
    let endTime = startTime;

    for (let i = start; i < sorted.length; i++) {
      const msg = sorted[i];
      const msgTime = new Date(msg.timestamp);


      if (msgTime - startTime > TIME_WINDOW) break;


      uniqueUsers.add(msg.userId);
      endTime = msgTime;
    }


    if (uniqueUsers.size >= MIN_USERS) {
      const raidUsers = [...uniqueUsers].map((id) => {
        const u = users.find((x) => x.id === id);
        return {
          id,
          username: u?.username || `User-${id}`,
          joinedAt: u?.joinedAt || "N/A",
        };
      });

      raids.push({
        start: startTime.toISOString(),
        end: endTime.toISOString(),
        count: uniqueUsers.size,
        severity:
          uniqueUsers.size > 50
            ? "🔥 Critical"
            : uniqueUsers.size > 20
              ? "⚠️ High"
              : "⚡ Medium",
        users: raidUsers,
      });


      start += [...uniqueUsers].length - 1;
    }
  }

  return {
    totalRaids: raids.length,
    raids,
  };
};


export const getEventTracking = async () => {
  const { messages, users } = await loadAllData();


  const eventMessages = messages.filter((m) =>
    (m.content || "").toLowerCase().includes("event")
  );

  if (eventMessages.length === 0)
    return { totalEvents: 0, events: [] };

  const grouped = {};
  eventMessages.forEach((m) => {
    const day = m.timestamp.slice(0, 10);
    if (!grouped[day]) grouped[day] = [];
    grouped[day].push(m);
  });

  const results = Object.entries(grouped).map(([day, msgs]) => {
    const participants = new Set(msgs.map((m) => m.userId));

    const engagementScore =
      participants.size * 2 + msgs.length * 0.5;

    return {
      date: day,
      totalMessages: msgs.length,
      uniqueParticipants: participants.size,
      engagementScore: Number(engagementScore.toFixed(2)),
      messages: msgs.map((m) => ({
        userId: m.userId,
        content: m.content,
        timestamp: m.timestamp,
      })),
    };
  });

  const formatted = results.map((ev) => ({
    title: `Event on ${ev.date}`,
    type: "Message Activity Spike",
    description:
      `📌 ${ev.totalMessages} messages\n` +
      `👥 ${ev.uniqueParticipants} users\n` +
      `⭐ Engagement Score: ${ev.engagementScore}`,
    timestamp: ev.date,
    messages: ev.messages,
  }));

  return {
    totalEvents: formatted.length,
    events: formatted,
  };
};
