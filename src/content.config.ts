import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const profile = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/profile' }),
  schema: z.object({
    name: z.string(),
    positioning: z.string(),
    photo: z.string().optional(),
    photoAlt: z.string(),
    photoPosition: z.string().default('50% 50%'),
    photoVerified: z.boolean().default(false),
    navigation: z.array(z.object({ label: z.string(), href: z.string() })),
    metrics: z.array(z.object({ label: z.string(), value: z.string(), verified: z.boolean() })).optional(),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about' }),
  schema: z.object({
    title: z.string(),
    order: z.number().int(),
    lead: z.string(),
  }),
});

const skills = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/skills' }),
  schema: z.object({
    items: z.array(z.object({
      title: z.string(),
      order: z.number().int(),
      icon: z.string().optional(),
      items: z.array(z.string()),
    })),
  }),
});

const technologies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/technologies' }),
  schema: z.object({
    items: z.array(z.object({
      title: z.string(),
      order: z.number().int(),
      icon: z.string(),
      verified: z.boolean().default(false),
    })),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    items: z.array(z.object({
      company: z.string(),
      role: z.string(),
      period: z.string(),
      order: z.number().int(),
      verified: z.boolean().default(false),
      responsibility: z.string(),
      results: z.array(z.string()).default([]),
    })),
  }),
});

const contacts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/contacts' }),
  schema: z.object({
    title: z.string(),
    intro: z.string(),
    items: z.array(z.object({
      label: z.string(),
      value: z.string(),
      href: z.string(),
      icon: z.string(),
      verified: z.boolean().default(false),
    })),
  }),
});

export const collections = { profile, about, skills, technologies, experience, contacts };
