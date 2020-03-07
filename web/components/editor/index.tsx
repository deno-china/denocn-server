import 'easymde/dist/easymde.min.css';
import React, { FunctionComponent, useEffect, useRef } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { uploadBase64 } from '../../common/request';
import { drawImage } from './hack';
import './index.less';
import editorOptions from './options';

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

const Editor: FunctionComponent<EditorProps> = (props) => {
  const editor = useRef(null);
  useEffect(() => {
    const listener = (event: ClipboardEvent) => {
      if (event.clipboardData) {
        const { clipboardData } = event;
        if (clipboardData.items) {
          let blob;
          for (let i = 0; i < clipboardData.items.length; i += 1) {
            if (clipboardData.items[i].type.indexOf('image') !== -1) {
              blob = clipboardData.items[i].getAsFile();
              break;
            }
          }
          if (blob) {
            const reader: FileReader = new FileReader();
            reader.onload = async (evt: any) => {
              const base64 = evt.target.result;
              const path = await uploadBase64(base64);
              drawImage(editor.current, path);
            };
            reader.readAsDataURL(blob);
          }
        }
      }
    };
    document.addEventListener('paste', listener);
    return () => {
      document.removeEventListener('paste', listener);
    };
  }, []);
  return (
    <SimpleMDE
      getMdeInstance={(instance) => {
        // @ts-ignore
        editor.current = instance;
      }}
      value={props.value}
      onChange={props.onChange}
      options={editorOptions}
    />
  );
};

export default Editor;
