
/* 
import { NextResponse } from "next/server"

export function middleware(request) {
    // console.log(request.url)

    return NextResponse.redirect((new URL("/about", request.url)))
}

export const config={ matcher: ["/account","/cabins"] }
*/

import { auth } from "./app/_lib/Auth"

export const middleware=auth
export const config={ matcher: ["/account"] }