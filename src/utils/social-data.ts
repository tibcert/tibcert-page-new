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
    const FB_PAGE_ID = import.meta.env.FACEBOOK_PAGE_ID;
    const IG_ACCOUNT_ID = import.meta.env.INSTAGRAM_ACCOUNT_ID;
    const ACCESS_TOKEN = import.meta.env.META_ACCESS_TOKEN;

    // We need at least an access token to try fetching anything
    if (!ACCESS_TOKEN) {
        return MOCK_SOCIAL_DATA;
    }

    try {
        const fetchTasks: Promise<SocialPost[]>[] = [];
        
        if (FB_PAGE_ID) {
            fetchTasks.push(fetchFacebookPosts(FB_PAGE_ID, ACCESS_TOKEN));
        }
        
        if (IG_ACCOUNT_ID) {
            fetchTasks.push(fetchInstagramPosts(IG_ACCOUNT_ID, ACCESS_TOKEN));
        }

        const results = await Promise.allSettled(fetchTasks);
        const allPosts: SocialPost[] = [];
        
        results.forEach(result => {
            if (result.status === 'fulfilled') {
                allPosts.push(...result.value);
            }
        });

        // Sort by date
        allPosts.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        // If we found live posts, return them. Otherwise fall back to mock data.
        return allPosts.length > 0 ? allPosts.slice(0, 4) : MOCK_SOCIAL_DATA;
    } catch (error) {
        console.error('Error fetching social posts:', error);
        return MOCK_SOCIAL_DATA;
    }
}

async function fetchFacebookPosts(pageId: string, token: string): Promise<SocialPost[]> {
    try {
        const url = `https://graph.facebook.com/v25.0/${pageId}/posts?fields=id,message,created_time,full_picture,permalink_url&limit=5&access_token=${token}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error || !data.data) {
            return [];
        }

        return data.data.map((post: any) => ({
            id: post.id,
            platform: 'facebook',
            content: post.message || '',
            imageUrl: post.full_picture,
            date: post.created_time.split('T')[0],
            link: post.permalink_url,
            metrics: {
                likes: 0,
                comments: 0,
                shares: 0
            }
        }));
    } catch (e) {
        return [];
    }
}

async function fetchInstagramPosts(accountId: string, token: string): Promise<SocialPost[]> {
    try {
        const url = `https://graph.facebook.com/v21.0/${accountId}/media?fields=id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count&limit=5&access_token=${token}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!data.data) return [];

        return data.data.map((post: any) => ({
            id: post.id,
            platform: 'instagram',
            content: post.caption || '',
            imageUrl: post.media_url,
            date: post.timestamp.split('T')[0],
            link: post.permalink,
            metrics: {
                likes: post.like_count || 0,
                comments: post.comments_count || 0
            }
        }));
    } catch (e) {
        return [];
    }
}
