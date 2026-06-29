export function basePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH || "";
}

export function href(path: string): string {
  const base = basePath();
  if (!path.startsWith("/")) path = `/${path}`;
  return `${base}${path}`;
}
