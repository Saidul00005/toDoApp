'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardBody, CardFooter, CardHeader, Button } from "@nextui-org/react";
import Link from 'next/link';

export default function EmailVerificationMessage() {
  const searchParams = useSearchParams();
  const successMessage = searchParams.get('success');
  const errorMessage = searchParams.get('error');

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="flex justify-center">
          <h1 className="text-2xl font-bold">Email Verification Status</h1>
        </CardHeader>
        <CardBody className="text-center">
          {successMessage && (
            <p className="text-green-600 mb-4">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="text-red-600 mb-4">
              {errorMessage}
            </p>
          )}
        </CardBody>
        <CardFooter className="flex justify-center">
          {successMessage ? (
            <Button variant='bordered' as={Link} href="/logIn" color="primary">
              Log In
            </Button>
          ) : (
            <Button variant='bordered' as={Link} href="/signUp" color="secondary">
              Sign Up
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

