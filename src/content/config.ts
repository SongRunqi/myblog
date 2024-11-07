import { defineCollection, z } from 'astro:content';

const thoughts = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		pubDate: z.date(),
		updatedDate: z.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const dataStructure = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		pubDate: z.date(),
		tags: z.array(z.string()).optional(),
		difficulty: z.enum(['简单', '中等', '困难']).optional(),
	}),
});

const notes = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		pubDate: z.date(),
		category: z.string(),
		tags: z.array(z.string()).optional(),
	}),
});

export const collections = {
	'随想': thoughts,
	'data-structure': dataStructure,
	'notes': notes,
};
