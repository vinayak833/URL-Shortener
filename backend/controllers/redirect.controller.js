// controllers/redirect.controller.js - lookup short code + 302 redirect
import { UrlModel } from '../models/Url.model.js';
import { ClickModel } from '../models/Click.model.js';
import { useMongo, getLocalData, saveLocalData } from '../config/db.js';

export async function handleRedirect(req, res, next) {
  const { code } = req.params;
  const now = new Date().toISOString();

  if (useMongo) {
    const url = await UrlModel.findOne({ shortCode: code });
    if (!url) return next();

    url.clicks += 1;
    url.lastClickedAt = now;
    await url.save();

    try {
      await ClickModel.create({
        shortCode: code,
        userAgent: req.headers['user-agent'] || '',
        referrer: req.headers.referer || '',
        ip: req.ip || ''
      });
    } catch {}

    return res.redirect(302, url.originalUrl);
  } else {
    const urls = getLocalData('urls');
    const url = urls.find(u => u.shortCode === code);
    if (!url) return next();

    url.clicks += 1;
    url.lastClickedAt = now;
    saveLocalData('urls', urls);

    return res.redirect(302, url.originalUrl);
  }
}
