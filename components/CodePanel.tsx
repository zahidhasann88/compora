'use client';

import React, { useState, useCallback } from 'react';
import { usePlaygroundStore } from '@/store/usePlaygroundStore';
import { generateCode } from '@/lib/codeGenerator';
import {
  CODE_FORMATS,
  generateHTMLCSS,
  generateReactCSSModules,
  generateVueSFC,
  generateAngular,
  generateSvelte,
  type CodeFormat,
} from '@/lib/codeFormatGenerator';
import { Copy, Check, Download } from 'lucide-react';

type Token = { text: string; color?: string };

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let remaining = line;

  while (remaining.length > 0) {
    // Match HTML/XML comment
    let match = remaining.match(/^(<!--[\s\S]*?-->)/);
    if (match) {
      tokens.push({ text: match[1], color: '#6b7280' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // Match JSX opening/closing tag: < or </ followed by tag name
    match = remaining.match(/^(<\/?)([a-zA-Z][\w.-]*)/);
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

    // Match backtick string
    match = remaining.match(/^`([^`]*)`/);
    if (match) {
      tokens.push({ text: `\`${match[1]}\``, color: '#34d399' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // Match CSS property (word followed by colon in style blocks)
    match = remaining.match(/^([a-z][\w-]*)(:\s)/);
    if (match) {
      tokens.push({ text: match[1], color: '#67e8f9' });
      tokens.push({ text: match[2] });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // Match braces
    match = remaining.match(/^([{}()[\]])/);
    if (match) {
      tokens.push({ text: match[1], color: '#fbbf24' });
      remaining = remaining.slice(1);
      continue;
    }

    // Match keywords
    match = remaining.match(/^(import|from|export|default|function|return|const|let|var|class|extends|implements|interface|type|template|script|style|Component)\b/);
    if (match) {
      tokens.push({ text: match[1], color: '#c084fc' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // Match @ decorator
    match = remaining.match(/^(@\w+)/);
    if (match) {
      tokens.push({ text: match[1], color: '#fbbf24' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // Match // comment
    match = remaining.match(/^(\/\/.*)/);
    if (match) {
      tokens.push({ text: match[1], color: '#6b7280' });
      remaining = remaining.slice(match[0].length);
      continue;
    }

    // Plain text (up to next special character)
    match = remaining.match(/^[^<>/{}="'`@()\[\]a-zA-Z]+|^[a-zA-Z][\w.-]*/);
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

function highlightCode(code: string): React.ReactNode[] {
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

function getFormattedCode(component: string, styles: Parameters<typeof generateCode>[1], variant: Parameters<typeof generateCode>[2], props: Record<string, any>, format: CodeFormat): string {
  if (format === 'jsx-tailwind') {
    return generateCode(component, styles, variant, props);
  }
  if (format === 'html-css') {
    return generateHTMLCSS(component, styles, variant, props);
  }
  if (format === 'react-cssmodules') {
    return generateReactCSSModules(component, styles, variant, props);
  }
  if (format === 'vue') {
    return generateVueSFC(component, styles, variant, props);
  }
  if (format === 'angular') {
    return generateAngular(component, styles, variant, props);
  }
  if (format === 'svelte') {
    return generateSvelte(component, styles, variant, props);
  }
  return generateCode(component, styles, variant, props);
}

export default function CodePanel() {
  const { selectedComponent, styles, variant, codeFormat, setCodeFormat, componentProps } = usePlaygroundStore();
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const currentProps = componentProps[selectedComponent] || {};
  const code = getFormattedCode(selectedComponent, styles, variant, currentProps, codeFormat);

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

  const handleDownload = useCallback(() => {
    const componentName = selectedComponent.charAt(0).toUpperCase() + selectedComponent.slice(1);

    let fileName: string;
    let fileContent: string;

    switch (codeFormat) {
      case 'html-css':
        fileName = `${componentName}.html`;
        fileContent = code;
        break;
      case 'react-cssmodules':
        fileName = `${componentName}.tsx`;
        fileContent = code;
        break;
      case 'vue':
        fileName = `${componentName}.vue`;
        fileContent = code;
        break;
      case 'angular':
        fileName = `${componentName}.component.ts`;
        fileContent = code;
        break;
      case 'svelte':
        fileName = `${componentName}.svelte`;
        fileContent = code;
        break;
      default:
        fileName = `${componentName}Component.tsx`;
        fileContent = `import React from 'react';\n\nexport default function ${componentName}Component() {\n  return (\n    ${code.split('\\n').join('\\n    ')}\n  );\n}\n`;
        break;
    }

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  }, [code, selectedComponent, codeFormat]);

  const currentFormatInfo = CODE_FORMATS.find(f => f.id === codeFormat)!;

  return (
    <div className="glass-panel overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mr-2 whitespace-nowrap flex-shrink-0">
            Code
          </h2>
          {CODE_FORMATS.map((format) => (
            <button
              key={format.id}
              id={`format-${format.id}`}
              onClick={() => setCodeFormat(format.id)}
              className={`
                px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap
                transition-all duration-200 cursor-pointer flex-shrink-0
                ${codeFormat === format.id
                  ? 'bg-accent/15 text-accent'
                  : 'text-muted hover:text-foreground hover:bg-surface-hover'
                }
              `}
            >
              {format.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-3">
          <button
            id="download-code-btn"
            onClick={handleDownload}
            title={`Download as ${currentFormatInfo.label}`}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium
              transition-all duration-200 cursor-pointer
              ${downloaded
                ? 'bg-emerald-500/15 text-emerald-400'
                : 'bg-surface-hover text-muted hover:text-foreground border border-border'
              }
            `}
          >
            {downloaded ? (
              <>
                <Check size={14} />
                Saved!
              </>
            ) : (
              <>
                <Download size={14} />
                Export
              </>
            )}
          </button>
          <button
            id="copy-code-btn"
            onClick={handleCopy}
            title="Copy code"
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium
              transition-all duration-200 cursor-pointer
              ${copied
                ? 'bg-emerald-500/15 text-emerald-400'
                : 'bg-accent text-white hover:bg-accent/90 shadow-md'
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
      </div>

      {/* Code */}
      <div className="flex-1 min-h-0 overflow-auto p-5">
        <pre className="font-mono text-sm text-foreground/90">
          <code>{highlightCode(code)}</code>
        </pre>
      </div>
    </div>
  );
}
