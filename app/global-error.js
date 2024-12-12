'use client' // Error boundaries must be Client Components
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <Button as={Link} href="/">Go to Homepage.</Button>
      </body>
    </html>
  )
}