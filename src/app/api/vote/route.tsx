import { NextResponse } from 'next/server';
import {getAll, create} from "@/services/vote"

export async function GET() {
    const data = await getAll()
    if(data.error) return NextResponse.json({error: data.error},{status:500})
    return NextResponse.json({data: data.data})
}


export async function POST(request: Request) {
    try {
        const vote = await request.json(); 
        const data = await create(vote);
        // console.log(data); // Aquí verás los datos del formulario
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'No se pudo procesar el JSON' }, { status: 400 });
    }
}