import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function POST(request :NextRequest){

  //request eke body kiyana veriable ekata aran print kara ganima
  const body = await request.json();
  //console.log(body)   //onnm use karanna puluwan

  //check body eka athule email ekka thiyanwada yannna.
  if(body.email == null){

    return NextResponse.json(
      {
        message : "email is requried"
      }
    )
  }

  //database eke user table eke email eka thiyanwada kiyala bala e userwa print kara ganima
  const user = await prisma.user.findFirst(
    {

    where :
    {
      email : body.email
    }

  }
)
console.log(user)


//user kenek innawada kiyala balanna
if(user == null){

  return NextResponse.json(
    {
      message : "user not found"
    }
  )
}

//database eka password eka body eke password ekata samanai kiyala balanna 
const isPasswordCorrect = await compare(body.password, user.password)

if(isPasswordCorrect){

  /*return NextResponse.json(
    {
      message : "Login Successful"
    }
  )*/

const secretText = process.env.JOSE_SECRET   //secret kiyana veriable ekata env eke thiyanwa JOSE_SECRET kiyana veriable eka aran danna, eken nathnam TemporySecret8929% kiyana text eka danna

//secret kiyna veriable ekata kalin liya gaththa secretText  eka encode kara ganima
const secret = new TextEncoder().encode(secretText)

//jose.SignJWT kiyana function eka use kar
const token = await new jose.SignJWT(
  {
    email : user.email,
    firstName : user.firstName,
    lastName : user.lastName,
    role : user.role,
    privilages :user.privileges
  }
).setProtectedHeader({ alg : "HS256" }).sign(secret) //"setProtectedHeader" kiyanne hambawena token eke issarahaen thiyanwa podi header ekaka, eka hadanna use karanne mona algorithma ekada kiyana eka

const response = NextResponse.json(
  {
    message : "Login Successfull",
    role : user.role
  }
)

response.cookies.set(
  {
   name : "login-token",
   value : token,
   httpOnly : true,
   secure : false,
   sameSite : "lax",
   maxAge : 60 * 60 * 24 * 7, //7 days
  }
)
return response

}
else{
  
  return NextResponse.json(
    {
      message : "Invalid password"
    }
  )
}







  
  
}