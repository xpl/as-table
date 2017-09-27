"use strict";

const assert  = require ('assert'),
      asTable = require ('./build/as-table'),
      ansi    = require ('ansicolor').nice

describe ('as-table', () => {

    it ('array printing works', () => {

        var testData = [['qwe',       '123456789', 'zxcvbnm'],
                        ['qwerty',    '12',        'zxcvb'],
                        ['qwertyiop', '1234567',   'z']]

        assert.equal (asTable (testData),

                        'qwe        123456789  zxcvbnm\n' +
                        'qwerty     12         zxcvb  \n' +
                        'qwertyiop  1234567    z      ')

        assert.equal (asTable.configure ({ maxTotalWidth: 22, delimiter: ' | ' }) (testData),

                        'qwe   | 1234… | zxc…\n' +
                        'qwer… | 12    | zxc…\n' +
                        'qwer… | 1234… | z   ')
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
    })


    it ('object printing works (with ANSI styling)', () => {

        var testData =
            [ { foo: true,  string: 'abcde'.cyan.bgYellow, num: 42 },
              { foo: false, string: 'qwertyuiop',          num: 43 },
              {             string:  null,                 num: 44 } ]

        assert.equal (asTable (testData),

            'foo    string      num\n' +
            '----------------------\n' +
            'true   \u001b[43m\u001b[36mabcde\u001b[39m\u001b[49m       42 \n' +
            'false  qwertyuiop  43 \n' +
            '       null        44 ')
    })

    it ('maxTotalWidth correctly handles object field names', () => {

        assert.equal (

            asTable.configure ({ maxTotalWidth: 15 }) ([{

                '0123456789': '0123456789',
                'abcdefxyzw': 'abcdefxyzw' }]),

            '01234…  abcde…\n' +
            '--------------\n' +
            '01234…  abcde…'
        )
    })

    it ('maxTotalWidth correctly handles object field names (with ANSI styling)', () => {

        assert.equal (

            asTable.configure ({ maxTotalWidth: 15 }) ([{

                '0123456789': '0123456789',
                'abcdefxyzw': 'abcdefxyzw'.cyan.bgYellow.italic.inverse.bright }]),

            '01234…  abcde…\n' +
            '--------------\n' +
            '01234…  ' + 'abcde'.cyan.bgYellow.italic.inverse.bright + '…'
        )
    })

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
        assert.equal (asTable ([{}]), '\n\n')
    })

    it ('null/undefined prints correctly', () => {

        assert.equal (asTable.configure ({ delimiter: '|' }) ([[null, undefined, 1, 2, 3]]), 'null||1|2|3')
    })

    it ('custom printer works', () => {

        var testData =
            [ { foo: true,  string: 'abcde',      num: 42 },
              { foo: false, string: 'qwertyuiop', num: 43 },
              {             string:  null,        num: 44 } ]

        const formatsBooleansAsYesNo = asTable.configure ({ print: obj => (typeof obj === 'boolean') ? (obj ? 'yes' : 'no') : String (obj) })

        assert.equal (formatsBooleansAsYesNo (testData),

            'foo  string      num\n' +
            '--------------------\n' +
            'yes  abcde       42 \n' +
            'no   qwertyuiop  43 \n' +
            '     null        44 ')
    })

    it ('ANSI coloring works', () => {

        const testData =
            [ { foo: true,  string: 'abcde',                             num: 42 },
              { foo: false, string: 'qwertyuiop'.bgMagenta.green.bright, num: 43 } ]

        const d = ' | '.dim.cyan
        const _ = '-'.bright.cyan

        const result = asTable.configure ({ title: x => x.bright, delimiter: d, dash: _ }) (testData)

        console.log (result)

        assert.equal (result,

            ['foo'.bright + '  ', 'string'.bright + '    ', 'num'.bright].join (d) + '\n' +
            _.repeat (24) + '\n' +
            ['true ', 'abcde     ', '42 '].join (d) + '\n' +
            ['false', 'qwertyuiop'.bgMagenta.green.bright, '43 '].join (d))
    })
})



