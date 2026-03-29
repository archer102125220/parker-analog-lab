# Runtime Data Validation (Strict)

To ensure robustness, always use strict type checks based on the variable's expected type.

| Type | Do NOT Use | MUST Use |
|------|------------|----------|
| **String** | `if (str)` | `if (str !== '')` |
| **Number** | `if (num)` | `typeof num === 'number'`, `num !== 0`, `Number.isFinite(num)` |
| **Object** | `if (obj)` | `typeof obj === 'object' && obj !== null`<br>`if (obj instanceof MyClass)` |
| **Array** | `if (arr)` | `Array.isArray(arr) && arr.length > 0` |
| **Equality** | `==`, `!=` | `===`, `!==` |
