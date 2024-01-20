<h1 align="center">${\color{yellow}qCompiler}$ : Simplifying Code Compilation</h1>

<p align="center"><b>qCompiler</b> is a versatile Node.js library designed for building online or offline code compiler applications. It enables seamless compilation for various languages on the server, providing outputs swiftly and efficiently.</p>

# Why qCompiler?
**qCompiler** offers a user-friendly solution for developers who want to integrate code compilation into their applications. Whether you are building an educational platform, have coding challenges, or need a reliable code compilation service, **qCompiler** streamlines the process.

# Supported Languages 
**qCompiler** is currently in the initial development stage. As the library grows, so does the list here.

| Language | Support |
|-----------|:---------:|
|C |&#x2714;|
|C++ | &#x2714; |
|Java | &#x2714; |
|Python | &#x2714; |

# Supported Operating Systems

All the APIs are written for $\textcolor{green}{Windows}$ and ${\color{red}Linux}$ operating systems. But, till now we have tested only for the $\textcolor{green}{Windows}$ operating system. Soon we will test all the APIs for the $\textcolor{red}{Linux}$ operating system also.

# Workflow

1. ${\color{yellow}Receive\ Code\ and\ Input\ Data:}$ Get the program and input data from the client as requested.
   
2. ${\color{yellow}Compile\ the\ Program:}$ Utilize the qCompiler module to compile the program.

3. ${\color{yellow}Retrieve\ Output\ and\ Errors:}$ Obtain the output and errors in JSON and string formats.

4. ${\color{yellow}Respond\ to\ the\ Client:}$ Send the output back to the client.

# Setting Up Compilers

Before utilizing **qCompiler**, ensure that the necessary compilers for the target programming languages are set up on the server. Necessary guidelines can be found [here](https://github.com/masud70/qCompiler/blob/main/CompilerSetup.md).

# Getting Started

## Installation

To install ${\color{yellow}qCompiler}$ run the following command.
```bash
  npm i qcompiler
```

## Define Configuration

Define the basic configurations to compile your program.
```javascript
const config = {
   standard: "c11",
   cmd: "gcc",
   executionCmd: 'java', //only for java
   timeout: 2000,
}
```

### standard:

You can define any valid standard that supports your machine's compiler. `standard` is applicable only for **C** and **C++**.

Default `standard`:

| Language | Default Value |
|----------|:-------------:|
|    C     |   "c11"       |
|   C++    |   "c17"       |

### cmd and executionCmd:

`cmd` and `executionCmd` are the commands to compile or run your program.

Default values for `cmd` for several languages are:

| Language | Default Value |
|----------|:-------------:|
|    C     |   "gcc"       |
|   C++    |   "g++"       |
|  Java    |  "javac"      |
|  Python  |  "python"     |

`executionCmd` is necessary for **Java** only. Default value `javac`.

```javascript
// If the environment variable is set
cmd: "command"

// If the environment variable is not set
cmd: "path/to/command/yourCommand" 

// Example
cmd: "C:\MinGW\bin\gcc"
```

### Timeout:
In milliseconds the maximum amount of time the program is allowed to run.
Default: 1000ms.

## Basic Usage

### **C**

To compile a C program you can use the following template.

```javascript
const compiler = new qCompiler(config);

const response = await compile.compileC(code, input);

console.log(response)
```

### **C**

To compile a C++ program you can use the following template.

```javascript
const compiler = new qCompiler(config);

const response = await compile.compileCpp(code, input);

console.log(response)
```

### **Java**

To compile a Java program you can use the following template.

```javascript
const compiler = new qCompiler(config);

const response = await compile.compileJava(code, input);

console.log(response)
```

### **Python**

To compile a Python program you can use the following template.

```javascript
const compiler = new qCompiler(config);

const response = await compile.compilePython(code, input);

console.log(response)
```

## Output Format

```
//  data.status = boolean | string
//  data.output = Output value | undefined
//  data.error  = Error message (if status == false) | undefined
//  executionTime = total execution time in milisecond | undefined
```

# **Note**

*For the most up-to-date information and usage guidelines, please take a look at the official documentation.*
*Explore the power of code compilation with qCompiler – the comprehensive solution for seamless integration and efficient processing.*

# License

All the contents in this repository are released under the <a href="https://github.com/masud70/qCompiler/License.md">MIT License</a>.