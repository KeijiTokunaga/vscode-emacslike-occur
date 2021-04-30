"use strict";

import * as vscode from "vscode";
import {
  Disposable,
  ExtensionContext,
  Range,
  TextEditor,
  TextEditorDecorationType,
} from "vscode";

export async function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "hello" is now active!');

  let disposable = vscode.commands.registerCommand(
    "emacslike.occur",
    async () => {
      let what = await vscode.window.showInputBox({
        placeHolder: "List lines matching regexp (default build):",
      });
	  if (what){
		  console.log(what);
	  }
	 
	 
	  if (what) {

        let editor: vscode.TextEditor = getEditor();
        /*
        let destPos = new vscode.Position(0, 1);
        let destSel = new vscode.Selection(destPos, destPos); // 範囲選択しないなら同じ Position を指定すれば良い
        editor.selection = destSel;
		*/
        /*
			const f = (editBuilder: vscode.TextEditorEdit): void => {
				editBuilder.insert(destPos, 'insert|');
			};
			await editor.edit(f);
*/

//        let ranges: Range[] = [];
        //let match: RegExpExecArray | null | undefined;

        const lines = editor.document.getText().split("\n");
        lines.map((x,index) => {
          const found = x.match(what);
		  if (found){
			console.log(found);
		  }
        });

        /*
        let regexp = new RegExp(what, "g");
        let match = editor.document.getText().match(regexp);
        console.log(match);
		*/

        vscode.commands.executeCommand("workbench.action.splitEditorDown");
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}

const getEditor = (): vscode.TextEditor => {
  let editor = vscode.window.activeTextEditor;
  if (editor === undefined) {
    throw new Error("activeTextEditor is null currently.");
  }
  return editor;
};
