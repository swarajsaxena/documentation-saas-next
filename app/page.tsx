import { ROUTES } from '@/lib/constants'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const page = () => {
  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <Link href={ROUTES.dashboard}>Dashboard</Link>
      </SignedIn>
    </div>
  )
}

export default page
