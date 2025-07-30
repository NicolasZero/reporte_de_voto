import {getAll, create} from "@/db/controller.vote"

export async function GET() {
    const res = await getAll()
    return Response.json(res)
}

export async function POST(request: Request) {
    const data = await request.json()
    // const res = await create(data)
    return Response.json(data)
}