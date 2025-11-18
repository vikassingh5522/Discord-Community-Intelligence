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

export const getEmojiTrendsController = async (req, res) => {
  try {
    const data = await analytics.getEmojiTrends();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: "Failed to get emoji trends",
      error: err.message
    });
  }
};


export const getRoleDistributionController = async (req, res) => {
  try {
    const data = await analytics.getRoleDistribution();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to get role distribution", error: err.message });
  }
};

export const assignRoleController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    const updatedUser = await analytics.assignRoleToUser(userId, role);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: `Role '${role}' assigned to ${updatedUser.username}`, user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Failed to assign role", error: err.message });
  }
};


export const getMemeTrendsController = async (req, res) => {
  try {
    const data = await analytics.getMemeTrends(10);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to get meme trends", error: err.message });
  }
};

export const getLinkSharingController = async (req, res) => {
  try {
    const data = await analytics.getLinkSharing();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: "Failed to get link sharing analytics",
      error: err.message,
    });
  }
};

export const getVoiceMetricsController = async (req, res) => {
  try {
    const data = await analytics.getVoiceMetrics();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: "Failed to get voice metrics",
      error: err.message
    });
  }
};




import {
  getEngagementScores,
  getToxicityStats,
  getNewMemberRetention,
  getModeratorEffectiveness
} from "../utils/analytics.js";

export const getEngagementScoreController = async (req, res) => {
  try {
    const data = await getEngagementScores();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to get engagement score", error: err.message });
  }
};

export const getToxicityStatsController = async (req, res) => {
  try {
    const data = await getToxicityStats();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to get toxicity stats", error: err.message });
  }
};

export const getMemberRetentionController = async (req, res) => {
  try {
    const data = await getNewMemberRetention();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to get retention", error: err.message });
  }
};

export const getModeratorEffectivenessController = async (req, res) => {
  try {
    const data = await getModeratorEffectiveness();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to get moderator effectiveness", error: err.message });
  }
};
