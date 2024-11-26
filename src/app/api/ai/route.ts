import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { content } = await request.json()
    if (typeof content !== "string" && content.length < 1) {
        return NextResponse.json({message:"Invalid Query"}, { status: 400 })
    }

    const anthropic = new Anthropic({
        apiKey: process.env.CLAUDE_KEY
    });

    const msg: any = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: [{ role: "user", content }],
    });

    msg.content[0].question = content
    return NextResponse.json(msg.content, { status: 200 })

}