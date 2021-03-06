const Core = require('../../src/core/index.js')
const russian = require('../../src/locales/ru_RU')
const english = require('../../src/locales/en_US')

describe('core/translator', () => {
  describe('translate', () => {
    it('should translate a string', () => {
      const core = new Core({ locale: russian })
      expect(core.translator.translate('chooseFile')).toEqual('Выберите файл')
    })

    it('should translate a string with non-string elements', () => {
      const core = new Core({
        locale: {
          strings: {
            test: 'Hello %{who}!',
            test2: 'Hello %{who}'
          }
        }
      })

      const who = Symbol('who')
      expect(core.translator.translateArray('test', { who: who })).toEqual(['Hello ', who, '!'])
      // No empty string at the end.
      expect(core.translator.translateArray('test2', { who: who })).toEqual(['Hello ', who])
    })
  })

  describe('interpolation', () => {
    it('should interpolate a string', () => {
      const core = new Core({ locale: english })
      expect(
        core.translator.translate('youHaveChosen', { fileName: 'img.jpg' })
      ).toEqual('You have chosen: img.jpg')
    })
  })

  describe('pluralization', () => {
    it('should translate a string', () => {
      const core = new Core({ locale: russian })
      expect(
        core.translator.translate('filesChosen', { smart_count: 18 })
      ).toEqual('Выбрано 18 файлов')

      expect(
        core.translator.translate('filesChosen', { smart_count: 1 })
      ).toEqual('Выбран 1 файл')

      expect(
        core.translator.translate('filesChosen', { smart_count: 0 })
      ).toEqual('Выбрано 0 файлов')
    })
  })
})
