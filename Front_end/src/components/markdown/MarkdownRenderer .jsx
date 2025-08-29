import { Suspense } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const MarkdownRenderer = ({ content }) => {
  return (
    <Suspense fallback={<div className="text-9xl text-black">Loading...</div>}>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold  mb-3">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-medium  mb-2">{children}</h3>
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
            <blockquote className="border-l-4 flex  items-center border-blue-700 pl-4 italic text-gray-700 bg-blue-100 rounded-md my-4">
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
