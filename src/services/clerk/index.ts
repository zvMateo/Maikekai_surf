import { auth, currentUser } from '@clerk/nextjs/server'

export async function getUserRole(): Promise<string | undefined> {
  const { sessionClaims } = await auth()
  return (sessionClaims?.publicMetadata as any)?.role as string | undefined
}

export async function getCurrentUser() {
  return currentUser()
}

export {}
