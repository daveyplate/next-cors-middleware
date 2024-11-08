# @daveyplate/next-cors-middleware

## Installation

To install the package, run:

```bash
npm install @daveyplate/next-cors-middleware
```

## Middleware Usage

To use the middleware in your Next.js App, follow these steps:

1. Create a `middleware.js` file in the root of your project:

    ```javascript
    import { NextResponse } from 'next/server'
    import { nextCors } from '@daveyplate/next-cors-middleware'

    export function middleware(request) {
        const response = nextCors({
            request,
            allowedOrigins: ['https://example.com', 'https://anotherdomain.com'],
        })

        if (response) {
            return response
        }

        // Your middleware logic here
        return NextResponse.next()
    }
    ```

2. Customize the `allowedOrigins` array with the domains you want to allow.

3. Optionally, you can pass custom CORS options:

    ```javascript
    const customCorsOptions = {
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Custom-Header',
    };

    export function middleware(request) {
        const response = nextCors({
            request,
            allowedOrigins: ['https://example.com'],
            corsOptions: customCorsOptions,
        });

        if (response) {
            return response;
        }

        // Your middleware logic here
        return NextResponse.next();
    }
    ```

That's it! Your Next.js App Router now supports CORS.