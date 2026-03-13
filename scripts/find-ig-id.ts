import fs from 'fs';
import path from 'path';

async function findIGId() {
    console.log('--- Instagram ID Discovery ---');

    const envPath = path.resolve(process.cwd(), '.env');
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const env: Record<string, string> = {};
    envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            env[key.trim()] = valueParts.join('=').trim();
        }
    });

    const ACCESS_TOKEN = env.META_ACCESS_TOKEN;
    const FB_PAGE_ID = env.FACEBOOK_PAGE_ID;

    if (!FB_PAGE_ID || !ACCESS_TOKEN) {
        console.error('Error: FACEBOOK_PAGE_ID or META_ACCESS_TOKEN missing in .env');
        return;
    }

    console.log(`Checking Facebook Page (${FB_PAGE_ID}) for linked Instagram Business Account...`);

    try {
        const url = `https://graph.facebook.com/v25.0/${FB_PAGE_ID}?fields=instagram_business_account,name&access_token=${ACCESS_TOKEN}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error('API Error:', JSON.stringify(data.error, null, 2));
            return;
        }

        console.log('\nPage Name:', data.name);
        
        if (data.instagram_business_account) {
            console.log('\nSUCCESS! Found Linked Instagram Business Account:');
            console.log('--------------------------------------------------');
            console.log('ID TO USE IN .env:', data.instagram_business_account.id);
            console.log('--------------------------------------------------');
            console.log('\nPlease update your INSTAGRAM_ACCOUNT_ID in .env with this value.');
        } else {
            console.log('\nNO Instagram Business Account found linked to this Page.');
            console.log('Possible reasons:');
            console.log('1. The Instagram account is "Personal" or "Creator". It MUST be a "Business Account".');
            console.log('2. It is not connected to this specific Facebook Page.');
            console.log('3. The token lacks "pages_read_engagement" permission (though we checked this earlier).');
            console.log('\nTip: Check Facebook Page Settings -> Linked Accounts -> Instagram.');
        }

    } catch (e: any) {
        console.error('Fetch Error:', e.message);
    }
}

findIGId();
