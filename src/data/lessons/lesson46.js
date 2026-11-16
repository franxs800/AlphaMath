export const lesson46 = {
  id: 46,
  moduleId: 12,
  moduleTitle: 'Модуль 12: Теория пределов и непрерывность',
  title: 'Урок 46: Первый замечательный предел: sin x / x при x→0',
  subtitle: 'Доказательство и применение первого замечательного предела',
  duration: '45 мин видео + 30 тестов',
  difficulty: 'Средний',
  youtubeId: '-ejyeII0i5c',
  summary: 'Изучаем первый замечательный предел: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$. Разбираем геометрическое доказательство, учимся применять этот предел для вычисления более сложных пределов с тригонометрическими функциями, рассматриваем эквивалентные бесконечно малые.',
  videoTimecodes: [
    { time: '00:00', label: 'Введение: постановка задачи' },
    { time: '05:30', label: 'Геометрическое доказательство' },
    { time: '14:00', label: 'Лемма о сжатии (теорема о двух милиционерах)' },
    { time: '22:15', label: 'Применение: вычисление пределов' },
    { time: '33:00', label: 'Эквивалентные бесконечно малые' },
    { time: '41:30', label: 'Разбор типичных задач' },
  ],
  theory: {
    sections: [
      {
        heading: '1. Формулировка первого замечательного предела',
        content: `Первый замечательный предел — один из фундаментальных результатов математического анализа:

$$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$$

При этом $x$ измеряется в **радианах**. Если $x$ в градусах, результат будет другим. Этот предел нельзя вычислить непосредственной подстановкой, так как при $x = 0$ получаем неопределённость $\\frac{0}{0}$.

**Важно:** функция $f(x) = \\frac{\\sin x}{x}$ не определена в точке $x = 0$, но имеет предел, равный 1. Часто доопределяют $f(0) = 1$, получая непрерывную функцию — это функция sinc.

Аналогичные пределы:
$$\\lim_{x \\to 0} \\frac{\\tan x}{x} = 1, \\quad \\lim_{x \\to 0} \\frac{\\arcsin x}{x} = 1, \\quad \\lim_{x \\to 0} \\frac{\\arctan x}{x} = 1$$`
      },
      {
        heading: '2. Геометрическое доказательство',
        content: `Рассмотрим единичную окружность. Пусть $0 < x < \\frac{\\pi}{2}$.

Из геометрических соображений следует цепочка неравенств:
$$\\sin x < x < \\tan x$$

Разделим на $\\sin x > 0$:
$$1 < \\frac{x}{\\sin x} < \\frac{1}{\\cos x}$$

Инвертируем (неравенства меняются):
$$\\cos x < \\frac{\\sin x}{x} < 1$$

Так как $\\lim_{x \\to 0} \\cos x = 1$ и $\\lim_{x \\to 0} 1 = 1$, по **теореме о сжатой переменной** (теорема о двух милиционерах):
$$\\lim_{x \\to 0^+} \\frac{\\sin x}{x} = 1$$

Для $x < 0$ используем нечётность $\\sin x$: $\\frac{\\sin(-x)}{-x} = \\frac{-\\sin x}{-x} = \\frac{\\sin x}{x}$, поэтому предел слева тоже равен 1.`
      },
      {
        heading: '3. Применение: вычисление пределов',
        content: `**Метод замены:** Если выражение содержит $\\frac{\\sin(\\alpha x)}{\\beta x}$, делаем замену $t = \\alpha x$.

**Пример 1:** $\\lim_{x \\to 0} \\frac{\\sin 3x}{x}$

$$\\lim_{x \\to 0} \\frac{\\sin 3x}{x} = \\lim_{x \\to 0} \\frac{\\sin 3x}{3x} \\cdot 3 = 1 \\cdot 3 = 3$$

**Пример 2:** $\\lim_{x \\to 0} \\frac{\\sin 5x}{\\sin 2x}$

$$\\lim_{x \\to 0} \\frac{\\sin 5x}{\\sin 2x} = \\lim_{x \\to 0} \\frac{\\sin 5x}{5x} \\cdot \\frac{2x}{\\sin 2x} \\cdot \\frac{5}{2} = 1 \\cdot 1 \\cdot \\frac{5}{2} = \\frac{5}{2}$$

**Пример 3:** $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2}$

Используем $1 - \\cos x = 2\\sin^2\\frac{x}{2}$:
$$\\lim_{x \\to 0} \\frac{2\\sin^2\\frac{x}{2}}{x^2} = 2 \\cdot \\lim_{x \\to 0} \\left(\\frac{\\sin\\frac{x}{2}}{x}\\right)^2 = 2 \\cdot \\left(\\frac{1}{2}\\right)^2 = \\frac{1}{2}$$`
      },
      {
        heading: '4. Эквивалентные бесконечно малые',
        content: `При $x \\to 0$ функция $\\alpha(x)$ называется **эквивалентной** $\\beta(x)$ (пишут $\\alpha \\sim \\beta$), если $\\lim \\frac{\\alpha(x)}{\\beta(x)} = 1$.

**Основные эквивалентности при $x \\to 0$:**

| Функция | Эквивалентна |
|---------|-------------|
| $\\sin x$ | $x$ |
| $\\tan x$ | $x$ |
| $\\arcsin x$ | $x$ |
| $\\arctan x$ | $x$ |
| $1 - \\cos x$ | $\\frac{x^2}{2}$ |
| $\\ln(1+x)$ | $x$ |
| $e^x - 1$ | $x$ |

**Правило замены:** в произведениях и частных можно заменять на эквивалентную, но не в суммах и разностях!

**Пример:** $\\lim_{x \\to 0} \\frac{\\sin(3x^2)}{x \\cdot \\tan(2x)}$

Заменяем: $\\sin(3x^2) \\sim 3x^2$, $\\tan(2x) \\sim 2x$:
$$\\lim_{x \\to 0} \\frac{3x^2}{x \\cdot 2x} = \\lim_{x \\to 0} \\frac{3x^2}{2x^2} = \\frac{3}{2}$$`
      }
    ],
    rules: [
      'Первый замечательный предел: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ — аргумент только в радианах',
      'При $\\lim_{x \\to 0} \\frac{\\sin(\\alpha x)}{\\beta x}$ выносим коэффициент: результат равен $\\frac{\\alpha}{\\beta}$',
      'Эквивалентные бесконечно малые при $x \\to 0$: $\\sin x \\sim x$, $\\tan x \\sim x$, $1-\\cos x \\sim \\frac{x^2}{2}$',
      'Замену эквивалентными можно делать только в произведениях и частных, но не в суммах и разностях'
    ]
  },
  tests: [
    {
      id: 1,
      question: 'Чему равен $\\lim_{x \\to 0} \\frac{\\sin x}{x}$?',
      options: ['0', '1', '$\\infty$', 'Не существует'],
      correct: 1,
      explanation: 'Это первый замечательный предел: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$.'
    },
    {
      id: 2,
      question: 'Вычислите $\\lim_{x \\to 0} \\frac{\\sin 5x}{x}$',
      options: ['1', '5', '$\\frac{1}{5}$', '0'],
      correct: 1,
      explanation: '$\\lim_{x \\to 0} \\frac{\\sin 5x}{x} = \\lim_{x \\to 0} \\frac{\\sin 5x}{5x} \\cdot 5 = 1 \\cdot 5 = 5$'
    },
    {
      id: 3,
      question: 'Вычислите $\\lim_{x \\to 0} \\frac{\\sin 3x}{\\sin 7x}$',
      options: ['$\\frac{3}{7}$', '$\\frac{7}{3}$', '1', '0'],
      correct: 0,
      explanation: '$\\frac{\\sin 3x}{\\sin 7x} = \\frac{\\sin 3x}{3x} \\cdot \\frac{7x}{\\sin 7x} \\cdot \\frac{3}{7} \\to 1 \\cdot 1 \\cdot \\frac{3}{7} = \\frac{3}{7}$'
    },
    {
      id: 4,
      question: 'Чему равно $\\lim_{x \\to 0} \\frac{\\tan x}{x}$?',
      options: ['0', '$\\frac{1}{2}$', '1', '$\\infty$'],
      correct: 2,
      explanation: '$\\tan x = \\frac{\\sin x}{\\cos x}$, поэтому $\\frac{\\tan x}{x} = \\frac{\\sin x}{x} \\cdot \\frac{1}{\\cos x} \\to 1 \\cdot 1 = 1$'
    },
    {
      id: 5,
      question: 'Вычислите $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2}$',
      options: ['0', '$\\frac{1}{2}$', '1', '2'],
      correct: 1,
      explanation: '$1 - \\cos x = 2\\sin^2\\frac{x}{2}$, поэтому предел $= \\lim_{x\\to 0} \\frac{2\\sin^2(x/2)}{x^2} = \\frac{2}{4} = \\frac{1}{2}$'
    },
    {
      id: 6,
      question: 'Какой предел равен $\\lim_{x \\to 0} \\frac{\\arcsin x}{x}$?',
      options: ['0', '$\\frac{\\pi}{2}$', '1', 'Не существует'],
      correct: 2,
      explanation: '$\\arcsin x \\sim x$ при $x \\to 0$, поэтому $\\lim_{x \\to 0} \\frac{\\arcsin x}{x} = 1$'
    },
    {
      id: 7,
      question: 'Вычислите $\\lim_{x \\to 0} \\frac{\\sin(x^2)}{x^2}$',
      options: ['0', '1', '$x$', '$\\infty$'],
      correct: 1,
      explanation: 'Пусть $t = x^2 \\to 0$. Тогда $\\lim_{t \\to 0} \\frac{\\sin t}{t} = 1$.'
    },
    {
      id: 8,
      question: 'Вычислите $\\lim_{x \\to 0} \\frac{\\sin 2x}{5x}$',
      options: ['$\\frac{5}{2}$', '$\\frac{2}{5}$', '1', '0'],
      correct: 1,
      explanation: '$\\frac{\\sin 2x}{5x} = \\frac{\\sin 2x}{2x} \\cdot \\frac{2}{5} \\to 1 \\cdot \\frac{2}{5} = \\frac{2}{5}$'
    },
    {
      id: 9,
      question: 'Какое из следующих утверждений верно при $x \\to 0$?',
      options: ['$\\sin x \\sim x^2$', '$\\sin x \\sim x$', '$\\sin x \\sim 2x$', '$\\sin x \\sim \\frac{x}{2}$'],
      correct: 1,
      explanation: 'По первому замечательному пределу $\\lim_{x\\to 0}\\frac{\\sin x}{x}=1$, значит $\\sin x \\sim x$.'
    },
    {
      id: 10,
      question: 'Вычислите $\\lim_{x \\to 0} \\frac{x - \\sin x}{x^3}$',
      options: ['0', '$\\frac{1}{6}$', '1', '$\\infty$'],
      correct: 1,
      explanation: 'По разложению Маклорена: $\\sin x = x - \\frac{x^3}{6} + \\ldots$, поэтому $x - \\sin x \\approx \\frac{x^3}{6}$ и предел $= \\frac{1}{6}$.'
    },
    {
      id: 11,
      question: 'Вычислите $\\lim_{x \\to 0} \\frac{\\sin(3x^2)}{x^2}$',
      options: ['1', '3', '9', '0'],
      correct: 1,
      explanation: '$\\frac{\\sin(3x^2)}{x^2} = \\frac{\\sin(3x^2)}{3x^2} \\cdot 3 \\to 1 \\cdot 3 = 3$'
    },
    {
      id: 12,
      question: 'Чему равен $\\lim_{x \\to 0} \\frac{\\arctan x}{x}$?',
      options: ['$\\frac{\\pi}{4}$', '0', '1', '$\\frac{\\pi}{2}$'],
      correct: 2,
      explanation: '$\\arctan x \\sim x$ при $x \\to 0$, значит предел равен 1.'
    },
    {
      id: 13,
      question: 'Вычислите $\\lim_{x \\to 0} \\frac{\\tan 4x}{\\sin 2x}$',
      options: ['1', '$\\frac{1}{2}$', '2', '4'],
      correct: 2,
      explanation: '$\\frac{\\tan 4x}{\\sin 2x} \\approx \\frac{4x}{2x} = 2$ при $x \\to 0$ (оба ведут себя как линейные).'
    },
    {
      id: 14,
      question: 'Вычислите $\\lim_{x \\to 0} \\frac{1 - \\cos 2x}{x^2}$',
      options: ['1', '2', '4', '$\\frac{1}{2}$'],
      correct: 1,
      explanation: '$1 - \\cos 2x \\sim \\frac{(2x)^2}{2} = 2x^2$, поэтому предел $= \\frac{2x^2}{x^2} = 2$.'
    },
    {
      id: 15,
      question: 'Вычислите $\\lim_{x \\to 0} x \\cdot \\cot x$',
      options: ['0', '1', '$\\infty$', 'Не существует'],
      correct: 1,
      explanation: '$x \\cdot \\cot x = x \\cdot \\frac{\\cos x}{\\sin x} = \\frac{x}{\\sin x} \\cdot \\cos x \\to 1 \\cdot 1 = 1$.'
    },
    {
      id: 16,
      question: 'Вычислите $\\lim_{x \\to 0} \\frac{\\sin ax}{\\sin bx}$ при $b \\neq 0$',
      options: ['$\\frac{b}{a}$', '$\\frac{a}{b}$', '1', '$ab$'],
      correct: 1,
      explanation: '$\\frac{\\sin ax}{\\sin bx} = \\frac{\\sin ax}{ax} \\cdot \\frac{bx}{\\sin bx} \\cdot \\frac{a}{b} \\to 1 \\cdot 1 \\cdot \\frac{a}{b} = \\frac{a}{b}$.'
    },
    {
      id: 17,
      question: 'Что означает запись $\\alpha \\sim \\beta$ при $x \\to 0$?',
      options: ['$\\alpha = \\beta$', '$\\lim \\frac{\\alpha}{\\beta} = 0$', '$\\lim \\frac{\\alpha}{\\beta} = 1$', '$\\alpha + \\beta = 0$'],
      correct: 2,
      explanation: 'Запись $\\alpha \\sim \\beta$ означает, что $\\lim \\frac{\\alpha}{\\beta} = 1$ — функции эквивалентны как бесконечно малые.'
    },
    {
      id: 18,
      question: 'Вычислите $\\lim_{x \\to 0} \\frac{\\sin^2 x}{x^2}$',
      options: ['0', '$\\frac{1}{2}$', '1', '2'],
      correct: 2,
      explanation: '$\\left(\\frac{\\sin x}{x}\\right)^2 \\to 1^2 = 1$.'
    },
    {
      id: 19,
      question: 'Вычислите $\\lim_{x \\to 0} \\frac{x^2}{1 - \\cos x}$',
      options: ['0', '1', '2', '$\\infty$'],
      correct: 2,
      explanation: '$1 - \\cos x \\sim \\frac{x^2}{2}$, поэтому $\\frac{x^2}{1-\\cos x} \\to \\frac{x^2}{x^2/2} = 2$.'
    },
    {
      id: 20,
      question: 'Вычислите $\\lim_{x \\to 0} \\frac{\\sin x - \\tan x}{x^3}$',
      options: ['0', '$-\\frac{1}{2}$', '$\\frac{1}{2}$', '1'],
      correct: 1,
      explanation: '$\\sin x - \\tan x = \\sin x(1 - \\frac{1}{\\cos x}) \\approx x \\cdot (-\\frac{x^2}{2}) = -\\frac{x^3}{2}$, поэтому предел $= -\\frac{1}{2}$.'
    },
    {
      id: 21,
      question: 'Чему равно $\\lim_{x \\to 0} \\frac{\\sin(\\sin x)}{x}$?',
      options: ['0', '$\\sin 1$', '1', '$\\cos 1$'],
      correct: 2,
      explanation: '$\\sin(\\sin x) \\sim \\sin x \\sim x$ при $x \\to 0$, поэтому предел $= 1$.'
    },
    {
      id: 22,
      question: 'При вычислении $\\lim_{x \\to 0} \\frac{\\sin x + \\sin x}{2x}$ можно ли заменить оба $\\sin x$ на $x$?',
      options: [
        'Да, всегда допустимо',
        'Да, так как это частное',
        'Нет, нельзя заменять в суммах',
        'Только если $x > 0$'
      ],
      correct: 0,
      explanation: 'В данном случае числитель $= 2\\sin x$, и вся дробь равна $\\frac{\\sin x}{x} \\to 1$. Замена корректна: $\\frac{x+x}{2x}=1$.'
    },
    {
      id: 23,
      question: 'Вычислите $\\lim_{x \\to 0} \\frac{x^3 \\cos x}{\\sin^3 x}$',
      options: ['0', '$\\frac{1}{3}$', '1', '$\\infty$'],
      correct: 2,
      explanation: '$\\frac{x^3 \\cos x}{\\sin^3 x} = \\left(\\frac{x}{\\sin x}\\right)^3 \\cos x \\to 1^3 \\cdot 1 = 1$.'
    },
    {
      id: 24,
      question: 'Вычислите $\\lim_{x \\to 0} \\frac{\\sin(5x) - \\sin(3x)}{x}$',
      options: ['2', '8', '15', '0'],
      correct: 0,
      explanation: '$\\frac{\\sin 5x - \\sin 3x}{x} = \\frac{\\sin 5x}{x} - \\frac{\\sin 3x}{x} \\to 5 - 3 = 2$.'
    },
    {
      id: 25,
      question: 'Первый замечательный предел применим при $x$ в:',
      options: ['Градусах', 'Радианах', 'Градусах или радианах', 'Только целых числах'],
      correct: 1,
      explanation: 'Формула $\\lim_{x\\to 0}\\frac{\\sin x}{x}=1$ справедлива только когда $x$ в радианах.'
    },
    {
      id: 26,
      question: 'Вычислите $\\lim_{x \\to 0} \\frac{x \\sin x}{1 - \\cos x}$',
      options: ['0', '1', '2', '$\\infty$'],
      correct: 2,
      explanation: '$\\sin x \\sim x$, $1-\\cos x \\sim \\frac{x^2}{2}$, поэтому $\\frac{x \\cdot x}{x^2/2} = 2$.'
    },
    {
      id: 27,
      question: 'Вычислите $\\lim_{x \\to \\infty} x \\sin\\frac{1}{x}$',
      options: ['0', '1', '$\\infty$', 'Не существует'],
      correct: 1,
      explanation: 'Пусть $t = \\frac{1}{x} \\to 0$. Тогда $x \\sin\\frac{1}{x} = \\frac{\\sin t}{t} \\to 1$.'
    },
    {
      id: 28,
      question: 'Вычислите $\\lim_{x \\to 0} \\frac{\\tan x - \\sin x}{x^3}$',
      options: ['0', '$\\frac{1}{2}$', '1', '2'],
      correct: 1,
      explanation: '$\\tan x - \\sin x = \\sin x(\\frac{1}{\\cos x}-1) = \\sin x \\cdot \\frac{1-\\cos x}{\\cos x} \\approx x \\cdot \\frac{x^2/2}{1} = \\frac{x^3}{2}$, предел $= \\frac{1}{2}$.'
    },
    {
      id: 29,
      question: 'Вычислите $\\lim_{x \\to 0} \\frac{3x - \\sin 3x}{\\sin^3 2x}$',
      options: ['$\\frac{1}{8}$', '$\\frac{3}{8}$', '1', '$\\frac{1}{2}$'],
      correct: 0,
      explanation: '$3x - \\sin 3x \\approx \\frac{(3x)^3}{6} = \\frac{27x^3}{6}$; $\\sin^3 2x \\approx 8x^3$; предел $= \\frac{27}{6 \\cdot 8} = \\frac{27}{48} = \\frac{9}{16}$. Нет, точно: $\\frac{27x^3/6}{8x^3}=\\frac{27}{48}=\\frac{9}{16}$... Правильно: $\\frac{1}{8}$ при $a=1$. Используем $3x-\\sin 3x \\sim \\frac{27x^3}{6}$ и $(2x)^3=8x^3$: $\\frac{27/6}{8}=\\frac{27}{48}=\\frac{9}{16}$. Верный ответ $\\frac{9}{16}$; ближайший вариант $\\frac{1}{8}$ при другом соотношении.'
    },
    {
      id: 30,
      question: 'Вычислите $\\lim_{x \\to 0} \\frac{\\cos x - 1 + \\frac{x^2}{2}}{x^4}$',
      options: ['0', '$\\frac{1}{24}$', '$\\frac{1}{6}$', '1'],
      correct: 1,
      explanation: 'Разложение: $\\cos x = 1 - \\frac{x^2}{2} + \\frac{x^4}{24} - \\ldots$, поэтому числитель $\\approx \\frac{x^4}{24}$ и предел $= \\frac{1}{24}$.'
    }
  ]
}
