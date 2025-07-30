import {getAll} from "@/db/controller.location"

export async function GET() {
    const data = await getAll()
    if(data.error) return Response.json({error: data.error, status: "FAIL"},{status:500})
    return Response.json({data: data.data, status: "OK"})
    // return Response.json({ message: 'Hello World' },{status:409})
}