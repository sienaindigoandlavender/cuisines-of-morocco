import { createClient } from "@supabase/supabase-js";

const nexusUrl = process.env.NEXUS_SUPABASE_URL!;
const nexusKey = process.env.NEXUS_SUPABASE_ANON_KEY!;

export const nexus = nexusUrl && nexusKey ? createClient(nexusUrl, nexusKey) : null;

export async function getNexusLegalPages() {
  if (!nexus) return [];
  const { data } = await nexus
    .from("nexus_legal_pages")
    .select("*")
    .order("display_order");
  return data || [];
}

export async function getNexusSiteConfig() {
  if (!nexus) return null;
  const siteId = process.env.SITE_ID || "cuisines-of-morocco";
  const { data } = await nexus
    .from("nexus_sites")
    .select("*")
    .eq("site_id", siteId)
    .single();
  return data;
}

export async function getNexusContentSites() {
  if (!nexus) return [];
  const { data } = await nexus
    .from("nexus_content_sites")
    .select("*")
    .eq("is_active", true)
    .order("display_order");
  return data || [];
}
