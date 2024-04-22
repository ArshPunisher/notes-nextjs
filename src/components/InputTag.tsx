"use client"

interface Props{
  name: string
  value: string;
  onChange: ()=> void
  label: string
}

const InputTag = ({name, value, onChange, label}:Props) => {
  return (
    <div>
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <div className="w-full bg-slate-50 border rounded-md">
        <input type="password" name={name} value={value} onChange={onChange} className="input-box" placeholder="••••••••" />
      </div>
    </div>
  );
};

export default InputTag;
