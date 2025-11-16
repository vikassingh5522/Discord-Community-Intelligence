import * as analytics from "../utils/analytics.js";

export const getSummaryController = async (req, res) => {
  try {
    const data = await analytics.getSummary();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to get summary", error: err.message });
  }
};

export const getGrowthController = async (req, res) => {
  try { 
    const data = await analytics.getGrowth();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to get growth", error: err.message });
  }
};

export const getActiveUsersController = async (req, res) => {
  try {
    const data = await analytics.getActiveUsers();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to get active users", error: err.message });
  }
};

export const getChannelsController = async (req, res) => {
  try {
    const data = await analytics.getTopChannels(10);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to get channels", error: err.message });
  }
};

export const getTrendingTopicsController = async (req, res) => {
  try {
    const data = await analytics.getTrendingTopics(10);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to get trending topics", error: err.message });
  }
};

export const getMessageActivityController = async (req, res) => {
  try {
    const data = await analytics.getMessageActivity();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to get message activity", error: err.message });
  }
};

export const getByChannelController = async (req, res) => {
  try {
    const { channelId } = req.params;
    const data = await analytics.getByChannel(channelId);
    if (!data) return res.status(404).json({ message: "Channel not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to get channel data", error: err.message });
  }
};
