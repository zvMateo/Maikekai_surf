import DashboardClient from './DashboardClient'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

interface PageProps {
  params: { locale: string }
}

export default async function DashboardPage({ params }: PageProps) {
  const { sessionClaims } = await auth()
  const role = (sessionClaims?.publicMetadata as any)?.role as
    | string
    | undefined
  if (role !== 'admin') {
    redirect(`/${params.locale}/auth`)
  }
  return <DashboardClient />
}
