import React from 'react';

export type Token = { text: string; color?: string };

export function tokenizeLine(line: string): Token[] {
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

export function highlightCode(code: string): React.ReactNode[] {
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
