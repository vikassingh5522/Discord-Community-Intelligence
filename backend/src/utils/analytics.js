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
