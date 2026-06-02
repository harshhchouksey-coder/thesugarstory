import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "the-sugar-story",
  title: "The Sugar Story — Editorial CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "sugarstory_proj_id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
