# ltable

Simple module for parsing logic table description language (DL) and compute
table. Module `runner` has one function `run` what accepts DL and returns a
rows.

## Example

``` 
variables: a b c

x := a -> b

result f := x xor c
result g := x = c

filter c or b = 1

```

1. Declare three variables
2. Declare alias for implication from a to b
3. Declare result with name f and value of `x xor c` expression
4. Same for result g
5. Declare filter for rows

> `variables` can be shorted to `vars`, `result` to `res`

> Results can be used only in filters expressions

> Different filter expressions is combined with `or`

> Final newline is mandatory (frontend add it automatically)

## Build and run
``` sh
npm run -w frontend build
docker run --rm -p 8080:8080 .
```
