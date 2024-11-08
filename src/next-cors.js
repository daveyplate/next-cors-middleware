import { NextRequest, NextResponse } from "next/server"

const defaultCorsOptions = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

/** 
 * Provides a simple way to handle CORS in Next.js
 * @param {Object} options
 * @param {NextRequest} options.request - The incoming request
 * @param {string[]} options.allowedOrigins - The list of allowed origins
 * @param {Object} [options.corsOptions] - The CORS options to include in the response
 * @returns {NextResponse} - The response to send back
 */
export function nextCors({ request, allowedOrigins, corsOptions = defaultCorsOptions }) {
    // Check the origin from the request
    const origin = request.headers.get('origin') ?? ''
    const isAllowedOrigin = allowedOrigins.includes(origin)

    // Handle preflighted requests
    const isPreflight = request.method === 'OPTIONS'

    if (isPreflight) {
        const preflightHeaders = {
            ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
            ...corsOptions,
        }
        return NextResponse.json({}, { headers: preflightHeaders })
    }

    // Handle simple requests
    const response = NextResponse.next()

    if (isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin)
    }

    Object.entries(corsOptions).forEach(([key, value]) => {
        response.headers.set(key, value)
    })

    return response
}