import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        category: z.string(),
        image: z.string().optional(),
        author: z.string(),
        tags: z.array(z.string()).optional(),
        featured: z.boolean().optional(),
    }),
});

export const collections = {
    blog,
};
