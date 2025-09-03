'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LuCheck, LuCode, LuCopy } from 'react-icons/lu';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface AIResponsePreviewProps {
  content: string;
}

const AIResponsePreview: React.FC<AIResponsePreviewProps> = ({ content }) => {
  if (!content) return null;

  return (
    <div className="max-w-4xl mx-auto mt-4">
      <div className="text-[14px] prose prose-slate dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : '';
              const isInline = !className;
              return isInline ? (
                <code className="px-1 py-0.5 rounded-md bg-gray-100 text-sm" {...props}>
                  {children}
                </code>
              ) : (
                <CodeBlock code={String(children).replace(/\n$/, '')} language={language} />
              );
            },
            p({ children }) {
              return <p className="text-sm mb-4 leading-5">{children}</p>;
            },
            strong({ children }) {
              return <strong className="text-sm">{children}</strong>;
            },
            em({ children }) {
              return <em className="text-sm">{children}</em>;
            },
            ul({ children }) {
              return <ul className="list-disc list-inside">{children}</ul>;
            },
            ol({ children }) {
              return <ol className="list-decimal list-inside">{children}</ol>;
            },
            li({ children }) {
              return <li className="text-sm">{children}</li>;
            },
            blockquote({ children }) {
              return <blockquote className="border-l-4 border-gray-300 pl-4">{children}</blockquote>;
            },
            h1({ children }) {
              return <h1 className="text-xl font-bold">{children}</h1>;
            },
            h2({ children }) {
              return <h2 className="text-lg font-bold">{children}</h2>;
            },
            h3({ children }) {
              return <h3 className="text-md font-bold">{children}</h3>;
            },
            h4({ children }) {
              return <h4 className="text-sm font-bold">{children}</h4>;
            },
            a({ children, href }) {
              return (
                <a href={href} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              );
            },
            table({ children }) {
              return (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full divide-y divide-gray-300 border border-gray-300">{children}</table>
                </div>
              );
            },
            thead({ children }) {
              return <thead>{children}</thead>;
            },
            tbody({ children }) {
              return <tbody className="divide-y divide-gray-300">{children}</tbody>;
            },
            tr({ children }) {
              return <tr>{children}</tr>;
            },
            th({ children }) {
              return <th className="border px-4 py-2">{children}</th>;
            },
            td({ children }) {
              return <td className="border px-4 py-2">{children}</td>;
            },
            br() {
              return <br />;
            },
            hr() {
              return <hr className="border-gray-300" />;
            },
            img({ src, alt }) {
              return <img src={src || ''} alt={alt || ''} className="my-4 max-w-full rounded-lg" />;
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="relative my-6 rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <LuCode size={16} className="text-gray-500" />
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{language || ''}</span>
        </div>
        <button
          onClick={copyCode}
          className="text-gray-500 hover:text-gray-700 focus:outline-none relative group"
          aria-label="Copy Code"
        >
          {copied ? <LuCheck size={16} className="text-green-500" /> : <LuCopy size={16} />}
          {copied && (
            <span className="absolute -top-8 right-0 bg-black text-white text-xs rounded-md px-2 py-1 opacity-80 group-hover:opacity-100 transition">
              Copied
            </span>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{ fontSize: 12.5, margin: 0, padding: '1rem', background: 'transparent' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default AIResponsePreview;
