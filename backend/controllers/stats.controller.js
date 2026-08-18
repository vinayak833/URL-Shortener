// controllers/stats.controller.js - click analytics & charts data
import { UrlModel } from '../models/Url.model.js';
import { ClickModel } from '../models/Click.model.js';
import { useMongo, getLocalData } from '../config/db.js';
import { apiResponse } from '../utils/apiResponse.js';

export async function getUrlStats(req, res) {
  const { code } = req.params;

  if (useMongo) {
    const url = await UrlModel.findOne({ shortCode: code });
    if (!url) return apiResponse(res, 404, false, null, 'URL not found');

    const clicks = await ClickModel.find({ shortCode: code }).sort({ timestamp: 1 });
    return apiResponse(res, 200, true, { url, clicks }, 'Stats fetched successfully');
  } else {
    const urls = getLocalData('urls');
    const url = urls.find(u => u.shortCode === code);
    if (!url) return apiResponse(res, 404, false, null, 'URL not found');

    // Simulated click timeline for local fallback
    const clicks = [
      { timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), ip: '127.0.0.1' },
      { timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), ip: '127.0.0.1' },
      { timestamp: url.lastClickedAt || new Date().toISOString(), ip: '127.0.0.1' }
    ];
    return apiResponse(res, 200, true, { url, clicks }, 'Stats fetched successfully');
  }
}
