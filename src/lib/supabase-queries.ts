import { createClient } from '@/services/supabase/server'

export interface SurfPlan {
  id: string
  name: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration_days: number
  duration_nights: number
  price: number
  original_price: number
  max_participants: number
  features: string[]
  image_url: string
  is_active: boolean
}

export async function getSurfPlans(): Promise<SurfPlan[]> {
  const supabase = await createClient()
  
  const { data: plans, error } = await supabase
    .from('surf_plans')
    .select('*')
    .eq('is_active', true)
    .order('price', { ascending: true })

  if (error) {
    console.error('Error fetching surf plans:', error)
    return []
  }

  return plans || []
}

export async function getSurfPlan(id: string): Promise<SurfPlan | null> {
  const supabase = await createClient()
  
  const { data: plan, error } = await supabase
    .from('surf_plans')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching surf plan:', error)
    return null
  }

  return plan
}
