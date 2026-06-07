import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Default settings
  await prisma.settings.upsert({
    where: { id: 'default' },
    update: {},
    create: { id: 'default', currency: 'ILS', locale: 'he-IL', theme: 'dark' },
  })

  // Default categories
  const categories = [
    { name: 'מזון וסופר', icon: 'shopping-cart', color: '#22C55E', keywords: ['שופרסל', 'רמי לוי', 'מגה', 'יינות ביתן', 'ויקטורי', 'סופר', 'מכולת'] },
    { name: 'דלק ותחבורה', icon: 'car', color: '#F97316', keywords: ['פז', 'סונול', 'דור אלון', 'דלק', 'רכבת', 'אגד', 'מוניות'] },
    { name: 'בריאות וכושר', icon: 'heart', color: '#EF4444', keywords: ['מכבי', 'כללית', 'בית חולים', 'רופא', 'כושר', 'מרפאה', 'ביטוח בריאות'] },
    { name: 'מנויים', icon: 'repeat', color: '#8B5CF6', keywords: ['נטפליקס', 'ספוטיפיי', 'אמזון', 'אפל', 'גוגל', 'מנוי'] },
    { name: 'ביטוח', icon: 'shield', color: '#06B6D4', keywords: ['ביטוח', 'הפניקס', 'מגדל', 'הראל', 'כלל', 'איילון'] },
    { name: 'חשבונות', icon: 'zap', color: '#F59E0B', keywords: ['חשמל', 'מים', 'ארנונה', 'גז', 'בזק', 'הוט', 'פרטנר', 'סלקום'] },
    { name: 'מסעדות ובילוי', icon: 'utensils', color: '#EC4899', keywords: ['מסעדה', 'קפה', 'בית קפה', 'פיצה', 'סושי', 'בילוי'] },
    { name: 'הלבשה', icon: 'shirt', color: '#6366F1', keywords: ['זארה', 'H&M', 'קסטרו', 'פוקס', 'בגדים'] },
    { name: 'חינוך', icon: 'book-open', color: '#0EA5E9', keywords: ['שכר לימוד', 'גן', 'בית ספר', 'קורס', 'אוניברסיטה'] },
    { name: 'הכנסה', icon: 'trending-up', color: '#22C55E', keywords: ['משכורת', 'שכר', 'העברה', 'זיכוי'] },
    { name: 'אחר', icon: 'circle', color: '#64748B', keywords: [] },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.name },
      update: {},
      create: { id: cat.name, ...cat },
    })
  }

  console.log('✅ Seed complete')
}

main().catch(console.error).finally(() => prisma.$disconnect())
