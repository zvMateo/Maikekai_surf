import { auth, currentUser } from '@clerk/nextjs/server'

export function getUserRole(): string | undefined {
  const { sessionClaims } = auth()
  return sessionClaims?.publicMetadata?.role as string | undefined
}

export async function getCurrentUser() {
  return currentUser()
}

export {}
