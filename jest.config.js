/*
 * @Description:
 * @Author: zhoulong.yang
 * @Date: 2021-05-12 14:55:35
 * @LastEditors: zhoulong.yang
 * @LastEditTime: 2021-06-10 18:53:16
 */

module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',

  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 80,
      statements: -10
    }
  }
}
