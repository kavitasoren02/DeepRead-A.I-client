import React from "react";

interface FormattedMessageProps {
  content: string;
}

export default function FormattedMessage({ content }: FormattedMessageProps) {
  const formatMessage = (text: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      const [full, lang, code] = match;
      const start = match.index;

      if (start > lastIndex) {
        parts.push(renderSections(text.slice(lastIndex, start)));
      }

      parts.push(
        <pre
          key={`codeblock-${start}`}
          className="w-[calc(100vw-90px)] md:w-[calc(100vw-40px)] lg:w-full bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto my-3 text-sm sm:text-base whitespace-pre"
        >
          <code className={`language-${lang || "text"}`}>{code.trim()}</code>
        </pre>
      );

      lastIndex = start + full.length;
    }

    if (lastIndex < text.length) {
      parts.push(renderSections(text.slice(lastIndex)));
    }

    return parts;
  };

  const renderSections = (text: string) => {
    const sections = text.split("\n\n");

    return sections.map((section, sectionIndex) => {
      const lines = section.split("\n");
      const elements: React.ReactNode[] = [];

      lines.forEach((line, lineIndex) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return;

        if (/^(-{3,}|\*{3,})$/.test(trimmedLine)) {
          elements.push(
            <hr
              key={`hr-${sectionIndex}-${lineIndex}`}
              className="my-2 sm:my-3 border-gray-300"
            />
          );
        } else if (/^#{1,6}\s+/.test(trimmedLine)) {
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
                className: `font-bold mb-2 mt-4 first:mt-0 break-words ${
                  headerLevel === 1
                    ? "text-xl sm:text-2xl"
                    : headerLevel === 2
                    ? "text-lg sm:text-xl"
                    : "text-base sm:text-lg"
                }`,
              },
              formatInlineText(headerText)
            )
          );
        } else if (/^\*\*.*:\*\*$/.test(trimmedLine)) {
          const headerText = trimmedLine.replace(/^\*\*|\*\*$/g, "");
          elements.push(
            <h3
              key={`header-${sectionIndex}-${lineIndex}`}
              className="font-bold text-lg sm:text-xl text-gray-900 mb-2 mt-4 first:mt-0 break-words"
            >
              {headerText}
            </h3>
          );
        } else if (/^\*\*.*\*\*$/.test(trimmedLine)) {
          const headerText = trimmedLine.replace(/^\*\*|\*\*$/g, "");
          elements.push(
            <h4
              key={`subheader-${sectionIndex}-${lineIndex}`}
              className="font-semibold text-base sm:text-lg text-gray-800 mb-2 mt-3 first:mt-0 break-words"
            >
              {headerText}
            </h4>
          );
        } else if (/^\d+\.\s+/.test(trimmedLine)) {
          const listText = trimmedLine.replace(/^\d+\.\s+/, "");
          elements.push(
            <div
              key={`numbered-${sectionIndex}-${lineIndex}`}
              className="flex items-start gap-2 mb-1"
            >
              <span className="font-medium text-blue-600 min-w-[20px]">
                {trimmedLine.match(/^\d+/)?.[0]}.
              </span>
              <span className="text-gray-700 text-sm sm:text-base break-words">
                {formatInlineText(listText)}
              </span>
            </div>
          );
        } else if (/^[*\-•]\s+/.test(trimmedLine)) {
          const bulletText = trimmedLine.replace(/^[*\-•]\s+/, "");
          elements.push(
            <div
              key={`bullet-${sectionIndex}-${lineIndex}`}
              className="flex items-start gap-2 mb-1 ml-3 sm:ml-4"
            >
              <span className="text-blue-600 font-bold min-w-[8px] mt-1">
                •
              </span>
              <span className="text-gray-700 text-sm sm:text-base break-words">
                {formatInlineText(bulletText)}
              </span>
            </div>
          );
        } else if (/^\s{2,}[*\-•]\s+/.test(trimmedLine)) {
          const subBulletText = trimmedLine.replace(/^\s*[*\-•]\s+/, "");
          elements.push(
            <div
              key={`subbullet-${sectionIndex}-${lineIndex}`}
              className="flex items-start gap-2 mb-1 ml-6 sm:ml-8"
            >
              <span className="text-gray-500 font-bold min-w-[8px] mt-1">
                ◦
              </span>
              <span className="text-gray-600 text-sm sm:text-base break-words">
                {formatInlineText(subBulletText)}
              </span>
            </div>
          );
        } else {
          elements.push(
            <p
              key={`para-${sectionIndex}-${lineIndex}`}
              className="text-gray-700 mb-2 leading-relaxed text-sm sm:text-base break-words"
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

  const formatInlineText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

    return parts.map((part, index) => {
      if (/^\*\*.*\*\*$/.test(part)) {
        return (
          <strong
            key={index}
            className="font-semibold text-gray-900 break-words"
          >
            {part.replace(/^\*\*|\*\*$/g, "")}
          </strong>
        );
      } else if (/^\*.*\*$/.test(part)) {
        return (
          <em key={index} className="italic break-words">
            {part.replace(/^\*|\*$/g, "")}
          </em>
        );
      } else if (/^`.*`$/.test(part)) {
        return (
          <code
            key={index}
            className="bg-gray-100 px-1 py-0.5 rounded text-xs sm:text-sm font-mono text-gray-800 break-words"
          >
            {part.replace(/^`|`$/g, "")}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className="formatted-message w-full">{formatMessage(content)}</div>
  );
}
