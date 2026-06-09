# Security Checklist

Security guidelines for mitigating common vulnerabilities in software development, with a focus on data sanitization and defense in depth.

## 1. Sanitization of Imported Data

Every piece of data imported from an external source (such as JSON/CSV uploads, URL parameters, localStorage, external APIs, or the clipboard) MUST undergo a strict validation and cleaning process before being processed by the application logic.

### 1.1 Prevention against Prototype Pollution (JS/TS)
When cloning, merging, or parsing dynamic objects obtained from external data, you must ensure that Javascript object prototype properties are cleaned or ignored to prevent global object pollution.

**Properties to be removed or prohibited:**
- `__proto__`
- `constructor`
- `prototype`

**Recommended Implementation for secure parsing:**
```typescript
function sanitizeData(input: unknown): unknown {
  if (typeof input !== 'object' || input === null) {
    return input; // primitives pass through directly
  }
  
  if (Array.isArray(input)) {
    return input.map(sanitizeData);
  }
  
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    // Skip dangerous prototype keys
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }
    sanitized[key] = sanitizeData(value);
  }
  return sanitized;
}
```

## 2. Data Size and Type Validation

- **Type and Schema Definition:** Use runtime type validation (such as Zod schemas for TypeScript/JavaScript or explicit type checks) to ensure that strings, numbers, and booleans match the expected format.
- **Buffer/String Limits (maxLength):** Explicitly limit the size of text fields. Excessively large strings can lock up the JSON parser or blow up the browser memory.

## 3. Prevention against Cross-Site Scripting (XSS)

- **HTML Sanitization:** Never inject unsanitized user strings directly into the DOM using methods like `innerHTML` or `document.write`. Prefer safe properties like `textContent` or `innerText`.
- **Use of Sanitization Tools:** If rendering user-provided rich-text/HTML elements is absolutely necessary, use specialized and attested libraries, such as DOMPurify:
```javascript
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);
```

## 4. Defense in Depth

Defense in depth applies security layers for vectors that the framework does NOT cover natively. Examples of necessary layers:
- **Prototype Pollution**: `JSON.parse` does not filter `__proto__` — mandatory sanitization.
- **SQL/NoSQL Injection**: Even with ORM, validate inputs before queries.

Examples of **UNNECESSARY** layers (where the framework already protects):
- **XSS in React JSX**: React automatically escapes `{variable}` in JSX. Applying `sanitizeString()` to data rendered via JSX causes double-encoding and corrupts the display. XSS sanitization is only necessary if the code uses `dangerouslySetInnerHTML`, `innerHTML`, or `document.write()`.

## 5. Testing Sanitization
Sanitization tests MUST check the global effect, not just the sanitized object:

### Correct Prototype Pollution Test:
```typescript
it('should not pollute Object.prototype', () => {
  const malicious = JSON.parse('{"__proto__": {"polluted": true}}');
  sanitizeData(malicious);
  // Verify that the GLOBAL prototype was not affected
  expect((Object.prototype as any).polluted).toBeUndefined();
});
```

### INCORRECT Test (does not validate the actual vector):
```typescript
// ❌ This tests the returned object, not the global prototype
expect(sanitized.__proto__.polluted).toBeUndefined();
```
