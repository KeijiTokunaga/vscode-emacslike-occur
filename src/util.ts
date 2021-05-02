import * as vscode from "vscode";
import { occurBuffer, targetBuffer } from "./extension";

export const getEditor = (): vscode.TextEditor => {
  let editor = vscode.window.activeTextEditor;
  if (editor === undefined) {
    throw new Error("activeTextEditor is null currently.");
  }
  return editor;
};

export const type = async (editor: vscode.TextEditor, text: string) => {
  let lineContent;
  
  if (text === "n") {
    moveCursor({ to: "down" });

    let pos = occurBuffer.selection.active;
    console.log("A:" + occurBuffer.document.lineCount);
    console.log("B:" + pos.line);

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
  }else if(text === '\n'){
    await vscode.commands.executeCommand(
      "workbench.action.closeActiveEditor"
    );
  }

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
  const active = new vscode.Position(line, charactor);

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

export const closeOccurBuffer = async () => {
  const first = vscode.window.activeTextEditor;

  while (1) {
    await vscode.commands.executeCommand("workbench.action.nextEditorInGroup");

    if (vscode.window.activeTextEditor === occurBuffer) {
      await vscode.commands.executeCommand(
        "workbench.action.closeActiveEditor"
      );
      return;
    }

    if (vscode.window.activeTextEditor === first) {
      await vscode.commands.executeCommand(
        "workbench.action.closeActiveEditor"
      );
      return;
    }
  }
};