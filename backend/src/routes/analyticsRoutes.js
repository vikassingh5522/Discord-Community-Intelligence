import express from "express";
import {
  getSummaryController,
  getGrowthController,
  getActiveUsersController,
  getChannelsController,
  getTrendingTopicsController,
  getMessageActivityController,
  getByChannelController,
  getRoleDistributionController,
  assignRoleController,
  getEmojiTrendsController,
  getMemeTrendsController,
  getLinkSharingController,
  getVoiceMetricsController,
  getEngagementScoreController,
  getToxicityStatsController,
  getMemberRetentionController,
  getModeratorEffectivenessController
} from "../controllers/analyticsController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/summary", authMiddleware, getSummaryController);
router.get("/growth", authMiddleware, getGrowthController);
router.get("/active-users", authMiddleware, getActiveUsersController);
router.get("/channels", authMiddleware, getChannelsController);
router.get("/trending-topics", authMiddleware, getTrendingTopicsController);
router.get("/message-activity", authMiddleware, getMessageActivityController);
router.get("/by-channel/:channelId", authMiddleware, getByChannelController);

router.get("/roles", authMiddleware, getRoleDistributionController);
router.post("/roles/:userId", authMiddleware, assignRoleController);

router.get("/emoji-trends", authMiddleware, getEmojiTrendsController);
router.get("/meme-trends", authMiddleware, getMemeTrendsController);
router.get("/link-sharing", authMiddleware, getLinkSharingController);

router.get("/voice-metrics", authMiddleware, getVoiceMetricsController);

router.get("/engagement", authMiddleware, getEngagementScoreController);
router.get("/toxicity", authMiddleware, getToxicityStatsController);
router.get("/retention", authMiddleware, getMemberRetentionController);
router.get("/moderators", authMiddleware, getModeratorEffectivenessController);


export default router;
