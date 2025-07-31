export function simpleSanitize(html: string): string {
  return html.replace(/<(?!\/?(b|i|em|strong|u|p|br|ul|ol|li|a)(\s|>|$))[^>]*>/gi, "")
}

export function truncateHtmlContent(html: string, maxLength = 200): string {
  const text = html.replace(/<[^>]+>/g, "")
  if (text.length <= maxLength) return html

  let truncated = ""
  let count = 0
  const tagRegex = /(<[^>]+>)|([^<]+)/g
  let match

  while ((match = tagRegex.exec(html)) && count < maxLength) {
    if (match[2]) {
      const remaining = maxLength - count
      if (match[2].length > remaining) {
        truncated += match[2].substring(0, remaining)
        count += remaining
      } else {
        truncated += match[2]
        count += match[2].length
      }
    } else if (match[1]) {
      truncated += match[1]
    }
  }

  return truncated + "..."
}
