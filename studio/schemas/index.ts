// Sanity Studio v3 Schemas for The Sugar Story

export const notebookPost = {
  name: "notebookPost",
  title: "The Notebook (Blog)",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    { name: "excerpt", title: "Excerpt", type: "text", rows: 3 },
    { name: "body_mdx", title: "Body (MDX)", type: "text", rows: 20, description: "Supports premium MDX formatting for recipe and story chapters.", validation: (Rule: any) => Rule.required() },
    { name: "hero_image", title: "Hero Image URL", type: "string", description: "Reference path or absolute CDN URL for food-styling photography." },
    { name: "author", title: "Author", type: "string", initialValue: "Shalini Singh" },
    { name: "category", title: "Category", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] },
    { name: "read_minutes", title: "Read Minutes", type: "number", initialValue: 3 },
    { name: "meta_title", title: "SEO Title Tag", type: "string" },
    { name: "meta_description", title: "SEO Meta Description", type: "text", rows: 3 },
    { name: "published_at", title: "Published At", type: "datetime", validation: (Rule: any) => Rule.required() },
    { name: "status", title: "Status", type: "string", options: { list: ["draft", "published"] }, initialValue: "draft" }
  ]
};

export const founderStory = {
  name: "founderStory",
  title: "Founder Stories",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule: any) => Rule.required() },
    { name: "product_id", title: "Associated Product ID", type: "string", description: "FK mapping to Medusa Product ID (e.g. prod_chocolate_taj)" },
    { name: "body", title: "Story Body", type: "text", rows: 10, validation: (Rule: any) => Rule.required() },
    { name: "image_url", title: "Founder Portrait Image Path", type: "string" },
    { name: "signature_image_url", title: "Founder Signature SVG Path", type: "string" },
    { name: "display_locations", title: "Display Locations", type: "array", of: [{ type: "string" }], options: { list: ["home", "pdp", "our-story"] } }
  ]
};

export const occasion = {
  name: "occasion",
  title: "Shop by Occasions",
  type: "document",
  fields: [
    { name: "title", title: "Occasion Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule: any) => Rule.required() },
    { name: "description", title: "Occasion Description", type: "text" },
    { name: "image_url", title: "Occasion Cover Image URL", type: "string" }
  ]
};

export const premiumIngredient = {
  name: "premiumIngredient",
  title: "Premium Ingredients",
  type: "document",
  fields: [
    { name: "name", title: "Ingredient Name", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "origin", title: "Source Origin Country/Region", type: "string" },
    { name: "is_premium", title: "Is Premium / Exquisite Spot", type: "boolean", initialValue: true },
    { name: "icon_name", title: "Icon Identifier", type: "string", description: "e.g. cocoa, vanilla, butter" }
  ]
};

export const schemaTypes = [notebookPost, founderStory, occasion, premiumIngredient];
