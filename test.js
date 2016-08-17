"use strict";

const assert  = require ('assert'),
      asTable = require ('./as-table')

describe ('as-table', () => {

    it ('array printing works', () => {

        var testData = [['qwe',       '123456789', 'zxcvbnm'],
                        ['qwerty',    '12',        'zxcvb'],
                        ['qwertyiop', '1234567',   'z']]

        assert.equal (asTable (testData),

                        'qwe        123456789  zxcvbnm\n' +
                        'qwerty     12         zxcvb  \n' +
                        'qwertyiop  1234567    z      ')

        assert.equal (asTable.configure ({ maxTotalWidth: 25, delimiter: ' | ' }) (testData),

                        'qwe   | 12345 | zxcv\n' +
                        'qwert | 12    | zxcv\n' +
                        'qwert | 12345 | z   ')
    })

    it ('object printing works', () => {

        var testData =
            [ { foo: true,  string: 'abcde',      num: 42 },
              { foo: false, string: 'qwertyuiop', num: 43 },
              {             string:  null,        num: 44 } ]

        assert.equal (asTable (testData),

            'foo    string      num\n' +
            '----------------------\n' +
            'true   abcde       42 \n' +
            'false  qwertyuiop  43 \n' +
            '       null        44 ')
    }),

    it ('everything renders as singleline', () => {

        assert.equal (asTable ([['fooo\n\nbar']]), 'fooo\\n\\nbar')
    })

    it ('configuring works', () => {

        const asTable25      = asTable.configure ({ maxTotalWidth: 25 }),
              asTable25Delim = asTable25.configure ({ delimiter: ' | ' })

        assert.notEqual (asTable25, asTable25Delim)
        assert.equal    (asTable25.maxTotalWidth, 25)
        assert.equal    (asTable25Delim.delimiter, ' | ')
    })

    it ('degenerate case works', () => {

        assert.equal (asTable ([]), '\n')
    })
})



