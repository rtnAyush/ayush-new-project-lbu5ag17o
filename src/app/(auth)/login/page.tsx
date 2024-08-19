import { auth, signIn } from '@/lib/auth';
import React from 'react'

export const LoginPage = async () => {

    const session = await auth();
    console.log(session);

  return (
    <div>
        <form action={handleGithubLogin}>
            <button onClick={handleGithubLogin}>Login with Github</button>
        </form>
    </div>
  )
}
