'use client'
export const maleActors = [
  { value: 'null' },
  { value: 'b', id: 3 },
  { value: 'p' },
  { value: 'm' },

  { value: 'f' },
  { value: 'd' },
  { value: 't' },

  { value: 'n' },
  { value: 'l' },

  { value: 'z' },
  { value: 'c' },
  { value: 's' },
  { value: 'zh' },
  { value: 'ch' },
  { value: 'sh', id: 1 },
  { value: 'r', id: 4 },

  { value: 'j' },
  { value: 'q' },
  { value: 'x' },

  { value: 'g', id: 2 },
  { value: 'k' },
  { value: 'h' }
].map(val => {
  return {
    ...val,
    actorType: 'male'
  }
})

export const femaleActors = [
  { value: 'yi' },
  { value: 'bi' },
  { value: 'pi' },
  { value: 'mi' },

  { value: 'di' },
  { value: 'ti' },
  { value: 'ni' },
  { value: 'li' },

  { value: 'ji' },
  { value: 'qi' },
  { value: 'xi' }
].map(val => {
  return {
    ...val,
    actorType: 'female'
  }
})

export const fictionalActors = [
  {
    value: 'wu'
  },
  {
    value: 'bu'
  },
  {
    value: 'pu'
  },
  {
    value: 'mu'
  },
  {
    value: 'fu'
  },
  {
    value: 'du'
  },
  {
    value: 'tu'
  },
  {
    value: 'nu'
  },
  {
    value: 'lu'
  },
  {
    value: 'zu'
  },
  {
    value: 'cu'
  },
  {
    value: 'su'
  },
  {
    value: 'zhu'
  },
  {
    value: 'chu'
  },
  {
    value: 'shu'
  },
  {
    value: 'ru'
  },
  {
    value: 'gu'
  },
  {
    value: 'ku'
  },
  {
    value: 'hu'
  }
].map(val => {
  return {
    ...val,
    actorType: 'fictional'
  }
})

const worldLeaders = [
  {
    value: 'yu'
  },
  {
    value: 'nü'
  },
  {
    value: 'lü'
  },
  {
    value: 'ju'
  },
  {
    value: 'qu'
  },
  {
    value: 'xu'
  }
].map(val => {
  return {
    ...val,
    actorType: 'world-leaders'
  }
})

export const sets = [
  {
    value: '-a'
  },
  {
    value: '-ai'
  },
  {
    value: '-ao'
  },
  {
    value: '-an'
  },
  {
    value: '-ang'
  },
  {
    value: '-o'
  },
  {
    value: '-ong'
  },
  {
    value: '-ou'
  },
  {
    value: '-e'
  },
  {
    value: '-ei'
  },
  {
    value: '-(e)n'
  },
  {
    value: '-(e)ng'
  },
  {
    value: '-null'
  }
]

export const actors = [
  {
    value: 'b',
    id: 'b-'
  },
  {
    value: 'p',
    id: 'p-'
  },
  {
    value: 'm',
    id: 'm-'
  },
  {
    value: 'f',
    id: 'f-'
  },
  {
    value: 'd',
    id: 'd-'
  },
  {
    value: 't',
    id: 't-'
  },
  {
    value: 'n',
    id: 'n-'
  },
  {
    value: 'l',
    id: 'l-'
  },
  {
    value: 'z',
    id: 'z-'
  },
  {
    value: 'c',
    id: 'c-'
  },
  {
    value: 's',
    id: 's-'
  },
  {
    value: 'zh',
    id: 'zh-'
  },
  {
    value: 'ch',
    id: 'ch-'
  },
  {
    value: 'sh',
    id: 'sh-'
  },
  {
    value: 'r',
    id: 'r-'
  },
  {
    value: 'j',
    id: 'j-'
  },
  {
    value: 'q',
    id: 'q-'
  },
  {
    value: 'x',
    id: 'x-'
  },
  {
    value: 'g',
    id: 'g-'
  },
  {
    value: 'k',
    id: 'k-'
  },
  {
    value: 'h',
    id: 'h-'
  },
  {
    value: 'yi',
    id: 'yi-'
  },
  {
    value: 'bi',
    id: 'bi-'
  },
  {
    value: 'pi',
    id: 'pi-'
  },
  {
    value: 'mi',
    id: 'mi-'
  },
  {
    value: 'di',
    id: 'di-'
  },
  {
    value: 'ti',
    id: 'ti-'
  },
  {
    value: 'ni',
    id: 'ni-'
  },
  {
    value: 'li',
    id: 'li-'
  },
  {
    value: 'ji',
    id: 'ji-'
  },
  {
    value: 'qi',
    id: 'qi-'
  },
  {
    value: 'xi',
    id: 'xi-'
  },
  {
    value: 'wu',
    id: 'wu-'
  },
  {
    value: 'bu',
    id: 'bu-'
  },
  {
    value: 'pu',
    id: 'pu-'
  },
  {
    value: 'mu',
    id: 'mu-'
  },
  {
    value: 'fu',
    id: 'fu-'
  },
  {
    value: 'du',
    id: 'du-'
  },
  {
    value: 'tu',
    id: 'tu-'
  },
  {
    value: 'nu',
    id: 'nu-'
  },
  {
    value: 'lu',
    id: 'lu-'
  },
  {
    value: 'zu',
    id: 'zu-'
  },
  {
    value: 'cu',
    id: 'cu-'
  },
  {
    value: 'su',
    id: 'su-'
  },
  {
    value: 'zhu',
    id: 'zhu-'
  },
  {
    value: 'chu',
    id: 'chu-'
  },
  {
    value: 'shu',
    id: 'shu-'
  },
  {
    value: 'ru',
    id: 'ru-'
  },
  {
    value: 'gu',
    id: 'gu-'
  },
  {
    value: 'ku',
    id: 'ku-'
  },
  {
    value: 'hu',
    id: 'hu-'
  },
  {
    value: 'yu',
    id: 'yu-'
  },
  {
    value: 'nü',
    id: 'nü-'
  },
  {
    value: 'lü',
    id: 'lü-'
  },
  {
    value: 'ju',
    id: 'ju-'
  },
  {
    value: 'qu',
    id: 'qu-'
  },
  {
    value: 'xu',
    id: 'xu-'
  }
]
