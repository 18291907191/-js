module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'no-delete-var': 2, // 不能对var声明的变量使用delete操作符
    'no-else-return': 2, // 如果if语句里面有return,后面不能跟else语句
    'no-irregular-whitespace': 2, // 不能有不规则的空格
    'no-nested-ternary': 0, // 禁止使用嵌套的三目运算
    'no-undef': 1, // 不能有未定义的变量
    'no-unreachable': 2, // 不能有无法执行的代码
    camelcase: 2, // 强制驼峰法命名
    semi: ['error', 'always'], // 行尾分号
    'space-before-function-paren': 0, // 关闭function后的空格
    'no-unused-vars': 'off' // 定义未使用
  }
};
