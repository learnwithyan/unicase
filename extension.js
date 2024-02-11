var vscode = require('vscode');
const fs = require('fs');
const path = require('path'); // Import the 'path' module

const extFuncs = require('./files/funcs.js');

//path
var extId = 'learnwithyan.unicase';
//path of ext
var extensionPath = vscode.extensions.getExtension(extId).extensionPath;

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('unicase.com1', function () {
      extFuncs.trnslReadmeHandler();
    }),
    vscode.commands.registerCommand('unicase.com2', function () {
      genText('upper');
    }),
    vscode.commands.registerCommand('unicase.com3', function () {
      genText('lower');
    }),
    vscode.commands.registerCommand('unicase.com4', function () {
      genText('title');
    }),
    vscode.commands.registerCommand('unicase.com5', function () {
      genText('sentence');
    }),
    vscode.commands.registerCommand('unicase.com6', function () {
      genText('oppositecase');
    })
  );
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;

// function helpers
function genText(type) {
  var editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  var selection = editor.selection;
  var text = editor.document.getText(selection);

  // Split the text into an array of lines
  let lines = text.split(/\n/);
  let resultLines;

  // Process each line separately based on the specified type
  if (type == 'upper') {
    resultLines = lines.map((line) => {
      // Split each line into words
      let words = line.split(/\s+/);

      // Convert each word to uppercase
      let transformedWords = words.map((word) => word.toUpperCase());

      // Join the words back together
      return transformedWords.join(' ');
    });
    editor.edit((editBuilder) => {
      editBuilder.replace(selection, resultLines.join('\n'));
    });
  } else if (type == 'lower') {
    resultLines = lines.map((line) => {
      // Split each line into words
      let words = line.split(/\s+/);

      // Convert each word to uppercase
      let transformedWords = words.map((word) => word.toLowerCase());

      // Join the words back together
      return transformedWords.join(' ');
    });
    editor.edit((editBuilder) => {
      editBuilder.replace(selection, resultLines.join('\n'));
    });
  } else if (type == 'title') {
    resultLines = lines.map((line) => {
      // Split each line into words
      let words = line.split(/\s+/);

      // Convert each word to uppercase
      let transformedWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      });
      // Join the words back together
      return transformedWords.join(' ');
    });
    editor.edit((editBuilder) => {
      editBuilder.replace(selection, resultLines.join('\n'));
    });
  } else if (type == 'sentence') {
    resultLines = lines.map((line) => {
      // Split each line into sentences
      let sentences = line.match(/[^.!?]+[.!?]+/g) || [];

      // Capitalize the first letter of each sentence
      let transformedSentences = sentences.map((sentence) => {
        let trimmedSentence = sentence.trim();
        return (
          trimmedSentence.charAt(0).toUpperCase() +
          trimmedSentence.slice(1).toLowerCase()
        );
      });

      // Join the sentences back together
      return transformedSentences.join(' ');
    });
    editor.edit((editBuilder) => {
      editBuilder.replace(selection, resultLines.join('\n'));
    });
  } else if (type == 'oppositecase') {
    let transform = lines.map((line) => {
      let words = line.split(/\s+/);
      return words
        .map((word) =>
          word
            .split('')
            .map((char, index) =>
              index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
            )
            .join('')
        )
        .join(' ');
    });
    resultText = transform.join('\n');

    // Replace the selected text with the transformed result
    editor.edit((editBuilder) => {
      editBuilder.replace(selection, resultText);
    });
  }
}
