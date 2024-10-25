import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		return NextResponse.json({ ok: 1, message: 'ok' }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ ok: false }, { status: 500 });
	}
}
