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

export const collections = {
	'随想': thoughts,
};
