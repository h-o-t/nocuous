import { extname } from "path";
import { CompilerOptions, Project } from "ts-morph";

function isConfig(value: string | readonly string[]): value is string {
  return typeof value === "string" && extname(value) === ".json";
}

export function create(root: string | readonly string[]): Project {
  const compilerOptions: CompilerOptions = {
    allowJs: true,
    checkJs: true,
    noEmit: true,
    resolveJsonModule: true
  };

  if (isConfig(root)) {
    return new Project({ compilerOptions, tsConfigFilePath: root });
  }

  const project = new Project({
    compilerOptions
  });

  project.addSourceFilesAtPaths(root);
  project.resolveSourceFileDependencies();

  return project;
}
