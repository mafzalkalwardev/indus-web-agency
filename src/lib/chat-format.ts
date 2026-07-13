/** Lightweight formatting for assistant chat messages (links + bold). */

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
const BOLD_RE = /\*\*([^*]+)\*\*/g;
const BARE_URL_RE = /(^|[\s(])((https?:\/\/[^\s<]+[^\s<.,;:!?)]))/g;

export function formatChatText(text: string): string {
  return text
    .replace(BOLD_RE, "<strong>$1</strong>")
    .replace(LINK_RE, '<a href="$2" class="text-cyan-600 underline hover:text-cyan-500" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(BARE_URL_RE, '$1<a href="$2" class="text-cyan-600 underline hover:text-cyan-500" target="_blank" rel="noopener noreferrer">$2</a>');
}
