import fs from 'fs';
import path from 'path';

async function testSocialAPI() {
    console.log('=== Social Media API Verification (Diagnostic) ===');

    const envPath = path.resolve(process.cwd(), '.env');
    if (!fs.existsSync(envPath)) {
        console.error('Error: .env file not found');
        return;
    }

    const envContent = fs.readFileSync(envPath, 'utf-8');
    const env = {};
    // Better line splitting for Windows
    envContent.split(/\r?\n/).forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join('=').trim();
            if (key) env[key] = value;
        }
    });

    const FB_PAGE_ID = env.FACEBOOK_PAGE_ID;
    const ACCESS_TOKEN = env.META_ACCESS_TOKEN;

    if (!FB_PAGE_ID || !ACCESS_TOKEN) {
        console.error('Missing credentials in .env');
        console.log('Keys found:', Object.keys(env));
        return;
    }

    console.log('Testing FB ID:', FB_PAGE_ID);
    
    try {
        const url = `https://graph.facebook.com/v25.0/${FB_PAGE_ID}/posts?fields=id,message,created_time&limit=1&access_token=${ACCESS_TOKEN}`;
        const response = await fetch(url);
        const data = await response.json();

        process.stdout.write('\n--- API RESPONSE ---\n');
        process.stdout.write('Status: ' + response.status + ' ' + response.statusText + '\n');
        process.stdout.write(JSON.stringify(data, null, 2) + '\n');
        process.stdout.write('--------------------\n');

        if (response.ok && data.data) {
            console.log('RESULT: Facebook API is WORKING.');
        } else {
            console.log('RESULT: Facebook API is NOT working.');
        }
    } catch (e) {
        console.error('Fetch failed:', e.message);
    }
}

testSocialAPI();
