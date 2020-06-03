import { join } from "path";
import { Project, SourceFile } from "ts-morph";

export function fixtureAsSourceFile(fixture: string): SourceFile {
  const project = new Project({
    compilerOptions: {
      allowJs: true,
      checkJs: true,
      noEmit: true,
      resolveJsonModule: true,
    },
  });

  const sourceFile = project.addSourceFileAtPath(
    join("tests", "fixtures", fixture)
  );
  project.resolveSourceFileDependencies();

  return sourceFile;
}
