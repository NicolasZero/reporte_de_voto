import { NextResponse } from 'next/server';
import {getAll} from "@/apiController/location"

export async function GET() {
    try{
        const data = await getAll()
        // if(data.error) return Response.json({error: data.error, status: "FAIL"},{status:500})
        return NextResponse.json(data);
        // return Response.json({data: data.data, status: "OK"})    
    } catch (error) {
        return NextResponse.json({ error: 'No se pudo procesar el JSON' }, { status: 400 });
    }
    
    // return Response.json({ message: 'Hello World' },{status:409})
}