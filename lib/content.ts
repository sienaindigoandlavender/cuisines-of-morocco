import { guides as _guides } from "./data/guides";
import { stories as _stories } from "./data/stories";
import { glossaryTerms as _glossary } from "./data/glossary";
import { siteSettings as _settings } from "./data/settings";

// ============================================
// TYPES
// ============================================

export interface Guide {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  section: string;
  city: string | null;
  hero_image: string | null;
  excerpt: string;
  body: string;
  budget_range: string | null;
  read_time: string | null;
  last_updated: string | null;
  related_guides: string[];
  related_stories: string[];
  locations: Array<{
    name: string;
    lat: number;
    lng: number;
    description?: string;
    price_range?: string;
    what_to_order?: string;
  }>;
  published: boolean;
  order: number;
}

export interface Story {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  category: string;
  region: string | null;
  hero_image: string | null;
  excerpt: string;
  body: string;
  read_time: string | null;
  entry_number: number | null;
  recipe_json: any;
  diagram_svg: string | null;
  related_stories: string[];
  related_guides: string[];
  published: boolean;
  order: number;
}

export interface GlossaryTerm {
  id: number;
  term: string;
  slug: string;
  arabic_script: string | null;
  pronunciation: string | null;
  category: string;
  definition: string;
  context: string | null;
  related: string[];
  order: number;
}

// ============================================
// GUIDES (hard-coded)
// ============================================

export async function getAllGuides(): Promise<Guide[]> {
  return _guides;
}

export async function getAllGuideSlugs(): Promise<string[]> {
  return _guides.map((g) => g.slug);
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  return _guides.find((g) => g.slug === slug) || null;
}

export async function getGuidesBySection(section: string): Promise<Guide[]> {
  return _guides.filter((g) => g.section === section);
}

// ============================================
// STORIES (hard-coded)
// ============================================

export async function getAllStories(): Promise<Story[]> {
  return _stories;
}

export async function getAllStorySlugs(): Promise<string[]> {
  return _stories.map((s) => s.slug);
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  return _stories.find((s) => s.slug === slug) || null;
}

export async function getStoriesByCategory(category: string): Promise<Story[]> {
  return _stories.filter((s) => s.category === category);
}

// ============================================
// GLOSSARY (hard-coded)
// ============================================

export async function getAllGlossaryTerms(): Promise<GlossaryTerm[]> {
  return _glossary;
}

// ============================================
// SETTINGS (hard-coded)
// ============================================

export async function getSettings(): Promise<Record<string, string>> {
  return _settings;
}

// ============================================
// HELPERS: Resolve related items
// ============================================

export async function getRelatedGuides(slugs: string[]): Promise<Guide[]> {
  if (!slugs || slugs.length === 0) return [];
  return _guides.filter((g) => slugs.includes(g.slug));
}

export async function getRelatedStories(slugs: string[]): Promise<Story[]> {
  if (!slugs || slugs.length === 0) return [];
  return _stories.filter((s) => slugs.includes(s.slug));
}
