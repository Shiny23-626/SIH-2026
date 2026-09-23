import React, { useState, useEffect, useRef } from 'react';
import { useI18n } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { ChatMessage, AppLanguage } from '../../types';
import {
  Bot,
  Mic,
  MicOff,
  Volume2,
  Square,
  Send,
  Sparkles,
  AlertCircle,
  Camera,
  Loader2,
  Languages
} from 'lucide-react';

export const AgribotView: React.FC = () => {
  const { language, t } = useI18n();
  const { activeScan, setActiveTab, farms } = useApp();
  const { user } = useAuth();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-init',
      sender: 'assistant',
      text: language === 'ta'
        ? 'வணக்கம்! நான் Plantora AI வேளாண் உதவியாளர். உங்கள் பயிரின் இலை நோய்கள், தட்பவெப்பநிலை பாதுகாப்பு அல்லது இயற்கை மேலாண்மை குறித்து கேளுங்கள்.'
        : language === 'hi'
        ? 'नमस्ते! मैं Plantora AI कृषि सहायक हूँ। अपनी फसल के लक्षणों, मौसम सुरक्षा या जैविक खाद के बारे में मुझसे पूछें।'
        : language === 'mr'
        ? 'नमस्कार! मी Plantora AI कृषी सहाय्यक आहे. पिकावरील रोग किंवा सेंद्रिय उपायांबद्दल विचारा.'
        : language === 'te'
        ? 'నమస్కారం! నేను Plantora AI వ్యవసాయ సహాయకుడిని. మీ పంట లక్షణాలు లేదా సేంద్రీయ సంరక్షణ గురించి అడగండి.'
        : language === 'kn'
        ? 'ನಮಸ್ಕಾರ! ನಾನು Plantora AI ಕೃಷಿ ಸಹಾಯಕ. ನಿಮ್ಮ ಬೆಳೆ ಲಕ್ಷಣಗಳು ಅಥವಾ ಸಾವಯವ ಆರೈಕೆ ಬಗ್ಗೆ ಕೇಳಿ.'
        : 'Welcome to Plantora AI Agronomy Assistant. How can I assist with your crops, foliar symptoms, or micro-climate risk today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language
    }
  ]);

  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Language speech recognition and synthesis mapping
  const speechLangCodes: Record<AppLanguage, string> = {
    en: 'en-US',
    ta: 'ta-IN',
    hi: 'hi-IN',
    mr: 'mr-IN',
    te: 'te-IN',
    kn: 'kn-IN'
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Clean up any ongoing speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isAiLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsAiLoading(true);
    setVoiceNotice(null);

    try {
      const activeCrop = activeScan?.crop || farms[0]?.crop || 'Field Crops';
      const farmLoc = farms[0]?.location || user?.farmLocation || 'India Agro-Climatic Zone';

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          language,
          cropContext: activeCrop,
          farmContext: farmLoc
        })
      });

      const data = await response.json();
      const reply = data.reply || 'I could not process this question right now. Please try again.';

      const botMsg: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language
      };

      setMessages(prev => [...prev, botMsg]);

      // Automatically speak answer if user was using voice
      if (isRecording || isSpeaking) {
        speakText(reply);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      const errMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        sender: 'assistant',
        text: 'Network issue or server unavailable. Please try asking again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsAiLoading(false);
    }
  };

  /**
   * Real speech recognition handling via Web Speech API
   */
  const startSpeechRecognition = () => {
    setVoiceNotice(null);
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceNotice(t.voiceUnavailableNotice);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = speechLangCodes[language] || 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((res: any) => res[0].transcript)
          .join('');
        setInputQuery(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsRecording(false);
        if (event.error === 'not-allowed') {
          setVoiceNotice('Microphone access permission was denied. Please allow microphone in browser.');
        } else {
          setVoiceNotice(t.voiceUnavailableNotice);
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.warn('Speech error:', err);
      setVoiceNotice(t.voiceUnavailableNotice);
      setIsRecording(false);
    }
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsRecording(false);
  };

  /**
   * Real SpeechSynthesis Text-to-Speech
   */
  const speakText = (textToSpeak: string) => {
    if (!window.speechSynthesis) {
      setVoiceNotice('Text-to-speech is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    // Strip markdown formatting for cleaner speech output
    const cleanSpeech = textToSpeak.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.lang = speechLangCodes[language] || 'en-US';
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
            <Bot className="w-4 h-4" />
            <span>Intelligent Multilingual Agronomy Chatbot</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit">
            {t.assistantTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {t.assistantSubtitle}
          </p>
        </div>

        {/* Language & Voice state indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-semibold flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5 text-emerald-700" />
            <span className="capitalize">{speechLangCodes[language]}</span>
          </span>
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold flex items-center gap-1.5 animate-pulse"
            >
              <Square className="w-3 h-3 fill-current" />
              <span>{t.btnStop}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[600px] overflow-hidden">
        
        {/* Messages Feed */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map(msg => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-emerald-700 text-white rounded-tr-xs'
                      : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  
                  <div className="mt-2 flex items-center justify-between gap-3 text-[10px] opacity-75">
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => speakText(msg.text)}
                        className="hover:opacity-100 flex items-center gap-1 font-semibold text-emerald-800"
                        title="Listen to this response"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{t.btnListen}</span>
                      </button>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                    {user?.name ? user.name[0] : 'U'}
                  </div>
                )}
              </div>
            );
          })}

          {isAiLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-600 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
                <span>Formulating agronomic advisory...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Voice Error / Notice Banner */}
        {voiceNotice && (
          <div className="px-4 py-2 bg-amber-50 border-t border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{voiceNotice}</span>
            </div>
            <button onClick={() => setVoiceNotice(null)} className="font-bold text-slate-500 hover:text-slate-800">
              ✕
            </button>
          </div>
        )}

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 overflow-x-auto no-scrollbar flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 shrink-0">Suggestions:</span>
          {[
            'My tomato leaves are turning brown',
            'How to control Fall Armyworm organically?',
            'What is the risk of Late Blight after rain?',
            'Recommend crop spacing to prevent fungal spores'
          ].map((sug, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(sug)}
              className="text-xs px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 shrink-0 transition-colors"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Input Bar with Real Voice and Text Input */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Real Microphone button */}
            <button
              id="agribot-mic-btn"
              type="button"
              onClick={isRecording ? stopSpeechRecognition : startSpeechRecognition}
              className={`p-2.5 rounded-xl transition-all ${
                isRecording
                  ? 'bg-rose-600 text-white animate-pulse shadow-md ring-2 ring-rose-400'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              title={isRecording ? 'Stop Recording' : `${t.btnSpeak} (${speechLangCodes[language]})`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Jump to Crop Scanner */}
            <button
              type="button"
              onClick={() => setActiveTab('scan')}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
              title="Open Crop Scanner"
            >
              <Camera className="w-5 h-5" />
            </button>

            {/* Text input */}
            <input
              id="agribot-chat-input"
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={isRecording ? 'Listening to voice...' : t.chatPlaceholder}
              className="flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-slate-900"
            />

            {/* Send button */}
            <button
              id="agribot-send-btn"
              type="submit"
              disabled={!inputQuery.trim() || isAiLoading}
              className={`p-2.5 rounded-xl font-semibold transition-all ${
                !inputQuery.trim() || isAiLoading
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

          {/* Mandatory agronomic advisory disclaimer */}
          <p className="text-[10px] text-slate-400 mt-2 text-center">
            {t.assistantDisclaimer}
          </p>
        </div>

      </div>
    </div>
  );
};
