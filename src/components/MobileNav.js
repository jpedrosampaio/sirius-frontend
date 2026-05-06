import { useNavigate, useLocation } from "react-router-dom";
import { Home, CheckSquare, TrendingUp, DollarSign, MessageSquare, MoreHorizontal } from "lucide-react";
import { useState, useEffect, memo } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Target, Dumbbell, Apple, BookOpen, Bell, FileText, User, LogOut, Clock, Trophy, Calendar, Award } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { clearToken } from "@/lib/api";
import { SiriusLogo } from "@/components/Sidebar";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function MobileNav({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const brasiliaTime = now.toLocaleTimeString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const brasiliaDate = now.toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    day: "2-digit",
    month: "short",
  });

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

  const mainItems = [
    { icon: Home, label: "Início", path: "/dashboard" },
    { icon: CheckSquare, label: "Tarefas", path: "/tasks" },
    { icon: TrendingUp, label: "Hábitos", path: "/habits" },
    { icon: DollarSign, label: "Finanças", path: "/finance" },
    { icon: MessageSquare, label: "IA", path: "/chat" },
  ];

  const moreItems = [
    { icon: Dumbbell, label: "Treinos", path: "/workouts" },
    { icon: Apple, label: "Alimentação", path: "/nutrition" },
    { icon: BookOpen, label: "Estudos", path: "/studies" },
    { icon: Target, label: "Metas", path: "/goals" },
    { icon: Trophy, label: "Conquistas", path: "/achievements" },
    { icon: Calendar, label: "Calendário", path: "/calendar" },
    { icon: Bell, label: "Notificações", path: "/notifications" },
    { icon: FileText, label: "Relatórios", path: "/reports" },
    { icon: User, label: "Perfil", path: "/profile" },
  ];

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#0d0d0d]/95 backdrop-blur-lg border-b border-[#2a2a2a] z-50 safe-area-inset-top">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center space-x-2">
            <SiriusLogo size="w-7 h-7" />
            <span className="text-base font-semibold text-[#f0f0f0]">SIRIUS</span>
          </div>
          {user && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5 bg-[#1a1a1a] rounded-full px-2.5 py-1 border border-[#2a2a2a]">
                <Award className="w-3 h-3 text-[#00c896]" />
                <span className="text-[10px] font-medium text-[#888888]">{user.rank || 'Recruta'}</span>
                <span className="text-[10px] text-[#555555]">{user.xp ?? 0} XP</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0d0d0d]/95 backdrop-blur-lg border-t border-[#2a2a2a] z-50 safe-area-inset-bottom">
        <div className="flex items-center justify-around h-[60px] px-1">
          {mainItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-150 min-w-[56px] ${
                  isActive
                    ? "text-[#f0f0f0]"
                    : "text-[#888888] active:scale-95"
                }`}
              >
                <div className={`relative p-1.5 rounded-lg transition-all duration-150 ${
                  isActive ? "bg-[#1a1a1a]" : ""
                }`}>
                  <Icon className={`w-[22px] h-[22px] transition-colors ${isActive ? 'text-[#00c896]' : ''}`} />
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00c896]" />
                  )}
                </div>
                <span className={`text-[10px] mt-0.5 font-medium transition-colors ${isActive ? 'text-[#00c896]' : ''}`}>{item.label}</span>
              </button>
            );
          })}
          
          <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl text-[#888888] active:scale-95 min-w-[56px]">
                <div className="p-1.5">
                  <MoreHorizontal className="w-[22px] h-[22px]" />
                </div>
                <span className="text-[10px] mt-0.5 font-medium">Mais</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-[#0d0d0d] border-t border-[#2a2a2a] rounded-t-2xl px-4 pb-8">
              <div className="w-10 h-1 bg-[#2a2a2a] rounded-full mx-auto mb-5" />
              
              {user && (
                <div className="flex items-center justify-between mb-5 px-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
                      <span className="font-semibold text-[#f0f0f0] text-base">
                        {(user.name || 'U').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-[#f0f0f0]">{user.name || 'Usuário'}</p>
                      <div className="flex items-center space-x-2 mt-0.5">
                        <span className="bg-[#1a1a1a] text-[#888888] px-2 py-0.5 rounded-full text-[10px] font-medium border border-[#2a2a2a]">
                          {user.rank || 'Recruta'}
                        </span>
                        <span className="text-xs text-[#555555]">{user.xp ?? 0} XP</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2.5 text-[#555555] hover:text-[#ff4d4f] rounded-lg active:bg-[#1a1a1a] transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              )}

              <div className="mb-5 flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a]">
                <Clock className="w-4 h-4 text-[#00c896] flex-shrink-0" />
                <span className="font-mono text-sm text-[#00c896] tracking-wider tabular-nums">{brasiliaTime}</span>
                <span className="text-[10px] text-[#555555] capitalize">{brasiliaDate} — Brasília</span>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {moreItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setMoreOpen(false);
                      }}
                      className={`flex flex-col items-center justify-center py-3.5 rounded-xl transition-all duration-150 active:scale-95 ${
                        isActive
                          ? "bg-[#1a1a1a] border border-[#2a2a2a]"
                          : "bg-[#1a1a1a] border border-[#2a2a2a] active:bg-[#222222]"
                      }`}
                    >
                      <Icon className={`w-6 h-6 mb-1.5 ${isActive ? 'text-[#00c896]' : 'text-[#888888]'}`} />
                      <span className={`text-[11px] font-medium ${isActive ? 'text-[#f0f0f0]' : 'text-[#888888]'}`}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
}

export default memo(MobileNav);