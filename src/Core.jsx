/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

const ReportGenerator = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [numSubtopics, setNumSubtopics] = useState(0);
  const [subtopics, setSubtopics] = useState([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [reportLength, setReportLength] = useState("");
  const [tone, setTone] = useState("");
  const [referenceStyle, setReferenceStyle] = useState("");

  const handleNumSubtopicsChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setNumSubtopics(count);
    setSubtopics(
      Array.from({ length: count }, () => ({
        title: "",
        link: "",
        length: "",
        numSubSubtopics: 0,
        subSubTopics: [],
      }))
    );
  };

  const handleSubtopicChange = (index, field, value) => {
    const updatedSubtopics = [...subtopics];
    updatedSubtopics[index][field] = value;
    setSubtopics(updatedSubtopics);
  };

  const handleSubSubtopicsChange = (index, e) => {
    const updatedSubtopics = [...subtopics];
    const numSubSubtopics = parseInt(e.target.value, 10);

    updatedSubtopics[index].numSubSubtopics = numSubSubtopics;
    updatedSubtopics[index].subSubTopics = Array.from(
      { length: numSubSubtopics },
      () => ({
        title: "",
        link: "",
        length: "",
      })
    );

    setSubtopics(updatedSubtopics);
  };

  const handleSubSubtopicDetailChange = (subIndex, field, value, index) => {
    const updatedSubtopics = [...subtopics];
    updatedSubtopics[index].subSubTopics = updatedSubtopics[
      index
    ].subSubTopics.map((subSub, i) =>
      i === subIndex ? { ...subSub, [field]: value } : subSub
    );
    setSubtopics(updatedSubtopics);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      Name: name,
      Title: title,
      Subtopics: subtopics.map((subTopic) => ({
        Title: subTopic.title,
        Link: subTopic.link,
        Length: subTopic.length,
        SubSubtopics: subTopic.subSubTopics.map((subSub) => ({
          Title: subSub.title,
          Link: subSub.link,
          Length: subSub.length,
        })),
      })),
      "Report Length": reportLength,
      Tone: tone,
      "Reference Style": referenceStyle,
    };

    console.log(formData);
    try {
      const response = await fetch("http://127.0.0.1:5000/generate_report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData, null, 2),
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${formData.Title}.docx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        alert("Failed to generate the report.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen font-mono ">
      <div className="container mx-auto max-h-screen p-6 bg-white rounded-lg overflow-auto w-300px">
        <h1 className="text-2xl font-bold text-center mb-4">
          Choose Report Creation Option
        </h1>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`py-2 px-4 border-2 ${
              selectedOption === "ai" ? "border-blue-500" : "border-gray-500"
            } rounded-full transition-all duration-300 hover:bg-blue-100`}
            onClick={() => setSelectedOption("ai")}
          >
            Generate Fully AI-powered Report
          </button>
          <button
            className={`py-2 px-4 border-2 ${
              selectedOption === "outline"
                ? "border-blue-500"
                : "border-gray-500"
            } rounded-full transition-all duration-300 hover:bg-blue-100`}
            onClick={() => setSelectedOption("outline")}
          >
            Create Report with Own Outline
          </button>
        </div>

        {selectedOption === "ai" && (
          <div className="flex justify-center mb-6">
            <div className="w-3/4">
              <textarea
                className="w-full h-60 border p-2 rounded-md resize-none"
                placeholder="Write your prompt here..."
              ></textarea>
            </div>
          </div>
        )}

        {selectedOption === "outline" && (
          <div className="border p-4 mb-6 rounded-lg w-2/4 mx-auto">
            <div className="flex items-center mb-4">
              <label className="w-1/4 mb-1">Report Title:</label>
              <input
                type="text"
                className="border p-2 w-2/4 rounded-md"
                placeholder="Enter report title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex items-center mb-4">
              <label className="w-1/4 mb-1">Prepared By:</label>
              <input
                type="text"
                className="border p-2 w-2/4 rounded-md"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex items-center mb-4">
              <label className="w-1/4 mb-1">Tone of Report:</label>
              <select
                className="border p-2 w-2/4 rounded-md"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option value="">Descriptive</option>
              </select>
            </div>

            <div className="flex items-center mb-4">
              <label className="w-1/4 mb-1">Reference Style:</label>
              <select
                className="border p-2 w-2/4 rounded-md"
                value={referenceStyle}
                onChange={(e) => setReferenceStyle(e.target.value)}
              >
                <option value="">APA</option>
              </select>
            </div>

            <div className="flex items-center mb-4">
              <label className="w-1/4 mb-1">Number of Subtopics:</label>
              <input
                type="number"
                className="border p-2 w-2/4 rounded-md"
                placeholder="Enter number of subtopics"
                onChange={handleNumSubtopicsChange}
              />
            </div>

            {subtopics.map((subtopic, index) => (
              <div key={index} className="mb-4 border p-4 rounded-lg">
                <h3 className="font-bold">Subtopic {index + 1}</h3>
                <div className="flex items-center mb-2">
                  <label className="w-1/4 mb-1">Subtopic Title:</label>
                  <input
                    type="text"
                    className="border p-2 w-2/4 rounded-md"
                    placeholder="Enter subtopic title"
                    value={subtopic.title}
                    onChange={(e) =>
                      handleSubtopicChange(index, "title", e.target.value)
                    }
                  />
                </div>
                <div className="flex items-center mb-2">
                  <label className="w-1/4 mb-1">Link:</label>
                  <input
                    type="text"
                    className="border p-2 w-2/4 rounded-md"
                    placeholder="Enter link"
                    value={subtopic.link}
                    onChange={(e) =>
                      handleSubtopicChange(index, "link", e.target.value)
                    }
                  />
                </div>
                <div className="flex items-center mb-2">
                  <label className="w-1/4 mb-1">Length (Words):</label>
                  <input
                    type="text"
                    className="border p-2 w-2/4 rounded-md"
                    placeholder="Enter length"
                    value={subtopic.length}
                    onChange={(e) =>
                      handleSubtopicChange(index, "length", e.target.value)
                    }
                  />
                </div>
                <div className="flex items-center mb-2">
                  <label className="w-1/4 mb-1">Number of Sub-Subtopics:</label>
                  <input
                    type="number"
                    className="border p-2 w-2/4 rounded-md"
                    placeholder="Enter number of sub-subtopics"
                    onChange={(e) => handleSubSubtopicsChange(index, e)}
                  />
                </div>
                {subtopic.subSubTopics.map((subSub, subIndex) => (
                  <div
                    key={subIndex}
                    className="ml-6 mb-2 border p-2 rounded-md"
                  >
                    <h4 className="font-bold">Sub-Subtopic {subIndex + 1}</h4>
                    <div className="flex items-center mb-2">
                      <label className="w-1/4 mb-1">Title:</label>
                      <input
                        type="text"
                        className="border p-2 w-2/4 rounded-md"
                        placeholder="Enter title"
                        value={subSub.title}
                        onChange={(e) =>
                          handleSubSubtopicDetailChange(
                            subIndex,
                            "title",
                            e.target.value,
                            index
                          )
                        }
                      />
                    </div>
                    <div className="flex items-center mb-2">
                      <label className="w-1/4 mb-1">Link:</label>
                      <input
                        type="text"
                        className="border p-2 w-2/4 rounded-md"
                        placeholder="Enter link"
                        value={subSub.link}
                        onChange={(e) =>
                          handleSubSubtopicDetailChange(
                            subIndex,
                            "link",
                            e.target.value,
                            index
                          )
                        }
                      />
                    </div>
                    <div className="flex items-center mb-2">
                      <label className="w-1/4 mb-1">Length (Words):</label>
                      <input
                        type="text"
                        className="border p-2 w-2/4 rounded-md"
                        placeholder="Enter length"
                        value={subSub.length}
                        onChange={(e) =>
                          handleSubSubtopicDetailChange(
                            subIndex,
                            "length",
                            e.target.value,
                            index
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <button
            className="bg-black text-white py-3 px-6 rounded-full transition-all duration-300 hover:bg-gray-700"
            onClick={handleSubmit}
          >
            Start Generating Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;
