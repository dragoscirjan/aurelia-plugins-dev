import * as CodeMirror from 'codemirror';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/shell/shell';

export class Component {
  attached() {
    Array.from(document.querySelectorAll('textarea.codemirror')).map(element =>
      CodeMirror.fromTextArea(element, {
        lineNumbers: false,
        styleActiveLine: true,
        mode: element.dataset.codemirrorMode || 'text/html',
        matchBrackets: true,
        readOnly: 'nocursor'
      })
    );
  }
}
