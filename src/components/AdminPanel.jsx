/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { ALL_LESSONS, MODULES, TOTAL_TESTS } from '../data/lessons'

const getAdminPassword = () => localStorage.getItem('admin_password') || 'admin123'

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    background: '#0f172a',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  topbar: {
    background: '#1e293b',
    borderBottom: '1px solid #334155',
    padding: '0 24px',
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
  },
  topbarTitle: {
    color: '#f1f5f9',
    fontWeight: 700,
    fontSize: 18,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  badge: {
    background: '#3b82f6',
    color: '#fff',
    fontSize: 10,
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: 99,
    letterSpacing: 1,
  },
  closeBtn: {
    background: '#334155',
    border: 'none',
    color: '#94a3b8',
    width: 32,
    height: 32,
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.15s',
  },
  body: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  sidebar: {
    width: 220,
    background: '#1e293b',
    borderRight: '1px solid #334155',
    padding: '16px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    flexShrink: 0,
    overflowY: 'auto',
  },
  sidebarItem: (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 20px',
    color: active ? '#f1f5f9' : '#94a3b8',
    background: active ? '#3b82f620' : 'transparent',
    borderLeft: active ? '3px solid #3b82f6' : '3px solid transparent',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: active ? 600 : 400,
    transition: 'all 0.15s',
    border: 'none',
    width: '100%',
    textAlign: 'left',
  }),
  main: {
    flex: 1,
    overflowY: 'auto',
    padding: 24,
  },
  card: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    color: '#f1f5f9',
    fontWeight: 700,
    fontSize: 16,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: '1px solid #334155',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  statGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: 16,
    marginBottom: 24,
  },
  statCard: (color) => ({
    background: '#1e293b',
    border: `1px solid ${color}40`,
    borderRadius: 12,
    padding: 20,
    textAlign: 'center',
  }),
  statValue: (color) => ({
    color,
    fontSize: 36,
    fontWeight: 800,
    lineHeight: 1,
    marginBottom: 6,
  }),
  statLabel: {
    color: '#64748b',
    fontSize: 13,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 13,
  },
  th: {
    background: '#0f172a',
    color: '#64748b',
    padding: '10px 12px',
    textAlign: 'left',
    fontWeight: 600,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderBottom: '1px solid #334155',
  },
  td: {
    padding: '10px 12px',
    color: '#cbd5e1',
    borderBottom: '1px solid #1e293b',
    verticalAlign: 'middle',
  },
  trHover: {
    background: '#1e293b08',
  },
  diffBadge: (diff) => {
    const map = {
      'Начальный': { bg: '#10b98120', color: '#10b981' },
      'Базовый': { bg: '#3b82f620', color: '#3b82f6' },
      'Средний': { bg: '#f59e0b20', color: '#f59e0b' },
      'Продвинутый': { bg: '#ef444420', color: '#ef4444' },
    }
    const s = map[diff] || { bg: '#64748b20', color: '#64748b' }
    return {
      background: s.bg,
      color: s.color,
      padding: '2px 8px',
      borderRadius: 99,
      fontSize: 11,
      fontWeight: 600,
      display: 'inline-block',
    }
  },
  input: {
    background: '#0f172a',
    border: '1px solid #334155',
    borderRadius: 8,
    color: '#f1f5f9',
    padding: '10px 14px',
    fontSize: 14,
    width: '100%',
    outline: 'none',
    boxSizing: 'border-box',
  },
  btn: (variant = 'primary') => {
    const map = {
      primary: { bg: '#3b82f6', hover: '#2563eb', color: '#fff' },
      danger: { bg: '#ef4444', hover: '#dc2626', color: '#fff' },
      success: { bg: '#10b981', hover: '#059669', color: '#fff' },
      ghost: { bg: '#334155', hover: '#475569', color: '#94a3b8' },
    }
    const s = map[variant] || map.primary
    return {
      background: s.bg,
      color: s.color,
      border: 'none',
      borderRadius: 8,
      padding: '10px 20px',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'background 0.15s',
    }
  },
  loginWrap: {
    position: 'fixed',
    inset: 0,
    zIndex: 10000,
    background: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBox: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: 16,
    padding: 40,
    width: '100%',
    maxWidth: 380,
    textAlign: 'center',
  },
  sectionTitle: {
    color: '#f1f5f9',
    fontSize: 20,
    fontWeight: 800,
    marginBottom: 24,
  },
  label: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 6,
    textAlign: 'left',
    display: 'block',
  },
  progressBar: (pct, color = '#3b82f6') => ({
    height: 6,
    background: '#334155',
    borderRadius: 99,
    overflow: 'hidden',
    position: 'relative',
  }),
  progressFill: (pct, color = '#3b82f6') => ({
    height: '100%',
    width: `${Math.min(100, pct)}%`,
    background: color,
    borderRadius: 99,
    transition: 'width 0.3s',
  }),
}

// ── Login Screen ───────────────────────────────────────────────
const LoginScreen = ({ onLogin, onClose }) => {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pw === getAdminPassword()) {
      localStorage.setItem('admin_logged_in', '1')
      onLogin()
    } else {
      setError('Неверный пароль')
      setPw('')
    }
  }

  return (
    <div style={styles.loginWrap}>
      <div style={styles.loginBox}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🔐</div>
        <div style={styles.sectionTitle}>Панель администратора</div>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>
          АльфаМатематика · Только для администраторов
        </p>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Пароль</label>
          <input
            type="password"
            style={{ ...styles.input, marginBottom: 16 }}
            value={pw}
            onChange={e => { setPw(e.target.value); setError('') }}
            placeholder="Введите пароль администратора"
            autoFocus
          />
          {error && (
            <div style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{error}</div>
          )}
          <button type="submit" style={{ ...styles.btn('primary'), width: '100%', marginBottom: 12 }}>
            Войти
          </button>
          <button type="button" onClick={onClose} style={{ ...styles.btn('ghost'), width: '100%' }}>
            Отмена
          </button>
        </form>
        <div style={{ color: '#475569', fontSize: 12, marginTop: 18, lineHeight: 1.5 }}>
          Демо-доступ: пароль <strong style={{ color: '#94a3b8' }}>admin123</strong><br />
          Пароль можно изменить в настройках панели.
        </div>
      </div>
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────────
const Dashboard = ({ testProgress }) => {
  const totalLessons = ALL_LESSONS.length
  const lessonsWithProgress = Object.keys(testProgress).length
  const totalCorrect = Object.values(testProgress).reduce((s, l) => s + (l.correctCount || 0), 0)
  const totalXP = totalCorrect * 10
  const completedLessons = ALL_LESSONS.filter(
    (lesson) => (testProgress[lesson.id]?.correctCount || 0) >= Math.ceil(lesson.tests.length * 0.8)
  ).length

  const moduleStats = MODULES.map(m => {
    const mLessons = ALL_LESSONS.filter(l => l.moduleId === m.id)
    const done = mLessons.filter(l => testProgress[l.id]?.totalAnswered > 0).length
    return { ...m, total: mLessons.length, done }
  })

  return (
    <div>
      <div style={styles.statGrid}>
        <div style={styles.statCard('#3b82f6')}>
          <div style={styles.statValue('#3b82f6')}>{totalLessons}</div>
          <div style={styles.statLabel}>Всего уроков</div>
        </div>
        <div style={styles.statCard('#10b981')}>
          <div style={styles.statValue('#10b981')}>{TOTAL_TESTS.toLocaleString('ru-RU')}</div>
          <div style={styles.statLabel}>Тестов в курсе</div>
        </div>
        <div style={styles.statCard('#a855f7')}>
          <div style={styles.statValue('#a855f7')}>{MODULES.length}</div>
          <div style={styles.statLabel}>Модулей</div>
        </div>
        <div style={styles.statCard('#f59e0b')}>
          <div style={styles.statValue('#f59e0b')}>{totalXP.toLocaleString('ru-RU')}</div>
          <div style={styles.statLabel}>XP начислено</div>
        </div>
        <div style={styles.statCard('#14b8a6')}>
          <div style={styles.statValue('#14b8a6')}>{completedLessons}</div>
          <div style={styles.statLabel}>Уроков завершено</div>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>📊 Прогресс по модулям</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {moduleStats.map(m => (
            <div key={m.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: '#cbd5e1', fontSize: 13 }}>{m.title}</span>
                <span style={{ color: '#64748b', fontSize: 12 }}>{m.done}/{m.total}</span>
              </div>
              <div style={styles.progressBar(m.done / m.total * 100)}>
                <div style={styles.progressFill(m.done / m.total * 100, m.color || '#3b82f6')} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>🕐 Последняя активность</div>
        <div style={{ color: '#64748b', fontSize: 13 }}>
          {lessonsWithProgress === 0 ? (
            <span>Нет активности — прогресс пока не записан.</span>
          ) : (
            Object.entries(testProgress).slice(-5).reverse().map(([lessonId, data]) => {
              const lesson = ALL_LESSONS.find(l => l.id === Number(lessonId))
              return (
                <div key={lessonId} style={{ padding: '8px 0', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8' }}>{lesson?.title || `Урок ${lessonId}`}</span>
                  <span style={{ color: '#3b82f6' }}>{data.correctCount || 0}/{data.totalAnswered || 0} верно</span>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

// ── Lessons Manager ───────────────────────────────────────────
const LessonsManager = ({ testProgress, onOpenLesson }) => {
  const [search, setSearch] = useState('')
  const [filterModule, setFilterModule] = useState('all')

  const filtered = ALL_LESSONS.filter(l => {
    const q = search.toLowerCase()
    const matchSearch =
      l.title.toLowerCase().includes(q) ||
      l.subtitle.toLowerCase().includes(q) ||
      l.summary.toLowerCase().includes(q)
    const matchModule = filterModule === 'all' || l.moduleId === Number(filterModule)
    return matchSearch && matchModule
  })

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <input
          style={{ ...styles.input, maxWidth: 300 }}
          placeholder="Поиск по названию..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          style={{ ...styles.input, maxWidth: 220 }}
          value={filterModule}
          onChange={e => setFilterModule(e.target.value)}
        >
          <option value="all">Все модули</option>
          {MODULES.map(m => (
            <option key={m.id} value={m.id}>{m.icon} Модуль {m.id}: {m.badge}</option>
          ))}
        </select>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>
          📚 Уроки ({filtered.length})
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Название</th>
                <th style={styles.th}>Модуль</th>
                <th style={styles.th}>Сложность</th>
                <th style={styles.th}>Тестов</th>
                <th style={styles.th}>Прогресс</th>
                <th style={styles.th}>Действие</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lesson, i) => {
                const prog = testProgress[lesson.id]
                const totalQuestions = lesson.tests?.length || 0
                const pct = prog ? Math.round(prog.correctCount / totalQuestions * 100) : 0
                return (
                  <tr key={lesson.id} style={{ background: i % 2 === 0 ? '#1e293b08' : 'transparent' }}>
                    <td style={{ ...styles.td, color: '#64748b', width: 48 }}>{lesson.id}</td>
                    <td style={styles.td}>
                      <span style={{ color: '#f1f5f9', fontWeight: 500 }}>{lesson.title}</span>
                      <div style={{ color: '#64748b', fontSize: 11, marginTop: 3 }}>{lesson.subtitle}</div>
                    </td>
                    <td style={styles.td}>
                      <span style={{ color: '#94a3b8', fontSize: 12 }}>{lesson.moduleTitle}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.diffBadge(lesson.difficulty)}>{lesson.difficulty || 'Базовый'}</span>
                    </td>
                    <td style={{ ...styles.td, color: '#64748b' }}>{totalQuestions}</td>
                    <td style={{ ...styles.td, minWidth: 100 }}>
                      {prog ? (
                        <div>
                          <div style={{ color: '#10b981', fontSize: 12, marginBottom: 4 }}>
                            {prog.correctCount}/{prog.totalAnswered} ({pct}%)
                          </div>
                          <div style={styles.progressBar(pct)}>
                            <div style={styles.progressFill(pct, pct >= 80 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#3b82f6')} />
                          </div>
                        </div>
                      ) : (
                        <span style={{ color: '#334155', fontSize: 12 }}>Не начат</span>
                      )}
                    </td>
                    <td style={styles.td}>
                      <button
                        style={{ ...styles.btn('ghost'), padding: '6px 12px', fontSize: 12 }}
                        onClick={() => onOpenLesson?.(lesson.id)}
                      >
                        Открыть
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── User Progress ─────────────────────────────────────────────
const UserProgress = ({ testProgress, userStats }) => {
  const entries = Object.entries(testProgress)

  const userCard = (
    <div style={{ ...styles.card, display: 'flex', alignItems: 'center', gap: 18 }}>
      <div style={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 28,
        fontWeight: 800,
        flexShrink: 0,
      }}>
        {(userStats?.name || 'У')[0].toUpperCase()}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ color: '#f1f5f9', fontSize: 20, fontWeight: 800 }}>{userStats?.name || 'Ученик'}</div>
        <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>
          Текущий пользователь платформы · {userStats?.xp || 0} XP · серия {userStats?.streak || 1} дн.
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ color: '#f59e0b', fontSize: 26, fontWeight: 800 }}>
          {Math.floor((userStats?.xp || 0) / 300) + 1}
        </div>
        <div style={{ color: '#64748b', fontSize: 12 }}>уровень</div>
      </div>
    </div>
  )

  if (entries.length === 0) {
    return (
      <div>
        {userCard}
        <div style={styles.card}>
          <div style={styles.cardTitle}>👤 Прогресс пользователя</div>
          <div style={{ color: '#64748b', fontSize: 14, textAlign: 'center', padding: 32 }}>
            Нет данных о прогрессе. Пройдите несколько тестов в уроках.
          </div>
        </div>
      </div>
    )
  }

  const totalAnswered = entries.reduce((s, [, d]) => s + (d.totalAnswered || 0), 0)
  const totalCorrect = entries.reduce((s, [, d]) => s + (d.correctCount || 0), 0)
  const accuracy = totalAnswered > 0 ? Math.round(totalCorrect / totalAnswered * 100) : 0

  return (
    <div>
      {userCard}
      <div style={styles.statGrid}>
        <div style={styles.statCard('#3b82f6')}>
          <div style={styles.statValue('#3b82f6')}>{entries.length}</div>
          <div style={styles.statLabel}>Уроков начато</div>
        </div>
        <div style={styles.statCard('#10b981')}>
          <div style={styles.statValue('#10b981')}>{totalCorrect}</div>
          <div style={styles.statLabel}>Правильных ответов</div>
        </div>
        <div style={styles.statCard('#f59e0b')}>
          <div style={styles.statValue('#f59e0b')}>{accuracy}%</div>
          <div style={styles.statLabel}>Точность</div>
        </div>
        <div style={styles.statCard('#a855f7')}>
          <div style={styles.statValue('#a855f7')}>{totalCorrect * 10}</div>
          <div style={styles.statLabel}>XP заработано</div>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>📋 Детали по урокам</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Урок</th>
                <th style={styles.th}>Отвечено</th>
                <th style={styles.th}>Верно</th>
                <th style={styles.th}>XP</th>
                <th style={styles.th}>Результат</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(([lessonId, data], i) => {
                const lesson = ALL_LESSONS.find(l => l.id === Number(lessonId))
                const pct = data.totalAnswered > 0 ? Math.round(data.correctCount / data.totalAnswered * 100) : 0
                return (
                  <tr key={lessonId} style={{ background: i % 2 === 0 ? '#ffffff05' : 'transparent' }}>
                    <td style={styles.td}>
                      <div style={{ color: '#f1f5f9', fontWeight: 500, fontSize: 13 }}>
                        {lesson?.title || `Урок ${lessonId}`}
                      </div>
                    </td>
                    <td style={{ ...styles.td, color: '#94a3b8' }}>{data.totalAnswered}</td>
                    <td style={{ ...styles.td, color: '#10b981' }}>{data.correctCount}</td>
                    <td style={{ ...styles.td, color: '#f59e0b' }}>+{data.correctCount * 10}</td>
                    <td style={styles.td}>
                      <span style={{
                        color: pct >= 80 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444',
                        fontWeight: 700,
                      }}>{pct}%</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── Settings ──────────────────────────────────────────────────
const Settings = ({ onResetProgress, onLogout, onSiteNameChange }) => {
  const [siteName, setSiteName] = useState(() => localStorage.getItem('site_name') || 'АльфаМатематика')
  const [saved, setSaved] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [importMessage, setImportMessage] = useState('')

  const handleSaveSiteName = () => {
    localStorage.setItem('site_name', siteName)
    setSaved(true)
    onSiteNameChange?.(siteName)
    window.dispatchEvent(new Event('site-name-changed'))
    setTimeout(() => setSaved(false), 2000)
  }

  const handleReset = () => {
    if (confirmReset) {
      onResetProgress()
      setConfirmReset(false)
    } else {
      setConfirmReset(true)
      setTimeout(() => setConfirmReset(false), 5000)
    }
  }

  const handleChangePassword = () => {
    if (newPassword.length < 4) {
      setPasswordMessage('Пароль должен содержать минимум 4 символа')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage('Пароли не совпадают')
      return
    }
    localStorage.setItem('admin_password', newPassword)
    setNewPassword('')
    setConfirmPassword('')
    setPasswordMessage('✓ Пароль обновлён')
    setTimeout(() => setPasswordMessage(''), 3000)
  }

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      progress: JSON.parse(localStorage.getItem('math_test_progress') || '{}'),
      userStats: JSON.parse(localStorage.getItem('math_user_stats') || '{}'),
      settings: {
        siteName: localStorage.getItem('site_name') || 'АльфаМатематика'
      }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `alfamatematika-backup-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result))
        if (data.progress) localStorage.setItem('math_test_progress', JSON.stringify(data.progress))
        if (data.userStats) localStorage.setItem('math_user_stats', JSON.stringify(data.userStats))
        if (data.settings?.siteName) {
          localStorage.setItem('site_name', data.settings.siteName)
          setSiteName(data.settings.siteName)
          onSiteNameChange?.(data.settings.siteName)
          window.dispatchEvent(new Event('site-name-changed'))
        }
        setImportMessage('✓ Данные импортированы. Перезагрузите страницу, чтобы увидеть прогресс.')
        setTimeout(() => setImportMessage(''), 5000)
      } catch {
        setImportMessage('Не удалось прочитать файл: неверный формат JSON')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  return (
    <div>
      <div style={styles.card}>
        <div style={styles.cardTitle}>⚙️ Настройки сайта</div>
        <div style={{ marginBottom: 16 }}>
          <label style={styles.label}>Название сайта</label>
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              style={styles.input}
              value={siteName}
              onChange={e => setSiteName(e.target.value)}
              placeholder="Название сайта"
            />
            <button style={styles.btn(saved ? 'success' : 'primary')} onClick={handleSaveSiteName}>
              {saved ? '✓ Сохранено' : 'Сохранить'}
            </button>
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>🔐 Смена пароля администратора</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 460 }}>
          <div>
            <label style={styles.label}>Новый пароль</label>
            <input
              type="password"
              style={styles.input}
              value={newPassword}
              onChange={e => { setNewPassword(e.target.value); setPasswordMessage('') }}
              placeholder="Минимум 4 символа"
            />
          </div>
          <div>
            <label style={styles.label}>Повторите пароль</label>
            <input
              type="password"
              style={styles.input}
              value={confirmPassword}
              onChange={e => { setConfirmPassword(e.target.value); setPasswordMessage('') }}
              placeholder="Повторите новый пароль"
            />
          </div>
          {passwordMessage && (
            <div style={{ color: passwordMessage.startsWith('✓') ? '#10b981' : '#ef4444', fontSize: 13 }}>
              {passwordMessage}
            </div>
          )}
          <button style={{ ...styles.btn('primary'), alignSelf: 'flex-start' }} onClick={handleChangePassword}>
            Обновить пароль
          </button>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>💾 Резервное копирование</div>
        <div style={{ marginBottom: 14, color: '#64748b', fontSize: 14 }}>
          Экспортируйте прогресс и настройки в JSON или восстановите их из ранее сохранённого файла.
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button style={styles.btn('primary')} onClick={handleExport}>
            ⬇️ Экспортировать данные
          </button>
          <label style={{ ...styles.btn('ghost'), display: 'inline-flex', alignItems: 'center' }}>
            ⬆️ Импортировать данные
            <input type="file" accept="application/json,.json" onChange={handleImport} style={{ display: 'none' }} />
          </label>
        </div>
        {importMessage && (
          <div style={{ color: importMessage.startsWith('✓') ? '#10b981' : '#ef4444', fontSize: 13, marginTop: 12 }}>
            {importMessage}
          </div>
        )}
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>🗑️ Управление данными</div>
        <div style={{ marginBottom: 12, color: '#64748b', fontSize: 14 }}>
          Это действие удалит весь прогресс тестов и XP пользователя. Это нельзя отменить.
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button style={styles.btn('danger')} onClick={handleReset}>
            {confirmReset ? '⚠️ Подтвердить сброс' : '🗑️ Сбросить весь прогресс'}
          </button>
          {confirmReset && (
            <button style={styles.btn('ghost')} onClick={() => setConfirmReset(false)}>
              Отмена
            </button>
          )}
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>🔑 Сессия</div>
        <div style={{ marginBottom: 12, color: '#64748b', fontSize: 14 }}>
          Выйдите из панели администратора. Для повторного входа потребуется пароль.
        </div>
        <button style={styles.btn('ghost')} onClick={onLogout}>
          Выйти из панели
        </button>
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>ℹ️ Информация о системе</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            ['Версия платформы', '3.0.0'],
            ['Всего уроков', ALL_LESSONS.length],
            ['Всего тестов', TOTAL_TESTS],
            ['Всего модулей', MODULES.length],
            ['localStorage доступен', typeof Storage !== 'undefined' ? '✅ Да' : '❌ Нет'],
            ['Браузер', navigator.userAgent.split(') ')[0].split('(')[1] || 'Неизвестно'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #334155' }}>
              <span style={{ color: '#64748b', fontSize: 13 }}>{k}</span>
              <span style={{ color: '#94a3b8', fontSize: 13, fontFamily: 'monospace' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main AdminPanel ───────────────────────────────────────────
export const AdminPanel = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    localStorage.getItem('admin_logged_in') === '1'
  )
  const [password, setPassword] = useState('')
  const [activeSection, setActiveSection] = useState('dashboard')
  const [testProgress, setTestProgress] = useState({})
  const [userStats, setUserStats] = useState({})

  useEffect(() => {
    try {
      const prog = localStorage.getItem('math_test_progress')
      if (prog) setTestProgress(JSON.parse(prog))
      const stats = localStorage.getItem('math_user_stats')
      if (stats) setUserStats(JSON.parse(stats))
    } catch { /* ignore */ }
  }, [])

  const handleLogin = () => setIsAuthenticated(true)

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in')
    setIsAuthenticated(false)
  }

  const handleResetProgress = () => {
    localStorage.removeItem('math_test_progress')
    localStorage.removeItem('math_user_stats')
    setTestProgress({})
    setUserStats({})
  }

  const navItems = [
    { id: 'dashboard', label: 'Дашборд', icon: '📊' },
    { id: 'lessons', label: 'Уроки', icon: '📚' },
    { id: 'progress', label: 'Прогресс', icon: '👤' },
    { id: 'settings', label: 'Настройки', icon: '⚙️' },
  ]

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} onClose={onClose} />
  }

  return (
    <div style={styles.overlay}>
      {/* Topbar */}
      <div style={styles.topbar}>
        <div style={styles.topbarTitle}>
          <span>🛡️</span>
          <span>Панель администратора</span>
          <span style={styles.badge}>ADMIN</span>
        </div>
        <button style={styles.closeBtn} onClick={onClose} title="Закрыть">✕</button>
      </div>

      <div style={styles.body}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={{ padding: '0 20px 12px', color: '#475569', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
            Навигация
          </div>
          {navItems.map(item => (
            <button
              key={item.id}
              style={styles.sidebarItem(activeSection === item.id)}
              onClick={() => setActiveSection(item.id)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}

          <div style={{ marginTop: 'auto', padding: '16px 20px', borderTop: '1px solid #334155' }}>
            <div style={{ color: '#475569', fontSize: 11, marginBottom: 8 }}>АльфаМатематика v2.0</div>
            <div style={{ color: '#334155', fontSize: 11 }}>Уроков: {ALL_LESSONS.length} · Модулей: {MODULES.length}</div>
          </div>
        </aside>

        {/* Main content */}
        <main style={styles.main}>
          <div style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 800, marginBottom: 20 }}>
            {navItems.find(n => n.id === activeSection)?.icon}{' '}
            {navItems.find(n => n.id === activeSection)?.label}
          </div>

          {activeSection === 'dashboard' && <Dashboard testProgress={testProgress} />}
          {activeSection === 'lessons' && <LessonsManager testProgress={testProgress} />}
          {activeSection === 'progress' && <UserProgress testProgress={testProgress} />}
          {activeSection === 'settings' && (
            <Settings onResetProgress={handleResetProgress} onLogout={handleLogout} />
          )}
        </main>
      </div>
    </div>
  )
}
