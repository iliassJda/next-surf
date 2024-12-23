// lowercase and remove spaces for a string
export function NormalizeName(name: string): string {
    return name.toLowerCase().replace(/\s+/g, "");
 }
// decode a url and lowercase and remove spaces for a string
export function NormalizeURLName(name: string): string {
   return NormalizeName(decodeURIComponent(name));
}