import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function CaesarCipherApp() {
  const ruLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  const ruUpper = ruLower.toUpperCase();

  const enLower = 'abcdefghijklmnopqrstuvwxyz';
  const enUpper = enLower.toUpperCase();

  const [text, setText] = useState('');
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('encrypt');

  const caesar = (text, shift, decrypt = false) => {
    let result = '';

    if (decrypt) {
      shift = -shift;
    }

    for (let char of text) {
      
      if (ruLower.includes(char)) {
        const index = ruLower.indexOf(char);
        result += ruLower[(index + shift + ruLower.length) % ruLower.length];
      } else if (ruUpper.includes(char)) {
        const index = ruUpper.indexOf(char);
        result += ruUpper[(index + shift + ruUpper.length) % ruUpper.length];
      } else if (enLower.includes(char)) {
        const index = enLower.indexOf(char);
        result += enLower[(index + shift + enLower.length) % enLower.length];
      } else if (enUpper.includes(char)) {
        const index = enUpper.indexOf(char);
        result += enUpper[(index + shift + enUpper.length) % enUpper.length];
      } else {
        result += char;
      }
    }

    return result;
  };

  const handleProcess = () => {
    const processed = caesar(text, Number(shift), mode === 'decrypt');
    setResult(processed);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    alert('Результат скопирован!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6 overflow-hidden relative">
      <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse top-0 left-0"></div>
      <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse bottom-0 right-0"></div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-3xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-white"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Шифр Цезаря</h1>
          <p className="text-slate-300 text-lg">
            Шифрование и расшифровка текста на русском и английском языках
          </p>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMode('encrypt')}
            className={`flex-1 py-3 rounded-2xl font-semibold transition-all duration-300 ${
              mode === 'encrypt'
                ? 'bg-blue-500 shadow-lg scale-105'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Зашифровать
          </button>

          <button
            onClick={() => setMode('decrypt')}
            className={`flex-1 py-3 rounded-2xl font-semibold transition-all duration-300 ${
              mode === 'decrypt'
                ? 'bg-green-500 shadow-lg scale-105'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Расшифровать
          </button>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-slate-200">
            Введите текст
          </label>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Введите текст здесь..."
            className="w-full h-40 p-4 rounded-2xl bg-slate-900/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-lg"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-slate-200">
            Ключ сдвига
          </label>

          <input
            type="number"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            className="w-full p-4 rounded-2xl bg-slate-900/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          />
        </div>

        <button
          onClick={handleProcess}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-[1.02] transition-all duration-300 font-bold text-lg shadow-xl"
        >
          {mode === 'encrypt' ? 'Зашифровать текст' : 'Расшифровать текст'}
        </button>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-200">
              Результат
            </label>

            {result && (
              <button
                onClick={handleCopy}
                className="text-sm px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
              >
                Копировать
              </button>
            )}
          </div>

          <div className="min-h-[140px] p-4 rounded-2xl bg-slate-900/70 border border-white/10 text-lg break-words">
            {result || 'Здесь появится результат...'}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="text-2xl mb-2">🔐</div>
            <h3 className="font-semibold mb-1">Шифрование</h3>
            <p className="text-sm text-slate-300">
              Быстрое преобразование текста
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="text-2xl mb-2">🔓</div>
            <h3 className="font-semibold mb-1">Расшифровка</h3>
            <p className="text-sm text-slate-300">
              Восстановление исходного текста
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="text-2xl mb-2">🌍</div>
            <h3 className="font-semibold mb-1">2 языка</h3>
            <p className="text-sm text-slate-300">
              Русский и английский алфавит США
            </p>
          </div>
        </div>
                <div className="mt-8 bg-white/5 rounded-2xl p-5 border border-white/10">
            <h3 className="text-xl font-bold mb-3">Поддерживаемые языки</h3>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-400/20">🇷🇺 Русский</span>
              <span className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/20">🇺🇸 English USA</span>
              
            </div>
          </div>
        </motion.div>
      </div>
  );
}
