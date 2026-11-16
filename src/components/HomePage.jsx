import React, { useState } from 'react'
import { MODULES, ALL_LESSONS, TOTAL_TESTS } from '../data/lessons'
import { IconPlay, IconCheckCircle, IconBook, IconBrain, IconAward, IconSparkles, IconChevronRight } from './icons'

export const HomePage = ({ setActivePage, onOpenLesson, testProgress, userStats }) => {
  const [showAllModules, setShowAllModules] = useState(false)

  // Find current active lesson (first uncompleted or lesson 1)
  const currentLesson = ALL_LESSONS.find((lesson) => {
    const total = lesson.tests.length
    const passed = testProgress[lesson.id]?.correctCount || 0
    return passed < Math.ceil(total * 0.8)
  }) || ALL_LESSONS[0]

  const currentLessonTotal = currentLesson.tests.length
  const currentLessonDone = testProgress[currentLesson.id]?.correctCount || 0

  const visibleModules = showAllModules ? MODULES : MODULES.slice(0, 6)

  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <section className="edu-hero-card">
        <div className="edu-hero-content">
          <div className="edu-hero-badge">
            <IconSparkles />
            <span>Обучение математике с нуля до результата</span>
          </div>
          <h1 className="edu-hero-title">
            Понятная математика: <br />
            <span className="edu-gradient-text">{ALL_LESSONS.length} уроков и {TOTAL_TESTS.toLocaleString('ru-RU')} тестов</span>
          </h1>
          <p className="edu-hero-desc">
            Никакой зубрёжки без понимания! Мы начинаем с простейших чисел и дробей и пошагово доходим
            до алгебры, геометрии, тригонометрии, анализа и олимпиадных задач. Каждая тема закрепляется
            интерактивными тестами с подробным разбором решений.
          </p>

          <div className="edu-hero-actions">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => onOpenLesson(currentLesson.id)}
            >
              <IconPlay />
              <span>{userStats.xp > 0 ? 'Продолжить обучение' : 'Начать обучение с нуля'}</span>
            </button>
            <button
              className="btn btn-outline btn-lg"
              onClick={() => setActivePage('catalog')}
            >
              <IconBook />
              <span>Каталог всех уроков</span>
            </button>
          </div>

          <div className="edu-hero-stats-strip">
            <div className="hero-stat-item">
              <strong>{ALL_LESSONS.length}</strong>
              <span>полных уроков</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <strong>{TOTAL_TESTS.toLocaleString('ru-RU')}</strong>
              <span>интерактивных тестов</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <strong>{MODULES.length}</strong>
              <span>тематических модулей</span>
            </div>
            <div className="hero-stat-sep" />
            <div className="hero-stat-item">
              <strong>YouTube</strong>
              <span>видео к урокам</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Card / Continue widget */}
        <div className="edu-hero-widget">
          <div className="continue-lesson-card">
            <div className="widget-tag">Текущий урок</div>
            <h3 className="widget-title">{currentLesson.title}</h3>
            <p className="widget-subtitle">{currentLesson.subtitle}</p>

            <div className="widget-progress-row">
              <div className="widget-progress-info">
                <span>Прогресс тестов:</span>
                <strong>{currentLessonDone} из {currentLessonTotal} решено</strong>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${Math.min(100, Math.round((currentLessonDone / currentLessonTotal) * 100))}%`
                  }}
                />
              </div>
            </div>

            <button
              className="btn btn-primary btn-block"
              onClick={() => onOpenLesson(currentLesson.id)}
            >
              <span>Перейти к уроку</span>
              <IconChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* Course Roadmap */}
      <section className="edu-roadmap-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-main-title">Программа обучения по модулям</h2>
            <p className="section-main-subtitle">
              Логичный путь от базовой арифметики к уверенному решению экзаменационных и олимпиадных задач
            </p>
          </div>
          <button className="btn btn-outline" onClick={() => setActivePage('catalog')}>
            Смотреть все уроки →
          </button>
        </div>

        <div className="modules-grid">
          {visibleModules.map((module) => {
            const moduleLessons = ALL_LESSONS.filter((lesson) => module.lessonIds.includes(lesson.id))
            const moduleTestsTotal = moduleLessons.reduce((sum, lesson) => sum + lesson.tests.length, 0)
            const moduleTestsDone = moduleLessons.reduce(
              (sum, lesson) => sum + (testProgress[lesson.id]?.correctCount || 0),
              0
            )
            const shownLessons = moduleLessons.slice(0, 4)
            const hiddenCount = moduleLessons.length - shownLessons.length

            return (
              <div key={module.id} className="module-card">
                <div className="module-card-header">
                  <span className="module-badge" style={{ backgroundColor: module.color }}>
                    {module.badge}
                  </span>
                  <span className="module-tests-count">
                    {moduleLessons.length} уроков • {moduleTestsTotal} тестов
                  </span>
                </div>

                <h3 className="module-title">
                  {module.icon} {module.title}
                </h3>
                <p className="module-desc">{module.description}</p>

                {/* Lessons in module */}
                <div className="module-lessons-list">
                  {shownLessons.map((lesson) => {
                    const doneCount = testProgress[lesson.id]?.correctCount || 0
                    const totalQuestions = lesson.tests.length
                    const isCompleted = doneCount >= Math.ceil(totalQuestions * 0.8)

                    return (
                      <div
                        key={lesson.id}
                        className="module-lesson-row"
                        onClick={() => onOpenLesson(lesson.id)}
                      >
                        <div className="lesson-left">
                          <span className={`lesson-status-icon ${isCompleted ? 'completed' : ''}`}>
                            {isCompleted ? <IconCheckCircle /> : <IconPlay />}
                          </span>
                          <span className="lesson-row-name">{lesson.title}</span>
                        </div>
                        <div className="lesson-right">
                          <span className="lesson-tests-stat">{doneCount}/{totalQuestions}</span>
                          <IconChevronRight className="arrow-icon" />
                        </div>
                      </div>
                    )
                  })}
                </div>

                {hiddenCount > 0 && (
                  <button
                    className="module-more-btn"
                    onClick={() => setActivePage('catalog')}
                  >
                    Ещё {hiddenCount} уроков в каталоге →
                  </button>
                )}

                <div className="module-progress-line">
                  <span>Прогресс модуля</span>
                  <strong>
                    {moduleTestsDone} / {moduleTestsTotal}
                  </strong>
                </div>
              </div>
            )
          })}
        </div>

        <div className="roadmap-footer-actions">
          {MODULES.length > 6 && (
            <button
              className="btn btn-outline"
              onClick={() => setShowAllModules((value) => !value)}
            >
              {showAllModules ? 'Свернуть модули' : `Показать все ${MODULES.length} модулей`}
            </button>
          )}
          <button className="btn btn-primary" onClick={() => setActivePage('catalog')}>
            Перейти в каталог всех {ALL_LESSONS.length} уроков
          </button>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="features-section">
        <h2 className="section-main-title center">Почему наш курс работает</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon-circle primary">
              <IconPlay />
            </div>
            <h4>Видео с YouTube</h4>
            <p>В каждый урок встроена понятная видео-лекция с таймкодами и объяснением наглядных примеров.</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon-circle success">
              <IconCheckCircle />
            </div>
            <h4>{TOTAL_TESTS.toLocaleString('ru-RU')} тестов</h4>
            <p>Практика на каждом шаге: тесты с мгновенной проверкой, подсказками и пошаговыми объяснениями.</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon-circle accent">
              <IconBrain />
            </div>
            <h4>Подробные решения</h4>
            <p>При любой ошибке система показывает пошаговый математический разбор правильного ответа.</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon-circle warning">
              <IconAward />
            </div>
            <h4>Прогресс и сертификат</h4>
            <p>Личный кабинет, уровни, достижения, справочник формул и сертификат по завершении курса.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
