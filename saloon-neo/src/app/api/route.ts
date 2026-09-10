import { NextRequest, NextResponse } from "next/server"


export function GET(){

    console.log("Get request received")

}

export async function POST(request : NextRequest){

    console.log(request)

    let body = await request.json()
    console.log(body)
    //
    //
    return NextResponse.json(
        {
            message : "post request received"
        }
    )

}

export function PUT(request : NextRequest){

    console.log(request) 
    //
    //
    return NextResponse.json(
        {
            message : "put request received"
        }
    )

}

export function DELETE(){

    console.log("Delete request received")

}




