// compile.ts
import * as ts from 'typescript';

function compile(fileNames: string[], options: ts.CompilerOptions): void {
  const program = ts.createProgram(fileNames, options);
  const emitResult = program.emit();

  const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
  allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    } else {
      console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
    }
  });

  const exitCode = emitResult.emitSkipped ? 1 : 0;
  console.log(`Process exiting with code '${exitCode}'.`);
  process.exit(exitCode);
}

// Read the tsconfig.json file
const configFileName = 'tsconfig.json';
const configFileText = ts.sys.readFile(configFileName);
if (!configFileText) {
  throw new Error(`Could not read file '${configFileName}'.`);
}
const result = ts.parseConfigFileTextToJson(configFileName, configFileText);
const configObject = result.config;

// Extract the files and compiler options from the config object
const configParseResult = ts.parseJsonConfigFileContent(configObject, ts.sys, './');
const fileNames = configParseResult.fileNames;
const options = configParseResult.options;

// Call the compile function with the file names and options
compile(fileNames, options);