import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PasswordInput = ({ label, name, value, onChange, required = false, placeholder = '' }) => {
    const [visible, setVisible] = useState(false);

    return (
        <label className="block text-sm font-medium text-slate-700">
            {label}
            <div className="relative mt-2">
                <input
                    type={visible ? 'text' : 'password'}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
                <button
                    type="button"
                    onClick={() => setVisible((current) => !current)}
                    className="absolute inset-y-0 right-3 flex items-center text-slate-500 transition hover:text-slate-900"
                    aria-label={visible ? 'Hide password' : 'Show password'}
                >
                    {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
        </label>
    );
};

export default PasswordInput;
