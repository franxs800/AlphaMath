export const lesson14 = {
  id: 14,
  moduleId: 6,
  moduleTitle: 'Модуль 6: Числовые системы и логарифмы',
  title: 'Урок 14: Логарифмы: определение и основные свойства',
  subtitle: 'Что такое логарифм и как с ним работать',
  duration: '45 мин видео + 30 тестов',
  difficulty: 'Средний',
  youtubeId: '0BhJXNa7HJk',
  summary: 'Вводим понятие логарифма как обратную операцию к возведению в степень. Изучаем основные свойства логарифмов: логарифм произведения, частного, степени. Решаем простые логарифмические выражения.',

  videoTimecodes: [
    { time: '00:00', label: 'Определение логарифма через степень' },
    { time: '10:00', label: 'Формульная запись и базовые примеры' },
    { time: '20:00', label: 'Свойство 1: логарифм произведения' },
    { time: '28:30', label: 'Свойство 2: логарифм частного' },
    { time: '35:00', label: 'Свойство 3: логарифм степени' },
    { time: '42:00', label: 'Формула перехода к другому основанию' },
  ],

  theory: {
    sections: [
      {
        heading: '1. Определение логарифма',
        content: `**Логарифм** числа $b$ по основанию $a$ — это показатель степени, в которую нужно возвести $a$, чтобы получить $b$.

$$\\log_a b = x \\iff a^x = b$$

**Условия:** $a > 0$, $a \\ne 1$, $b > 0$.

**Примеры:**
* $\\log_2 8 = 3$, потому что $2^3 = 8$
* $\\log_3 81 = 4$, потому что $3^4 = 81$
* $\\log_{10} 100 = 2$, потому что $10^2 = 100$
* $\\log_5 1 = 0$, потому что $5^0 = 1$ (логарифм единицы по любому основанию = 0)
* $\\log_a a = 1$, потому что $a^1 = a$ (логарифм основания по самому себе = 1)`
      },
      {
        heading: '2. Основные свойства логарифмов',
        content: `Пусть $a > 0$, $a \\ne 1$; $M, N > 0$; $k$ — любое действительное число:

**Свойство 1 — логарифм произведения:**
$$\\log_a(M \\cdot N) = \\log_a M + \\log_a N$$

**Свойство 2 — логарифм частного:**
$$\\log_a\\left(\\frac{M}{N}\\right) = \\log_a M - \\log_a N$$

**Свойство 3 — логарифм степени:**
$$\\log_a M^k = k \\cdot \\log_a M$$

**Частные случаи:**
* $\\log_a 1 = 0$ для любого допустимого $a$
* $\\log_a a = 1$
* $a^{\\log_a M} = M$ (основное тождество логарифмирования)`
      },
      {
        heading: '3. Формула перехода к другому основанию',
        content: `$$\\log_a b = \\frac{\\log_c b}{\\log_c a}$$

Это позволяет вычислять логарифмы с любым основанием через, например, десятичные или натуральные логарифмы.

**Частный случай:**
$$\\log_a b = \\frac{1}{\\log_b a}$$

**Пример:** Вычислим $\\log_4 32$:

Способ 1: $\\log_4 32 = \\log_4 2^5 = 5 \\cdot \\log_4 2 = 5 \\cdot \\frac{\\log_2 2}{\\log_2 4} = 5 \\cdot \\frac{1}{2} = \\frac{5}{2}$

Проверка: $4^{5/2} = (2^2)^{5/2} = 2^5 = 32$ ✓`
      },
      {
        heading: '4. Вычисление логарифмических выражений',
        content: `**Алгоритм вычисления $\\log_a b$:**
1. Представить $b$ как степень $a$: $b = a^k$.
2. Тогда $\\log_a b = k$.

**Примеры упрощения:**
* $\\log_2 32 + \\log_2 2 = \\log_2(32 \\cdot 2) = \\log_2 64 = 6$
* $\\log_3 81 - \\log_3 9 = \\log_3(81/9) = \\log_3 9 = 2$
* $\\log_5 \\sqrt{5} = \\log_5 5^{1/2} = \\frac{1}{2}$

**ОДЗ логарифма:** аргумент логарифма строго больше нуля: $\\log_a b$ определён только при $b > 0$.`
      }
    ],
    rules: [
      'log_a(M·N) = log_a M + log_a N — логарифм произведения',
      'log_a(M/N) = log_a M − log_a N — логарифм частного',
      'log_a M^k = k · log_a M — логарифм степени',
      'log_a 1 = 0 и log_a a = 1 — базовые значения'
    ]
  },

  tests: [
    {
      id: 1,
      question: 'Вычислите: log₂ 8',
      options: ['2', '3', '4', '8'],
      correct: 1,
      explanation: 'log₂ 8 = 3, так как 2³ = 8.'
    },
    {
      id: 2,
      question: 'Вычислите: log₃ 81',
      options: ['3', '4', '5', '8'],
      correct: 1,
      explanation: 'log₃ 81 = 4, так как 3⁴ = 81.'
    },
    {
      id: 3,
      question: 'Вычислите: log₅ 1',
      options: ['0', '1', '5', 'Не определён'],
      correct: 0,
      explanation: 'log₅ 1 = 0, так как 5⁰ = 1. Логарифм единицы по любому основанию = 0.'
    },
    {
      id: 4,
      question: 'Вычислите: log₇ 7',
      options: ['0', '1', '7', '49'],
      correct: 1,
      explanation: 'log₇ 7 = 1, так как 7¹ = 7. Логарифм числа по самому себе всегда = 1.'
    },
    {
      id: 5,
      question: 'Вычислите: log₂ 32',
      options: ['3', '4', '5', '6'],
      correct: 2,
      explanation: 'log₂ 32 = 5, так как 2⁵ = 32.'
    },
    {
      id: 6,
      question: 'Упростите: log₃ 9 + log₃ 3',
      options: ['log₃ 12', '3', '2', '5'],
      correct: 1,
      explanation: 'log₃ 9 + log₃ 3 = log₃(9·3) = log₃ 27 = 3.'
    },
    {
      id: 7,
      question: 'Упростите: log₂ 32 − log₂ 4',
      options: ['3', '5', '8', '2'],
      correct: 0,
      explanation: 'log₂ 32 − log₂ 4 = log₂(32/4) = log₂ 8 = 3.'
    },
    {
      id: 8,
      question: 'Упростите: log₅ 5³',
      options: ['5', '3', '15', '1'],
      correct: 1,
      explanation: 'log₅ 5³ = 3·log₅ 5 = 3·1 = 3.'
    },
    {
      id: 9,
      question: 'Вычислите: log₄ 64',
      options: ['2', '3', '4', '6'],
      correct: 1,
      explanation: 'log₄ 64 = 3, так как 4³ = 64.'
    },
    {
      id: 10,
      question: 'Вычислите: log₁₀ 1000',
      options: ['2', '3', '4', '10'],
      correct: 1,
      explanation: 'log₁₀ 1000 = 3, так как 10³ = 1000.'
    },
    {
      id: 11,
      question: 'Чему равно: log₂ √8?',
      options: ['1', '1,5', '2', '3'],
      correct: 1,
      explanation: 'log₂ √8 = log₂ 8^(1/2) = (1/2)·log₂ 8 = (1/2)·3 = 3/2 = 1,5.'
    },
    {
      id: 12,
      question: 'Вычислите: 2^(log₂ 5)',
      options: ['2', '5', '25', '10'],
      correct: 1,
      explanation: 'По основному тождеству: a^(log_a M) = M. Так что 2^(log₂ 5) = 5.'
    },
    {
      id: 13,
      question: 'Вычислите: log₃ (1/9)',
      options: ['2', '−2', '3', '−3'],
      correct: 1,
      explanation: 'log₃ (1/9) = log₃ 3⁻² = −2.'
    },
    {
      id: 14,
      question: 'Вычислите: log₂ 4 + log₂ 8',
      options: ['5', '6', '10', '32'],
      correct: 0,
      explanation: 'log₂ 4 = 2; log₂ 8 = 3; 2+3 = 5. Или: log₂(4·8) = log₂ 32 = 5.'
    },
    {
      id: 15,
      question: 'Вычислите: log₁₀ 10 000',
      options: ['3', '4', '5', '10'],
      correct: 1,
      explanation: 'log₁₀ 10000 = log₁₀ 10⁴ = 4.'
    },
    {
      id: 16,
      question: 'При каком значении x выполняется: 2^x = 16?',
      options: ['2', '3', '4', '8'],
      correct: 2,
      explanation: '2^x = 16 = 2⁴ → x = 4. Значит log₂ 16 = 4.'
    },
    {
      id: 17,
      question: 'log₃ 27 − log₃ 3 = ?',
      options: ['1', '2', '3', '9'],
      correct: 1,
      explanation: 'log₃ 27 − log₃ 3 = log₃(27/3) = log₃ 9 = 2.'
    },
    {
      id: 18,
      question: 'Вычислите: 3 · log₂ 4',
      options: ['4', '6', '8', '12'],
      correct: 1,
      explanation: '3 · log₂ 4 = 3·2 = 6.'
    },
    {
      id: 19,
      question: 'Вычислите: log₅ 25',
      options: ['1', '2', '5', '10'],
      correct: 1,
      explanation: 'log₅ 25 = 2, так как 5² = 25.'
    },
    {
      id: 20,
      question: 'Вычислите: log₄ 2',
      options: ['1/4', '1/2', '1', '2'],
      correct: 1,
      explanation: 'log₄ 2 = x → 4^x = 2 → 2^(2x) = 2^1 → x = 1/2.'
    },
    {
      id: 21,
      question: 'Вычислите: log₂ (8 · 4)',
      options: ['5', '6', '7', '32'],
      correct: 0,
      explanation: 'log₂ (8·4) = log₂ 32 = 5. Или: log₂ 8 + log₂ 4 = 3+2 = 5.'
    },
    {
      id: 22,
      question: 'Допустимые значения аргумента логарифма — это...',
      options: ['Любые числа', 'Числа ≥ 0', 'Только натуральные числа', 'Числа > 0'],
      correct: 3,
      explanation: 'Аргумент логарифма должен быть строго больше нуля: b > 0.'
    },
    {
      id: 23,
      question: 'Вычислите: log₁₀ 0,001',
      options: ['−3', '−2', '3', '0,001'],
      correct: 0,
      explanation: 'log₁₀ 0,001 = log₁₀ 10⁻³ = −3.'
    },
    {
      id: 24,
      question: 'Упростите: log₆ (36·216)',
      options: ['4', '5', '6', '7776'],
      correct: 1,
      explanation: 'log₆ 36 + log₆ 216 = 2+3 = 5. (6²=36, 6³=216)'
    },
    {
      id: 25,
      question: 'Вычислите: log₂ 2^7',
      options: ['2', '7', '14', '128'],
      correct: 1,
      explanation: 'log₂ 2^7 = 7·log₂ 2 = 7·1 = 7.'
    },
    {
      id: 26,
      question: 'log₂ 1/4 = ?',
      options: ['2', '−2', '4', '1/2'],
      correct: 1,
      explanation: 'log₂ (1/4) = log₂ 2⁻² = −2.'
    },
    {
      id: 27,
      question: 'Вычислите: log₃ 3^(1/2)',
      options: ['0', '1/2', '1', '3'],
      correct: 1,
      explanation: 'log₃ 3^(1/2) = 1/2 · log₃ 3 = 1/2.'
    },
    {
      id: 28,
      question: 'Упростите: log_a (M · N · K)',
      options: ['log_a M · log_a N · log_a K', 'log_a M + log_a N + log_a K', '3 log_a MNK', 'log_a (M+N+K)'],
      correct: 1,
      explanation: 'По свойству: log_a(MNK) = log_a M + log_a N + log_a K.'
    },
    {
      id: 29,
      question: 'Вычислите: log₄ 4⁵',
      options: ['4', '5', '20', '1'],
      correct: 1,
      explanation: 'log₄ 4⁵ = 5·log₄ 4 = 5·1 = 5.'
    },
    {
      id: 30,
      question: 'Если log_a b = 3, то log_a b² = ?',
      options: ['6', '9', '3', '1,5'],
      correct: 0,
      explanation: 'log_a b² = 2·log_a b = 2·3 = 6.'
    }
  ]
}
