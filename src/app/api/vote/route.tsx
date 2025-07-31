import {getAll, create} from "@/apiController/vote"

export async function GET() {
    const data = await getAll()
    if(data.error) return Response.json({error: data.error, status: "FAIL"},{status:500})
    return Response.json({data: data.data, status: "OK"})
}

export async function POST(request: Request) {
    const data = await request.json()
    // const res = await create(data)
    return Response.json(data)
}