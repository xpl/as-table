# as-table

A simple function that print objects as ASCII tables.

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

Will output:

```
qwe        123456789  zxcvbnm
qwerty     12         zxcvb
qwertyiop  1234567    z
```

Limiting total width by proportionally trimming cells + setting columns delimiter:

```javascript
asTable.configure ({ maxTotalWidth: 25, delimiter: ' | ' }) (data)
```
```
qwe   | 12345 | zxcv
qwert | 12    | zxcv
qwert | 12345 | z
```

Or you can do this:

```javascript
asTable = require ('as-table').configure ({ maxTotalWidth: 25, delimiter: ' | ' })

asTable (data)
```
