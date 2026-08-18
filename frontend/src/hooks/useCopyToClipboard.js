// hooks/useCopyToClipboard.js
import { useState, useCallback } from 'react';

export function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState(null);

  const copy = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
      return true;
    } catch (error) {
      console.error('Failed to copy text', error);
      setCopiedText(null);
      return false;
    }
  }, []);

  return [copiedText, copy];
}
