import { supabase } from "./supabase";

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
// GUIDES
// ============================================

export async function getAllGuides(): Promise<Guide[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("guides")
    .select("*")
    .eq("published", true)
    .order("order");

  if (error) {
    console.error("Error fetching guides:", error);
    return [];
  }
  return data || [];
}

export async function getAllGuideSlugs(): Promise<string[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from("guides")
    .select("slug")
    .eq("published", true);
  return (data || []).map((g) => g.slug);
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("guides")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    console.error("Error fetching guide:", error);
    return null;
  }
  return data;
}

export async function getGuidesBySection(section: string): Promise<Guide[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("guides")
    .select("*")
    .eq("section", section)
    .eq("published", true)
    .order("order");

  if (error) return [];
  return data || [];
}

// ============================================
// STORIES
// ============================================

export async function getAllStories(): Promise<Story[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("published", true)
    .order("order");

  if (error) {
    console.error("Error fetching stories:", error);
    return [];
  }
  return data || [];
}

export async function getAllStorySlugs(): Promise<string[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from("stories")
    .select("slug")
    .eq("published", true);
  return (data || []).map((s) => s.slug);
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    console.error("Error fetching story:", error);
    return null;
  }
  return data;
}

export async function getStoriesByCategory(category: string): Promise<Story[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("category", category)
    .eq("published", true)
    .order("order");

  if (error) return [];
  return data || [];
}

// ============================================
// GLOSSARY
// ============================================

export async function getAllGlossaryTerms(): Promise<GlossaryTerm[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("glossary")
    .select("*")
    .order("order");

  if (error) {
    console.error("Error fetching glossary:", error);
    return [];
  }
  return data || [];
}

// ============================================
// SETTINGS
// ============================================

export async function getSettings(): Promise<Record<string, string>> {
  if (!supabase) return {};
  const { data, error } = await supabase
    .from("settings")
    .select("key, value");

  if (error) return {};
  const settings: Record<string, string> = {};
  (data || []).forEach((row) => {
    settings[row.key] = row.value;
  });
  return settings;
}

// ============================================
// HELPERS: Resolve related items
// ============================================

export async function getRelatedGuides(slugs: string[]): Promise<Guide[]> {
  if (!supabase || !slugs || slugs.length === 0) return [];
  const { data } = await supabase
    .from("guides")
    .select("*")
    .in("slug", slugs)
    .eq("published", true);
  return data || [];
}

export async function getRelatedStories(slugs: string[]): Promise<Story[]> {
  if (!supabase || !slugs || slugs.length === 0) return [];
  const { data } = await supabase
    .from("stories")
    .select("*")
    .in("slug", slugs)
    .eq("published", true);
  return data || [];
}
