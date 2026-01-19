# Error Logs – Todo App

## JSON Parse Error (LocalStorage)

### Cause
This error occurs when the data stored in LocalStorage under the key `todos`
is not valid JSON.  
For example, if the value is manually set to a string like `INVALID_JSON`,
`JSON.parse()` throws a runtime error.

### Scenario
The error was intentionally triggered using:

After refreshing the page, `JSON.parse()` failed while reading LocalStorage.

### Handling
The error is handled using a `try...catch` block inside the `getTodos()` function.
When the error occurs:
- The exception is caught
- An error message is logged to the console using `console.error()`
- An empty array `[]` is returned to prevent application crash

### Result
The application continues to function normally:
- UI loads successfully
- New todos can still be added
- Existing functionality remains unaffected

### Conclusion
Using `try...catch` ensures graceful error handling and prevents the Todo App
from crashing due to corrupted LocalStorage data.
