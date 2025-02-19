export function interpolateTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/{(\w+)}/g, (match, key) => values[key] || match);
}
