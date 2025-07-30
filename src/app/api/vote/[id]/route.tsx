import {getOne} from "@/db/controller.vote"

export async function GET(request: Request, { params }: { params: { id: number } }) {
    const { id } = await params
    const data = await getOne(id)
    return Response.json(data)
    // return Response.json({ message: 'Hello World', id },{status:409})

}