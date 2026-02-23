import React from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { Toast as ToastType } from '../hooks/useToast';
interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}
export function Toast({ toast, onClose }: ToastProps) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info
  };
  const colors = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200'
  };
  const Icon = icons[toast.type];
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${colors[toast.type]}`}>

      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm font-medium flex-1">{toast.message}</p>
      <button
        onClick={() => onClose(toast.id)}
        className="p-1 hover:bg-black/5 rounded transition-colors">

        <X className="w-4 h-4" />
      </button>
    </div>);

}
interface ToastContainerProps {
  toasts: ToastType[];
  onClose: (id: string) => void;
}
export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {toasts.map((toast) =>
      <Toast key={toast.id} toast={toast} onClose={onClose} />
      )}
    </div>);

}