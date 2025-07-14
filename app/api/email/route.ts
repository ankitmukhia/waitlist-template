import { type NextRequest, NextResponse } from 'next/server'
import { ipAddress } from '@vercel/functions'
import { Resend } from 'resend'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

const resend = new Resend(process.env.RESEND_API_KEY)

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL!,
	token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const ratelimit = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(2, "1 m"),
})

export async function POST(req: NextRequest) {
	const ip = ipAddress(req) ?? "127.0.0.1"

	const { success } = await ratelimit.limit(ip)
	if (!success) {
		return NextResponse.json({
			message: "Too many request!"
		}, {
			status: 429
		})
	}

	const { email } = await req.json()

	try {
		const { data, error } = await resend.emails.send({
			from: 'Waitlist <onboarding@resend.dev>',
			to: [email],
			subject: 'Hello world',
			react: '<h1>Hello World</h1>'
		});

		if (error) {
			return NextResponse.json({ error }, { status: 500 })
		}

		return NextResponse.json(data, { status: 201 })
	} catch (err) {
		if (err instanceof Error) {
			return NextResponse.json({ error: err.message }, { status: 500 })
		}

		return NextResponse.json({ error: err }, { status: 500 })
	}
}
