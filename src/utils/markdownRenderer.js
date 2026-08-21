import React from 'react';

/**
 * Simple markdown renderer for chat messages
 * Handles basic markdown: bold, italic, links, lists, code
 */

export const renderMarkdown = (text) => {
  if (!text) return '';

  const lines = text.split('\n');
  const elements = [];

  lines.forEach((line, index) => {
    if (line.trim() === '') {
      elements.push(React.createElement('br', { key: `br-${index}` }));
      return;
    }

    const processed = processInlineMarkdown(line);

    elements.push(React.createElement(
      'span',
      { key: `line-${index}` },
      processed,
      index < lines.length - 1
        ? React.createElement('br', null)
        : null
    ));
  });

  return elements;
};

/**
 * Process inline markdown: bold, italic, links, code
 */
const processInlineMarkdown = (text) => {
  const parts = [];

  // URL pattern
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  
  // Process URLs first
  let match;
  const urlMatches = [];
  while ((match = urlPattern.exec(text)) !== null) {
    urlMatches.push({
      start: match.index,
      end: match.index + match[0].length,
      url: match[0],
    });
  }

  // Process text with markdown
  let currentIndex = 0;
  const allMatches = [
    ...urlMatches.map(m => ({ ...m, type: 'url' })),
    // Bold: **text**
    ...getMatches(text, /\*\*(.*?)\*\*/g, 'bold'),
    // Italic: *text* or _text_
    ...getMatches(text, /(?<!\*)\*(?!\*)(.*?)\*(?!\*)/g, 'italic'),
    // Code: `code`
    ...getMatches(text, /`([^`]+)`/g, 'code'),
  ].sort((a, b) => a.start - b.start);

  // Remove overlapping matches, prefer URLs
  let filteredMatches = [];
  for (const match of allMatches) {
    const overlaps = filteredMatches.some(
      m => !(match.end <= m.start || match.start >= m.end)
    );
    if (!overlaps || match.type === 'url') {
      if (match.type === 'url') {
        // Remove any overlapping non-URL matches
        filteredMatches = filteredMatches.filter(
          m => m.type === 'url' || (match.end <= m.start || match.start >= m.end)
        );
      }
      filteredMatches.push(match);
    }
  }

  filteredMatches.sort((a, b) => a.start - b.start);

  filteredMatches.forEach((match) => {
    // Add text before match
    if (match.start > currentIndex) {
      const beforeText = text.substring(currentIndex, match.start);
      if (beforeText) {
        parts.push(beforeText);
      }
    }

    // Add match content
    if (match.type === 'url') {
      parts.push(
        React.createElement(
          'a',
          {
            key: `link-${match.start}`,
            href: match.url,
            target: '_blank',
            rel: 'noopener noreferrer',
            className: 'text-orange-600 hover:text-orange-700 underline font-medium break-all',
          },
          match.url
        )
      );
    } else if (match.type === 'bold') {
      parts.push(
        React.createElement(
          'strong',
          { key: `bold-${match.start}`, className: 'font-semibold' },
          match.content
        )
      );
    } else if (match.type === 'italic') {
      parts.push(
        React.createElement(
          'em',
          { key: `italic-${match.start}`, className: 'italic' },
          match.content
        )
      );
    } else if (match.type === 'code') {
      parts.push(
        React.createElement(
          'code',
          { key: `code-${match.start}`, className: 'bg-gray-100 px-1 py-0.5 rounded text-xs font-mono' },
          match.content
        )
      );
    }

    currentIndex = match.end;
  });

  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex));
  }

  // Always return an array for consistency - React can render arrays
  return parts.length > 0 ? parts : [text];
};

const getMatches = (text, regex, type) => {
  const matches = [];
  let match;
  const regexCopy = new RegExp(regex.source, regex.flags);
  
  while ((match = regexCopy.exec(text)) !== null) {
    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      content: match[1] || match[0],
      type,
    });
  }
  
  return matches;
};
