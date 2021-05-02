import * as vscode from "vscode";
import { getEditor, type , jumpCursor} from "./util";

export let targetBuffer:vscode.TextEditor;
export let occurBuffer:vscode.TextEditor;

export async function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "occur mode!" is now active!');

  const register = (key: string, handler: (...args: any[]) => void) => {
    context.subscriptions.push(vscode.commands.registerCommand(key, handler));
  };

  // occur動作
  register("emacslike.occur", async () => {
    const what = await vscode.window.showInputBox({
      placeHolder: "List lines matching regexp (default build):",
    });

    if (what) {
      // occur結果の作成
      let matchlines: string = "*occur*\n";
      targetBuffer = getEditor();
      const regexp = new RegExp(what);
      const lines = targetBuffer.document.getText().split("\n");
      lines.map((x, index) => {
        const found = x.match(regexp);
        if (found) {
          matchlines += `${index+1}:${found.input}\n`;
        }
      });

      // occur結果用のウィンドウ操作
      await vscode.commands.executeCommand("workbench.action.splitEditorDown");
      const doc = await vscode.workspace.openTextDocument();
      await vscode.window.showTextDocument(doc, { preview: false });
      await vscode.commands.executeCommand(
        "workbench.action.nextEditorInGroup"
      );
      await vscode.commands.executeCommand(
        "workbench.action.closeActiveEditor"
      );

      occurBuffer = getEditor();
      // occur結果の格納
      const destPos = new vscode.Position(0, 0);
      await occurBuffer.edit((edit) => {
        edit.insert(destPos, matchlines);
      });
      const destSel = new vscode.Selection(destPos, destPos); 
      occurBuffer.selection = destSel;
    }
  });

  // キーハンドリング
  register("type", (e) => {
    if (!vscode.window.activeTextEditor) {
      return;
    }

    if (vscode.window.activeTextEditor !== occurBuffer) {
      // 通常のVSCodeの入力処理
      vscode.commands.executeCommand('default:type', {
        text: e.text
      });
      return;
    }

    try {
      type(vscode.window.activeTextEditor, e.text);
    } catch (error) {
      console.error(error);
    }
  });

}
export function deactivate() {}
