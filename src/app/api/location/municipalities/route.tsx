import {getAll} from "@/db/controller.location"

export async function GET() {
    const data = await getAll()
    // return Response.json(data)
    return Response.json({ message: 'Hello World' },{status:409})

}