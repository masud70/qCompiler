// Using an enum class for restricting the user
// Cope with it. JS has no enums, or types for that matter.
// Add language support here
const languages = {
    C: 0,
    CPP: 1,
    JAVA: 2,
    PYTHON: 3,
}

// TODO: Add support for language standards
const standards = {
    C17: 'c17',
    C11: 'c11',
    C99: 'c99',
    Cpp2a: 'c++2a',
    Cpp17: 'c++17',
    Cpp14: 'c++14',
}

// Add support for OS here
const platforms = {
    WIN32: 0, // Windows
    LINUX: 1, // Linux
}