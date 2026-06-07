const toastStyles = {
    success: 'bg-emerald-600',
    error: 'bg-rose-600',
    info: 'bg-sky-600',
};

const Toast = ({ toast }) => {
    if (!toast) {
        return null;
    }

    return (
        <div className="pointer-events-none fixed bottom-5 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2">
            <div className={`rounded-3xl px-5 py-4 text-sm text-white shadow-xl ${toastStyles[toast.type] || toastStyles.info}`}>
                {toast.message}
            </div>
        </div>
    );
};

export default Toast;
