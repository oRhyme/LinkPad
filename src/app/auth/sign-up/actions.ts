'use server';

import { authClient } from "../../../../lib/auth/client"
import { auth } from '../../../../lib/auth/server';
import { prisma } from '../../../../lib/prisma';
import { redirect } from 'next/navigation';

export async function signUpWithEmail(
  _prevState: { error: string } | null,
  formData: FormData
) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email) {
    return { error: "Email address must be provided." }
  }

  // Optionally restrict sign ups based on email address
  // if (!email.trim().endsWith("@my-company.com")) {
  //  return { error: 'Email must be from my-company.com' };
  // }

  const { error } = await auth.signUp.email({
    email,
    name,
    password,
  });

  if (error) {
    return { error: error.message || 'Failed to create account' };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    }
  })

  // Create user in database
  if (!existingUser) {await prisma.user.create({
    data: {
      name,
      email,
      password,
      folders : {
        create : {
          folderName : "default",
          pads : {
            create : {
              title : "Getting Started",
              description : "Sample Description",
              url : "https://react.dev/"
            }
          }
        }
      }
    },
  })};

  redirect('/');
}