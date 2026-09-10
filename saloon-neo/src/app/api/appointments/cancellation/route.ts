import { NextRequest, NextResponse } from "next/server";


export async function POST(request : NextRequest){

    let body = await request.json()

    console.log(body)

    return NextResponse.json(
        {
            message : "post request received"
        }
    )

}

