import { useState } from 'react';
import {
    Editor, 
    BtnBold, 
    BtnItalic, 
    EditorProvider, 
    Toolbar,
    // createButton,
    BtnUndo,
    BtnRedo,
    BtnUnderline,
    BtnBulletList,
    // BtnAlignCenter,
    BtnNumberedList,
    
} from 'react-simple-wysiwyg';

function WYSIWYG({getContent}) {
  const [html, setHtml] = useState('');

  function onChange(e) {
    setHtml(e.target.value);
    getContent(e.target.value);
  }

  return (
    <EditorProvider>
        <Editor value={html} onChange={onChange} />
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnRedo />
          <BtnUndo />
          <BtnBulletList />
          <BtnNumberedList />
        </Toolbar>
        {/* <BtnAlignCenter /> */}
    </EditorProvider>
  );
}


export default WYSIWYG;