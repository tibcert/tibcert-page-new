import fs from 'fs';
import path from 'path';

async function testSocialAPI() {
    console.log('--- Social Media API Verification ---');

    // Read .env file manually since we're running a standalone script
    const envPath = path.resolve(process.cwd(), '.env');
    if (!fs.existsSync(envPath)) {
        console.error('Error: .env file not found at', envPath);
        return;
    }

    const envContent = fs.readFileSync(envPath, 'utf-8');
    const env: Record<string, string> = {};
    envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            env[key.trim()] = valueParts.join('=').trim();
        }
    });

    const FB_PAGE_ID = env.FACEBOOK_PAGE_ID;
    const IG_ACCOUNT_ID = env.INSTAGRAM_ACCOUNT_ID;
    const ACCESS_TOKEN = env.META_ACCESS_TOKEN;

    console.log('FACEBOOK_PAGE_ID:', FB_PAGE_ID);
    console.log('INSTAGRAM_ACCOUNT_ID:', IG_ACCOUNT_ID);
    console.log('ACCESS_TOKEN:', ACCESS_TOKEN ? '***' + ACCESS_TOKEN.slice(-5) : 'MISSING');

    console.log('Credentials loaded. Testing connection...');

    // Test Facebook
    try {
        console.log('\n[Facebook] Testing Page Feed...');
        if (!FB_PAGE_ID) {
            console.log('Skipping: FACEBOOK_PAGE_ID not set.');
        } else {
            const fbUrl = `https://graph.facebook.com/v25.0/${FB_PAGE_ID}/posts?fields=id,message,created_time&limit=1&access_token=${ACCESS_TOKEN}`;
            console.log('Fetching:', fbUrl.replace(ACCESS_TOKEN, 'ACCESS_TOKEN'));
            const fbResponse = await fetch(fbUrl);
            console.log('Status:', fbResponse.status);
            const fbData = await fbResponse.json();

            if (fbData.error) {
                console.error('Facebook API Error:', JSON.stringify(fbData.error, null, 2));
                if (fbData.error.code === 10 || fbData.error.code === 200) {
                    console.log('TIP: This usually means the token is missing "pages_read_engagement" permission.');
                }
            } else {
                console.log('Facebook Connection: SUCCESS');
                console.log('Last Post ID:', fbData.data[0]?.id || 'No posts found');
            }
        }
    } catch (e: any) {
        console.error('Facebook Fetch Error:', e.message);
    }

    // Test Instagram
    try {
        console.log('\n[Instagram] Testing Media...');
        if (!IG_ACCOUNT_ID) {
            console.log('Skipping: INSTAGRAM_ACCOUNT_ID not set.');
        } else {
            const igUrl = `https://graph.facebook.com/v21.0/${IG_ACCOUNT_ID}/media?fields=id,caption,timestamp&limit=1&access_token=${ACCESS_TOKEN}`;
            console.log('Fetching:', igUrl.replace(ACCESS_TOKEN, 'ACCESS_TOKEN'));
            const igResponse = await fetch(igUrl);
            console.log('Status:', igResponse.status);
            const igData = await igResponse.json();

            if (igData.error) {
                console.error('Instagram API Error:', JSON.stringify(igData.error, null, 2));
                if (igData.error.code === 10 || igData.error.code === 200) {
                    console.log('TIP: This usually means the token is missing "instagram_basic" permission.');
                }
            } else {
                console.log('Instagram Connection: SUCCESS');
                console.log('Last Media ID:', igData.data[0]?.id || 'No media found');
            }
        }
    } catch (e: any) {
        console.error('Instagram Fetch Error:', e.message);
    }

    console.log('\n--- Verification Finished ---');
}

testSocialAPI();
