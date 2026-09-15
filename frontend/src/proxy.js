import { NextResponse } from "next/server";

export function proxy(request) {
   const tokan = request.cookies.get("token");
   if(!tokan){
    return NextResponse.redirect(
        new URL("/sign_in",request.url)
    )
   }    

   return NextResponse.next();
}

export const config = {
  matcher: "/checkout",
};    