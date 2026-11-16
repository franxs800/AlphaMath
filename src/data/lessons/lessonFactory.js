import { MODULE_BY_ID } from './modules'

/* ------------------------------------------------------------------ */
/*  Детерминированный генератор — тесты не меняются между перезагрузками */
/* ------------------------------------------------------------------ */
const mulberry32 = (a) => {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const int = (rng, min, max) => Math.floor(rng() * (max - min + 1)) + min
const pick = (rng, list) => list[Math.floor(rng() * list.length)]
const num = (value) => {
  const n = Number(value)
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100)
}

const mcq = (rng, question, correct, wrongs, explanation) => {
  const correctStr = String(correct)
  const options = []
  for (const value of [correct, ...wrongs]) {
    const s = String(value)
    if (!options.includes(s)) options.push(s)
  }
  const numeric = Number(String(correct).replace(/[^\d.-]/g, ''))
  let k = 1
  while (options.length < 4) {
    const fallback = Number.isFinite(numeric)
      ? num(numeric + k)
      : `Другой вариант ${k}`
    if (!options.includes(fallback)) options.push(fallback)
    k += 1
  }
  const shuffled = options.slice(0, 4)
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return {
    question,
    options: shuffled,
    correct: shuffled.indexOf(correctStr),
    explanation
  }
}

/* ------------------------------------------------------------------ */
/*  Банки вопросов                                                    */
/* ------------------------------------------------------------------ */
const arithmeticBank = (rng) => {
  const out = []
  for (let i = 0; i < 15; i += 1) {
    const variant = i % 5
    if (variant === 0) {
      const a = int(rng, 12, 98)
      const b = int(rng, 11, 89)
      out.push(mcq(rng, `Вычислите: ${a} + ${b}`, a + b, [a + b + 10, a + b - 1, a - b < 0 ? a + b + 2 : a - b], `${a} + ${b} = ${a + b}.`))
    } else if (variant === 1) {
      const a = int(rng, 120, 300)
      const b = int(rng, 20, 99)
      out.push(mcq(rng, `Вычислите: ${a} − ${b}`, a - b, [a - b + 10, b - a < 0 ? a - b - 1 : b - a, a + b], `${a} − ${b} = ${a - b}.`))
    } else if (variant === 2) {
      const a = int(rng, 4, 15)
      const b = int(rng, 3, 12)
      out.push(mcq(rng, `Вычислите: ${a} × ${b}`, a * b, [a * b + a, a * b - b, a + b], `${a} × ${b} = ${a * b}.`))
    } else if (variant === 3) {
      const b = int(rng, 2, 12)
      const q = int(rng, 2, 12)
      out.push(mcq(rng, `Вычислите: ${b * q} ÷ ${b}`, q, [q + 1, q - 1 < 1 ? q + 2 : q - 1, b * q - b], `${b} × ${q} = ${b * q}, поэтому ${b * q} ÷ ${b} = ${q}.`))
    } else {
      const a = int(rng, 2, 9)
      const b = int(rng, 2, 9)
      const c = int(rng, 2, 9)
      out.push(mcq(rng, `Вычислите: ${a} + ${b} × ${c}`, a + b * c, [(a + b) * c, a * b + c, a + b + c], `Сначала умножение: ${b} × ${c} = ${b * c}. Затем сложение: ${a} + ${b * c} = ${a + b * c}.`))
    }
  }
  return out
}

const percentBank = (rng) => {
  const out = []
  for (let i = 0; i < 15; i += 1) {
    const variant = i % 5
    if (variant === 0) {
      const p = pick(rng, [10, 15, 20, 25, 40, 50])
      const n = int(rng, 4, 80) * 20
      out.push(mcq(rng, `Найдите ${p}% от ${n}`, num((n * p) / 100), [num((n * p) / 100 + 5), num((n * p) / 100 - 5), num(n / p)], `${p}% = ${p / 100}. ${n} × ${p / 100} = ${num((n * p) / 100)}.`))
    } else if (variant === 1) {
      const price = int(rng, 4, 40) * 100
      const p = pick(rng, [10, 20, 25, 30])
      out.push(mcq(rng, `Товар стоил ${price} ₽. Скидка ${p}%. Сколько теперь стоит товар?`, num(price * (1 - p / 100)), [num(price * p / 100), num(price * (1 + p / 100)), num(price - p)], `Скидка ${price} × ${p / 100} = ${num(price * p / 100)} ₽. Новая цена: ${price} − ${num(price * p / 100)} = ${num(price * (1 - p / 100))} ₽.`))
    } else if (variant === 2) {
      const value = int(rng, 20, 90) * 10
      const p = pick(rng, [10, 20, 25, 50])
      out.push(mcq(rng, `Число ${value} увеличили на ${p}%. Какое число получилось?`, num(value * (1 + p / 100)), [num(value * (1 - p / 100)), num(value + p), num(value * p / 100)], `Прибавка: ${value} × ${p / 100} = ${num(value * p / 100)}. Итог: ${value} + ${num(value * p / 100)} = ${num(value * (1 + p / 100))}.`))
    } else if (variant === 3) {
      const a = int(rng, 2, 8)
      const unit = int(rng, 40, 120)
      const b = a + int(rng, 1, 5)
      out.push(mcq(rng, `Если ${a} кг стоят ${a * unit} ₽, сколько стоят ${b} кг?`, b * unit, [(a + b) * unit, b * unit + 10, b * unit - unit], `Цена за 1 кг: ${a * unit} ÷ ${a} = ${unit} ₽. Тогда ${b} кг стоят ${b} × ${unit} = ${b * unit} ₽.`))
    } else {
      const speed = int(rng, 30, 90)
      const time = pick(rng, [2, 3, 4, 5])
      out.push(mcq(rng, `Автомобиль едет со скоростью ${speed} км/ч. Какое расстояние он проедет за ${time} ч?`, speed * time, [speed + time, speed * time + speed, Math.round(speed / time)], `Расстояние = скорость × время = ${speed} × ${time} = ${speed * time} км.`))
    }
  }
  return out
}

const algebraBank = (rng) => {
  const out = []
  for (let i = 0; i < 15; i += 1) {
    const variant = i % 8
    if (variant === 0) {
      const a = int(rng, 2, 9)
      const x = int(rng, 2, 12)
      const b = int(rng, 1, 20)
      out.push(mcq(rng, `Решите уравнение: ${a}x + ${b} = ${a * x + b}`, `x = ${x}`, [`x = ${x + 1}`, `x = ${x - 1 < 0 ? x + 2 : x - 1}`, `x = ${a + b}`], `Перенесём ${b}: ${a}x = ${a * x}. Разделим на ${a}: x = ${x}.`))
    } else if (variant === 1) {
      const p = int(rng, -6, 6)
      const q = int(rng, 1, 8)
      const b = -(p + q)
      const c = p * q
      const bigger = Math.max(p, q)
      out.push(mcq(rng, `Найдите больший корень уравнения x² ${b < 0 ? '−' : '+'} ${Math.abs(b)}x ${c < 0 ? '−' : '+'} ${Math.abs(c)} = 0`, `x = ${bigger}`, [`x = ${p}`, `x = ${q}`, `x = ${-bigger}`], `По теореме Виета корни равны ${p} и ${q}. Больший из них — ${bigger}.`))
    } else if (variant === 2) {
      const a = int(rng, 2, 7)
      const b = int(rng, 1, 12)
      const c = int(rng, 1, 9)
      out.push(mcq(rng, `Упростите выражение: ${a}x + ${b} − x + ${c}`, `${a - 1}x + ${b + c}`, [`${a}x + ${b + c}`, `${a - 1}x + ${b - c}`, `${a + 1}x + ${b + c}`], `Приводим подобные: (${a} − 1)x + (${b} + ${c}) = ${a - 1}x + ${b + c}.`))
    } else if (variant === 3) {
      const a = int(rng, 2, 6)
      const b = int(rng, 2, 6)
      const x = int(rng, 2, 6)
      const y = int(rng, 2, 6)
      out.push(mcq(rng, `Найдите значение выражения ${a}x + ${b}y при x = ${x}, y = ${y}`, a * x + b * y, [a * x - b * y, (a + b) * (x + y), a + b + x + y], `Подставляем: ${a} × ${x} + ${b} × ${y} = ${a * x} + ${b * y} = ${a * x + b * y}.`))
    } else if (variant === 4) {
      const base = int(rng, 2, 6)
      const m = int(rng, 2, 5)
      const n = int(rng, 2, 5)
      out.push(mcq(rng, `Упростите: ${base}^${m} · ${base}^${n}`, `${base}^${m + n}`, [`${base}^${m * n}`, `${base}^${Math.abs(m - n)}`, `${base * 2}^${m + n}`], `При умножении степеней с одинаковым основанием показатели складываются: ${base}^(${m} + ${n}) = ${base}^${m + n}.`))
    } else if (variant === 5) {
      const n = int(rng, 3, 15)
      out.push(mcq(rng, `Вычислите: √${n * n}`, n, [n + 1, n * 2, Math.round(n / 2)], `${n}² = ${n * n}, поэтому √${n * n} = ${n}.`))
    } else if (variant === 6) {
      const a = pick(rng, [2, 3, 4, 5])
      const x = int(rng, 2, 9)
      const b = int(rng, 1, 9)
      out.push(mcq(rng, `Решите неравенство: ${a}x − ${b} < ${a * x + 2}`, `x < ${x + 1}`, [`x > ${x + 1}`, `x ≤ ${x + 1}`, `x < ${x}`], `Переносим: ${a}x < ${a * x + b + 2}. Делим на положительное ${a}: x < ${x + 1}.`))
    } else {
      const a = int(rng, 1, 5)
      const b = int(rng, 1, 5)
      const c = int(rng, 1, 5)
      out.push(mcq(rng, `Найдите дискриминант уравнения x² + ${2 * a}x + ${b * c} = 0`, 4 * a * a - 4 * b * c, [4 * a * a + 4 * b * c, 2 * a - 4 * b * c, b * c - 2 * a], `D = b² − 4ac = (${2 * a})² − 4 × 1 × ${b * c} = ${4 * a * a} − ${4 * b * c} = ${4 * a * a - 4 * b * c}.`))
    }
  }
  return out
}

const functionsBank = (rng) => {
  const out = []
  for (let i = 0; i < 15; i += 1) {
    const variant = i % 8
    if (variant === 0) {
      const a = int(rng, 2, 7)
      const b = int(rng, -8, 8)
      const x = int(rng, -3, 5)
      out.push(mcq(rng, `Дана функция f(x) = ${a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)}. Найдите f(${x}).`, a * x + b, [a * x - b, a + x + b, a * x + b + a], `Подставляем x = ${x}: f(${x}) = ${a} × ${x} ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${a * x + b}.`))
    } else if (variant === 1) {
      const a = int(rng, 1, 8)
      out.push(mcq(rng, `Найдите область определения функции f(x) = √(x − ${a})`, `x ≥ ${a}`, [`x > ${a + 1}`, `x ≤ ${a}`, `x ≥ 0`], `Под корнем должно быть неотрицательное число: x − ${a} ≥ 0, значит x ≥ ${a}.`))
    } else if (variant === 2) {
      const a = int(rng, 1, 5)
      const b = int(rng, -6, 6)
      const c = int(rng, 1, 9)
      const x = int(rng, 1, 4)
      out.push(mcq(rng, `f(x) = x² ${b < 0 ? '−' : '+'} ${Math.abs(b)}x + ${c}. Найдите f(${x}).`, x * x + b * x + c, [x * x - b * x + c, x * x + b + x + c, x * x + b * x - c], `f(${x}) = ${x}² ${b < 0 ? '−' : '+'} ${Math.abs(b)} × ${x} + ${c} = ${x * x + b * x + c}.`))
    } else if (variant === 3) {
      const p = int(rng, 1, 6)
      const q = int(rng, 2, 9)
      out.push(mcq(rng, `Функция f(x) = x² − ${p + q}x + ${p * q}. Чему равна сумма её нулей?`, p + q, [p * q, Math.abs(p - q), p + q + 1], `Нули — это корни уравнения x² − ${p + q}x + ${p * q} = 0. По теореме Виета их сумма равна ${p + q}.`))
    } else if (variant === 4) {
      const x1 = int(rng, 1, 5)
      const y1 = int(rng, 1, 7)
      const x2 = x1 + int(rng, 1, 5)
      const y2 = y1 + int(rng, 1, 7)
      out.push(mcq(rng, `Найдите угловой коэффициент прямой, проходящей через точки (${x1}; ${y1}) и (${x2}; ${y2}).`, num((y2 - y1) / (x2 - x1)), [num((x2 - x1) / (y2 - y1)), y2 - y1, x2 - x1], `k = (y₂ − y₁) / (x₂ − x₁) = (${y2} − ${y1}) / (${x2} − ${x1}) = ${num((y2 - y1) / (x2 - x1))}.`))
    } else if (variant === 5) {
      const a = int(rng, 1, 5)
      const b = int(rng, 2, 6)
      out.push(mcq(rng, `Пусть f(x) = x + ${a}, g(x) = ${b}x. Найдите f(g(1)).`, b + a, [b * a, b + 1, a * b + 1], `g(1) = ${b}. Затем f(${b}) = ${b} + ${a} = ${b + a}.`))
    } else if (variant === 6) {
      const c = int(rng, -5, 8)
      out.push(mcq(rng, `Найдите область значений функции y = x² ${c < 0 ? '−' : '+'} ${Math.abs(c)}.`, `y ≥ ${c}`, [`y > ${c + 1}`, `y ≤ ${c}`, `y ≥ 0`], `x² ≥ 0, поэтому x² ${c < 0 ? '−' : '+'} ${Math.abs(c)} ≥ ${c}. Область значений: [${c}; +∞).`))
    } else {
      const a = pick(rng, [2, 3, 4])
      const x = int(rng, 2, 4)
      out.push(mcq(rng, `f(x) = ${a}ˣ. Найдите f(${x}).`, Math.pow(a, x), [a * x, Math.pow(a, x + 1), Math.pow(x, a)], `f(${x}) = ${a}^${x} = ${Math.pow(a, x)}.`))
    }
  }
  return out
}

const derivativeBank = (rng) => {
  const out = []
  for (let i = 0; i < 15; i += 1) {
    const variant = i % 8
    if (variant === 0) {
      const n = int(rng, 2, 8)
      out.push(mcq(rng, `Найдите производную функции f(x) = x^${n}.`, `${n}x^${n - 1}`, [`${n}x^${n}`, `x^${n - 1}`, `${n + 1}x^${n - 1}`], `По правилу степени: (xⁿ)′ = n·xⁿ⁻¹. Поэтому (x^${n})′ = ${n}x^${n - 1}.`))
    } else if (variant === 1) {
      const a = int(rng, 2, 6)
      const b = int(rng, 1, 9)
      const c = int(rng, 1, 9)
      out.push(mcq(rng, `Найдите производную: f(x) = ${a}x² + ${b}x + ${c}.`, `${2 * a}x + ${b}`, [`${a}x + ${b}`, `${2 * a}x + ${b} + ${c}`, `${a}x² + ${b}`], `Производная суммы: (${a}x²)′ = ${2 * a}x, (${b}x)′ = ${b}, (${c})′ = 0. Итог: ${2 * a}x + ${b}.`))
    } else if (variant === 2) {
      out.push(mcq(rng, 'Найдите производную функции f(x) = sin x.', 'cos x', ['−sin x', '−cos x', 'tg x'], 'Производная синуса равна косинусу: (sin x)′ = cos x.'))
    } else if (variant === 3) {
      const a = pick(rng, [2, 3, 5])
      out.push(mcq(rng, `Найдите производную функции f(x) = ${a}ˣ.`, `${a}ˣ · ln ${a}`, [`${a}ˣ`, `${a}ˣ / ln ${a}`, `${a} · x`], `Производная показательной функции: (aˣ)′ = aˣ · ln a. Поэтому (${a}ˣ)′ = ${a}ˣ · ln ${a}.`))
    } else if (variant === 4) {
      const a = int(rng, 1, 4)
      const b = int(rng, 2, 6)
      out.push(mcq(rng, `Найдите производную: f(x) = x^${a} · x^${b}.`, `${a + b}x^${a + b - 1}`, [`${a * b}x^${a * b - 1}`, `${a + b}x^${a + b}`, `x^${a + b - 1}`], `Сначала упростим: x^${a} · x^${b} = x^${a + b}. Производная: ${a + b}x^${a + b - 1}.`))
    } else if (variant === 5) {
      out.push(mcq(rng, 'Найдите производную функции f(x) = 1/x.', '−1/x²', ['1/x²', '−1/x', 'ln x'], 'Функцию 1/x можно записать как x⁻¹. По правилу степени: (x⁻¹)′ = −x⁻² = −1/x².'))
    } else if (variant === 6) {
      const a = int(rng, 2, 5)
      const b = int(rng, 1, 5)
      const n = int(rng, 2, 4)
      out.push(mcq(rng, `Найдите производную сложной функции f(x) = (${a}x + ${b})^${n}.`, `${n * a}(${a}x + ${b})^${n - 1}`, [`${n}(${a}x + ${b})^${n - 1}`, `${a}(${a}x + ${b})^${n}`, `${n * a}(${a}x + ${b})^${n}`], `Внешняя функция: u^${n}, её производная ${n}u^${n - 1}. Внутренняя: ${a}x + ${b}, её производная ${a}. Итог: ${n * a}(${a}x + ${b})^${n - 1}.`))
    } else {
      const a = int(rng, 2, 6)
      const b = int(rng, 1, 9)
      out.push(mcq(rng, `f(x) = ${a}x² + ${b}x. Найдите f′(1).`, 2 * a + b, [a + b, 2 * a, a + 2 * b], `f′(x) = ${2 * a}x + ${b}. При x = 1: f′(1) = ${2 * a} + ${b} = ${2 * a + b}.`))
    }
  }
  return out
}

const integralBank = (rng) => {
  const out = []
  for (let i = 0; i < 15; i += 1) {
    const variant = i % 7
    if (variant === 0) {
      const n = int(rng, 2, 6)
      out.push(mcq(rng, `Найдите неопределённый интеграл: ∫ x^${n} dx`, `x^${n + 1}/${n + 1} + C`, [`${n}x^${n - 1} + C`, `x^${n + 1} + C`, `x^${n}/${n} + C`], `∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C. Поэтому ∫x^${n}dx = x^${n + 1}/${n + 1} + C.`))
    } else if (variant === 1) {
      const a = int(rng, 2, 6)
      const b = int(rng, 1, 8)
      out.push(mcq(rng, `Найдите интеграл: ∫ (${a}x + ${b}) dx`, `${a}x²/2 + ${b}x + C`, [`${a}x² + ${b}x + C`, `${a}x/2 + ${b} + C`, `${a}x²/2 + ${b} + C`], `∫${a}x dx = ${a}x²/2, ∫${b} dx = ${b}x. Итог: ${a}x²/2 + ${b}x + C.`))
    } else if (variant === 2) {
      out.push(mcq(rng, 'Найдите интеграл: ∫ sin x dx', '−cos x + C', ['cos x + C', '−sin x + C', 'sin x + C'], 'Интеграл синуса равен минус косинусу: ∫sin x dx = −cos x + C.'))
    } else if (variant === 3) {
      out.push(mcq(rng, 'Найдите интеграл: ∫ eˣ dx', 'eˣ + C', ['eˣ · ln e + C', 'x·eˣ + C', 'eˣ/x + C'], 'Показательная функция eˣ — первообразная самой себя: ∫eˣ dx = eˣ + C.'))
    } else if (variant === 4) {
      const n = int(rng, 1, 5)
      out.push(mcq(rng, `Вычислите определённый интеграл: ∫₀¹ x^${n} dx`, `1/${n + 1}`, [`1/${n}`, `${n + 1}`, `1/${n + 2}`], `∫₀¹ x^${n} dx = [x^${n + 1}/${n + 1}]₀¹ = 1/${n + 1}.`))
    } else if (variant === 5) {
      out.push(mcq(rng, 'Найдите интеграл: ∫ (1/x) dx', 'ln|x| + C', ['x ln x + C', '1/x² + C', '−ln|x| + C'], 'Первообразная 1/x равна натуральному логарифму модуля x: ∫dx/x = ln|x| + C.'))
    } else {
      const a = int(rng, 2, 5)
      const b = int(rng, 1, 5)
      const c = int(rng, 1, 7)
      out.push(mcq(rng, `Найдите интеграл: ∫ (${a}x² + ${b}x + ${c}) dx`, `${a}x³/3 + ${b}x²/2 + ${c}x + C`, [`${a}x³ + ${b}x² + ${c}x + C`, `${a}x²/2 + ${b}x + C`, `${a}x³/3 + ${b}x² + ${c} + C`], `Интегрируем почленно: ∫${a}x²dx = ${a}x³/3, ∫${b}xdx = ${b}x²/2, ∫${c}dx = ${c}x.`))
    }
  }
  return out
}

const calculusApplicationsBank = (rng) => {
  const out = []
  for (let i = 0; i < 15; i += 1) {
    const variant = i % 6
    if (variant === 0) {
      const a = int(rng, 1, 6)
      out.push(mcq(rng, `Найдите точку минимума функции f(x) = x² − ${2 * a}x.`, `x = ${a}`, [`x = ${2 * a}`, `x = 0`, `x = ${-a}`], `f′(x) = 2x − ${2 * a}. Приравниваем к нулю: 2x = ${2 * a}, x = ${a}.`))
    } else if (variant === 1) {
      const a = int(rng, 1, 6)
      out.push(mcq(rng, `Найдите точку максимума функции f(x) = −x² + ${2 * a}x.`, `x = ${a}`, [`x = ${2 * a}`, `x = 0`, `x = ${-a}`], `f′(x) = −2x + ${2 * a}. Тогда x = ${a}. Знак производной меняется с + на −, это максимум.`))
    } else if (variant === 2) {
      const a = int(rng, 2, 6)
      const b = int(rng, 1, 9)
      out.push(mcq(rng, `Найдите угловой коэффициент касательной к графику f(x) = ${a}x² + ${b}x в точке x = 1.`, 2 * a + b, [a + b, 2 * a, a + 2 * b], `Угловой коэффициент касательной равен f′(1). f′(x) = ${2 * a}x + ${b}, поэтому f′(1) = ${2 * a + b}.`))
    } else if (variant === 3) {
      const a = int(rng, 2, 8)
      out.push(mcq(rng, `Вычислите площадь под графиком y = x на отрезке [0; ${a}].`, num((a * a) / 2), [a * a, num((a * a) / 3), a], `S = ∫₀^${a} x dx = x²/2 |₀^${a} = ${num((a * a) / 2)}.`))
    } else if (variant === 4) {
      const a = int(rng, 2, 5)
      const b = int(rng, 1, 9)
      const t = int(rng, 2, 5)
      out.push(mcq(rng, `Тело движется по закону s(t) = ${a}t² + ${b}t. Найдите скорость в момент t = ${t}.`, 2 * a * t + b, [a * t + b, 2 * a + b, a * t * t + b * t], `Скорость — производная пути: v(t) = s′(t) = ${2 * a}t + ${b}. При t = ${t}: v = ${2 * a * t + b}.`))
    } else {
      const a = int(rng, 2, 6)
      out.push(mcq(rng, `Функция f(x) = x³ − ${3 * a}x² возрастает на промежутке:`, `x < 0 или x > ${2 * a}`, [`0 < x < ${2 * a}`, `x > 0`, `x < ${a}`], `f′(x) = 3x² − ${6 * a}x = 3x(x − ${2 * a}). Производная положительна при x < 0 и x > ${2 * a}.`))
    }
  }
  return out
}

const geometryBank = (rng) => {
  const out = []
  for (let i = 0; i < 15; i += 1) {
    const variant = i % 8
    if (variant === 0) {
      const b = int(rng, 4, 16)
      const h = int(rng, 3, 12)
      out.push(mcq(rng, `Основание треугольника ${b} см, высота ${h} см. Найдите площадь.`, num((b * h) / 2), [b * h, b + h, num((b * h) / 3)], `Площадь треугольника: S = ½ · a · h = ½ · ${b} · ${h} = ${num((b * h) / 2)} см².`))
    } else if (variant === 1) {
      const a = int(rng, 3, 15)
      const b = int(rng, 3, 15)
      out.push(mcq(rng, `Стороны прямоугольника ${a} см и ${b} см. Найдите периметр.`, 2 * (a + b), [a * b, a + b, 2 * a + b], `P = 2(a + b) = 2(${a} + ${b}) = ${2 * (a + b)} см.`))
    } else if (variant === 2) {
      const r = int(rng, 2, 10)
      out.push(mcq(rng, `Радиус окружности ${r} см. Найдите площадь круга (π ≈ 3,14).`, num(3.14 * r * r), [num(2 * 3.14 * r), num(3.14 * r), num(3.14 * r * r * 2)], `S = πr² = 3,14 × ${r}² = ${num(3.14 * r * r)} см².`))
    } else if (variant === 3) {
      const a = int(rng, 3, 9)
      const b = int(rng, 4, 12)
      out.push(mcq(rng, `Катеты прямоугольного треугольника равны ${a} и ${b}. Найдите гипотенузу.`, Math.round(Math.sqrt(a * a + b * b) * 100) / 100, [a + b, Math.abs(b - a), Math.round(Math.sqrt(a * a - b * b) * 100) / 100], `По теореме Пифагора c² = ${a}² + ${b}² = ${a * a + b * b}, c = ${Math.round(Math.sqrt(a * a + b * b) * 100) / 100}.`))
    } else if (variant === 4) {
      const a = int(rng, 30, 80)
      const b = int(rng, 30, 80)
      out.push(mcq(rng, `Два угла треугольника равны ${a}° и ${b}°. Найдите третий угол.`, 180 - a - b, [a + b, 360 - a - b, 90 - a], `Сумма углов треугольника 180°. Третий угол: 180° − ${a}° − ${b}° = ${180 - a - b}°.`))
    } else if (variant === 5) {
      const a = int(rng, 4, 12)
      const b = int(rng, 6, 16)
      const h = int(rng, 3, 10)
      out.push(mcq(rng, `Основания трапеции ${a} и ${b}, высота ${h}. Найдите площадь.`, num(((a + b) * h) / 2), [num((a + b) * h), num((a * b) / 2), num((a + b) / 2)], `S = (a + b)/2 · h = (${a} + ${b})/2 × ${h} = ${num(((a + b) * h) / 2)}.`))
    } else if (variant === 6) {
      const k = int(rng, 2, 4)
      const a = int(rng, 3, 8)
      out.push(mcq(rng, `Треугольники подобны с коэффициентом ${k}. Сторона меньшего равна ${a} см. Чему равна соответствующая сторона большего?`, a * k, [a + k, a / k, a * k + k], `При подобии стороны умножаются на коэффициент: ${a} × ${k} = ${a * k} см.`))
    } else {
      const r = int(rng, 2, 10)
      out.push(mcq(rng, `Радиус окружности ${r} см. Найдите длину окружности (π ≈ 3,14).`, num(2 * 3.14 * r), [num(3.14 * r * r), num(3.14 * r), num(2 * r)], `C = 2πr = 2 × 3,14 × ${r} = ${num(2 * 3.14 * r)} см.`))
    }
  }
  return out
}

const stereometryBank = (rng) => {
  const out = []
  for (let i = 0; i < 15; i += 1) {
    const variant = i % 8
    if (variant === 0) {
      const a = int(rng, 2, 8)
      const b = int(rng, 2, 8)
      const c = int(rng, 2, 8)
      out.push(mcq(rng, `Найдите объём прямоугольного параллелепипеда с измерениями ${a}, ${b}, ${c}.`, a * b * c, [2 * (a * b + b * c + a * c), a + b + c, a * b], `V = abc = ${a} × ${b} × ${c} = ${a * b * c}.`))
    } else if (variant === 1) {
      const a = int(rng, 2, 8)
      out.push(mcq(rng, `Ребро куба равно ${a}. Найдите его объём.`, a ** 3, [6 * a * a, a * a, 3 * a], `V = a³ = ${a}³ = ${a ** 3}.`))
    } else if (variant === 2) {
      const r = int(rng, 2, 6)
      const h = int(rng, 3, 10)
      out.push(mcq(rng, `Радиус основания цилиндра ${r}, высота ${h}. Найдите объём (π ≈ 3,14).`, num(3.14 * r * r * h), [num(2 * 3.14 * r * h), num(3.14 * r * h), num(3.14 * r * r)], `V = πr²h = 3,14 × ${r}² × ${h} = ${num(3.14 * r * r * h)}.`))
    } else if (variant === 3) {
      const r = int(rng, 2, 6)
      const h = int(rng, 3, 9)
      out.push(mcq(rng, `Радиус основания конуса ${r}, высота ${h}. Найдите объём (π ≈ 3,14).`, num((3.14 * r * r * h) / 3), [num(3.14 * r * r * h), num(3.14 * r * h / 3), num(3.14 * r * r)], `V = ⅓πr²h = ⅓ × 3,14 × ${r}² × ${h} = ${num((3.14 * r * r * h) / 3)}.`))
    } else if (variant === 4) {
      const r = int(rng, 2, 6)
      out.push(mcq(rng, `Радиус шара ${r}. Найдите объём (π ≈ 3,14).`, num((4 / 3) * 3.14 * r ** 3), [num(4 * 3.14 * r * r), num(3.14 * r ** 3), num((4 / 3) * 3.14 * r * r)], `V = 4/3 πr³ = 4/3 × 3,14 × ${r}³ = ${num((4 / 3) * 3.14 * r ** 3)}.`))
    } else if (variant === 5) {
      const a = int(rng, 2, 8)
      out.push(mcq(rng, `Ребро куба равно ${a}. Найдите площадь полной поверхности.`, 6 * a * a, [a ** 3, 4 * a * a, 12 * a], `S = 6a² = 6 × ${a}² = ${6 * a * a}.`))
    } else if (variant === 6) {
      const a = int(rng, 2, 6)
      const b = int(rng, 2, 6)
      const c = int(rng, 2, 6)
      out.push(mcq(rng, `Найдите диагональ прямоугольного параллелепипеда с измерениями ${a}, ${b}, ${c}.`, Math.round(Math.sqrt(a * a + b * b + c * c) * 100) / 100, [a + b + c, Math.round(Math.sqrt(a * a + b * b) * 100) / 100, 2 * (a + b + c)], `d² = a² + b² + c² = ${a * a + b * b + c * c}, d = ${Math.round(Math.sqrt(a * a + b * b + c * c) * 100) / 100}.`))
    } else {
      const r = int(rng, 2, 6)
      const h = int(rng, 3, 10)
      out.push(mcq(rng, `Радиус цилиндра ${r}, высота ${h}. Найдите площадь боковой поверхности (π ≈ 3,14).`, num(2 * 3.14 * r * h), [num(3.14 * r * h), num(3.14 * r * r * h), num(2 * 3.14 * r * r)], `Sбок = 2πrh = 2 × 3,14 × ${r} × ${h} = ${num(2 * 3.14 * r * h)}.`))
    }
  }
  return out
}

const trigonometryBank = (rng) => {
  const out = []
  for (let i = 0; i < 15; i += 1) {
    const variant = i % 8
    if (variant === 0) {
      out.push(mcq(rng, 'Вычислите: sin 30°', '1/2', ['√3/2', '√2/2', '1'], 'sin 30° = 1/2 — табличное значение.'))
    } else if (variant === 1) {
      out.push(mcq(rng, 'Вычислите: cos 60°', '1/2', ['√3/2', '√2/2', '0'], 'cos 60° = 1/2.'))
    } else if (variant === 2) {
      out.push(mcq(rng, 'Вычислите: tg 45°', '1', ['√3', '√3/3', '0'], 'tg 45° = sin 45° / cos 45° = 1.'))
    } else if (variant === 3) {
      const deg = pick(rng, [30, 45, 60, 90, 120, 180])
      out.push(mcq(rng, `Переведите ${deg}° в радианы.`, `${deg}π/180`, [`${deg}/π`, `${deg}π/90`, `${180}/${deg}π`], `Перевод: α · π/180 = ${deg}π/180 радиан.`))
    } else if (variant === 4) {
      out.push(mcq(rng, 'Упростите: sin²x + cos²x', '1', ['0', '2', 'sin 2x'], 'Основное тригонометрическое тождество: sin²x + cos²x = 1.'))
    } else if (variant === 5) {
      const k = int(rng, 2, 5)
      out.push(mcq(rng, `Найдите период функции y = sin(${k}x).`, `2π/${k}`, [`π/${k}`, `${k}π`, `2π`], `Период sin(kx) равен 2π/k = 2π/${k}.`))
    } else if (variant === 6) {
      const a = int(rng, 2, 6)
      out.push(mcq(rng, `Найдите амплитуду функции y = ${a} sin x.`, a, [1, 2 * a, a / 2], `Амплитуда — модуль коэффициента перед синусом: |${a}| = ${a}.`))
    } else {
      out.push(mcq(rng, 'Упростите: sin(90° − α)', 'cos α', ['sin α', '−cos α', '−sin α'], 'По формуле приведения: sin(90° − α) = cos α.'))
    }
  }
  return out
}

const logarithmsBank = (rng) => {
  const out = []
  for (let i = 0; i < 15; i += 1) {
    const variant = i % 8
    if (variant === 0) {
      const a = pick(rng, [2, 3, 5])
      const k = int(rng, 2, 5)
      out.push(mcq(rng, `Вычислите: log_${a} ${a ** k}`, k, [k + 1, a, k - 1 < 0 ? k + 2 : k - 1], `${a}^${k} = ${a ** k}, поэтому log_${a} ${a ** k} = ${k}.`))
    } else if (variant === 1) {
      const a = pick(rng, [2, 3, 5])
      out.push(mcq(rng, `Упростите: log_${a} 4 + log_${a} 8`, `log_${a} 32`, [`log_${a} 12`, `log_${a} 2`, `log_${a} 64`], 'Сумма логарифмов равна логарифму произведения: log_a 4 + log_a 8 = log_a 32.'))
    } else if (variant === 2) {
      const a = pick(rng, [2, 3, 5])
      out.push(mcq(rng, `Упростите: log_${a} 27 − log_${a} 9`, `log_${a} 3`, [`log_${a} 18`, `log_${a} 36`, `log_${a} 243`], 'Разность логарифмов равна логарифму частного: log_a 27 − log_a 9 = log_a 3.'))
    } else if (variant === 3) {
      const a = pick(rng, [2, 3, 5])
      out.push(mcq(rng, `Упростите: log_${a} x³`, `3 log_${a} x`, [`log_${a} 3x`, `x log_${a} 3`, `3 + log_${a} x`], 'Логарифм степени: log_a x³ = 3 log_a x.'))
    } else if (variant === 4) {
      const a = pick(rng, [2, 3, 5, 10])
      out.push(mcq(rng, `Вычислите: log_${a} 1`, '0', ['1', a, 'Не существует'], 'Логарифм единицы по любому допустимому основанию равен 0.'))
    } else if (variant === 5) {
      const a = pick(rng, [2, 3, 5, 10])
      out.push(mcq(rng, `Вычислите: log_${a} ${a}`, '1', ['0', a, '2'], 'Логарифм основания по самому себе равен 1.'))
    } else if (variant === 6) {
      const k = int(rng, 2, 5)
      out.push(mcq(rng, `Решите уравнение: log₂ x = ${k}`, `x = ${2 ** k}`, [`x = ${2 * k}`, `x = ${k ** 2}`, `x = ${k}`], `По определению логарифма: x = 2^${k} = ${2 ** k}.`))
    } else {
      const a = int(rng, 1, 6)
      out.push(mcq(rng, `Найдите область определения функции y = log₂(x − ${a})`, `x > ${a}`, [`x ≥ ${a}`, `x < ${a}`, `x ≠ ${a}`], 'Аргумент логарифма должен быть строго положительным: x − a > 0, значит x > a.'))
    }
  }
  return out
}

const probabilityBank = (rng) => {
  const out = []
  for (let i = 0; i < 15; i += 1) {
    const variant = i % 8
    if (variant === 0) {
      out.push(mcq(rng, 'Какова вероятность выпадения чётного числа при броске кубика?', '1/2', ['1/3', '2/3', '1/6'], 'Чётные числа: 2, 4, 6 — три исхода из шести. P = 3/6 = 1/2.'))
    } else if (variant === 1) {
      out.push(mcq(rng, 'Какова вероятность выпадения числа больше 4 при броске кубика?', '1/3', ['1/2', '2/3', '1/6'], 'Подходят числа 5 и 6 — два исхода из шести. P = 2/6 = 1/3.'))
    } else if (variant === 2) {
      out.push(mcq(rng, 'Монету бросают один раз. Какова вероятность выпадения орла?', '1/2', ['1', '1/4', '0'], 'Два равновозможных исхода: орёл и решка. P = 1/2.'))
    } else if (variant === 3) {
      out.push(mcq(rng, 'Из колоды в 36 карт вытягивают одну. Какова вероятность, что это пиковая карта?', '1/4', ['1/2', '1/36', '9/36'], 'Пиковых карт 9 из 36. P = 9/36 = 1/4.'))
    } else if (variant === 4) {
      const red = int(rng, 2, 6)
      const blue = int(rng, 2, 6)
      out.push(mcq(rng, `В урне ${red} красных и ${blue} синих шаров. Какова вероятность вытащить красный шар?`, `${red}/${red + blue}`, [`${blue}/${red + blue}`, `${red}/${blue}`, `1/${red + blue}`], `Всего шаров ${red + blue}, красных ${red}. Вероятность: ${red}/${red + blue}.`))
    } else if (variant === 5) {
      out.push(mcq(rng, 'Вероятность события A равна 0,3. Какова вероятность противоположного события?', '0,7', ['0,3', '1,3', '0,03'], 'P(не A) = 1 − P(A) = 1 − 0,3 = 0,7.'))
    } else if (variant === 6) {
      const a = int(rng, 1, 10)
      const b = a + int(rng, 2, 10)
      const c = b + int(rng, 2, 10)
      out.push(mcq(rng, `Найдите среднее арифметическое чисел ${a}, ${b}, ${c}.`, num((a + b + c) / 3), [(a + b + c), num((a + b + c) / 2), Math.max(a, b, c)], `Среднее = (${a} + ${b} + ${c}) / 3 = ${num((a + b + c) / 3)}.`))
    } else {
      const n = int(rng, 4, 8)
      out.push(mcq(rng, `Сколькими способами можно выбрать 2 предмета из ${n}?`, (n * (n - 1)) / 2, [n * n, n * (n - 1), n + 2], `C(${n}, 2) = ${n}·${n - 1}/2 = ${(n * (n - 1)) / 2}.`))
    }
  }
  return out
}

const complexBank = (rng) => {
  const out = []
  for (let i = 0; i < 15; i += 1) {
    const variant = i % 8
    if (variant === 0) {
      out.push(mcq(rng, 'Чему равно i²?', '−1', ['1', 'i', '−i'], 'По определению мнимой единицы i² = −1.'))
    } else if (variant === 1) {
      out.push(mcq(rng, 'Чему равно i³?', '−i', ['i', '−1', '1'], 'i³ = i² · i = −1 · i = −i.'))
    } else if (variant === 2) {
      const a = int(rng, 1, 5)
      const b = int(rng, 1, 5)
      const c = int(rng, 1, 5)
      const d = int(rng, 1, 5)
      out.push(mcq(rng, `Сложите комплексные числа: (${a} + ${b}i) + (${c} + ${d}i)`, `${a + c} + ${b + d}i`, [`${a + c} + ${b * d}i`, `${a * c} + ${b * d}i`, `${a + c} − ${b + d}i`], `Складываем отдельно действительные и мнимые части: (${a} + ${c}) + (${b} + ${d})i = ${a + c} + ${b + d}i.`))
    } else if (variant === 3) {
      const a = int(rng, 1, 4)
      const b = int(rng, 1, 4)
      out.push(mcq(rng, `Умножьте: (${a} + ${b}i)(1 + i)`, `${a - b} + ${a + b}i`, [`${a + b} + ${a - b}i`, `${a} + ${b}i`, `${a - b} − ${a + b}i`], `Раскрываем скобки: ${a} + ${a}i + ${b}i + ${b}i² = (${a} − ${b}) + (${a} + ${b})i.`))
    } else if (variant === 4) {
      const a = int(rng, 3, 6)
      const b = int(rng, 4, 8)
      out.push(mcq(rng, `Найдите модуль комплексного числа z = ${a} + ${b}i.`, Math.round(Math.sqrt(a * a + b * b) * 100) / 100, [a + b, Math.round(Math.sqrt(a * a - b * b) * 100) / 100, a * b], `|z| = √(a² + b²) = √(${a * a} + ${b * b}) = ${Math.round(Math.sqrt(a * a + b * b) * 100) / 100}.`))
    } else if (variant === 5) {
      const a = int(rng, 1, 5)
      const b = int(rng, 1, 5)
      out.push(mcq(rng, `Найдите сопряжённое число к z = ${a} − ${b}i.`, `${a} + ${b}i`, [`−${a} + ${b}i`, `${a} − ${b}i`, `−${a} − ${b}i`], `Сопряжённое число меняет знак мнимой части: ${a} + ${b}i.`))
    } else if (variant === 6) {
      const a = int(rng, 1, 4)
      out.push(mcq(rng, `Найдите остаток от деления многочлена P(x) на (x − ${a}), если P(${a}) = ${a + 2}.`, a + 2, [a, a - 2, 0], 'По теореме Безу остаток от деления P(x) на (x − a) равен P(a). Он равен ' + (a + 2) + '.'))
    } else {
      out.push(mcq(rng, 'Сколько комплексных корней имеет уравнение x² + 1 = 0?', '2', ['0', '1', 'Бесконечно много'], 'x² = −1, корни x = i и x = −i — два комплексных корня.'))
    }
  }
  return out
}

const analyticBank = (rng) => {
  const out = []
  for (let i = 0; i < 15; i += 1) {
    const variant = i % 8
    if (variant === 0) {
      const x1 = int(rng, -5, 5)
      const y1 = int(rng, -5, 5)
      const x2 = int(rng, -5, 5)
      const y2 = int(rng, -5, 5)
      out.push(mcq(rng, `Найдите расстояние между точками A(${x1}; ${y1}) и B(${x2}; ${y2}).`, Math.round(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * 100) / 100, [Math.abs(x2 - x1) + Math.abs(y2 - y1), Math.abs(x2 - x1), Math.abs(y2 - y1)], `d = √((x₂−x₁)² + (y₂−y₁)²) = √(${(x2 - x1) ** 2} + ${(y2 - y1) ** 2}) = ${Math.round(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * 100) / 100}.`))
    } else if (variant === 1) {
      const x1 = int(rng, -6, 6)
      const y1 = int(rng, -6, 6)
      const x2 = int(rng, -6, 6)
      const y2 = int(rng, -6, 6)
      out.push(mcq(rng, `Найдите координаты середины отрезка AB, если A(${x1}; ${y1}), B(${x2}; ${y2}).`, `(${num((x1 + x2) / 2)}; ${num((y1 + y2) / 2)})`, [`(${x2 - x1}; ${y2 - y1})`, `(${x1 + x2}; ${y1 + y2})`, `(${num((x1 - x2) / 2)}; ${num((y1 - y2) / 2)})`], `Середина: ((x₁+x₂)/2; (y₁+y₂)/2) = (${num((x1 + x2) / 2)}; ${num((y1 + y2) / 2)}).`))
    } else if (variant === 2) {
      const x1 = int(rng, 1, 4)
      const y1 = int(rng, 1, 5)
      const x2 = x1 + int(rng, 1, 4)
      const y2 = y1 + int(rng, 1, 6)
      out.push(mcq(rng, `Найдите угловой коэффициент прямой через точки (${x1}; ${y1}) и (${x2}; ${y2}).`, num((y2 - y1) / (x2 - x1)), [num((x2 - x1) / (y2 - y1)), y2 - y1, x2 - x1], `k = (y₂−y₁)/(x₂−x₁) = (${y2}−${y1})/(${x2}−${x1}) = ${num((y2 - y1) / (x2 - x1))}.`))
    } else if (variant === 3) {
      const a = int(rng, 1, 4)
      const b = int(rng, -5, 5)
      out.push(mcq(rng, `Прямая задана уравнением y = ${a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)}. Чему равен её угловой коэффициент?`, a, [b, -a, a + b], `В уравнении y = kx + b угловой коэффициент k = ${a}.`))
    } else if (variant === 4) {
      const h = int(rng, -4, 4)
      const k = int(rng, -4, 4)
      const r = int(rng, 2, 6)
      out.push(mcq(rng, `Найдите радиус окружности (x − ${h})² + (y − ${k})² = ${r * r}.`, r, [r * r, 2 * r, Math.abs(h + k)], `Уравнение окружности: (x−a)² + (y−b)² = R². Здесь R² = ${r * r}, значит R = ${r}.`))
    } else if (variant === 5) {
      const x = int(rng, 1, 5)
      const y = int(rng, 1, 5)
      out.push(mcq(rng, `Найдите длину вектора a = (${x}; ${y}).`, Math.round(Math.sqrt(x * x + y * y) * 100) / 100, [x + y, x * y, Math.abs(x - y)], `|a| = √(x² + y²) = √(${x * x} + ${y * y}) = ${Math.round(Math.sqrt(x * x + y * y) * 100) / 100}.`))
    } else if (variant === 6) {
      const x1 = int(rng, 1, 5)
      const y1 = int(rng, 1, 5)
      const x2 = int(rng, 1, 5)
      const y2 = int(rng, 1, 5)
      out.push(mcq(rng, `Найдите скалярное произведение векторов a = (${x1}; ${y1}) и b = (${x2}; ${y2}).`, x1 * x2 + y1 * y2, [x1 * y2 + y1 * x2, x1 * x2 - y1 * y2, x1 + x2 + y1 + y2], `a·b = x₁x₂ + y₁y₂ = ${x1}·${x2} + ${y1}·${y2} = ${x1 * x2 + y1 * y2}.`))
    } else {
      const b = int(rng, 3, 9)
      const h = int(rng, 2, 6)
      out.push(mcq(rng, `Основание треугольника на координатной плоскости равно ${b}, высота ${h}. Найдите его площадь.`, num((b * h) / 2), [b * h, b + h, num((b * h) / 3)], `S = ½ · основание · высота = ½ · ${b} · ${h} = ${num((b * h) / 2)}.`))
    }
  }
  return out
}

const limitsBank = (rng) => {
  const out = []
  for (let i = 0; i < 15; i += 1) {
    const variant = i % 8
    if (variant === 0) {
      const a = int(rng, 1, 4)
      const b = int(rng, 1, 5)
      out.push(mcq(rng, `Вычислите предел: lim(x→${a}) (x² + ${b}x)`, a * a + b * a, [a * a - b * a, a + b, a * a + b], `Подставляем x = ${a}: ${a}² + ${b}·${a} = ${a * a + b * a}.`))
    } else if (variant === 1) {
      const a = int(rng, 2, 6)
      out.push(mcq(rng, `Вычислите предел: lim(x→${a}) (x² − ${a * a})/(x − ${a})`, 2 * a, [a, a * a, 0], `Числитель раскладывается: (x − ${a})(x + ${a}). После сокращения предел равен 2·${a} = ${2 * a}.`))
    } else if (variant === 2) {
      const a = int(rng, 2, 6)
      const b = int(rng, 2, 6)
      out.push(mcq(rng, `Вычислите предел: lim(x→∞) (${a}x² + 1)/(${b}x² + x)`, `${a}/${b}`, [`${b}/${a}`, '0', '∞'], 'При x→∞ отношение многочленов одинаковой степени равно отношению старших коэффициентов: ' + a + '/' + b + '.'))
    } else if (variant === 3) {
      const k = int(rng, 2, 6)
      out.push(mcq(rng, `Вычислите предел: lim(x→0) sin(${k}x)/x`, k, [1, 0, k * k], 'Используем первый замечательный предел: sin(kx)/x = k·sin(kx)/(kx) → ' + k + '.'))
    } else if (variant === 4) {
      const a = int(rng, 1, 5)
      const b = int(rng, 1, 9)
      out.push(mcq(rng, `Функция f(x) = x + ${a} непрерывна в точке x = ${b}. Чему равен предел при x→${b}?`, b + a, [b - a, a, b], `Для непрерывной функции предел равен значению: f(${b}) = ${b} + ${a} = ${b + a}.`))
    } else if (variant === 5) {
      const a = int(rng, 1, 5)
      out.push(mcq(rng, `У функции f(x) = 1/(x − ${a}) найдите вертикальную асимптоту.`, `x = ${a}`, [`x = 0`, `y = ${a}`, `y = 0`], 'Знаменатель обращается в нуль при x = a, поэтому прямая x = a — вертикальная асимптота.'))
    } else if (variant === 6) {
      const a = int(rng, 2, 5)
      out.push(mcq(rng, `Найдите горизонтальную асимптоту функции f(x) = (${a}x + 1)/x при x→∞.`, `y = ${a}`, [`y = 1`, `x = ${a}`, 'Асимптоты нет'], 'При x→∞ f(x) → ' + a + ', поэтому y = ' + a + ' — горизонтальная асимптота.'))
    } else {
      out.push(mcq(rng, 'Вычислите предел: lim(x→0) (1 − cos x)/x²', '1/2', ['1', '0', '2'], 'Используем эквивалентность 1 − cos x ~ x²/2, поэтому предел равен 1/2.'))
    }
  }
  return out
}

const diffeqBank = (rng) => {
  const out = []
  for (let i = 0; i < 15; i += 1) {
    const variant = i % 8
    if (variant === 0) {
      out.push(mcq(rng, 'Определите порядок дифференциального уравнения y″ + 3y′ + 2y = 0.', '2', ['1', '3', '0'], 'Порядок уравнения равен порядку старшей производной. Здесь это y″, то есть второй порядок.'))
    } else if (variant === 1) {
      const k = int(rng, 2, 5)
      out.push(mcq(rng, `Найдите общее решение уравнения y′ = ${k}y.`, `y = C·e^(${k}x)`, [`y = C·e^(−${k}x)`, `y = ${k}x + C`, `y = C·x^${k}`], 'Решение уравнения y′ = ky имеет вид y = C·e^(kx).' + ` Здесь k = ${k}.`))
    } else if (variant === 2) {
      out.push(mcq(rng, 'Найдите общее решение уравнения y′ = x.', 'y = x²/2 + C', ['y = x + C', 'y = x² + C', 'y = 2x + C'], 'Интегрируем: y = ∫x dx = x²/2 + C.'))
    } else if (variant === 3) {
      const a = int(rng, 1, 5)
      out.push(mcq(rng, `Найдите частное решение y′ = 2x, если y(0) = ${a}.`, `y = x² + ${a}`, [`y = x²`, `y = 2x + ${a}`, `y = x² − ${a}`], `Общее решение: y = x² + C. Из условия y(0) = ${a} получаем C = ${a}. Ответ: y = x² + ${a}.`))
    } else if (variant === 4) {
      out.push(mcq(rng, 'Найдите общее решение уравнения y′ + y = 0.', 'y = C·e^(−x)', ['y = C·e^x', 'y = C − x', 'y = C·x'], 'Характеристическое уравнение: r + 1 = 0, r = −1. Решение: y = C·e^(−x).'))
    } else if (variant === 5) {
      const a = int(rng, 1, 4)
      const b = int(rng, 2, 6)
      out.push(mcq(rng, `Решите характеристическое уравнение r² − ${a + b}r + ${a * b} = 0.`, `r₁ = ${Math.min(a, b)}, r₂ = ${Math.max(a, b)}`, [`r₁ = ${a + b}, r₂ = ${a * b}`, `r₁ = ${-a}, r₂ = ${-b}`, 'Корней нет'], `Корни находим по теореме Виета: сумма ${a + b}, произведение ${a * b}. Это ${Math.min(a, b)} и ${Math.max(a, b)}.`))
    } else if (variant === 6) {
      const l = int(rng, 1, 4)
      out.push(mcq(rng, `Для уравнения y″ − ${2 * l}y′ + ${l * l}y = 0 найдите общее решение.`, `y = (C₁ + C₂x)e^(${l}x)`, [`y = C₁e^(${l}x) + C₂e^(−${l}x)`, `y = C₁cos(${l}x) + C₂sin(${l}x)`, `y = C₁e^x + C₂`], `Характеристическое уравнение имеет кратный корень r = ${l}. Общее решение: y = (C₁ + C₂x)e^(${l}x).`))
    } else {
      out.push(mcq(rng, 'Закон радиоактивного распада описывается уравнением N′ = −λN. Какое решение ему соответствует?', 'N = N₀e^(−λt)', ['N = N₀e^(λt)', 'N = N₀ + λt', 'N = N₀t'], 'Уравнение N′ = −λN имеет решение N = N₀e^(−λt), где N₀ — начальное количество.'))
    }
  }
  return out
}

const linalgBank = (rng) => {
  const out = []
  for (let i = 0; i < 15; i += 1) {
    const variant = i % 8
    if (variant === 0) {
      const a = int(rng, 1, 9)
      const b = int(rng, 1, 9)
      const c = int(rng, 1, 9)
      const d = int(rng, 1, 9)
      out.push(mcq(rng, `Найдите элемент c₁₁ матрицы C = A + B, если A = [[${a}, ${b}], [${c}, ${d}]] и B = [[1, 2], [3, 4]].`, a + 1, [a, b + 2, c + 3], 'При сложении матриц складываются соответствующие элементы: c₁₁ = a₁₁ + b₁₁ = ' + a + ' + 1 = ' + (a + 1) + '.'))
    } else if (variant === 1) {
      const a = int(rng, 1, 9)
      const b = int(rng, 1, 9)
      const c = int(rng, 1, 9)
      const d = int(rng, 1, 9)
      out.push(mcq(rng, `Вычислите определитель матрицы [[${a}, ${b}], [${c}, ${d}]].`, a * d - b * c, [a * d + b * c, a * c - b * d, a + b + c + d], 'Определитель 2×2: ad − bc = ' + a + '·' + d + ' − ' + b + '·' + c + ' = ' + (a * d - b * c) + '.'))
    } else if (variant === 2) {
      const a = int(rng, 2, 9)
      out.push(mcq(rng, `Матрица [[${a}, 0, 0], [0, ${a + 1}, 0], [0, 0, ${a + 2}]] диагональная. Чему равен её определитель?`, a * (a + 1) * (a + 2), [a + (a + 1) + (a + 2), a ** 3, 0], 'Определитель диагональной матрицы равен произведению диагональных элементов: ' + a + '·' + (a + 1) + '·' + (a + 2) + ' = ' + (a * (a + 1) * (a + 2)) + '.'))
    } else if (variant === 3) {
      const a = int(rng, 1, 8)
      const b = int(rng, 1, 8)
      out.push(mcq(rng, `Дана матрица A = [[${a}, ${b}], [${b}, ${a}]]. Чему равен элемент a₂₁ транспонированной матрицы Aᵀ?`, b, [a, b + 1, a + b], 'При транспонировании строки и столбцы меняются местами. a₂₁(Aᵀ) = a₁₂(A) = ' + b + '.'))
    } else if (variant === 4) {
      const a = int(rng, 1, 5)
      out.push(mcq(rng, `При каком условии квадратная матрица A имеет обратную?`, 'det A ≠ 0', ['det A = 0', 'A — диагональная', 'A симметрична'], 'Обратная матрица существует тогда и только тогда, когда определитель не равен нулю.'))
    } else if (variant === 5) {
      const a = int(rng, 1, 5)
      const b = int(rng, 1, 5)
      out.push(mcq(rng, `Для системы x + y = ${a + b}, x − y = ${a - b} найдите x по правилу Крамера.`, a, [b, a + b, a - b], `Складывая уравнения: 2x = ${2 * a}, значит x = ${a}.`))
    } else if (variant === 6) {
      out.push(mcq(rng, 'Чему равен ранг матрицы [[1, 2, 3], [2, 4, 6]]?', '1', ['2', '3', '0'], 'Вторая строка является удвоенной первой, поэтому ненулевая строка только одна. Ранг равен 1.'))
    } else {
      const a = int(rng, 2, 9)
      const b = int(rng, 2, 9)
      out.push(mcq(rng, `Найдите собственные значения матрицы [[${a}, 0], [0, ${b}]].`, `${a} и ${b}`, [`${a + b}`, `${a * b}`, `${a} и 0`], 'Собственные значения диагональной матрицы — её диагональные элементы: ' + a + ' и ' + b + '.'))
    }
  }
  return out
}

const olympiadBank = (rng) => {
  const out = []
  for (let i = 0; i < 15; i += 1) {
    const variant = i % 8
    if (variant === 0) {
      const a = int(rng, 3, 9)
      const b = int(rng, 2, 8)
      const n = int(rng, 1, 5)
      out.push(mcq(rng, `Найдите остаток от деления ${a * b + n} на ${a}.`, n, [b, a - n, 0], `${a * b + n} = ${a}·${b} + ${n}, остаток равен ${n} (при 0 ≤ ${n} < ${a}).`))
    } else if (variant === 1) {
      const base = pick(rng, [2, 3, 7, 8])
      const exp = int(rng, 1, 4) * 4 + int(rng, 1, 3)
      const cycle = { 2: [2, 4, 8, 6], 3: [3, 9, 7, 1], 7: [7, 9, 3, 1], 8: [8, 4, 2, 6] }
      const last = cycle[base][(exp - 1) % 4]
      out.push(mcq(rng, `Какой последней цифрой оканчивается число ${base}^${exp}?`, last, [base, (last + 2) % 10, (last + 4) % 10], 'Последние цифры степеней числа ' + base + ' повторяются с периодом 4. Для показателя ' + exp + ' последняя цифра равна ' + last + '.'))
    } else if (variant === 2) {
      const a = int(rng, 2, 9)
      const b = int(rng, 2, 9)
      const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y))
      out.push(mcq(rng, `Найдите НОД(${a * b}, ${a * b + a}).`, a, [a * b, b, a * b + a], `НОД(${a * b}, ${a * b + a}) = НОД(${a * b}, ${a}) = ${a}, так как ${a * b} делится на ${a}.`))
    } else if (variant === 3) {
      const a = int(rng, 2, 6)
      const b = int(rng, 2, 6)
      const lcm = (a * b) / (() => { const g = (x, y) => (y === 0 ? x : g(y, x % y)); return g(a, b) })()
      out.push(mcq(rng, `Найдите НОК(${a}, ${b}).`, lcm, [a * b, a + b, Math.max(a, b)], `НОК(a, b) = a·b / НОД(a, b) = ${a * b} / ${(a * b) / lcm} = ${lcm}.`))
    } else if (variant === 4) {
      const digits = int(rng, 1, 9)
      const sum = digits + 9 + 3
      out.push(mcq(rng, `Число 9${digits}3 делится на 9. Найдите цифру ${digits}, если сумма цифр равна ${sum}.`, digits, [digits + 1, digits - 1 < 0 ? digits + 2 : digits - 1, 0], `Признак делимости на 9: сумма цифр должна делиться на 9. Сумма ${sum} делится на 9, значит цифра ${digits}.`))
    } else if (variant === 5) {
      out.push(mcq(rng, 'В классе 25 учеников. Докажите, что найдутся хотя бы три ученика, родившихся в одном месяце. Какой принцип используется?', 'Принцип Дирихле', ['Принцип индукции', 'Принцип симметрии', 'Принцип обратной функции'], '25 учеников распределяются по 12 месяцам. Если в каждом месяце не больше 2 учеников, всего не более 24 — противоречие. Это принцип Дирихле.'))
    } else if (variant === 6) {
      out.push(mcq(rng, 'Какое число является инвариантом при разрезании и перекладывании фигур?', 'Площадь', ['Периметр', 'Количество углов', 'Длина диагонали'], 'При разрезании и перекладывании без наложений площадь сохраняется — это классический инвариант.'))
    } else {
      const n = int(rng, 3, 6)
      out.push(mcq(rng, `Сколько подмножеств имеет множество из ${n} элементов?`, 2 ** n, [2 * n, n * n, n + 2], `Каждый элемент можно включить или не включить: 2^${n} = ${2 ** n} подмножеств.`))
    }
  }
  return out
}

const higherBank = (rng) => {
  const out = []
  for (let i = 0; i < 15; i += 1) {
    const variant = i % 10
    if (variant === 0) {
      out.push(mcq(rng, 'Чему равно объединение A ∪ B, если A = {1, 2}, B = {2, 3}?', '{1, 2, 3}', ['{2}', '{1, 3}', '∅'], 'Объединение включает все элементы обоих множеств без повторений: {1, 2, 3}.'))
    } else if (variant === 1) {
      out.push(mcq(rng, 'Сходится ли геометрический ряд 1 + 1/2 + 1/4 + 1/8 + ...?', 'Да, сумма равна 2', ['Нет, расходится', 'Да, сумма равна 1', 'Сумма не существует'], 'Это бесконечная геометрическая прогрессия с q = 1/2. При |q| < 1 сумма равна a/(1−q) = 1/(1−1/2) = 2.'))
    } else if (variant === 2) {
      const a = int(rng, 2, 5)
      const b = int(rng, 2, 5)
      out.push(mcq(rng, `Найдите частную производную функции f(x, y) = ${a}x²y + ${b}y по x.`, `${2 * a}xy`, [`${a}x² + ${b}`, `${2 * a}xy + ${b}`, `${a}x²`], 'При дифференцировании по x переменная y считается постоянной: ∂f/∂x = ' + 2 * a + 'xy.'))
    } else if (variant === 3) {
      const a = int(rng, 1, 4)
      out.push(mcq(rng, `Вычислите двойной интеграл от 1 по прямоугольнику [0; ${a}] × [0; 1].`, a, [a * a, 2 * a, 1], 'Двойной интеграл от 1 равен площади прямоугольника: ' + a + ' × 1 = ' + a + '.'))
    } else if (variant === 4) {
      out.push(mcq(rng, 'Что показывает градиент функции в точке?', 'Направление наискорейшего возрастания', ['Направление наискорейшего убывания', 'Площадь под графиком', 'Точку перегиба'], 'Градиент указывает направление, в котором функция возрастает быстрее всего, а его модуль равен скорости роста.'))
    } else if (variant === 5) {
      out.push(mcq(rng, 'Чему равна дивергенция векторного поля F = (x, y, z)?', '3', ['1', '0', 'x + y + z'], 'div F = ∂x/∂x + ∂y/∂y + ∂z/∂z = 1 + 1 + 1 = 3.'))
    } else if (variant === 6) {
      out.push(mcq(rng, 'Какое условие является условием Коши — Римана для аналитической функции f = u + iv?', 'uₓ = vᵧ и uᵧ = −vₓ', ['uₓ = uᵧ и vₓ = vᵧ', 'uₓ + vᵧ = 0', 'uₓ = vₓ и uᵧ = vᵧ'], 'Условия Коши — Римана: ∂u/∂x = ∂v/∂y и ∂u/∂y = −∂v/∂x.'))
    } else if (variant === 7) {
      out.push(mcq(rng, 'Какой метод численного интегрирования использует значения функции в середине отрезка?', 'Метод средних прямоугольников', ['Метод Эйлера', 'Метод Ньютона', 'Метод Гаусса — Зейделя'], 'Метод средних прямоугольников приближает интеграл суммой площадей прямоугольников с высотой в средней точке отрезка.'))
    } else if (variant === 8) {
      const a = int(rng, 1, 5)
      out.push(mcq(rng, `Случайная величина принимает значения 0 и 1 с вероятностями 0,5. Чему равно математическое ожидание?`, '0,5', ['0', '1', '1,5'], 'E(X) = 0·0,5 + 1·0,5 = 0,5.'))
    } else {
      out.push(mcq(rng, 'Что такое метрическое пространство?', 'Множество с функцией расстояния', ['Множество с операцией сложения', 'Векторное пространство с базисом', 'Множество без структуры'], 'Метрическое пространство — это множество, на котором задана метрика (функция расстояния), удовлетворяющая аксиомам неотрицательности, симметрии и треугольника.'))
    }
  }
  return out
}

const mixedBank = (rng) => {
  const pools = [
    arithmeticBank(rng),
    algebraBank(rng),
    geometryBank(rng),
    trigonometryBank(rng),
    logarithmsBank(rng),
    probabilityBank(rng),
    calculusApplicationsBank(rng)
  ]
  const out = []
  const used = new Set()
  for (let i = 0; i < 15; i += 1) {
    const pool = pools[i % pools.length]
    let index = (i * 3 + 1) % pool.length
    let candidate = pool[index]
    let guard = 0
    while (used.has(candidate.question) && guard < pool.length) {
      index = (index + 1) % pool.length
      candidate = pool[index]
      guard += 1
    }
    used.add(candidate.question)
    out.push(candidate)
  }
  return out
}

const buildQuestionBank = (kind, rng) => {
  switch (kind) {
    case 'percent':
      return percentBank(rng)
    case 'algebra':
      return algebraBank(rng)
    case 'functions':
    case 'linearFunction':
    case 'quadraticFunction':
    case 'rationalFunction':
    case 'exponentialFunction':
    case 'functionTransform':
      return functionsBank(rng)
    case 'derivative':
      return derivativeBank(rng)
    case 'integral':
      return integralBank(rng)
    case 'calculusApplications':
      return calculusApplicationsBank(rng)
    case 'geometry':
      return geometryBank(rng)
    case 'stereometry':
      return stereometryBank(rng)
    case 'trigonometry':
      return trigonometryBank(rng)
    case 'logarithms':
      return logarithmsBank(rng)
    case 'probability':
      return probabilityBank(rng)
    case 'complex':
      return complexBank(rng)
    case 'analytic':
      return analyticBank(rng)
    case 'limits':
      return limitsBank(rng)
    case 'diffeq':
      return diffeqBank(rng)
    case 'linalg':
      return linalgBank(rng)
    case 'olympiad':
    case 'logic':
      return olympiadBank(rng)
    case 'higher':
    case 'series':
      return higherBank(rng)
    case 'ege':
    case 'review':
      return mixedBank(rng)
    default:
      return arithmeticBank(rng)
  }
}

const MODULE_THEORY = {
  7: 'Функция — это правило, по которому каждому значению x из области определения ставится в соответствие единственное значение y. График функции показывает все пары (x; y). Линейная функция y = kx + b даёт прямую, квадратичная y = ax² + bx + c — параболу, а дробно-рациональная y = k/x — гиперболу.',
  8: 'Производная f′(x) — это мгновенная скорость изменения функции и угловой коэффициент касательной к графику. Для её вычисления используют правила суммы, произведения, частного и сложной функции. Первообразная F(x) удовлетворяет условию F′(x) = f(x), а определённый интеграл выражает площадь под графиком.',
  9: 'В стереометрии изучаются фигуры в пространстве. Объём призмы равен Sосн · h, пирамиды — ⅓Sосн · h, цилиндра — πr²h, конуса — ⅓πr²h, шара — 4/3πr³. Площади поверхностей и сечения помогают решать задачи о расстояниях и углах.',
  10: 'Комплексное число имеет вид z = a + bi, где i² = −1. Многочлен степени n имеет не более n корней. Теорема Безу утверждает, что остаток от деления P(x) на (x − a) равен P(a), а теорема Виета связывает корни и коэффициенты.',
  11: 'Аналитическая геометрия описывает фигуры координатами и уравнениями. Расстояние между точками вычисляется по формуле √((x₂−x₁)² + (y₂−y₁)²), уравнение прямой имеет вид y = kx + b, а окружность задаётся уравнением (x−a)² + (y−b)² = R².',
  12: 'Предел функции описывает поведение f(x) при приближении x к точке или бесконечности. Для раскрытия неопределённостей используют разложение на множители, эквивалентности и правило Лопиталя. Непрерывность означает, что предел равен значению функции в точке.',
  13: 'Дифференциальное уравнение связывает функцию и её производные. Порядок уравнения определяется старшей производной. Уравнения с разделяющимися переменными решают разделением dx и dy, линейные уравнения — методом интегрирующего множителя, а уравнения второго порядка — через характеристическое уравнение.',
  14: 'Линейная алгебра работает с матрицами и векторами. Определитель показывает, обратима ли матрица. Системы линейных уравнений решают методом Гаусса или Крамера. Ранг матрицы — число линейно независимых строк, а собственные значения находятся из уравнения det(A − λE) = 0.',
  15: 'ЕГЭ проверяет умение применять математику в незнакомых ситуациях. Ключевые навыки: внимательное чтение условия, построение модели, проверка размерности и обязательная проверка ответа. Экономические задачи сводятся к процентам и последовательностям, а параметры требуют разбора случаев.',
  16: 'Олимпиадные задачи редко решаются по шаблону. Помогают идеи: рассмотреть остатки, применить принцип Дирихле, найти инвариант, оценить выражение, разбить на случаи и проверить малые значения. Главное — не бояться экспериментировать и строго доказывать каждый шаг.',
  17: 'Высшая математика расширяет школьные понятия: множества и отображения, пределы последовательностей, ряды, функции нескольких переменных, кратные интегралы, векторный и комплексный анализ. Важно понимать определения и уметь применять их в задачах.',
  18: 'Итоговое повторение помогает собрать курс в единую систему. Сначала повторите базовые правила, затем решайте смешанные задания на время, разбирайте ошибки и возвращайтесь к слабым темам. Пробный экзамен — лучший способ проверить готовность.'
}

const MODULE_RULES = {
  7: ['Область определения — допустимые x, область значений — возможные y.', 'Нули функции — это точки, где график пересекает ось Ox.', 'При сдвиге графика вправо на a получаем f(x − a).', 'Растяжение по вертикали: y = k·f(x), где k > 1.'],
  8: ['Производная константы равна нулю.', 'Производная суммы равна сумме производных.', 'Если f′(x) > 0, функция возрастает; если f′(x) < 0 — убывает.', 'Интеграл — обратная операция к производной.'],
  9: ['Объём измеряется в кубических единицах, площадь — в квадратных.', 'У пирамиды и конуса объём в 3 раза меньше, чем у призмы и цилиндра с той же высотой.', 'Диагональ прямоугольного параллелепипеда: d² = a² + b² + c².', 'Площадь сферы: S = 4πR².'],
  10: ['i² = −1, i³ = −i, i⁴ = 1.', 'Модуль z = a + bi равен √(a² + b²).', 'Сопряжённое число меняет знак мнимой части.', 'Остаток от деления P(x) на (x − a) равен P(a).'],
  11: ['Расстояние: d = √((x₂−x₁)² + (y₂−y₁)²).', 'Угловой коэффициент прямой: k = (y₂−y₁)/(x₂−x₁).', 'Скалярное произведение: a·b = x₁x₂ + y₁y₂.', 'Окружность: (x−a)² + (y−b)² = R².'],
  12: ['Для непрерывной функции предел равен значению.', 'Неопределённость 0/0 раскрывают разложением на множители.', 'При x→∞ старшие степени определяют предел отношения многочленов.', 'Первый замечательный предел: sin x / x → 1 при x→0.'],
  13: ['Порядок уравнения — порядок старшей производной.', 'Общее решение содержит столько констант, каков порядок уравнения.', 'Начальные условия позволяют найти частное решение.', 'Для уравнения y′ = ky решение имеет вид y = C·e^(kx).'],
  14: ['Матрицы складываются поэлементно.', 'Определитель 2×2: ad − bc.', 'Обратная матрица существует при det A ≠ 0.', 'По Крамеру x = Δx/Δ, y = Δy/Δ.'],
  15: ['Проверяйте, что найденный ответ удовлетворяет условию задачи.', 'В процентах важно понять, от какой величины считается процент.', 'В геометрии делайте рисунок и отмечайте известные величины.', 'В параметрах разбирайте все случаи, включая вырожденные.'],
  16: ['Проверяйте гипотезу на малых примерах, но не считайте это доказательством.', 'Ищите инвариант — величину, которая не меняется.', 'Принцип Дирихле: если предметов больше, чем ящиков, в одном ящике не меньше двух.', 'Оценка сверху и пример, её достигающий, дают полное решение.'],
  17: ['Сходимость ряда проверяют по признакам Даламбера, Коши или сравнению.', 'Частная производная вычисляется при фиксированных остальных переменных.', 'Градиент указывает направление наискорейшего роста.', 'Для аналитической функции выполняются условия Коши — Римана.'],
  18: ['Сначала повторите теорию, затем решайте задачи без подсказок.', 'Ошибки — это точки роста: разбирайте каждую.', 'Следите за временем на пробном экзамене.', 'Проверяйте ответы подстановкой и оценкой.']
}

export const createGeneratedLesson = (def) => {
  const module = MODULE_BY_ID[def.moduleId] || MODULE_BY_ID[1]
  const rng = mulberry32(def.id * 9973 + String(def.kind).length * 131 + 17)
  const tests = buildQuestionBank(def.kind, rng).map((test, index) => ({
    ...test,
    id: index + 1
  }))
  const focus = def.focus && def.focus.length ? def.focus : ['Основные понятия', 'Формулы и правила', 'Практические примеры']
  const timeLabels = [
    'Введение и цель урока',
    ...focus.slice(0, 4),
    'Разбор типичных заданий'
  ].slice(0, 6)
  const times = ['00:00', '07:30', '15:00', '22:30', '31:00', '40:00']
  const moduleTheory = MODULE_THEORY[def.moduleId] || MODULE_THEORY[18]
  const moduleRules = MODULE_RULES[def.moduleId] || MODULE_RULES[18]
  const theory = def.theory || moduleTheory

  return {
    id: def.id,
    moduleId: def.moduleId,
    moduleTitle: module.title,
    title: `Урок ${def.id}: ${def.title}`,
    subtitle: def.subtitle,
    duration: `${tests.length} тестов + теория`,
    difficulty: def.difficulty || 'Средний',
    youtubeId: def.youtubeId || module.youtubeId,
    summary: def.summary,
    videoTimecodes: timeLabels.map((label, index) => ({ time: times[index], label })),
    theory: {
      sections: [
        {
          heading: `1. ${def.title}`,
          content: `${def.summary}\n\n**Что разберём на уроке:**\n${focus.map((item) => `* ${item}`).join('\n')}`
        },
        {
          heading: '2. Теория и ключевые формулы',
          content: theory
        },
        {
          heading: '3. Как решать задачи',
          content: def.algorithm || `1. Внимательно прочитайте условие и выпишите известные величины.\n2. Определите, какое правило или формулу нужно применить.\n3. Выполните преобразования по шагам, не перескакивая через действия.\n4. Проверьте ответ подстановкой или оценкой.\n\n**Совет:** если задача не поддаётся с первого раза, начните с простого частного случая — он часто подсказывает общий метод.`
        }
      ],
      rules: def.rules && def.rules.length ? def.rules : moduleRules
    },
    tests
  }
}
