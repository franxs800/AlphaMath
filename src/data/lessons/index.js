import { lesson1 } from './lesson1'
import { lesson2 } from './lesson2'
import { lesson3 } from './lesson3'
import { lesson4 } from './lesson4'
import { lesson5 } from './lesson5'
import { lesson6 } from './lesson6'
import { lesson7 } from './lesson7'
import { lesson8 } from './lesson8'
import { lesson9 } from './lesson9'
import { lesson10 } from './lesson10'
import { lesson11 } from './lesson11'
import { lesson12 } from './lesson12'
import { lesson13 } from './lesson13'
import { lesson14 } from './lesson14'
import { lesson31 } from './lesson31'
import { lesson32 } from './lesson32'
import { lesson36 } from './lesson36'
import { lesson37 } from './lesson37'
import { lesson41 } from './lesson41'
import { lesson46 } from './lesson46'
import { lesson51 } from './lesson51'
import { lesson56 } from './lesson56'
import { lesson61 } from './lesson61'
import { lesson62 } from './lesson62'
import { GENERATED_LESSONS } from './extraLessons'
import { MODULES, MODULE_BY_ID, getModuleById } from './modules'

export { MODULES, MODULE_BY_ID, getModuleById }

const FULL_LESSONS = [
  lesson1,
  lesson2,
  lesson3,
  lesson4,
  lesson5,
  lesson6,
  lesson7,
  lesson8,
  lesson9,
  lesson10,
  lesson11,
  lesson12,
  lesson13,
  lesson14,
  lesson31,
  lesson32,
  lesson36,
  lesson37,
  lesson41,
  lesson46,
  lesson51,
  lesson56,
  lesson61,
  lesson62
]

const lessonById = new Map()
;[...FULL_LESSONS, ...GENERATED_LESSONS].forEach((lesson) => {
  lessonById.set(Number(lesson.id), lesson)
})

const moduleByLessonId = new Map()
MODULES.forEach((module) => {
  module.lessonIds.forEach((lessonId) => {
    moduleByLessonId.set(lessonId, module)
  })
})

export const ALL_LESSONS = Array.from({ length: 100 }, (_, index) => {
  const id = index + 1
  const lesson = lessonById.get(id)
  if (!lesson) return null
  const module = moduleByLessonId.get(id) || getModuleById(lesson.moduleId)
  return {
    ...lesson,
    id,
    moduleId: module.id,
    moduleTitle: module.title
  }
}).filter(Boolean)

export const TOTAL_TESTS = ALL_LESSONS.reduce(
  (sum, lesson) => sum + (lesson.tests?.length || 0),
  0
)

export const LESSONS_BY_MODULE = Object.fromEntries(
  MODULES.map((module) => [
    module.id,
    ALL_LESSONS.filter((lesson) => lesson.moduleId === module.id)
  ])
)

export const getLessonById = (id) => {
  return lessonById.get(Number(id)) || ALL_LESSONS[0]
}

export const getLessonsByModule = (moduleId) => {
  return ALL_LESSONS.filter((lesson) => lesson.moduleId === Number(moduleId))
}
