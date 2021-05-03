import * as vscode from "vscode";
import { occurBuffer, targetBuffer } from "./extension";

export const getEditor = (): vscode.TextEditor => {
  let editor = vscode.window.activeTextEditor;
  if (editor === undefined) {
    throw new Error("activeTextEditor is null currently.");
  }
  return editor;
};

// occurバッファだけで動作する
export const type = async (editor: vscode.TextEditor, text: string) => {
  let lineContent;

  if (text === "n") {
    moveCursor({ to: "down" });
    let pos = occurBuffer.selection.active;
    if (pos.line + 1 === occurBuffer.document.lineCount) {
      return;
    }
    lineContent = occurBuffer.document.lineAt(pos.line + 1).text;
  } else if (text === "p") {
    moveCursor({ to: "up" });
    let pos = occurBuffer.selection.active;
    if (pos.line === 0) {
      return;
    }
    lineContent = occurBuffer.document.lineAt(pos.line - 1).text;
  } else if (text === "\n" || text === "q") {
    await vscode.commands.executeCommand("workbench.action.closeActiveEditor");
    selectDecorationType.dispose();
  }

  // ターゲットバッファ内のカーソル移動
  if (lineContent) {
    let parts = lineContent.split(/^(\d+):/);
    let path = parts[1];

    jumpCursor(targetBuffer, Number(path) - 1, 0);
  }
};

export const jumpCursor = (
  editor: vscode.TextEditor,
  line: number,
  charactor: number
) => {
  if (line < 0 || editor.document.lineCount < line) {
    return;
  }

  const anchor = new vscode.Position(line, charactor);
  const active = new vscode.Position(line, 1000);
  const decoration = { range: new vscode.Range(anchor, active)};
  editor.setDecorations(selectDecorationType,[decoration]);

  // jump
  editor.selection = new vscode.Selection(anchor, active);
  editor.revealRange(
    new vscode.Range(line, charactor, line, charactor),
    vscode.TextEditorRevealType.Default
  );
};

export const moveCursor = async (options: {
  to: "left" | "right" | "up" | "down";
  select?: boolean;
  by?: "line" | "wrappedLine" | "character" | "halfLine";
}) => {
  await vscode.commands.executeCommand("cursorMove", options);
};

// create a decorator type that we use to decorate large numbers
export const selectDecorationType = vscode.window.createTextEditorDecorationType(
  {
    borderWidth: "1px",
    borderStyle: "solid",
    light: {
      // this color will be used in light color themes
      borderColor: "darkblue",
      backgroundColor: "FF000055",
    },
    dark: {
      // this color will be used in dark color themes
      borderColor: "lightblue",
      backgroundColor: "FF000055",
    },
  }
);
