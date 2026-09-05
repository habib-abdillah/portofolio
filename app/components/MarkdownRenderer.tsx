"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none
      prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
      prose-h1:text-3xl prose-h1:sm:text-4xl prose-h1:mb-6 prose-h1:pb-4 prose-h1:border-b prose-h1:border-white/10
      prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-blue-400
      prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-slate-100
      prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-sm sm:prose-p:text-base
      prose-li:text-slate-300 prose-li:text-sm sm:prose-li:text-base
      prose-strong:text-white prose-strong:font-semibold
      prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-950/20 prose-blockquote:py-2 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:text-slate-300 prose-blockquote:italic
      prose-code:text-blue-300 prose-code:font-mono prose-code:text-xs prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-[#0f1118] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:p-5 prose-pre:shadow-2xl
      prose-a:text-blue-400 prose-a:font-medium hover:prose-a:text-blue-300 prose-a:transition-colors
      prose-table:border-collapse prose-th:border-b prose-th:border-white/10 prose-th:text-white prose-td:border-b prose-td:border-white/5 prose-td:text-slate-300 prose-td:text-xs sm:prose-td:text-sm
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
