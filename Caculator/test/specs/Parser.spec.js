import Parser from '../../src/Parser'

describe('Parser', function () {
  var parser

  beforeEach(function () {
    parser = new Parser()
  })

  it('should start in reset state', function () {
    expect(parser.result).toBe(0)
    expect(parser.state).toBe(Parser.state.RESET)
    expect(parser.operation).toBe(null)
    expect(parser.stack.length).toBe(0)
    expect(parser.getScreen()).toBe(0)
  })

  it('should get correct float pint length', function () {
    expect(parser.pointLength(1)).toBe(0)
    expect(parser.pointLength(1.1)).toBe(1)
    expect(parser.pointLength(1.1435)).toBe(4)
    expect(parser.pointLength(1.)).toBe(0)
    expect(parser.pointLength(.1)).toBe(1)
  })

  it('should handle ±', function () {
    parser.take('1')
    expect(parser.getScreen()).toBe('1')
    parser.take('±')
    expect(parser.getScreen()).toBe('-1')
    parser.take('±')
    expect(parser.getScreen()).toBe('1')
  })

  it('should accpet float', function () {
    parser.take('1')
    parser.take('.')
    parser.take('1')
    expect(parser.getScreen()).toBe('1.1')
    parser.take('±')
    expect(parser.getScreen()).toBe('-1.1')
  })

  it('should clear screen when user click C', function () {
    parser.take('1')
    parser.take('.')
    parser.take('1')
    expect(parser.getScreen()).toBe('1.1')
    parser.take('C')
    expect(parser.getScreen()).toBe(0)
  })

  it('should process arithmetic', function () {
    parser.take('1')
    parser.take('.')
    parser.take('1')
    parser.take('+')
    parser.take('1')
    expect(parser.getScreen()).toBe('1')
    parser.take('=')
    expect(parser.getScreen()).toBe(2.1)
    parser.take('×')
    expect(parser.getScreen()).toBe(2.1)
    parser.take('3')
    parser.take('.')
    parser.take('0')
    expect(parser.getScreen()).toBe('3.0')
    parser.take('=')
    expect(parser.getScreen()).toBe(6.3)
    parser.take('/')
    expect(parser.getScreen()).toBe(6.3)
    parser.take('3')
    expect(parser.getScreen()).toBe('3')
    parser.take('=')
    expect(parser.getScreen()).toBe(2.1)
    parser.take('-')
    parser.take('2')
    expect(parser.getScreen()).toBe('2')
    parser.take('+')
    expect(parser.getScreen()).toBe(.1)
    parser.take('2')
    expect(parser.getScreen()).toBe('2')
    parser.take('=')
    expect(parser.getScreen()).toBe(2.1)
  })

  it('should handle error', function () {
    parser.take('1')
    parser.take('.')
    parser.take('1')
    parser.take('+')
    parser.take('1')
    expect(parser.getScreen()).toBe('1')
    parser.take('=')
    expect(parser.getScreen()).toBe(2.1)
    parser.take('/')
    expect(parser.getScreen()).toBe(2.1)
    parser.take('0')
    expect(parser.getScreen()).toBe('0')
    parser.take('=')
    expect(parser.getScreen()).toBe('ERROR')
    parser.take('C')
    expect(parser.getScreen()).toBe(0)
  })
})
