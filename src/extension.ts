'use strict';

import * as vscode from "vscode";
import { getEditor, occurType } from "./util";
import { networkInterfaces, tmpdir } from "os";
import { promises as fs } from "fs";

export let targetBuffer: vscode.TextEditor;
export let occurBuffer: vscode.TextEditor;
export let selectDecorationType: vscode.TextEditorDecorationType;

export async function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "occur mode!" is now active!');

  const register = (key: string, handler: (...args: any[]) => void) => {
    context.subscriptions.push(vscode.commands.registerCommand(key, handler));
  };

  // occur動作
  register("emacslike.occur", async () => {
    // create a decorator type that we use to decorate large numbers
    selectDecorationType = vscode.window.createTextEditorDecorationType({
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
    });

    let basePath = tmpdir() + "/"; //テンポラリディレクトリ
    let fileNameEditor = "vscode-external-process-editor-occur"; //ファイル名(拡張子はターゲットの言語似合わせる)
    let filePathEditor = basePath + fileNameEditor; //テンポラリファイルパス

    let files = await fs.readdir(basePath);
    files
      .filter((name) => /vscode-external-process-editor-occur.+/.test(name))
      .map((f) => {
        console.log(f);
        fs.unlink(basePath + f);
      });

    const what = await vscode.window.showInputBox({
      placeHolder: "List lines matching regexp:",
    });

    if (what) {
      // occur結果の作成
      let matchlines: string = "";
      targetBuffer = getEditor();
      let suffix = targetBuffer.document.uri.fsPath.match(/[^.]+$/);
      if (suffix !== null) {
        //filePathEditor = filePathEditor + "." + suffix[0];
        filePathEditor = filePathEditor + ".txt";
      }
      const regexp = new RegExp(what);
      const lines = targetBuffer.document.getText().split("\n");
      lines.map((x, index) => {
        const found = x.match(regexp);
        if (found) {
          matchlines += `${index + 1}:${found.input}\n`;
        }
      });

      // occur結果用のウィンドウ操作
      await vscode.commands.executeCommand("workbench.action.splitEditorDown");
      console.log("out:" + filePathEditor);
      await fs.writeFile(filePathEditor, matchlines);
      const doc = await vscode.workspace.openTextDocument(filePathEditor);
      await vscode.window.showTextDocument(doc, { preview: false });
      await vscode.commands.executeCommand(
        "workbench.action.nextEditorInGroup"
      );
      await vscode.commands.executeCommand(
        "workbench.action.closeActiveEditor"
      );

      occurBuffer = getEditor();

      // occurのキーワードを目立たせる
      const regEx = new RegExp(what, "g");
      const text = occurBuffer.document.getText();
      const smallNumbers: vscode.DecorationOptions[] = [];
      let match;
      while ((match = regEx.exec(text))) {
        console.log(match);
        const startPos = occurBuffer.document.positionAt(match.index);
        const endPos = occurBuffer.document.positionAt(
          match.index + match[0].length
        );
        const decoration = { range: new vscode.Range(startPos, endPos) };
        smallNumbers.push(decoration);
      }
      occurBuffer.setDecorations(selectDecorationType, smallNumbers);

      // occur結果の格納
      const destPos = new vscode.Position(0, 0);
      const destSel = new vscode.Selection(destPos, destPos);
      occurBuffer.selection = destSel;
    }
  });

  register('occurType.curUp', () => {
    console.log('occurType.curUp');
    if (!vscode.window.activeTextEditor) {
      return;
    }
    if (vscode.window.activeTextEditor === occurBuffer) {
      occurType(vscode.window.activeTextEditor,'p');
    }
  });


  emacs-mcx.previousLine

  register('occurType.curDown', () => {
    console.log('occurType.curDown');
    if (!vscode.window.activeTextEditor) {
      return;
    }
    if (vscode.window.activeTextEditor !== occurBuffer) {
      // 通常のVSCodeの入力処理
      vscode.commands.executeCommand("emacs-mcx.nextLine");
      return;
    }
      occurType(vscode.window.activeTextEditor,'n');

  });

  // キーハンドリング(occurバッファとそれ以外)
  register("type", (e) => {
    if (!vscode.window.activeTextEditor) {
      return;
    }

    if (vscode.window.activeTextEditor !== occurBuffer) {
      // 通常のVSCodeの入力処理
      vscode.commands.executeCommand("default:type", {
        text: e.text,
      });
      return;
    }

    try {
      occurType(vscode.window.activeTextEditor, e.text);
    } catch (error) {
      console.error(error);
    }
  });
}
export function deactivate() {}


