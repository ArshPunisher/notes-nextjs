import { useState } from "react";
import { DiVim } from "react-icons/di";
import { MdAdd, MdClose } from "react-icons/md";

interface Props {
  tags: any;
  setTags: any;
}

const Tags = ({ tags, setTags }: Props) => {
  const [inputVal, setInputVal] = useState<string>("");

  const addNewTag = () => {
    if (inputVal.trim() !== "") {
      setTags([...tags, inputVal.trim()]);
      setInputVal("");
    }
  };

  const clearTag = (tagToRemove:string) =>{
    setTags(tags.filter((tag:string)=> tag!==tagToRemove))
  }
  return (
    <div>
      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {tags &&
            tags.map((tag: string, index: any) => (
              <span className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 rounded-md px-3 py-1">
                # {tag}
                <button onClick={()=> clearTag(tag)}>
                  <MdClose/>
                </button>
              </span>
            ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="bg-transparent border rounded-md outline-none px-3 py-2 placeholder:text-sm"
          name="tags"
          placeholder="Add Tags"
          value={inputVal}
          onChange={(e: any) => setInputVal(e.target.value)}
        />

        <button
          className="flex items-center justify-center w-8 h-8 bg-green-500 hover:bg-green-700 rounded-md"
          onClick={addNewTag}
        >
          <MdAdd className="text-[1.5rem] font-bold text-white" />
        </button>
      </div>
    </div>
  );
};

export default Tags;
