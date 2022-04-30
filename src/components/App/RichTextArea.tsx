import { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './RichTextArea.module.scss';

export default function RichTextArea() {
  const [value, setValue] = useState(() => EditorState.createEmpty(),);
  const [convertedValue, setconvertedValue] = useState<string | null>();
  const handleChange = (state: any) => { 
    setValue(state);
    handleConversion();
  };
  const handleConversion = () => {
    setconvertedValue(
      convertToHTML(value.getCurrentContent())
    );
  };

  // https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp
  return (
    <>
      <Editor
        editorState={value}
        onEditorStateChange={handleChange}
        toolbar={{
          options: ['inline'],
          inline: { options: ['bold', 'italic', 'underline']},
        }}
        wrapperClassName={styles.wrapper}
        editorClassName={styles.editor}
        toolbarClassName={styles.toolbar}
      />
      <div className={styles.button}>
        <button onClick={() => {console.log(convertedValue);}}>Log string</button>
      </div>
    </>
  );
};