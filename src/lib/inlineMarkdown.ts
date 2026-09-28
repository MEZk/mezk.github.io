import { Marked } from 'marked';

const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const isSafeHref = (href: string) => {
  const normalizedHref = href.trim();

  return /^(https?:|mailto:|tel:)/i.test(normalizedHref)
    || normalizedHref.startsWith('/')
    || normalizedHref.startsWith('./')
    || normalizedHref.startsWith('../')
    || normalizedHref.startsWith('#');
};

const markdown = new Marked({
  async: false,
  gfm: true,
  renderer: {
    html({ text }) {
      return escapeHtml(text);
    },
    image({ text }) {
      return escapeHtml(text);
    },
    link({ href, title, tokens }) {
      const label = this.parser.parseInline(tokens);

      if (!isSafeHref(href)) return label;

      const titleAttribute = title ? ` title="${escapeHtml(title)}"` : '';
      return `<a href="${escapeHtml(href)}"${titleAttribute}>${label}</a>`;
    },
  },
});

export const renderInlineMarkdown = (value: string) => markdown.parseInline(value, { async: false });
