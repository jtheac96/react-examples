import { useState } from "react";
import "./accordion.css"

export const Accordion = () => {
  const data = [
    {
      id: "1",
      question: "What are accordion components?",
      answer:
        "Accordion components are user interface elements used for organizing and presenting content in a collapsible manner. They typically consist of a header, content, and an expand/collapse action.",
    },
    {
      id: "2",
      question: "What are they used for?",
      answer:
        "They are commonly employed in various contexts, including FAQs, product descriptions, navigation menus, settings panels, and data tables, to save screen space and provide a structured and user-friendly interface for presenting information or options.",
    },
    {
      id: "3",
      question: "Accordion as a musical instrument",
      answer:
        "The accordion is a musical instrument with a keyboard and bellows. It produces sound by air passing over reeds when the player expands or compresses the bellows, used in various music genres.",
    },
    {
      id: "4",
      question:
        "Can I create an accordion component with a different framework?",
      answer:
        "Yes of course, it is very possible to create an accordion component with another framework.",
    },
  ];

  const [enableMultiAccordion, setEnableMultiAccordion] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [multiple, setMultiple] = useState<string[]>([]);

  const onChangeMode = () => {
    setSelected(null);
    setMultiple([]);
    setEnableMultiAccordion(prev => !prev);
  }

  const handleSingleSelection = (id: string) => {
    setSelected(prev => prev !== id ? id : null);
  }

  const handleMultiSelection = (id: string) => {
    const copyMultiple = [...multiple];
    const index = copyMultiple.indexOf(id);
    
    if (index !== -1) {
      copyMultiple.splice(index, 1);
    } else {
      copyMultiple.push(id);
    }

    setMultiple(copyMultiple);
  }

  return (
    <div className="accordion">
      <div className="multi">
        <div>
          <p>Multi Acoordion:</p>
          <span className={enableMultiAccordion ? "green" : "red"}></span>
        </div>
        <button onClick={onChangeMode}>
          {enableMultiAccordion ? "Disable" : "Enable"}
        </button>
      </div>
      {data && data.length > 0 ? (
        data.map((item) => (
          <div className="item" key={item.id}>
            <div className="question" onClick={enableMultiAccordion ? () => handleMultiSelection(item.id) : () => handleSingleSelection(item.id)}>
              <p>{item.question}</p>
              <span>+</span>
            </div>
            {enableMultiAccordion ? multiple.indexOf(item.id) !== -1 && (
              <div className="answer">
                <p>{item.answer}</p>
              </div>
            ) : selected === item.id && (
              <div className="answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))
      ) : (
        <div>No data found</div>
      )}
    </div>
  );
};
