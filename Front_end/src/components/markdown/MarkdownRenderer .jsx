import { Suspense, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const MarkdownRenderer = ({ content }) => {
  return (
    <Suspense fallback={<div className="text-black text-9xl">Loading...</div>}>
      <ReactMarkdown
        children={content}
        components={{
          // Code blocks
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                className="bg-gray-200 text-pink-600 px-1 py-0.5 rounded font-mono text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },

          // Headings
          h1: ({ children }) => (
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-3 text-xl font-semibold">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-2 text-lg font-medium">{children}</h3>
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="my-4 h-auto w-[400px] max-w-[calc(100% - (2 * 3px) - (2 * 1px))] rounded-md shadow-md"
            />
          ),
          // Paragraphs
          p: ({ children }) => (
            <p className="mb-4 font-serif text-[17px]">{children}</p>
          ),

          // Lists
          ul: ({ children }) => (
            <ul className="list-disc list-inside flex flex-col gap-1 text-[16px] mb-4">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside text-[16px] mb-4">
              {children}
            </ol>
          ),

          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="flex items-center pl-4 my-4 italic text-gray-700 bg-blue-100 border-l-4 border-blue-700 rounded-md">
              {children}
            </blockquote>
          ),

          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-700 underline hover:text-blue-500"
            >
              {children}
            </a>
          ),
        }}
      />
    </Suspense>
  );
};

export default MarkdownRenderer;
