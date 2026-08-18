// controllers/url.controller.js - create, fetch, delete URLs
import { UrlModel } from '../models/Url.model.js';
import { useMongo, getLocalData, saveLocalData } from '../config/db.js';
import { generateShortCode } from '../services/codeGenerator.js';
import { apiResponse } from '../utils/apiResponse.js';

export async function createUrl(req, res) {
  const { originalUrl, customCode, title } = req.body;
  const userId = req.user?.userId || null;
  const shortCode = customCode?.trim() || generateShortCode(6);

  if (useMongo) {
    const existing = await UrlModel.findOne({ shortCode });
    if (existing) return apiResponse(res, 400, false, null, 'Short code is already in use');
    
    const newUrl = await UrlModel.create({ originalUrl, shortCode, title: title || '', userId });
    return apiResponse(res, 201, true, newUrl, 'URL shortened successfully');
  } else {
    const urls = getLocalData('urls');
    if (urls.some(u => u.shortCode === shortCode)) {
      return apiResponse(res, 400, false, null, 'Short code is already in use');
    }
    const newUrl = {
      _id: `url_${Date.now()}`,
      originalUrl,
      shortCode,
      title: title || '',
      userId,
      clicks: 0,
      lastClickedAt: null,
      createdAt: new Date().toISOString()
    };
    urls.unshift(newUrl);
    saveLocalData('urls', urls);
    return apiResponse(res, 201, true, newUrl, 'URL shortened successfully');
  }
}

export async function getUrls(req, res) {
  const userId = req.user?.userId || null;
  if (useMongo) {
    const query = userId ? { userId } : {};
    const urls = await UrlModel.find(query).sort({ createdAt: -1 });
    return apiResponse(res, 200, true, urls, 'URLs fetched successfully');
  } else {
    const urls = getLocalData('urls');
    const filtered = userId ? urls.filter(u => u.userId === userId || !u.userId) : urls;
    return apiResponse(res, 200, true, filtered, 'URLs fetched successfully');
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const userId = req.user?.userId;

  if (useMongo) {
    const url = await UrlModel.findById(id);
    if (!url) return apiResponse(res, 404, false, null, 'URL not found');
    if (url.userId && url.userId !== userId) {
      return apiResponse(res, 403, false, null, 'Unauthorized to delete this link');
    }
    await UrlModel.findByIdAndDelete(id);
    return apiResponse(res, 200, true, null, 'URL deleted successfully');
  } else {
    let urls = getLocalData('urls');
    const url = urls.find(u => u._id === id);
    if (!url) return apiResponse(res, 404, false, null, 'URL not found');
    if (url.userId && url.userId !== userId) {
      return apiResponse(res, 403, false, null, 'Unauthorized to delete this link');
    }
    urls = urls.filter(u => u._id !== id);
    saveLocalData('urls', urls);
    return apiResponse(res, 200, true, null, 'URL deleted successfully');
  }
}
