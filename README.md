# hello README

This is the README for your extension "hello". After writing up a brief description, we recommend including the following sections.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

-----------------------------------------------------------------------------------------------------------
## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**

# 参考

## Visual Studio Codeのコマンドパレットでリスト(Quick Pick)を出す方法
https://clickan.click/vsc-list-api/

## VS Code API(公式)
https://code.visualstudio.com/api/references/vscode-api

## VSCodeの拡張開発に入門してみました
https://techblog.gmo-ap.jp/2020/12/28/vscode-extension-dev/

## 雑なVSCode拡張を作ろう #kyotoasterisk
https://blog.sushi.money/entry/2018/08/18/163959

## VSCodeにZenVimというVim拡張を作った
https://blog.koh.dev/2019-11-22-vscode-zenvim/

## vscode-textbuffer(github)
https://github.com/microsoft/vscode-textbuffer

## Docs/getstarted/keybindings.md(github)
https://github.com/vscode-doc-jp/Docs/blob/master/getstarted/keybindings.md

## VSCodeでマクロ(スクリプト)を実現する方法【拡張作成編】
https://www.exceedsystem.net/2020/11/08/how-to-create-extension-as-macro-in-vscode/

## Visual Studio Codeの拡張機能で外部コマンドを実行したい
https://blog.okazuki.jp/entry/2016/08/29/222739

## VSCodeでDoxygenのプレビューをしたい！
https://qiita.com/hakua-doublemoon/items/c328a7bf0bc7a1fbef14

## Visual Studio Code API コマンド編 -vscode.commands-
https://clickan.click/vscode-command/

## Commands(公式)
https://code.visualstudio.com/api/extension-guides/command

## ざっくりとイメージをつかむための Visual Studio Code 拡張機能開発入門
https://qiita.com/sta/items/979f6d6eafcc74f01723 (おすすめ)

## Key Bindings for Visual Studio Code(公式)
https://code.visualstudio.com/docs/getstarted/keybindings

## 次の一歩
https://qiita.com/RAWSEQ/items/7c53596754d2a102499f

## VS CodeのExtension カーソル下のファイルパスを開く、行番号が付加されていたらその行に移動、かなりカスカスな実装
https://gist.github.com/beru/87d3ff19d5553a10583b7aea7543f3a5
## キーバインディング参考

## コマンドパレットOpne
{
  "key": "alt+x",
  "command": "workbench.action.showCommands",
  "when": "!config.emacs-mcx.useMetaPrefixMacCmd"
}

## 画面分割
{
  "key": "ctrl+x 2",
  "command": "workbench.action.splitEditorDown",
  "when": "!terminalFocus"
}


## Haxe Doc
https://vshaxe.github.io/vscode-extern/vscode/TextEditorEdit.html