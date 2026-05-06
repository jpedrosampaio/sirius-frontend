import { useNavigate, useLocation } from "react-router-dom";
import { Home, CheckSquare, TrendingUp, DollarSign, Target, MessageSquare, FileText, User, LogOut, Dumbbell, Apple, BookOpen, Trophy, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect, memo } from "react";
import axios from "axios";
import { toast } from "sonner";
import { clearToken } from "@/lib/api";
import { Clock } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SiriusLogo = ({ size = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" className={size}>
    <defs>
      <linearGradient id="sidebarWolfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00c896" />
        <stop offset="50%" stopColor="#00a67c" />
        <stop offset="100%" stopColor="#00c896" />
      </linearGradient>
      <filter id="sidebarGlow">
        <feGaussianBlur stdDeviation="1.5" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="sidebarStarGlow">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <polygon points="31,20 39,41 23,43" fill="url(#sidebarWolfGrad)" opacity="0.9"/>
    <polygon points="69,20 61,41 77,43" fill="url(#sidebarWolfGrad)" opacity="0.9"/>
    <polygon points="32,26 38,41 27,42" fill="#0d0d0d" opacity="0.5"/>
    <polygon points="68,26 62,41 73,42" fill="#0d0d0d" opacity="0.5"/>
    <path d="M50,82 L35,66 L27,51 L28,41 L37,37 L43,43 L50,39 L57,43 L63,37 L72,41 L73,51 L65,66 Z"
          fill="url(#sidebarWolfGrad)" filter="url(#sidebarGlow)"/>
    <path d="M50,41 L44,47 L39,51 L43,55 L50,53 L57,55 L61,51 L56,47 Z" fill="#0d0d0d" opacity="0.35"/>
    <ellipse cx="41" cy="53" rx="4.3" ry="2.8" fill="#0d0d0d"/>
    <ellipse cx="59" cy="53" rx="4.3" ry="2.8" fill="#0d0d0d"/>
    <ellipse cx="42" cy="53" rx="2" ry="1.6" fill="#00c896" opacity="0.9"/>
    <ellipse cx="60" cy="53" rx="2" ry="1.6" fill="#00c896" opacity="0.9"/>
    <ellipse cx="42.4" cy="53" rx="0.8" ry="1.2" fill="#0d0d0d"/>
    <ellipse cx="60.4" cy="53" rx="0.8" ry="1.2" fill="#0d0d0d"/>
    <path d="M50,63 L48,65 L50,67 L52,65 Z" fill="#0d0d0d"/>
    <line x1="50" y1="67" x2="50" y2="71" stroke="#0d0d0d" strokeWidth="0.6"/>
    <path d="M47,71 Q50,74 53,71" fill="none" stroke="#0d0d0d" strokeWidth="0.5"/>
    <polygon points="50,8 51.5,13 56,13 52.5,16 54,21 50,18 46,21 47.5,16 44,13 48.5,13"
             fill="#00c896" filter="url(#sidebarStarGlow)"/>
    <circle cx="50" cy="14.5" r="1.2" fill="#f0f0f0" opacity="0.7"/>
    <line x1="22" y1="55" x2="36" y2="57" stroke="url(#sidebarWolfGrad)" strokeWidth="0.4" opacity="0.3"/>
    <line x1="21" y1="58" x2="35" y2="59" stroke="url(#sidebarWolfGrad)" strokeWidth="0.4" opacity="0.3"/>
    <line x1="78" y1="55" x2="64" y2="57" stroke="url(#sidebarWolfGrad)" strokeWidth="0.4" opacity="0.3"/>
    <line x1="79" y1="58" x2="65" y2="59" stroke="url(#sidebarWolfGrad)" strokeWidth="0.4" opacity="0.3"/>
  </svg>
);

export { SiriusLogo };

function useBrasiliaTime() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = now.toLocaleTimeString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const dateStr = now.toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    day: "2-digit",
    month: "short",
  });

  return { timeStr, dateStr };
}

function Sidebar({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { timeStr, dateStr } = useBrasiliaTime();

  const handleLogout = async () => {
    try {
      await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
      clearToken();
      toast.success("Logout realizado");
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      clearToken();
      navigate('/login');
    }
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: CheckSquare, label: "Tarefas", path: "/tasks" },
    { icon: TrendingUp, label: "Hábitos", path: "/habits" },
    { icon: Dumbbell, label: "Treinos", path: "/workouts" },
    { icon: Apple, label: "Alimentação", path: "/nutrition" },
    { icon: BookOpen, label: "Estudos", path: "/studies" },
    { icon: DollarSign, label: "Finanças", path: "/finance" },
    { icon: Target, label: "Metas", path: "/goals" },
    { icon: MessageSquare, label: "Assistente", path: "/chat" },
    { icon: FileText, label: "Relatórios", path: "/reports" },
    { icon: Trophy, label: "Conquistas", path: "/achievements" },
    { icon: Calendar, label: "Calendário", path: "/calendar" },
    { icon: User, label: "Perfil", path: "/profile" }
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      <div className={`w-64 bg-[#0d0d0d] border-r border-[#2a2a2a] flex flex-col h-screen fixed left-0 top-0 z-40 hidden md:flex`}>
        <div className="p-6 border-b border-[#2a2a2a]">
          <div className="flex items-center space-x-3 mb-4">
            <SiriusLogo />
            <div>
              <span className="text-xl font-semibold text-[#f0f0f0]">SIRIUS</span>
              <p className="text-[8px] text-[#555555] uppercase tracking-widest">Discipline System</p>
            </div>
          </div>
          {user && (
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10 border-2 border-[#00c896]">
                <AvatarImage src={user.picture} />
                <AvatarFallback className="bg-[#00c896] text-[#0d0d0d] font-semibold text-sm">
                  {(user.name || 'U').charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate text-sm text-[#f0f0f0]">{user.name || 'Usuário'}</p>
                <div className="flex items-center space-x-2">
                  <span className="rank-badge bg-[#00c896] text-[#0d0d0d] px-1.5 py-0.5 rounded-sm text-[10px]">
                    {user.rank || 'Recruta'}
                  </span>
                  <span className="font-mono text-xs text-[#888888]">{user.xp ?? 0} XP</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                data-testid={`sidebar-${item.label.toLowerCase()}-link`}
                onClick={() => handleNavigate(item.path)}
                className={`w-full flex items-center space-x-3 px-6 py-3 transition-all duration-150 ${
                  isActive
                    ? "bg-[#1a1a1a] border-l-2 border-[#00c896] text-[#00c896]"
                    : "text-[#888888] hover:bg-[#1a1a1a] hover:text-[#f0f0f0]"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="uppercase text-xs tracking-wider font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#2a2a2a]">
          <div className="mb-3 flex items-center space-x-2 px-2 py-2 rounded-md bg-[#1a1a1a] border border-[#2a2a2a]">
            <Clock className="w-4 h-4 text-[#00c896] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-mono text-sm text-[#00c896] tracking-wider tabular-nums leading-none">{timeStr}</p>
              <p className="text-[10px] text-[#555555] mt-0.5 capitalize">{dateStr} — Brasília</p>
            </div>
          </div>
          <Button
            data-testid="sidebar-logout-btn"
            variant="outline"
            onClick={handleLogout}
            className="w-full border-[#2a2a2a] hover:bg-[#1a1a1a] hover:border-[#444444] hover:text-[#f0f0f0] text-[#888888] uppercase text-xs tracking-wider"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>
    </>
  );
}

export default memo(Sidebar);