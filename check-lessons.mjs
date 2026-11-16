import { ALL_LESSONS, MODULES, TOTAL_TESTS } from './src/data/lessons/index.js'
console.log('lessons', ALL_LESSONS.length, 'modules', MODULES.length, 'tests', TOTAL_TESTS)
const missing = []
const seen = new Set()
for (let i = 1; i <= 100; i++) {
  const l = ALL_LESSONS.find(x => x.id === i)
  if (!l) missing.push(i)
  if (l) {
    if (seen.has(l.id)) console.log('DUP', l.id)
    seen.add(l.id)
    if (!l.tests || !l.tests.length) console.log('NO TESTS', l.id)
    if (l.moduleId !== MODULES.find(m => m.lessonIds.includes(l.id))?.id) console.log('MODULE MISMATCH', l.id)
    if (l.id < 15) console.log(l.id, l.moduleId, l.tests.length, l.title)
  }
}
console.log('missing', missing)
console.log('by module', MODULES.map(m => [m.id, ALL_LESSONS.filter(l=>l.moduleId===m.id).length]))
