import React from "react";

interface FormattedMessageProps {
  content: string;
}

export default function FormattedMessage({ content }: FormattedMessageProps) {
  // Parse and format the message content
  const formatMessage = (text: string) => {
    // Handle fenced code blocks first (```lang ... ```)
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      const [full, lang, code] = match;
      const start = match.index;

      // Text before the code block
      if (start > lastIndex) {
        parts.push(renderSections(text.slice(lastIndex, start)));
      }

      // The code block itself
      parts.push(
        <pre
          key={`codeblock-${start}`}
          className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto my-3 text-sm"
        >
          <code className={`language-${lang || "text"}`}>{code.trim()}</code>
        </pre>
      );

      lastIndex = start + full.length;
    }

    // Remaining text after last code block
    if (lastIndex < text.length) {
      parts.push(renderSections(text.slice(lastIndex)));
    }

    return parts;
  };

  // Render normal sections (your previous logic)
  const renderSections = (text: string) => {
    const sections = text.split("\n\n");

    return sections.map((section, sectionIndex) => {
      const lines = section.split("\n");
      const elements: React.ReactNode[] = [];

      lines.forEach((line, lineIndex) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return;

        // Horizontal rules
        if (/^(-{3,}|\*{3,})$/.test(trimmedLine)) {
          elements.push(
            <hr
              key={`hr-${sectionIndex}-${lineIndex}`}
              className="my-4 border-gray-300"
            />
          );
        }
        // Markdown headers (#, ##, ###)
        else if (/^#{1,6}\s+/.test(trimmedLine)) {
          const headerLevel = trimmedLine.match(/^#+/)?.[0].length ?? 1;
          const headerText = trimmedLine.replace(/^#+\s*/, "");
          const tag = `h${Math.min(
            headerLevel,
            6
          )}` as keyof React.JSX.IntrinsicElements;

          elements.push(
            React.createElement(
              tag,
              {
                key: `header-md-${sectionIndex}-${lineIndex}`,
                className: `font-bold mb-2 mt-4 first:mt-0 ${
                  headerLevel === 1
                    ? "text-2xl"
                    : headerLevel === 2
                    ? "text-xl"
                    : "text-lg"
                }`,
              },
              formatInlineText(headerText)
            )
          );
        }
        // Headers ending with colon and wrapped in **
        else if (/^\*\*.*:\*\*$/.test(trimmedLine)) {
          const headerText = trimmedLine.replace(/^\*\*|\*\*$/g, "");
          elements.push(
            <h3
              key={`header-${sectionIndex}-${lineIndex}`}
              className="font-bold text-lg text-gray-900 mb-2 mt-4 first:mt-0"
            >
              {headerText}
            </h3>
          );
        }
        // Bold section headers (**text**)
        else if (/^\*\*.*\*\*$/.test(trimmedLine)) {
          const headerText = trimmedLine.replace(/^\*\*|\*\*$/g, "");
          elements.push(
            <h4
              key={`subheader-${sectionIndex}-${lineIndex}`}
              className="font-semibold text-base text-gray-800 mb-2 mt-3 first:mt-0"
            >
              {headerText}
            </h4>
          );
        }
        // Numbered lists
        else if (/^\d+\.\s+/.test(trimmedLine)) {
          const listText = trimmedLine.replace(/^\d+\.\s+/, "");
          elements.push(
            <div
              key={`numbered-${sectionIndex}-${lineIndex}`}
              className="flex items-start gap-2 mb-1"
            >
              <span className="font-medium text-blue-600 min-w-[20px]">
                {trimmedLine.match(/^\d+/)?.[0]}.
              </span>
              <span className="text-gray-700">
                {formatInlineText(listText)}
              </span>
            </div>
          );
        }
        // Bullet points
        else if (/^[*\-•]\s+/.test(trimmedLine)) {
          const bulletText = trimmedLine.replace(/^[*\-•]\s+/, "");
          elements.push(
            <div
              key={`bullet-${sectionIndex}-${lineIndex}`}
              className="flex items-start gap-2 mb-1 ml-4"
            >
              <span className="text-blue-600 font-bold min-w-[8px] mt-1">
                •
              </span>
              <span className="text-gray-700">
                {formatInlineText(bulletText)}
              </span>
            </div>
          );
        }
        // Sub-bullets
        else if (/^\s{2,}[*\-•]\s+/.test(trimmedLine)) {
          const subBulletText = trimmedLine.replace(/^\s*[*\-•]\s+/, "");
          elements.push(
            <div
              key={`subbullet-${sectionIndex}-${lineIndex}`}
              className="flex items-start gap-2 mb-1 ml-8"
            >
              <span className="text-gray-500 font-bold min-w-[8px] mt-1">
                ◦
              </span>
              <span className="text-gray-600">
                {formatInlineText(subBulletText)}
              </span>
            </div>
          );
        }
        // Normal paragraph
        else {
          elements.push(
            <p
              key={`para-${sectionIndex}-${lineIndex}`}
              className="text-gray-700 mb-2 leading-relaxed"
            >
              {formatInlineText(trimmedLine)}
            </p>
          );
        }
      });

      return (
        <div key={`section-${sectionIndex}`} className="mb-4 last:mb-0">
          {elements}
        </div>
      );
    });
  };

  // Inline text (bold, italic, code)
  const formatInlineText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

    return parts.map((part, index) => {
      if (/^\*\*.*\*\*$/.test(part)) {
        return (
          <strong key={index} className="font-semibold text-gray-900">
            {part.replace(/^\*\*|\*\*$/g, "")}
          </strong>
        );
      } else if (/^\*.*\*$/.test(part)) {
        return (
          <em key={index} className="italic">
            {part.replace(/^\*|\*$/g, "")}
          </em>
        );
      } else if (/^`.*`$/.test(part)) {
        return (
          <code
            key={index}
            className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800"
          >
            {part.replace(/^`|`$/g, "")}
          </code>
        );
      }
      return part;
    });
  };

  return <div className="formatted-message">{formatMessage(content)}</div>;
}
