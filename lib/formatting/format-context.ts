export const formatContext = (context: string) => {
  return context
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Для camelCase
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Для аббревиатур перед словами
    .toLowerCase()
}