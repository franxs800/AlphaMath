import React, { useState } from 'react'
import { ALL_LESSONS, MODULES, TOTAL_TESTS } from '../data/lessons'
import { IconSearch, IconVideo, IconBrain, IconPlay } from './icons'

export const LessonsCatalog = ({ onOpenLesson, testProgress }) => {
  const [selectedModule, setSelectedModule] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLessons = ALL_LESSONS.filter((lesson) => {
    if (selectedModule !== 'all' && lesson.moduleId !== Number(selectedModule)) {
      return false
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      const matchTitle = lesson.title.toLowerCase().includes(q)
      const matchSubtitle = lesson.subtitle.toLowerCase().includes(q)
      const matchSummary = lesson.summary.toLowerCase().includes(q)
      if (!matchTitle && !matchSubtitle && !matchSummary) {
        return false
      }
    }

    return true
  })

  return (
    <div className="catalog-page-container">
      <div className="catalog-header">
        <h1 className="catalog-title">Каталог всех уроков курса</h1>
        <p className="catalog-subtitle">
          {ALL_LESSONS.length} уроков от азов счёта до высшей математики. В каждом уроке — видео-лекция,
          теория, формулы и интерактивные тесты. Всего {TOTAL_TESTS.toLocaleString('ru-RU')} тестов.
        </p>
      </div>

      {/* Filters and Search Bar */}
      <div className="catalog-toolbar">
        {/* Module Filter Pills */}
        <div className="module-filter-pills">
          <button
            className={`filter-pill ${selectedModule === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedModule('all')}
          >
            Все темы ({ALL_LESSONS.length})
          </button>
          {MODULES.map((mod) => (
            <button
              key={mod.id}
              className={`filter-pill ${selectedModule === String(mod.id) ? 'active' : ''}`}
              onClick={() => setSelectedModule(String(mod.id))}
              title={mod.title}
            >
              {mod.icon} {mod.badge} ({mod.lessonIds.length})
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="catalog-search-box">
          <IconSearch className="search-icon" />
          <input
            type="text"
            placeholder="Поиск по урокам (дроби, степени, уравнения, пифагор...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Lessons List Grid */}
      <div className="lessons-catalog-grid">
        {filteredLessons.map((lesson) => {
          const stats = testProgress[lesson.id] || { correctCount: 0, totalAnswered: 0 }
          const correctCount = stats.correctCount || 0
          const totalQuestions = lesson.tests.length
          const percent = Math.round((correctCount / totalQuestions) * 100)
          const isDone = correctCount >= Math.ceil(totalQuestions * 0.8)

          return (
            <div key={lesson.id} className="lesson-catalog-card">
              <div className="lesson-card-top">
                <span className="lesson-module-tag">{lesson.moduleTitle.split(':')[0]}</span>
                <span className="lesson-diff-tag">{lesson.difficulty}</span>
              </div>

              <h3 className="lesson-card-title">{lesson.title}</h3>
              <p className="lesson-card-subtitle">{lesson.subtitle}</p>

              <div className="lesson-card-perks">
                <span className="perk-badge video">
                  <IconVideo />
                  <span>Видео из YouTube</span>
                </span>
                <span className="perk-badge tests">
                  <IconBrain />
                  <span>{totalQuestions} тестов</span>
                </span>
              </div>

              {/* Progress bar */}
              <div className="lesson-card-progress">
                <div className="progress-labels">
                  <span>Решено тестов:</span>
                  <strong>{correctCount} из {totalQuestions} ({percent}%)</strong>
                </div>
                <div className="progress-track-small">
                  <div
                    className={`progress-fill-small ${isDone ? 'done' : ''}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              <div className="lesson-card-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => onOpenLesson(lesson.id, 'theory')}
                >
                  <IconPlay />
                  <span>Смотреть урок</span>
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => onOpenLesson(lesson.id, 'tests')}
                >
                  <span>{totalQuestions} тестов</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {filteredLessons.length === 0 && (
        <div className="catalog-empty-state">
          <h3>Ничего не найдено</h3>
          <p>Попробуйте изменить запрос или выбрать другой модуль.</p>
        </div>
      )}
    </div>
  )
}
