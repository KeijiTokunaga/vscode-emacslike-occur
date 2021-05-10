# EmacsLike Occurmode for VSCode
 
 A simple grep function that works similar to Emacs' occur mode.
 
 
# Features
 
Without taking your hands off the keyboard, check the list of grep results in the buffer. From the results, you can jump to the corresponding buffer.
 

# Usage
 
1. Open the VSCode command palette  
1. Type 'occur
1. Enter a search term
1. The search results will be displayed in the spread window
1. Select the grep result by moving the cursor up and down with N/P
1. By pressing Return, close the grep result and jump to the corresponding buffer
 
# Note
 
注意点などがあれば書く
 
# Author
 
* KeijiTokunaga
 
# License
 
"EmacsLike Occurmode for VSCode" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).

**Enjoy!**  

# Reference sites (Thanks!)

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

## Haxe Doc
https://vshaxe.github.io/vscode-extern/vscode/TextEditorEdit.html

## 新規ウィンドの開き方の参考
https://github.com/kawamurakazushi/vscode-smart-split

## コマンド一覧
https://murashun.jp/article/programming/visual-studio-code/shortcut-keys.html

## ライフサイクル
onDidChangeActiveTextEditor

## マークダウンキャット
https://poyonshot.hatenablog.com/archive/category/vscode

## コマンド以外の実行方法
https://qiita.com/rma/items/3fdd8b09db115188b8f0

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

{
  "key": "ctrl+x o",
  "command": "workbench.action.navigateEditorGroups",
  "when": "!terminalFocus"
}
