# Troubleshooting Log

## [2026-01-30] IDE Resolution Errors (VS Code)

### Problem
- **Error Message**: `StudentRepository cannot be resolved to a type`, `The import com.ecocampus.domain cannot be resolved`, `The value of the field ... is not used`.
- **Context**: Occurred after refactoring project structure to "Package by Feature" and creating new Service/Controller classes.
- **Status**: Build passed on command line (`./gradlew clean build`), but VS Code showed persistent red squiggles.

### Diagnosis
- The Gradle build was successful, confirming code correctness.
- The issue was identified as a **VS Code Java Language Server synchronization issue**.
- The IDE failed to recognize the dependency on the `domain` module and the Lombok-generated code (getters/constructors), causing "type not found" and "unused field" errors.

### Solution
1. **Explicit Lombok Dependency**:
   - Explicitly added `compileOnly 'org.projectlombok:lombok'` and `annotationProcessor 'org.projectlombok:lombok'` to `api/build.gradle` to ensure the IDE detects the processor.

2. **Eclipse Plugin**:
   - Added `apply plugin: 'eclipse'` to `build.gradle`.
   - Ran `./gradlew clean eclipse` to force regeneration of `.classpath` and `.project` files used by the underlying Eclipse compiler in VS Code.

3. **IDE Refresh**:
   - Triggered "Reload Window" in VS Code to reload the Language Server with the updated configuration.

### How to Fix if Recurred
Run the following command in the `spring` directory:
```bash
./gradlew clean eclipse
```
Then restart VS Code.
