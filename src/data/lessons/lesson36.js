export const lesson36 = {
  id: 36,
  moduleId: 10,
  moduleTitle: 'Модуль 10: Комплексные числа и многочлены',
  title: 'Урок 36: Тригонометрическая форма комплексного числа',
  subtitle: 'Модуль и аргумент, формула Муавра, умножение и деление в тригонометрической форме',
  duration: '45 мин видео + 30 тестов',
  difficulty: 'Сложный',
  youtubeId: 'RZNQo_5PdYs',
  summary: 'Изучаем тригонометрическую форму записи комплексных чисел. Вводим понятия модуля и аргумента, учимся переводить числа из алгебраической формы в тригонометрическую и обратно. Рассматриваем умножение и деление комплексных чисел в тригонометрической форме, а также знаменитую формулу Муавра для возведения в степень.',
  videoTimecodes: [
    { time: '00:00', label: 'Введение: зачем нужна тригонометрическая форма' },
    { time: '06:30', label: 'Модуль и аргумент комплексного числа' },
    { time: '14:00', label: 'Перевод из алгебраической в тригонометрическую форму' },
    { time: '24:00', label: 'Умножение и деление в тригонометрической форме' },
    { time: '33:00', label: 'Формула Муавра: возведение в степень' },
    { time: '41:00', label: 'Извлечение корней из комплексных чисел' },
  ],
  theory: {
    sections: [
      {
        heading: '1. Модуль и аргумент комплексного числа',
        content: `Любое комплексное число $z = a + bi$ можно изобразить точкой $(a, b)$ на комплексной плоскости. 

**Модуль** числа $z$ — это расстояние от начала координат до точки $(a, b)$:
$$|z| = r = \\sqrt{a^2 + b^2}$$

**Аргумент** числа $z$ — это угол $\\varphi$ между положительным направлением вещественной оси и вектором $\\overrightarrow{Oz}$:
$$\\varphi = \\arg(z)$$

Аргумент определён с точностью до $2\\pi k$, $k \\in \\mathbb{Z}$. Главным аргументом называют $\\varphi \\in (-\\pi, \\pi]$.

Для нахождения аргумента используют формулы:
$$\\cos\\varphi = \\frac{a}{r}, \\quad \\sin\\varphi = \\frac{b}{r}$$

**Пример:** Для $z = 1 + i\\sqrt{3}$:
$r = \\sqrt{1 + 3} = 2$, $\\cos\\varphi = \\frac{1}{2}$, $\\sin\\varphi = \\frac{\\sqrt{3}}{2}$, поэтому $\\varphi = \\frac{\\pi}{3}$.`
      },
      {
        heading: '2. Тригонометрическая форма комплексного числа',
        content: `Поскольку $a = r\\cos\\varphi$ и $b = r\\sin\\varphi$, комплексное число можно записать в виде:
$$z = r(\\cos\\varphi + i\\sin\\varphi)$$

Это и есть **тригонометрическая форма** (или полярная форма).

Иногда пишут кратко: $z = r \\cdot \\text{cis}\\,\\varphi$.

**Алгоритм перевода из $z = a + bi$:**
1. Вычислить $r = \\sqrt{a^2 + b^2}$
2. Определить четверть по знакам $a$ и $b$
3. Найти $\\varphi$: $\\tan\\varphi = b/a$ (учитывая четверть)
4. Записать $z = r(\\cos\\varphi + i\\sin\\varphi)$

**Примеры:**
- $z = -1 - i$: $r = \\sqrt{2}$, $\\varphi = -\\frac{3\\pi}{4}$ (III четверть), $z = \\sqrt{2}\\left(\\cos\\left(-\\frac{3\\pi}{4}\\right) + i\\sin\\left(-\\frac{3\\pi}{4}\\right)\\right)$
- $z = -2$: $r = 2$, $\\varphi = \\pi$, $z = 2(\\cos\\pi + i\\sin\\pi)$`
      },
      {
        heading: '3. Умножение и деление в тригонометрической форме',
        content: `Пусть $z_1 = r_1(\\cos\\varphi_1 + i\\sin\\varphi_1)$ и $z_2 = r_2(\\cos\\varphi_2 + i\\sin\\varphi_2)$.

**Умножение:** При умножении модули перемножаются, а аргументы складываются:
$$z_1 \\cdot z_2 = r_1 r_2 \\bigl(\\cos(\\varphi_1 + \\varphi_2) + i\\sin(\\varphi_1 + \\varphi_2)\\bigr)$$

**Деление:** При делении модули делятся, а аргументы вычитаются:
$$\\frac{z_1}{z_2} = \\frac{r_1}{r_2}\\bigl(\\cos(\\varphi_1 - \\varphi_2) + i\\sin(\\varphi_1 - \\varphi_2)\\bigr)$$

Это намного удобнее, чем умножение в алгебраической форме!

**Пример:** $z_1 = 2\\left(\\cos\\frac{\\pi}{6} + i\\sin\\frac{\\pi}{6}\\right)$, $z_2 = 3\\left(\\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3}\\right)$

$z_1 z_2 = 6\\left(\\cos\\frac{\\pi}{2} + i\\sin\\frac{\\pi}{2}\\right) = 6i$`
      },
      {
        heading: '4. Формула Муавра и извлечение корней',
        content: `**Формула Муавра:** Для $z = r(\\cos\\varphi + i\\sin\\varphi)$ и целого $n$:
$$z^n = r^n(\\cos n\\varphi + i\\sin n\\varphi)$$

Это позволяет легко возводить комплексные числа в степень.

**Пример:** $(1 + i)^8$. Запишем $1 + i = \\sqrt{2}\\left(\\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4}\\right)$.
$(1+i)^8 = (\\sqrt{2})^8\\left(\\cos 2\\pi + i\\sin 2\\pi\\right) = 16 \\cdot 1 = 16$.

**Корни $n$-й степени:** Уравнение $w^n = z$ имеет ровно $n$ корней:
$$w_k = \\sqrt[n]{r}\\left(\\cos\\frac{\\varphi + 2\\pi k}{n} + i\\sin\\frac{\\varphi + 2\\pi k}{n}\\right), \\quad k = 0, 1, \\ldots, n-1$$

Корни расположены равномерно на окружности радиуса $\\sqrt[n]{r}$.`
      }
    ],
    rules: [
      'Модуль произведения равен произведению модулей: $|z_1 z_2| = |z_1| \\cdot |z_2|$',
      'Аргумент произведения равен сумме аргументов: $\\arg(z_1 z_2) = \\arg z_1 + \\arg z_2$ (mod $2\\pi$)',
      'Формула Муавра: $[r(\\cos\\varphi + i\\sin\\varphi)]^n = r^n(\\cos n\\varphi + i\\sin n\\varphi)$',
      'Уравнение $w^n = z$ имеет ровно $n$ различных комплексных корней'
    ]
  },
  tests: [
    { id: 1, question: 'Найдите модуль числа $z = 3 + 4i$', options: ['5', '7', '$\\sqrt{7}$', '25'], correct: 0, explanation: '$|z| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$' },
    { id: 2, question: 'Найдите модуль числа $z = -5i$', options: ['$-5$', '$5$', '$0$', '$25$'], correct: 1, explanation: '$|-5i| = \\sqrt{0^2 + (-5)^2} = 5$' },
    { id: 3, question: 'Каков аргумент числа $z = i$?', options: ['$0$', '$\\frac{\\pi}{2}$', '$\\pi$', '$\\frac{3\\pi}{2}$'], correct: 1, explanation: 'Число $i$ лежит на положительной мнимой полуоси, поэтому $\\arg(i) = \\frac{\\pi}{2}$' },
    { id: 4, question: 'Каков аргумент числа $z = -1$?', options: ['$0$', '$\\frac{\\pi}{2}$', '$\\pi$', '$2\\pi$'], correct: 2, explanation: '$-1$ лежит на отрицательной вещественной полуоси, $\\arg(-1) = \\pi$' },
    { id: 5, question: 'Запишите в тригонометрической форме: $z = 1 + i$', options: ['$\\sqrt{2}(\\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4})$', '$2(\\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4})$', '$\\sqrt{2}(\\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3})$', '$1(\\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4})$'], correct: 0, explanation: '$r = \\sqrt{1^2+1^2} = \\sqrt{2}$; $\\varphi = \\frac{\\pi}{4}$. Итог: $\\sqrt{2}(\\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4})$' },
    { id: 6, question: 'Запишите в тригонометрической форме: $z = -\\sqrt{3} + i$', options: ['$2(\\cos\\frac{5\\pi}{6} + i\\sin\\frac{5\\pi}{6})$', '$2(\\cos\\frac{\\pi}{6} + i\\sin\\frac{\\pi}{6})$', '$\\sqrt{2}(\\cos\\frac{3\\pi}{4} + i\\sin\\frac{3\\pi}{4})$', '$2(\\cos\\frac{2\\pi}{3} + i\\sin\\frac{2\\pi}{3})$'], correct: 0, explanation: '$r = \\sqrt{3+1} = 2$; $\\cos\\varphi = -\\frac{\\sqrt{3}}{2}$, $\\sin\\varphi = \\frac{1}{2}$, значит $\\varphi = \\frac{5\\pi}{6}$' },
    { id: 7, question: 'Переведите в алгебраическую форму: $z = 2(\\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3})$', options: ['$1 + i\\sqrt{3}$', '$\\sqrt{3} + i$', '$1 + i$', '$2 + 2i$'], correct: 0, explanation: '$a = 2\\cos\\frac{\\pi}{3} = 2 \\cdot \\frac{1}{2} = 1$; $b = 2\\sin\\frac{\\pi}{3} = 2 \\cdot \\frac{\\sqrt{3}}{2} = \\sqrt{3}$. Итог: $1 + i\\sqrt{3}$' },
    { id: 8, question: 'Если $z_1 = 3(\\cos 40° + i\\sin 40°)$ и $z_2 = 2(\\cos 50° + i\\sin 50°)$, найдите $z_1 z_2$', options: ['$6(\\cos 90° + i\\sin 90°)$', '$6(\\cos 10° + i\\sin 10°)$', '$5(\\cos 90° + i\\sin 90°)$', '$6(\\cos 2000° + i\\sin 2000°)$'], correct: 0, explanation: 'При умножении: $r = 3 \\cdot 2 = 6$, $\\varphi = 40° + 50° = 90°$' },
    { id: 9, question: 'Если $z_1 = 6(\\cos 100° + i\\sin 100°)$ и $z_2 = 2(\\cos 40° + i\\sin 40°)$, найдите $z_1/z_2$', options: ['$3(\\cos 60° + i\\sin 60°)$', '$3(\\cos 140° + i\\sin 140°)$', '$4(\\cos 60° + i\\sin 60°)$', '$8(\\cos 60° + i\\sin 60°)$'], correct: 0, explanation: 'При делении: $r = 6/2 = 3$, $\\varphi = 100° - 40° = 60°$' },
    { id: 10, question: 'Вычислите $(1+i)^4$ используя формулу Муавра', options: ['$-4$', '$4$', '$4i$', '$-4i$'], correct: 0, explanation: '$1+i = \\sqrt{2}(\\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4})$; $(1+i)^4 = (\\sqrt{2})^4(\\cos\\pi + i\\sin\\pi) = 4(-1) = -4$' },
    { id: 11, question: 'Вычислите $\\left(\\cos\\frac{\\pi}{6} + i\\sin\\frac{\\pi}{6}\\right)^{12}$', options: ['$1$', '$-1$', '$i$', '$-i$'], correct: 0, explanation: 'По формуле Муавра: $\\cos\\frac{12\\pi}{6} + i\\sin\\frac{12\\pi}{6} = \\cos 2\\pi + i\\sin 2\\pi = 1$' },
    { id: 12, question: 'Сколько корней 5-й степени из комплексного числа существует?', options: ['1', '2', '5', '10'], correct: 2, explanation: 'Уравнение $w^n = z$ для $n = 5$ имеет ровно $n = 5$ различных комплексных корней' },
    { id: 13, question: 'Найдите $|z_1 z_2|$, если $|z_1| = 4$ и $|z_2| = 3$', options: ['$12$', '$7$', '$1$', '$\\frac{4}{3}$'], correct: 0, explanation: '$|z_1 z_2| = |z_1| \\cdot |z_2| = 4 \\cdot 3 = 12$' },
    { id: 14, question: 'Каков аргумент числа $z = -i$?', options: ['$\\frac{\\pi}{2}$', '$-\\frac{\\pi}{2}$', '$\\pi$', '$0$'], correct: 1, explanation: '$-i$ лежит на отрицательной мнимой полуоси, $\\arg(-i) = -\\frac{\\pi}{2}$' },
    { id: 15, question: 'Найдите $|z^3|$, если $|z| = 2$', options: ['$6$', '$8$', '$4$', '$2$'], correct: 1, explanation: '$|z^3| = |z|^3 = 2^3 = 8$' },
    { id: 16, question: 'Вычислите $i^{100}$', options: ['$1$', '$-1$', '$i$', '$-i$'], correct: 0, explanation: 'Степени $i$ цикличны с периодом 4. $100 = 4 \\cdot 25$, значит $i^{100} = (i^4)^{25} = 1^{25} = 1$' },
    { id: 17, question: 'Запишите в тригонометрической форме: $z = -2i$', options: ['$2(\\cos\\frac{3\\pi}{2} + i\\sin\\frac{3\\pi}{2})$', '$2(\\cos\\frac{\\pi}{2} + i\\sin\\frac{\\pi}{2})$', '$2(\\cos\\pi + i\\sin\\pi)$', '$-2(\\cos 0 + i\\sin 0)$'], correct: 0, explanation: '$r = 2$; $-2i$ лежит на отрицательной мнимой оси, $\\varphi = \\frac{3\\pi}{2}$ или $-\\frac{\\pi}{2}$' },
    { id: 18, question: 'Пусть $z = r(\\cos\\varphi + i\\sin\\varphi)$. Чему равно $\\bar{z}$ (сопряжённое) в тригонометрической форме?', options: ['$r(\\cos\\varphi - i\\sin\\varphi)$', '$r(\\cos(-\\varphi) + i\\sin(-\\varphi))$', 'Оба варианта верны', '$r(\\cos(\\pi-\\varphi) + i\\sin(\\pi-\\varphi))$'], correct: 2, explanation: '$\\cos(-\\varphi) = \\cos\\varphi$, $\\sin(-\\varphi) = -\\sin\\varphi$. Оба варианта эквивалентны и равны $\\bar{z}$' },
    { id: 19, question: 'Найдите $\\arg(z_1 z_2)$, если $\\arg z_1 = \\frac{\\pi}{4}$ и $\\arg z_2 = \\frac{3\\pi}{4}$', options: ['$\\pi$', '$\\frac{\\pi}{2}$', '$\\frac{3\\pi^2}{16}$', '$\\frac{\\pi}{3}$'], correct: 0, explanation: '$\\arg(z_1 z_2) = \\arg z_1 + \\arg z_2 = \\frac{\\pi}{4} + \\frac{3\\pi}{4} = \\pi$' },
    { id: 20, question: 'Найдите $z^6$, если $z = \\cos\\frac{\\pi}{3} + i\\sin\\frac{\\pi}{3}$', options: ['$1$', '$-1$', '$i$', '$-1+i$'], correct: 0, explanation: '$z^6 = \\cos(6 \\cdot \\frac{\\pi}{3}) + i\\sin(6 \\cdot \\frac{\\pi}{3}) = \\cos 2\\pi + i\\sin 2\\pi = 1$' },
    { id: 21, question: 'Корни уравнения $w^3 = 1$ расположены в вершинах правильного...', options: ['Треугольника', 'Квадрата', 'Пятиугольника', 'Шестиугольника'], correct: 0, explanation: 'Три кубических корня из 1 равноудалены от начала координат и расположены в вершинах правильного треугольника' },
    { id: 22, question: 'Найдите $|z|$, если $z = \\cos\\frac{\\pi}{5} + i\\sin\\frac{\\pi}{5}$', options: ['$1$', '$\\frac{\\pi}{5}$', '$\\cos\\frac{\\pi}{5}$', '$2$'], correct: 0, explanation: 'Если $r = 1$ (что здесь и есть), то $|z| = 1$. Это числа на единичной окружности' },
    { id: 23, question: 'Вычислите $(\\sqrt{3} + i)^6$', options: ['$-64$', '$64$', '$64i$', '$-64i$'], correct: 0, explanation: '$\\sqrt{3}+i = 2(\\cos\\frac{\\pi}{6}+i\\sin\\frac{\\pi}{6})$. $(2)^6 = 64$; $6 \\cdot \\frac{\\pi}{6} = \\pi$. Итог: $64(\\cos\\pi + i\\sin\\pi) = -64$' },
    { id: 24, question: 'Найдите вещественную часть $z = 5(\\cos 120° + i\\sin 120°)$', options: ['$-\\frac{5}{2}$', '$\\frac{5}{2}$', '$\\frac{5\\sqrt{3}}{2}$', '$5$'], correct: 0, explanation: '$\\text{Re}(z) = 5\\cos 120° = 5 \\cdot (-\\frac{1}{2}) = -\\frac{5}{2}$' },
    { id: 25, question: 'Если $z_1 = r_1(\\cos\\varphi_1 + i\\sin\\varphi_1)$ и $z_2 = r_2(\\cos\\varphi_2 + i\\sin\\varphi_2)$, то $|z_1/z_2|$ равно:', options: ['$r_1/r_2$', '$r_1 - r_2$', '$r_1 r_2$', '$r_1/r_2 \\cdot (\\varphi_1 - \\varphi_2)$'], correct: 0, explanation: '$|z_1/z_2| = |z_1|/|z_2| = r_1/r_2$' },
    { id: 26, question: 'Вычислите $i^{23}$', options: ['$1$', '$-1$', '$i$', '$-i$'], correct: 3, explanation: '$23 = 4 \\cdot 5 + 3$, значит $i^{23} = i^3 = -i$' },
    { id: 27, question: 'Запишите в тригонометрической форме: $z = -1 + i$', options: ['$\\sqrt{2}(\\cos\\frac{3\\pi}{4} + i\\sin\\frac{3\\pi}{4})$', '$\\sqrt{2}(\\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4})$', '$2(\\cos\\frac{3\\pi}{4} + i\\sin\\frac{3\\pi}{4})$', '$\\sqrt{2}(\\cos\\frac{5\\pi}{4} + i\\sin\\frac{5\\pi}{4})$'], correct: 0, explanation: '$r = \\sqrt{1+1} = \\sqrt{2}$; $a < 0$, $b > 0$ — II четверть; $\\varphi = \\frac{3\\pi}{4}$' },
    { id: 28, question: 'Формула Эйлера связывает тригонометрическую форму с показательной: $e^{i\\varphi}$ равно:', options: ['$\\cos\\varphi + i\\sin\\varphi$', '$\\cos\\varphi - i\\sin\\varphi$', '$e^{\\cos\\varphi}$', '$i(\\cos\\varphi + \\sin\\varphi)$'], correct: 0, explanation: 'Формула Эйлера: $e^{i\\varphi} = \\cos\\varphi + i\\sin\\varphi$' },
    { id: 29, question: 'Используя формулу Муавра, $\\left(2(\\cos\\frac{\\pi}{4}+i\\sin\\frac{\\pi}{4})\\right)^4$ равно:', options: ['$-4$', '$-16$', '$16i$', '$4i$'], correct: 1, explanation: '$2^4 = 16$; $\\cos(4 \\cdot \\frac{\\pi}{4}) + i\\sin(4 \\cdot \\frac{\\pi}{4}) = \\cos\\pi + i\\sin\\pi = -1$. Итог: $16 \\cdot (-1) = -16$' },
    { id: 30, question: 'Среди корней уравнения $w^4 = 16$, сколько корней является вещественными?', options: ['1', '2', '4', '0'], correct: 1, explanation: '$w^4 = 16$ имеет корни $w_0 = 2$, $w_1 = 2i$, $w_2 = -2$, $w_3 = -2i$. Вещественных корней 2: $w = 2$ и $w = -2$' },
  ]
}
