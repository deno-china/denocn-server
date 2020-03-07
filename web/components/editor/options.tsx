import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import 'highlight.js/styles/github.css';

const editorOptions = {
  spellChecker: false,
  renderingConfig: {
    singleLineBreaks: false,
    codeSyntaxHighlighting: true,
    hljs,
  },
  promptURLs: true,
  toolbar: [
    'bold',
    'italic',
    'strikethrough',
    'heading',
    'code',
    'quote',
    'unordered-list',
    'ordered-list',
    'clean-block',
    'link',
    'image',
    'table',
    'horizontal-rule',
    '|',
    'preview',
    'side-by-side',
    'fullscreen',
  ],
};

export default editorOptions;
