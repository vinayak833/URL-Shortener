// components/UrlCard.jsx - link row + copy btn + QR
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, ExternalLink, BarChart2, Trash2, QrCode, Download, X } from 'lucide-react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard.js';
import { QRCodeCanvas } from 'qrcode.react';

export function UrlCard({ item, onDelete, canDelete = true }) {
  const [copiedText, copy] = useCopyToClipboard();
  const [showQr, setShowQr] = useState(false);
  const fullShortUrl = `${window.location.origin}/${item.shortCode}`;
  const isCopied = copiedText === fullShortUrl;

  const handleDownloadQr = () => {
    const canvas = document.getElementById(`qr-canvas-${item.shortCode}`);
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `snip-qr-${item.shortCode}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 border-b border-[#1D1818]/20 py-5 group items-center">
        <div className="min-w-0">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-lg font-display text-[#1D1818] tracking-tight">
              /{item.shortCode}
            </span>
            {item.title && (
              <span className="text-xs border border-[#1D1818] px-2 py-0.5 font-bold uppercase tracking-wider text-[#1D1818] bg-[#F8F7F4] truncate max-w-[220px]">
                {item.title}
              </span>
            )}
          </div>
          <div className="text-xs opacity-60 font-mono mt-1 truncate text-[#1D1818]">
            {item.originalUrl}
          </div>
          <div className="flex items-center space-x-4 mt-2 text-[11px] font-mono opacity-50 uppercase">
            <span>CREATED: {new Date(item.createdAt).toLocaleDateString()}</span>
            <span>•</span>
            <span>CLICKS: {item.clicks || 0}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0 self-start sm:self-center">
          <button
            onClick={() => copy(fullShortUrl)}
            className={`btn-brutalist !py-2 !px-4 text-xs ${
              isCopied ? '!bg-[#E63946] !text-white' : '!bg-transparent !text-[#1D1818]'
            }`}
          >
            {isCopied ? 'COPIED' : 'COPY'}
          </button>

          <button
            onClick={() => setShowQr(true)}
            className="border border-[#1D1818] p-2 hover:bg-[#1D1818] hover:text-white transition text-[#1D1818] cursor-pointer"
            title="QR Code"
          >
            <QrCode className="w-4 h-4" />
          </button>

          <a
            href={fullShortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#1D1818] p-2 hover:bg-[#1D1818] hover:text-white transition text-[#1D1818]"
            title="Visit URL"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          <Link
            to={`/stats/${item.shortCode}`}
            className="border border-[#1D1818] p-2 hover:bg-[#1D1818] hover:text-white transition text-[#1D1818] flex items-center space-x-1 text-xs font-mono font-bold"
            title="Analytics"
          >
            <BarChart2 className="w-4 h-4" />
          </Link>

          {canDelete && onDelete && (
            <button
              onClick={() => onDelete(item._id || item.id || item.shortCode)}
              className="border border-[#1D1818] p-2 hover:bg-[#E63946] hover:text-white transition text-[#1D1818] cursor-pointer"
              title="Delete Link"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {showQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D1818]/75 backdrop-blur-xs animate-fade-in">
          <div className="card-brutalist max-w-sm w-full bg-white relative text-center space-y-5 p-8 shadow-[8px_8px_0px_#1D1818]">
            <button
              onClick={() => setShowQr(false)}
              className="absolute top-4 right-4 text-[#1D1818] hover:text-[#E63946] font-mono font-bold text-sm cursor-pointer"
            >
              [X]
            </button>
            <div className="label-brutalist mx-auto w-fit">[QR CODE ALIAS]</div>
            <h4 className="text-2xl font-bold font-display text-[#1D1818]">
              /{item.shortCode}
            </h4>
            <div className="p-4 bg-[#F8F7F4] border-2 border-[#1D1818] w-fit mx-auto shadow-[4px_4px_0px_#1D1818]">
              <QRCodeCanvas
                id={`qr-canvas-${item.shortCode}`}
                value={fullShortUrl}
                size={200}
                level="H"
                includeMargin={true}
                bgColor="#F8F7F4"
                fgColor="#1D1818"
              />
            </div>
            <p className="text-xs font-mono opacity-60 truncate px-2 text-[#1D1818]">
              {fullShortUrl}
            </p>
            <button
              onClick={handleDownloadQr}
              className="btn-accent w-full flex items-center justify-center space-x-2 text-xs !py-3"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD QR PNG</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
