
export function NormalizeName(name: string): string {
    return name.toLowerCase().replace(/\s+/g, "");
 }

export function NormalizeURLName(name: string): string {
   return NormalizeName(decodeURIComponent(name));
}