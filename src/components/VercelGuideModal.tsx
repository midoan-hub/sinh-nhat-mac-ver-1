import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, Zap, Terminal, Globe, ShieldCheck } from 'lucide-react';

interface VercelGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VercelGuideModal: React.FC<VercelGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-bold">Triển Khai Tự Động Lên Vercel (Zero-Setup)</h2>
              <p className="text-xs text-slate-400">Không cần biến môi trường, không cần cài database phức tạp</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 text-xs text-slate-600 leading-relaxed">
          {/* Highlight Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-950 text-sm">Gói Dự Án Đã Sẵn Sàng 100% Cho Vercel!</p>
              <p className="mt-1 text-emerald-800">
                Toàn bộ mã nguồn đã được cấu hình với file <code>vercel.json</code>, Vite React SPA, phân bổ đội thông minh lưu trữ cục bộ, sẵn sàng deploy ngay tức thì chỉ với 1 click.
              </p>
            </div>
          </div>

          {/* Cách 1: Deploy qua GitHub (Khuyên dùng) */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                1
              </span>
              Cách 1: Deploy qua GitHub & Vercel (Tự động cập nhật)
            </h3>
            <ol className="list-decimal pl-6 space-y-2 text-slate-700">
              <li>
                Đẩy thư mục mã nguồn này lên kho lưu trữ GitHub của bạn (Repository).
              </li>
              <li>
                Truy cập <strong>vercel.com</strong> → Bấm <strong>"Add New..."</strong> → Chọn <strong>"Project"</strong>.
              </li>
              <li>
                Chọn GitHub Repository vừa tạo → Bấm <strong>"Deploy"</strong>.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Không cần điền bất kỳ Environment Variable nào!</span> Vercel sẽ tự động phát hiện framework là <strong>Vite</strong>, chạy <code>vite build</code> và tạo link web công khai ngay trong 1 phút.
              </li>
            </ol>
          </div>

          {/* Cách 2: Deploy trực tiếp bằng lệnh Vercel CLI */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                2
              </span>
              Cách 2: Triển khai nhanh bằng Vercel CLI (1 câu lệnh)
            </h3>
            <p className="text-slate-600">
              Nếu bạn đã cài sẵn Node.js và terminal trên máy:
            </p>
            <div className="bg-slate-900 text-slate-200 p-3.5 rounded-xl font-mono text-[11px] relative flex items-center justify-between">
              <code>npx vercel --prod</code>
              <button
                onClick={() => copyToClipboard('npx vercel --prod', 'cmd-vercel')}
                className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                title="Sao chép lệnh"
              >
                {copiedCode === 'cmd-vercel' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Cách 3: Chạy thử trên máy tính của bạn */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                3
              </span>
              Chạy thử nghiệm trên máy tính cá nhân
            </h3>
            <div className="bg-slate-900 text-slate-200 p-3.5 rounded-xl font-mono text-[11px] space-y-1.5">
              <div className="flex items-center justify-between">
                <span># Cài đặt thư viện:</span>
              </div>
              <p className="text-emerald-400">npm install</p>
              <div className="pt-1 flex items-center justify-between">
                <span># Khởi động máy chủ phát triển:</span>
              </div>
              <p className="text-emerald-400">npm start</p>
              <p className="text-slate-400 pt-1">
                → Mở trình duyệt tại <strong>http://localhost:3000</strong>
              </p>
            </div>
          </div>

          {/* Các thông số chuẩn bị sẵn */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-800">Cấu hình Vercel đã tích hợp sẵn:</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Framework</span>
                <span className="font-bold text-indigo-600">Vite (React)</span>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Build Command</span>
                <span className="font-bold text-slate-800">npm run build</span>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Output Directory</span>
                <span className="font-bold text-slate-800">dist</span>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Rewrite Rule</span>
                <span className="font-bold text-emerald-600">vercel.json (SPA)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Hỗ trợ đầy đủ thiết bị Mobile & Desktop</span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            Đã Hiểu, Quay Lại Ứng Dụng
          </button>
        </div>
      </div>
    </div>
  );
};
