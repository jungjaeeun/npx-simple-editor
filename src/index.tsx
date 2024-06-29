import React, { useEffect, useState } from 'react';
import s from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import { marked } from 'marked';

type EditorProps = {
  onSave?: (content: string) => void;
};

export const Editor: React.FC<EditorProps> = ({ onSave = () => {} }) => {
  const [content, setContent] = useState<string>('');
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  const [fontSize, setFontSize] = useState<string>('16px');
  const [fontColor, setFontColor] = useState<string>('black');
  const [previewContent, setPreviewContent] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);

  useEffect(() => {
    const updatePreviewContent = async () => {
      const htmlContent = await marked(content);
      setPreviewContent(htmlContent);
    };

    updatePreviewContent();
  }, [content, fontFamily, fontSize]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    setContent(newContent);
  };

  const handleBoldClick = () => {
    setContent((prevContent) => prevContent + '<b>Bold text</b>');
  };

  const handleItalicClick = () => {
    setContent((prevContent) => prevContent + '<i>Italic text</i>');
  };

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFont = event.target.value;
    setFontFamily(selectedFont);
  };

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = event.target.value;
    setFontSize(selectedSize);
  };

  const handleFontColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectColor = event.target.value;
    setFontColor(selectColor);
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(content);
  };

  const FontFamilySelect = () => {
    const fontFamilies: string[] = ['Arial', 'Verdana', 'Helvetica', 'Times New Roman', 'Courier New'];
    return (
      <select onChange={handleFontChange} value={fontFamily}>
        {fontFamilies.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
    );
  };

  const FontSizeSelect = () => {
    const minFont = 6;
    const maxFont = 18;
    const fontSizes: string[] = Array.from({ length: maxFont - minFont + 1 }, (_, index) => `${minFont + index * 2}px`);

    return (
      <select onChange={handleFontSizeChange} value={fontSize}>
        {fontSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    );
  };

  const FontColorSelect = () => {
    const fontColors: string[] = ['black', 'red', 'blue', 'green'];
    return (
      <select onChange={handleFontColorChange} value={fontColor}>
        {fontColors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <div className={s['editor_option_box'] + s['editor_border']}>
        <button type="button" onClick={handleBoldClick}>
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button type="button" onClick={handleItalicClick}>
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <FontFamilySelect />
        <FontSizeSelect />
        <FontColorSelect />
        <button type="button" onClick={handlePreview}>
          <FontAwesomeIcon icon={faBookOpenReader} />
        </button>
      </div>

      {showPreview && (
        <div className={s['editor_content_box'] + s['editor_border']}>
          <div
            dangerouslySetInnerHTML={{
              __html: `<div style="font-family: ${fontFamily}; font-size: ${fontSize} !important; color: ${fontColor}; white-space: pre-line;">${previewContent}</div>`,
            }}
          />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {!showPreview && (
          <textarea
            value={content}
            onChange={handleChange}
            required
            className={s['editor_content_box'] + s['editor_border']}
          />
        )}
        <button type="submit" className={s['btn_submit']}>
          확인
        </button>
      </form>
    </div>
  );
};
