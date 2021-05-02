import * as vscode from "vscode";

export async function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "hello" is now active!');

  let disposable = vscode.commands.registerCommand(
    "emacslike.occur",
    async () => {
      const what = await vscode.window.showInputBox({
        placeHolder: "List lines matching regexp (default build):",
      });

      if (what) {
        let matchlines: string = ""; // マッチした文字列群(改行で連結)
        const editor: vscode.TextEditor = getEditor();
        const regexp = new RegExp(what);
        const lines = editor.document.getText().split("\n");
        lines.map((x, index) => {
          const found = x.match(regexp);
          if (found) {
            matchlines += `${index}:${found.input}\n`;
          }
        });

        await vscode.commands.executeCommand(
          "workbench.action.splitEditorDown"
        );
        const doc = await vscode.workspace.openTextDocument();
        await vscode.window.showTextDocument(doc, { preview: false });
        await vscode.commands.executeCommand(
          "workbench.action.nextEditorInGroup"
        );
        await vscode.commands.executeCommand(
          "workbench.action.closeActiveEditor"
        );

        await getEditor().edit((edit) => {
          const destPos = new vscode.Position(0, 0);
          edit.insert(destPos, matchlines);
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}

// アクティブエディタ取得
const getEditor = (): vscode.TextEditor => {
  let editor = vscode.window.activeTextEditor;
  if (editor === undefined) {
    throw new Error("activeTextEditor is null currently.");
  }
  return editor;
};
