import { extname } from "path";
import { CompilerOptions, Project } from "ts-morph";

function isConfig(value: string): boolean {
  return extname(value) === ".json";
}

export function createProject(root: string): Project {
  const compilerOptions: CompilerOptions = {
    allowJs: true,
    checkJs: true,
    noEmit: true,
    resolveJsonModule: true
  };

  if (isConfig(root)) {
    return new Project({
      compilerOptions,
      tsConfigFilePath: root
    });
  }

  const project = new Project({
    compilerOptions
  });

  project.addExistingSourceFile(root);
  project.resolveSourceFileDependencies();

  return project;
}
