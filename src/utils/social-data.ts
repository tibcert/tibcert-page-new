export interface SocialPost {
    id: string;
    platform: 'facebook' | 'instagram';
    content: string;
    imageUrl?: string;
    date: string;
    link: string;
    metrics: {
        likes: number;
        comments: number;
        shares?: number;
    };
}

const MOCK_SOCIAL_DATA: SocialPost[] = [
    {
        id: 'fb-1',
        platform: 'facebook',
        content: 'TIBCERT is hosting a new cybersecurity workshop for Tibetan organizations. Join us to learn about protectecting your digital workspace from advanced threats.',
        date: '2026-03-01',
        link: 'https://facebook.com/tibcert',
        metrics: { likes: 45, comments: 12, shares: 8 }
    },
    {
        id: 'ig-1',
        platform: 'instagram',
        content: 'Protecting our community, one organization at a time. #TibCERT #CyberSecurity #Tibet',
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
        date: '2026-02-28',
        link: 'https://instagram.com/tibcert',
        metrics: { likes: 128, comments: 24 }
    },
    {
        id: 'fb-2',
        platform: 'facebook',
        content: 'New Security Advisory: Urgent updates required for all major browser versions. Ensure your team is running the latest security patches.',
        date: '2026-02-25',
        link: 'https://facebook.com/tibcert',
        metrics: { likes: 32, comments: 5, shares: 15 }
    },
    {
        id: 'ig-2',
        platform: 'instagram',
        content: 'Technical excellence is not just a goal, but a necessity in the digital age. Check out our latest technical reports linked in bio.',
        imageUrl: 'https://images.unsplash.com/photo-1563968743333-24d1827d749a?auto=format&fit=crop&q=80&w=800',
        date: '2026-02-20',
        link: 'https://instagram.com/tibcert',
        metrics: { likes: 95, comments: 10 }
    }
];

export async function getLatestSocialPosts(): Promise<SocialPost[]> {
    // In a real implementation with tokens:
    // try {
    //     const fbResponse = await fetch(`https://graph.facebook.com/v12.0/me/posts?access_token=${import.meta.env.FB_TOKEN}`);
    //     ...
    // } catch (e) {}

    // For now, return mock data to ensure premium look immediately
    return MOCK_SOCIAL_DATA;
}
