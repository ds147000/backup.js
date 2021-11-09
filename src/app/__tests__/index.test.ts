import Backup from '../index'

beforeEach(() => {
  Backup.number = 0
})

describe.each([
  ['', '', true],
  ['http://baidu.com', 'http://baidu.com?', false],
  ['http://baidu.com ', 'http://baidu.com', true],
  [null, 'http://baidu.com', true],
  [null, null, true],
  ['/zbc', '/zbcd', false]
])('Backup.isStop', (oldUrl, newUrl, expected) => {
  test(`${oldUrl}, ${newUrl} = ${expected}`, () => {
    expect(Backup.isStop(oldUrl, newUrl)).toBe(expected)
  })
})

test('backup.getNewUrl', () => {
  expect(Backup.getNewUrl('/home', 'LINK')).toBe('/home')
})

test('backup.setNewLink', () => {
  for(let i = 100; i > 0; i--) Backup.setNewLink('http://baidu.com')
  expect(Backup.isStop('', '/')).toBe(true)
})

test('backup.setNewScript', () => {
  for(let i = 20; i > 0; i--) Backup.setNewScript('http://baidu.com')
  expect(Backup.isStop('', '/')).toBe(true)
})

test('backup.handleLink', () => {
  Backup.getNewUrl = () =>  'http://123.jpg'
  const link = document.createElement('link')
  link.href = '345'
  Backup.handleLink(link)
})

test('backup.handleLink stop', () => {
  const link = document.createElement('link')
  link.href = 'http://123.jpg/'
  Backup.getNewUrl = () =>  'http://123.jpg/'
  Backup.handleLink(link)
})

test('backup.handleScript stop', () => {
  Backup.getNewUrl = () => 'http://123.js/'
  const el = document.createElement('script')
  el.src = 'http://123.js'
  Backup.handleScript(el)
})

test('backup.handleScript stop', () => {
  Backup.getNewUrl = () => 'http://1234.js/'
  const el = document.createElement('script')
  el.src = 'http://123.js'
  Backup.handleScript(el)
})

test('backup.handleImg', () => {
  Backup.getNewUrl = () =>  'http://123.jpg'
  const img = document.createElement('img')
  img.src = '345.png'
  Backup.handleImage(img)
  expect(img.src).toBe('http://123.jpg/')
})

test('backup.handleImg stop', () => {
  Backup.getNewUrl = () =>  'http://123.jpg/'
  const img = document.createElement('img')
  img.src = 'http://123.jpg'
  Backup.handleImage(img)
  expect(img.src).toBe('http://123.jpg/')
})

