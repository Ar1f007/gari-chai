import '@/styles/tiptap-editor.css';

import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';
import debounce from 'debounce';

import { useFormContext, useController, useWatch } from 'react-hook-form';
import { useEditor, EditorContent, BubbleMenu, EditorOptions, EditorEvents } from '@tiptap/react';
import { Button, ButtonGroup } from '@nextui-org/button';
import { BoldIcon, HighlighterIcon, ItalicIcon, StrikethroughIcon } from 'lucide-react';
import { useEffect } from 'react';

type CustomEditorOptions = {
  onUpdateDelay?: number;
} & EditorOptions;

type TextEditorProps = {
  name: string;
  tiptapOptions?: CustomEditorOptions;
};

const ACTIVE_ICON_CLASSES = 'font-semibold text-primary';
const INACTIVE_ICON_CLASSES = 'text-gray-500';

export const RHFTextEditor: React.FC<TextEditorProps> = ({ name, tiptapOptions }) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const value = useWatch({ name });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({
        HTMLAttributes: {
          class: 'highlight-text',
        },
        multicolor: true,
      }),
      Typography,
      Placeholder,
    ],
    content: field.value || '',
    onUpdate: debounce(
      ({ editor }: { editor: EditorEvents['update']['editor'] }) => {
        const content = editor.isEmpty ? '' : editor.getHTML();
        field.onChange(content);
      },
      tiptapOptions?.onUpdateDelay ?? 700,
    ),

    ...tiptapOptions,
  });

  useEffect(() => {
    if (editor && !value.length && !editor.isEmpty) {
      editor.commands.clearContent();
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <>
      <BubbleMenu
        tippyOptions={{ duration: 100 }}
        editor={editor}
      >
        <ButtonGroup size='sm'>
          <Button
            onPress={() => editor.chain().focus().toggleBold().run()}
            isIconOnly
            aria-label='make the selected text bold'
          >
            <BoldIcon
              size={18}
              className={editor.isActive('bold') ? ACTIVE_ICON_CLASSES : INACTIVE_ICON_CLASSES}
            />
          </Button>
          <Button
            onPress={() => editor.chain().focus().toggleItalic().run()}
            isIconOnly
            aria-label='make the selected text italic'
          >
            <ItalicIcon
              size={18}
              className={editor.isActive('italic') ? ACTIVE_ICON_CLASSES : INACTIVE_ICON_CLASSES}
            />
          </Button>
          <Button
            onPress={() => editor.chain().focus().toggleStrike().run()}
            isIconOnly
            aria-label='strike through the selected text'
          >
            <StrikethroughIcon
              size={18}
              className={editor.isActive('strike') ? ACTIVE_ICON_CLASSES : INACTIVE_ICON_CLASSES}
            />
          </Button>
          <Button
            onPress={() => editor.chain().focus().toggleHighlight().run()}
            isIconOnly
            aria-label='highlight the selected text'
          >
            <HighlighterIcon
              size={18}
              className={editor.isActive('highlight') ? ACTIVE_ICON_CLASSES : INACTIVE_ICON_CLASSES}
            />
          </Button>
        </ButtonGroup>
      </BubbleMenu>

      <EditorContent editor={editor} />
      {fieldState.error && <p className='mt-2 text-sm text-danger'>{fieldState.error.message}</p>}
    </>
  );
};
