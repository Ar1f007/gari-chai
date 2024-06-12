import parse from 'html-react-parser';
export function convertHtmlToText(content: string) {
  return parse(content);
}
