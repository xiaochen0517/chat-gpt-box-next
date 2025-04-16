import markdownit from "markdown-it";
// @ts-ignore
import texmath from "@/utils/texmath/texmath.js";
import katex from "katex";
// @ts-ignore
import markdownItTaskLists from "markdown-it-task-lists";
import "@/assets/style/github-markdown.css";
import hljs from "highlight.js";
import "@/assets/style/highlight-github.less";
import xmlLanguage from "highlight.js/lib/languages/xml";

hljs.registerLanguage("vue", xmlLanguage);


const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};
const getCodeBlockHtml = (codeHtml: string, originCode: string) => {
  return "<div class=\"markdown-code-block highlight-dark\"><pre class=\"hljs\"><code>" + codeHtml + "</code></pre>" +
    "<div class=\"copy-code-button w-7 h-7 absolute top-2 right-2 flex flex-row items-center justify-center rounded-md hover:bg-neutral-200 hover:dark:bg-neutral-700 cursor-pointer\">" +
    "<i class=\"iconfont icon-file-copy text-black dark:text-white\"></i></div>" +
    "<div class=\"code-origin\" style=\"display: none;\">" + escapeHtml(originCode) + "</div></div>";
};
const md = markdownit({
  html: true,
  breaks: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return getCodeBlockHtml(hljs.highlight(str, {language: lang, ignoreIllegals: true}).value, str);
      } catch (__) {
        return getCodeBlockHtml(str, str);
      }
    }
    return getCodeBlockHtml(str, str);
  },
});
md.use(texmath, {
  engine: katex,
  delimiters: ["brackets", "dollars"],
});
md.use(markdownItTaskLists);

// default render
const defaultRender = md.renderer.rules.fence || function (tokens, idx, options, _env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
  const token = tokens[idx];
  const code = token.content.trim();
  const lines = code.split("\n");
  let lineNumbersWrapper = "";

  lines.forEach((_line, index) => {
    lineNumbersWrapper += `<span class="line-number">${index + 1}</span>\n`;
  });

  const defaultCodeBlock = defaultRender(tokens, idx, options, env, slf);

  return `<div class="code-block relative">
    <div class="line-numbers">${lineNumbersWrapper}</div>
    ${defaultCodeBlock}
  </div>`;
};

export const renderMarkdown = (content: string, isDark: boolean) => (
  <div>
    {/* biome-ignore lint/security/noDangerouslySetInnerHtml: used in demo */}
    <div
      className="markdown-body"
      markdown-theme={isDark ? "dark" : "light"}
      dangerouslySetInnerHTML={{__html: md.render(content)}}
    />
  </div>
);