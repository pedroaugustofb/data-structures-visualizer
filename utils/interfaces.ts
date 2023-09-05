export interface DynamicPageProps {
  params: { id: string };
  searchParams: { name: string; maxSize?: string };
}
