import { NextRequest } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export async function POST(req: NextRequest) {
	const { email } = await req.json()

	try {
		const res = await notion.pages.create({
			parent: {
				database_id: process.env.NOTION_DATABASE_ID!
			},
			properties: {
				Email: {
					email
				},
			}
		})

		if (!res) {
			return Response.json({ error: 'Failed to add email to Notion.' }, { status: 500 })
		}

		return Response.json({ success: true }, { status: 200 })
	} catch (err) {
		if (err instanceof Error) {
			return Response.json({ error: err.message }, { status: 500 })
		}

		return Response.json({ error: err }, { status: 500 })
	}
}
