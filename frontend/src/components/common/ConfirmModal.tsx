import React from 'react';
import { X, ShieldAlert, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: React.ReactNode;
  warningText?: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  warningText,
  confirmText = 'OK',
  cancelText = 'Cancel',
  isDestructive = true,
  loading = false,
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isDestructive ? (
            <div className="mb-6 flex items-start gap-4 rounded-lg bg-red-50 p-4">
              <ShieldAlert className="mt-0.5 shrink-0 text-red-600" size={24} />
              <div>
                <h3 className="font-semibold text-red-800">
                  {warningText || 'Warning: Irreversible Action'}
                </h3>
                <p className="mt-1 text-sm text-red-700">{message}</p>
              </div>
            </div>
          ) : (
            <div className="mb-6 flex items-start gap-4 rounded-lg bg-blue-50 p-4">
              <AlertCircle className="mt-0.5 shrink-0 text-blue-600" size={24} />
              <div>
                <p className="text-sm text-blue-800">{message}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t bg-gray-50 px-6 py-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${
              isDestructive
                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
            }`}
          >
            {loading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
