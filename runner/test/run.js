import tap from 'tap'

import { run } from '../index.js'

const simple = run(`vars: a b

result f: a and b
`)
tap.same(
  simple,
  [
    {
      index: 0,
      vars: {
        a: false,
        b: false,
      },
      varsOrder: ['a', 'b'],
      aliases: {},
      results: {
        f: false,
      },
    },
    {
      index: 1,
      vars: {
        a: false,
        b: true,
      },
      varsOrder: ['a', 'b'],
      aliases: {},
      results: {
        f: false,
      },
    },
    {
      index: 2,
      vars: {
        a: true,
        b: false,
      },
      varsOrder: ['a', 'b'],
      aliases: {},
      results: {
        f: false,
      },
    },
    {
      index: 3,
      vars: {
        a: true,
        b: true,
      },
      varsOrder: ['a', 'b'],
      aliases: {},
      results: {
        f: true,
      },
    },
  ],
  { sort: true },
)

const filterTest = run(`vars: a
res b := a -> 0
filter a = 1
`)
tap.same(
  filterTest,
  [
    {
      index: 1,
      vars: { a: true },
      varsOrder: ['a'],
      results: {
        b: false,
      },
      aliases: {},
    },
  ],
  { sort: true },
)

const aliasTest = run(`vars: a
b := -a
res t : a or b
`)
tap.same(
  aliasTest,
  [
    {
      index: 0,
      vars: { a: false },
      varsOrder: ['a'],
      aliases: { b: true },
      results: { t: true },
    },
    {
      index: 1,
      vars: { a: true },
      varsOrder: ['a'],
      aliases: { b: false },
      results: { t: true },
    },
  ],
  { sort: true },
)
