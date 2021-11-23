program = vars:vars aliases:aliases results:results filters:filters {
  return { vars, aliases, results, filters }
}

vars = ('vars' / 'variables') (_? ':' '='?) items:(_ var)+ eol {
  return items.map(it => it[1])
}

alias = name:var assign value:expr eol {
  return { name, value }
}
aliases = items:alias* {
  const result = {}
  items.forEach(it => result[it.name] = it.value)
  return result
}

result = 'res' 'ult'? _ name:var assign value:expr eol {
  return { name, value }
}
results = items:result+ {
  const result = {}
  items.forEach(it => result[it.name] = it.value)
  return result
}

filter = 'filter' _ value:expr eol { return value }
filters = items:filter*

expr "expression" = eq

eq = o1:impl _? '='+ _? o2:eq {
  return { operation: 'equality', operand1: o1, operand2: o2 }
} / impl

impl = o1:or (_ 'implies' _ / _? [-=] '>' _?) o2:impl {
  return { operation: 'implication', operand1: o1, operand2: o2 }
} / or

or = o1:and (_ 'or' _ / _? [|+] _?) o2:or {
  return { operation: 'or', operand1: o1, operand2: o2 }
} / o1:and (_ 'xor' _ / _? [|+] _?) o2:or {
  return { operation: 'xor', operand1: o1, operand2: o2 }
} / and

and = o1:not (_ 'and' _ / _? [&*] _?) o2:and {
  return { operation: 'and', operand1: o1, operand2: o2 }
} / not

not = ('not' _ / '-') op:not {
  return { operation: 'not', operand1: op, operand2: null }
} / term
operand = const / var

term = '(' expr:expr ')' { return expr } / operand

const "value" = [01] { return text() === '1' }
var "variable" = [a-zA-Z] [a-zA-Z0-9]* { return text() }

assign = _? ':' '='? _

_ "whitespace"
  = [ \t]+

eol "end of line" = _* ('\r'? '\n')+
