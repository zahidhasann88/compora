'use client';

import React, { useState, useCallback } from 'react';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { generateCode } from '@/lib/codeGenerator';
import { Copy, Check } from 'lucide-react';

type Token = { text: string; color?: string };

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let remaining = line;

  while (remaining.length > 0) {
    // Match JSX opening/closing tag: < or </ followed by tag name
    let match = remaining.match(/^(<\/?)([\w]+)/);
    if (match) {
      tokens.push({ text: match[1], color: '#f97316' });
      tokens.push({ text: match[2], color: '#f97316' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // Match closing bracket: > or />
    match = remaining.match(/^(\/?>)/);
    if (match) {
      tokens.push({ text: match[1], color: '#f97316' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // Match attribute: word=
    match = remaining.match(/^([a-zA-Z][\w-]*)(=)/);
    if (match) {
      tokens.push({ text: match[1], color: '#a78bfa' });
      tokens.push({ text: match[2] });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // Match double-quoted string
    match = remaining.match(/^"([^"]*)"/);
    if (match) {
      tokens.push({ text: `"${match[1]}"`, color: '#34d399' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // Match single-quoted string
    match = remaining.match(/^'([^']*)'/);
    if (match) {
      tokens.push({ text: `'${match[1]}'`, color: '#34d399' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // Match braces
    match = remaining.match(/^([{}])/);
    if (match) {
      tokens.push({ text: match[1], color: '#fbbf24' });
      remaining = remaining.slice(1);
      continue;
    }

    // Plain text (up to next special character)
    match = remaining.match(/^[^<>/{}="'a-zA-Z]+|^[a-zA-Z][\w-]*/);
    if (match) {
      tokens.push({ text: match[0] });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // Single character fallback
    tokens.push({ text: remaining[0] });
    remaining = remaining.slice(1);
  }

  return tokens;
}

function highlightJSX(code: string): React.ReactNode[] {
  const lines = code.split('\n');
  return lines.map((line, i) => {
    const tokens = tokenizeLine(line);
    return (
      <div key={i} className="flex">
        <span className="select-none text-muted/40 inline-block w-8 text-right mr-4 text-xs leading-6">
          {i + 1}
        </span>
        <span className="flex-1 leading-6">
          {tokens.map((token, j) =>
            token.color ? (
              <span key={j} style={{ color: token.color }}>
                {token.text}
              </span>
            ) : (
              <span key={j}>{token.text}</span>
            )
          )}
        </span>
      </div>
    );
  });
}

export default function CodePanel() {
  const { selectedComponent, styles, variant } = usePlaygroundStore();
  const [copied, setCopied] = useState(false);

  const code = generateCode(selectedComponent, styles, variant);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  return (
    <div className="glass-panel overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
            Code Output
          </h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
            JSX + Tailwind
          </span>
        </div>
        <button
          id="copy-code-btn"
          onClick={handleCopy}
          title="Copy code"
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium
            transition-all duration-200 cursor-pointer
            ${
              copied
                ? 'bg-emerald-500/15 text-emerald-400'
                : 'bg-surface-hover text-muted hover:text-foreground'
            }
          `}
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="p-5 overflow-x-auto">
        <pre className="font-mono text-sm text-foreground/90">
          <code>{highlightJSX(code)}</code>
        </pre>
      </div>
    </div>
  );
}
