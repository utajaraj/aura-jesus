import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { query } = await request.json()

    if (typeof query !== "string" || query.length < 1) {
        return NextResponse.json({ error: 'Invalid search' }, { status: 400 })
    }
    const dataCall = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${query}&&apikey=${process.env.APIKEY}&&limit=10`)
    if (dataCall.status !== 200) {
        return NextResponse.json({ error: 'Could find stocks' }, { status: 400 })
    }

    const apiData = await dataCall.json()
    const data = apiData.map((x: any) => {
        return {
            commercialName: x.name, handle: x.symbol
        }
    })
    return NextResponse.json(data, { status: 200 })
}