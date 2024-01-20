# Setting Up Compilers

## Installation and Testing the Environment

To compile programs in any programming language, you must have the relevant compiler installed on the server. Follow these steps to set up the compiler environment:

### **Installing and Testing C/C++ on Windows:**
   Install GCC compiler, which can compile programs from the command line. After installation, set environment variables to access GCC command lines from any directory.

   - Download [MinGw](http://www.mingw.org/) and install on your server machine.

   - For a quick test, create a simple C/C++ file in any directory.

   - Open a command prompt in that directory and run:
       ```bash
         path/to/minGW/g++ filename.c -o output.exe
       ```

   - If this command runs smoothly and an `output.exe` file appears, your GCC compiler setup is good to go.

### **Installing and Testing Python on Windows:**
   Ensuring Python is correctly installed and configured on your Windows machine is a straightforward process. Follow these simple steps to set up Python for use with **qCompiler**:

   - Download from [official Python website](https://www.python.org/downloads/) and run the installer.
   
   - Add Python environment variable to PATH (optional).
   
   - Open a Command Prompt and run the following command:
      ```bash
        python --version
      ```
      You should see the installed Python version. This verifies that Python is successfully installed.
   
   - To ensure Python is working as expected, let's run a simple script:
   
   - Open a text editor and create a file named `test.py`. Add the following code to the file:
      ```python
        print("Hello, Python!")
      ```

   - Open a Command Prompt and run the following command:
      ```bash
        python test.py
      ```
      You should see the output "Hello, Python!".

### **Installing and Testing Java on Windows:**
Ensuring Java is correctly installed and configured on your Windows machine is a simple process. Follow these steps to set up Java for use with **qCompiler**:

- Download Java Development Kit (JDK) from [Oracle JDK Download page](https://www.oracle.com/java/technologies/javase-downloads.html) and install it.

- Set up the `JAVA_HOME` environment variable with variable Name: `JAVA_HOME` and variable Value: `Path to your JDK installation`.

- Add "Path" variable under "System Variables" `%JAVA_HOME%\bin`.

- To verify the Java installation, run the following commands:
     ```bash
     java -version
     javac -version
     ```
  You should see information about the installed Java version and the Java compiler.