import DashboardClient from './DashboardClient'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const { sessionClaims } = auth()
  const role = sessionClaims?.publicMetadata?.role as string | undefined
  if (role !== 'admin') {
    redirect('/auth')
  }
  return <DashboardClient />
}
