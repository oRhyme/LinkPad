'use client'
import React from 'react'
import { authClient} from "../../../../lib/auth/client";
import {useRouter} from 'next/navigation'
const page = async () => {
const router = useRouter()

  await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/"); // redirect to login page
    },
  },
});

  return (
    <div>
        SIGN OUT PAGE
    </div>
  )
}

export default page