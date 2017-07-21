# as-table

[![Build Status](https://travis-ci.org/xpl/as-table.svg?branch=master)](https://travis-ci.org/xpl/as-table) [![Coverage Status](https://coveralls.io/repos/github/xpl/as-table/badge.svg)](https://coveralls.io/github/xpl/as-table) [![npm](https://img.shields.io/npm/v/as-table.svg)](https://npmjs.com/package/as-table) [![dependencies status](https://david-dm.org/xpl/as-table/dep-status.svg)](https://david-dm.org/xpl/as-table) [![Scrutinizer Code Quality](https://img.shields.io/scrutinizer/g/xpl/as-table.svg)](https://scrutinizer-ci.com/g/xpl/as-table/?branch=master)

A simple function that print objects as ASCII tables. Supports ANSI styling (escape codes won't break the layout), thanks to [`printable-characters`](https://github.com/xpl/printable-characters).

```bash
npm install as-table
```

Printing objects:

```javascript
asTable = require ('as-table')

asTable ([ { foo: true,  string: 'abcde',      num: 42 },
           { foo: false, string: 'qwertyuiop', num: 43 },
           {             string:  null,        num: 44 } ])
```
```
foo    string      num
----------------------
true   abcde       42 
false  qwertyuiop  43 
       null        44 
```

Printing arrays:

```javascript
asTable ([['qwe',       '123456789', 'zxcvbnm'],
          ['qwerty',    '12',        'zxcvb'],
          ['qwertyiop', '1234567',   'z']])
```
```
qwe        123456789  zxcvbnm
qwerty     12         zxcvb
qwertyiop  1234567    z
```

Limiting total width by proportionally trimming cells + setting columns delimiter:

```javascript
asTable.configure ({ maxTotalWidth: 22, delimiter: ' | ' }) (data)
```
```
qwe   | 1234… | zxc…
qwer… | 12    | zxc…
qwer… | 1234… | z   
```

Providing custom object printer:

```javascript
asTable.configure ({ print: obj => (typeof obj === 'boolean') ? (obj ? 'yes' : 'no') : String (obj) }) (data)
```
```
foo  string      num
--------------------
yes  abcde       42 
no   qwertyuiop  43 
     null        44 
```

Obtaining pre-configured function:

```javascript
asTable = require ('as-table').configure ({ maxTotalWidth: 25, delimiter: ' | ' })

asTable (data)
```