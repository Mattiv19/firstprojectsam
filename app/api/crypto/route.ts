import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const coinId = searchParams.get('coinId');

    if (!coinId) {
        return NextResponse.json({ error: 'Coin ID is required' }, { status: 400 });
    }

    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`;

    try {
        const response = await fetch(url, {
            headers: {
                'accept': 'application/json',
                'x-cg-demo-api-key': process.env.COINGECKO_API_KEY || ''
            }
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch price' }, { status: 500 });
    }
}