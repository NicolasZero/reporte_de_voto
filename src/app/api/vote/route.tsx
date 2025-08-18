import { NextResponse } from 'next/server';
import {getAll, create} from "@/apiController/vote"

export async function GET() {
    const data = await getAll()
    if(data.error) return NextResponse.json({error: data.error, status: "FAIL"},{status:500})
    return NextResponse.json({data: data.data, status: "OK"})
}


export async function POST(request: Request) {
    try {
        const vote = await request.json(); 
        const date = await create(vote);
        // console.log(data); // Aquí verás los datos del formulario
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'No se pudo procesar el JSON' }, { status: 400 });
    }
}