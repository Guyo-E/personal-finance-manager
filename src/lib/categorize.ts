import { db } from './db'

export async function detectCategory(description: string): Promise<string> {
  const categories = await db.category.findMany()
  const desc = description.toLowerCase()

  for (const cat of categories) {
    for (const keyword of cat.keywords) {
      if (desc.includes(keyword.toLowerCase())) {
        return cat.name
      }
    }
  }
  return 'אחר'
}
