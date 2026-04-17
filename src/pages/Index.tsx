import { useState } from "react";
import Icon from "@/components/ui/icon";

const TABS = [
  { id: "chats", label: "Чаты", icon: "MessageCircle" },
  { id: "calls", label: "Звонки", icon: "Phone" },
  { id: "stories", label: "Истории", icon: "PlayCircle" },
  { id: "contacts", label: "Контакты", icon: "Users" },
  { id: "profile", label: "Профиль", icon: "User" },
];

const CHATS = [
  { id: 1, name: "Алексей Громов", avatar: "АГ", last: "Договорились, до завтра!", time: "14:32", unread: 3, online: true, type: "private" },
  { id: 2, name: "Команда дизайна", avatar: "КД", last: "Марина: Макет готов 🎨", time: "13:10", unread: 12, online: false, type: "group" },
  { id: 3, name: "Ольга Смирнова", avatar: "ОС", last: "Ты посмотрел документ?", time: "12:48", unread: 0, online: true, type: "private" },
  { id: 4, name: "Разработка", avatar: "РЗ", last: "Иван: Деплой прошёл успешно", time: "11:00", unread: 5, online: false, type: "group" },
  { id: 5, name: "Дмитрий Волков", avatar: "ДВ", last: "Позвони когда будет время", time: "вчера", unread: 0, online: false, type: "private" },
  { id: 6, name: "Маркетинг", avatar: "МК", last: "Катя: Новая кампания запущена!", time: "вчера", unread: 1, online: false, type: "group" },
  { id: 7, name: "Светлана Новикова", avatar: "СН", last: "Спасибо за помощь!", time: "пн", unread: 0, online: true, type: "private" },
];

const CALLS = [
  { id: 1, name: "Алексей Громов", avatar: "АГ", type: "incoming", callType: "video", time: "сегодня 14:01", duration: "12:34", missed: false },
  { id: 2, name: "Ольга Смирнова", avatar: "ОС", type: "outgoing", callType: "audio", time: "сегодня 10:22", duration: "5:10", missed: false },
  { id: 3, name: "Команда дизайна", avatar: "КД", type: "incoming", callType: "video", time: "вчера 18:45", duration: "", missed: true },
  { id: 4, name: "Дмитрий Волков", avatar: "ДВ", type: "outgoing", callType: "audio", time: "вчера 09:30", duration: "2:45", missed: false },
  { id: 5, name: "Светлана Новикова", avatar: "СН", type: "incoming", callType: "audio", time: "пн 20:12", duration: "1:03", missed: false },
  { id: 6, name: "Разработка", avatar: "РЗ", type: "incoming", callType: "video", time: "пн 15:00", duration: "", missed: true },
];

const STORIES = [
  { id: 1, name: "Алексей", avatar: "АГ", seen: false, premium: true, count: 3 },
  { id: 2, name: "Ольга", avatar: "ОС", seen: false, premium: true, count: 1 },
  { id: 3, name: "Марина", avatar: "МК", seen: true, premium: true, count: 2 },
  { id: 4, name: "Иван", avatar: "ИВ", seen: false, premium: true, count: 4 },
  { id: 5, name: "Светлана", avatar: "СН", seen: true, premium: false, count: 1 },
];

const CONTACTS = [
  { id: 1, name: "Алексей Громов", phone: "+7 912 345-67-89", online: true, avatar: "АГ" },
  { id: 2, name: "Дмитрий Волков", phone: "+7 903 211-44-55", online: false, avatar: "ДВ" },
  { id: 3, name: "Марина Козлова", phone: "+7 916 788-23-11", online: false, avatar: "МК" },
  { id: 4, name: "Ольга Смирнова", phone: "+7 925 100-88-72", online: true, avatar: "ОС" },
  { id: 5, name: "Светлана Новикова", phone: "+7 919 432-66-04", online: true, avatar: "СН" },
  { id: 6, name: "Иван Петров", phone: "+7 901 555-33-21", online: false, avatar: "ИВ" },
];

const COLORS: Record<string, string> = {
  АГ: "#4A90D9", КД: "#7B61FF", ОС: "#E5734A", РЗ: "#27AE60",
  ДВ: "#F39C12", МК: "#EB5757", СН: "#9B59B6", ИВ: "#1ABC9C", МП: "#4A90D9",
};

function Avatar({ initials, size = 44, online }: { initials: string; size?: number; online?: boolean }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <div
        className="flex items-center justify-center rounded-full font-semibold text-white"
        style={{ width: size, height: size, background: COLORS[initials] || "#888", fontSize: size * 0.34 }}
      >
        {initials}
      </div>
      {online && (
        <span
          className="absolute bottom-0 right-0 rounded-full border-2 border-white pulse-dot"
          style={{ width: 11, height: 11, background: "hsl(142 72% 45%)" }}
        />
      )}
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-2 pb-1" style={{ fontSize: 12, fontWeight: 600, color: "#222" }}>
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <Icon name="Signal" size={14} />
        <Icon name="Wifi" size={14} />
        <Icon name="Battery" size={14} />
      </div>
    </div>
  );
}

function Notification({ text, onClose }: { text: string; onClose: () => void }) {
  return (
    <div className="absolute top-16 left-3 right-3 z-50 animate-slide-up">
      <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg border border-border">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--accent))" }}>
          <Icon name="Bell" size={14} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground truncate">Новое сообщение</p>
          <p className="text-xs text-muted-foreground truncate">{text}</p>
        </div>
        <button onClick={onClose} className="text-muted-foreground">
          <Icon name="X" size={14} />
        </button>
      </div>
    </div>
  );
}

function ChatsTab() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Все");
  const filtered = CHATS.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "Все" || (filter === "Личные" && c.type === "private") || (filter === "Группы" && c.type === "group");
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-2 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Сообщения</h1>
          <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--secondary))" }}>
            <Icon name="SquarePen" size={18} />
          </button>
        </div>
        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ background: "hsl(var(--secondary))" }}>
          <Icon name="Search" size={16} className="text-muted-foreground flex-shrink-0" />
          <input
            className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground"
            placeholder="Поиск"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2 px-4 mb-3">
        {["Все", "Личные", "Группы"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all"
            style={{
              background: filter === f ? "hsl(var(--primary))" : "hsl(var(--secondary))",
              color: filter === f ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))"
            }}>
            {f}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        {filtered.map((chat, i) => (
          <div key={chat.id} className="flex items-center gap-3 px-3 py-3 rounded-2xl cursor-pointer hover:bg-secondary transition-colors animate-fade-in"
            style={{ animationDelay: `${i * 40}ms` }}>
            <Avatar initials={chat.avatar} online={chat.online} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm truncate">{chat.name}</span>
                  {chat.type === "group" && <Icon name="Users" size={12} className="text-muted-foreground flex-shrink-0" />}
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground truncate pr-2">{chat.last}</span>
                {chat.unread > 0 && (
                  <span className="rounded-full text-white text-xs font-bold flex-shrink-0 flex items-center justify-center"
                    style={{ background: "hsl(var(--accent))", minWidth: 20, height: 20, padding: "0 5px" }}>
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CallsTab() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-2 pb-4">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl font-bold">Звонки</h1>
          <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--secondary))" }}>
            <Icon name="Plus" size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        {CALLS.map((call, i) => (
          <div key={call.id} className="flex items-center gap-3 px-3 py-3 rounded-2xl cursor-pointer hover:bg-secondary transition-colors animate-fade-in"
            style={{ animationDelay: `${i * 40}ms` }}>
            <Avatar initials={call.avatar} size={46} />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm mb-0.5">{call.name}</p>
              <div className="flex items-center gap-1.5">
                <Icon
                  name={call.type === "incoming" ? "PhoneIncoming" : "PhoneOutgoing"}
                  size={13}
                  style={{ color: call.missed ? "hsl(var(--destructive))" : "hsl(142 72% 45%)" }}
                />
                <span className="text-xs" style={{ color: call.missed ? "hsl(var(--destructive))" : "hsl(var(--muted-foreground))" }}>
                  {call.missed ? "Пропущенный" : call.type === "incoming" ? "Входящий" : "Исходящий"}
                </span>
                <span className="text-xs text-muted-foreground">· {call.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {call.missed && (
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "hsl(var(--destructive))" }} />
              )}
              <button className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                style={{ background: "hsl(var(--secondary))" }}>
                <Icon name={call.callType === "video" ? "Video" : "Phone"} size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StoriesTab() {
  const [viewed, setViewed] = useState<number[]>([]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-2 pb-4">
        <h1 className="text-2xl font-bold mb-1">Истории</h1>
        <p className="text-xs text-muted-foreground">Только для привилегированных пользователей</p>
      </div>

      <div className="px-4 mb-4">
        <div className="p-3 rounded-2xl border border-dashed border-border flex items-center gap-3 cursor-pointer hover:bg-secondary transition-colors">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-border flex items-center justify-center">
            <Icon name="Plus" size={20} className="text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold">Добавить историю</p>
            <p className="text-xs text-muted-foreground">Видна только избранным</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Сегодня</p>
        <div className="space-y-1 px-2">
          {STORIES.map((story, i) => (
            <div
              key={story.id}
              className="flex items-center gap-3 px-3 py-3 rounded-2xl cursor-pointer hover:bg-secondary transition-all animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
              onClick={() => setViewed(v => [...v, story.id])}
            >
              <div className="relative flex-shrink-0">
                <div className="rounded-full p-0.5" style={{
                  background: !viewed.includes(story.id) && !story.seen
                    ? "linear-gradient(135deg, hsl(var(--accent)), hsl(210 100% 70%))"
                    : "hsl(var(--border))"
                }}>
                  <div className="rounded-full p-0.5 bg-background">
                    <Avatar initials={story.avatar} size={46} />
                  </div>
                </div>
                {story.premium && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                    style={{ background: "linear-gradient(135deg, #FFB800, #FF6B00)" }}>
                    ★
                  </span>
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{story.name}</p>
                <p className="text-xs text-muted-foreground">{story.count} {story.count === 1 ? "история" : "истории"} · 2 ч назад</p>
              </div>
              {!viewed.includes(story.id) && !story.seen && (
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "hsl(var(--accent))" }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactsTab() {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const filtered = CONTACTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const grouped = filtered.reduce((acc, c) => {
    const l = c.name[0];
    if (!acc[l]) acc[l] = [];
    acc[l].push(c);
    return acc;
  }, {} as Record<string, typeof CONTACTS>);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-2 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Контакты</h1>
          <button
            onClick={() => setShowAdd(true)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white"
            style={{ background: "hsl(var(--accent))" }}>
            <Icon name="UserPlus" size={17} />
          </button>
        </div>
        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ background: "hsl(var(--secondary))" }}>
          <Icon name="Search" size={16} className="text-muted-foreground" />
          <input
            className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground"
            placeholder="Поиск контактов"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {showAdd && (
        <div className="mx-4 mb-3 p-4 rounded-2xl border border-border animate-scale-in" style={{ background: "hsl(var(--card))" }}>
          <p className="font-semibold text-sm mb-3">Новый контакт</p>
          <input className="w-full rounded-xl px-3 py-2.5 text-sm outline-none border border-border mb-2 bg-background" placeholder="Имя" />
          <input className="w-full rounded-xl px-3 py-2.5 text-sm outline-none border border-border mb-3 bg-background" placeholder="Номер телефона" />
          <div className="flex gap-2">
            <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "hsl(var(--accent))" }}>Добавить</button>
            <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ background: "hsl(var(--secondary))" }} onClick={() => setShowAdd(false)}>Отмена</button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-2">
        {Object.entries(grouped).sort().map(([letter, contacts]) => (
          <div key={letter} className="mb-1">
            <p className="px-3 py-1 text-xs font-bold text-muted-foreground">{letter}</p>
            {contacts.map((contact, i) => (
              <div key={contact.id} className="flex items-center gap-3 px-3 py-2.5 rounded-2xl cursor-pointer hover:bg-secondary transition-colors animate-fade-in"
                style={{ animationDelay: `${i * 30}ms` }}>
                <Avatar initials={contact.avatar} size={42} online={contact.online} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{contact.name}</p>
                  <p className="text-xs text-muted-foreground">{contact.online ? "В сети" : contact.phone}</p>
                </div>
                <div className="flex gap-1.5">
                  <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--secondary))" }}>
                    <Icon name="MessageCircle" size={15} />
                  </button>
                  <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--secondary))" }}>
                    <Icon name="Phone" size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileTab() {
  const [notif, setNotif] = useState(true);
  const [calls, setCalls] = useState(true);
  const [stories, setStories] = useState(false);
  const [dark, setDark] = useState(false);

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button onClick={onChange}
      className="relative w-11 h-6 rounded-full transition-all flex-shrink-0"
      style={{ background: value ? "hsl(var(--accent))" : "hsl(var(--border))" }}>
      <span className="absolute top-0.5 transition-all rounded-full bg-white w-5 h-5 shadow-sm"
        style={{ left: value ? "calc(100% - 22px)" : "2px" }} />
    </button>
  );

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-4 pt-2 pb-2">
        <h1 className="text-2xl font-bold">Профиль</h1>
      </div>

      <div className="flex flex-col items-center py-6 px-4">
        <div className="relative mb-4">
          <Avatar initials="МП" size={80} />
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-white"
            style={{ background: "hsl(var(--accent))" }}>
            <Icon name="Camera" size={13} />
          </button>
        </div>
        <h2 className="text-xl font-bold">Мой Профиль</h2>
        <p className="text-sm text-muted-foreground">+7 900 000-00-00</p>
        <p className="text-xs text-muted-foreground mt-1">@myprofile</p>
      </div>

      <div className="px-4 space-y-2">
        <div className="rounded-2xl overflow-hidden border border-border" style={{ background: "hsl(var(--card))" }}>
          <p className="px-4 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Уведомления</p>
          {[
            { label: "Новые сообщения", icon: "MessageCircle", value: notif, toggle: () => setNotif(!notif) },
            { label: "Звонки", icon: "Phone", value: calls, toggle: () => setCalls(!calls) },
            { label: "Истории", icon: "PlayCircle", value: stories, toggle: () => setStories(!stories) },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "hsl(var(--secondary))" }}>
                  <Icon name={item.icon} size={15} />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <Toggle value={item.value} onChange={item.toggle} />
            </div>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden border border-border" style={{ background: "hsl(var(--card))" }}>
          <p className="px-4 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Внешний вид</p>
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "hsl(var(--secondary))" }}>
                <Icon name="Moon" size={15} />
              </div>
              <span className="text-sm font-medium">Тёмная тема</span>
            </div>
            <Toggle value={dark} onChange={() => setDark(!dark)} />
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-border" style={{ background: "hsl(var(--card))" }}>
          <p className="px-4 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Аккаунт</p>
          {[
            { label: "Конфиденциальность", icon: "Shield" },
            { label: "Безопасность", icon: "Lock" },
            { label: "Устройства", icon: "Smartphone" },
            { label: "Хранилище", icon: "HardDrive" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 border-t border-border cursor-pointer hover:bg-secondary transition-colors">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "hsl(var(--secondary))" }}>
                <Icon name={item.icon} size={15} />
              </div>
              <span className="text-sm font-medium flex-1">{item.label}</span>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </div>
          ))}
        </div>

        <button className="w-full py-3.5 rounded-2xl text-sm font-semibold mt-2 mb-6"
          style={{ background: "hsl(0 72% 51% / 0.1)", color: "hsl(var(--destructive))" }}>
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}

export default function Index() {
  const [tab, setTab] = useState("chats");
  const [notification, setNotification] = useState<string | null>("Алексей Громов: Договорились, до завтра!");

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: "#e8eaed" }}>
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: 390,
          height: 844,
          background: "hsl(var(--background))",
          borderRadius: 44,
          boxShadow: "0 24px 80px rgba(0,0,0,0.18), 0 0 0 8px #1a1a1a, 0 0 0 10px #2a2a2a",
        }}
      >
        <StatusBar />

        {notification && (
          <Notification text={notification} onClose={() => setNotification(null)} />
        )}

        <div className="flex-1 overflow-hidden relative">
          <div className="h-full overflow-hidden" style={{ display: tab === "chats" ? "block" : "none" }}>
            <ChatsTab />
          </div>
          <div className="h-full overflow-hidden" style={{ display: tab === "calls" ? "block" : "none" }}>
            <CallsTab />
          </div>
          <div className="h-full overflow-hidden" style={{ display: tab === "stories" ? "block" : "none" }}>
            <StoriesTab />
          </div>
          <div className="h-full overflow-hidden" style={{ display: tab === "contacts" ? "block" : "none" }}>
            <ContactsTab />
          </div>
          <div className="h-full overflow-hidden" style={{ display: tab === "profile" ? "block" : "none" }}>
            <ProfileTab />
          </div>
        </div>

        <div className="flex-shrink-0 border-t border-border px-2 pt-2 pb-1" style={{ background: "hsl(var(--card))" }}>
          <div className="flex items-center justify-around">
            {TABS.map(t => {
              const active = tab === t.id;
              const unread = t.id === "chats" ? 21 : t.id === "calls" ? 2 : 0;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all relative"
                  style={{ minWidth: 60 }}
                >
                  <div className="relative">
                    <Icon
                      name={t.icon}
                      size={22}
                      style={{ color: active ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))" }}
                    />
                    {unread > 0 && (
                      <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-white"
                        style={{ background: "hsl(var(--destructive))", fontSize: 9, fontWeight: 700 }}>
                        {unread > 9 ? "9+" : unread}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-medium transition-colors"
                    style={{ color: active ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))" }}>
                    {t.label}
                  </span>
                  {active && (
                    <span className="w-4 h-0.5 rounded-full" style={{ background: "hsl(var(--accent))" }} />
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex justify-center mt-2 pb-1">
            <div className="w-28 h-1 rounded-full" style={{ background: "hsl(var(--foreground))", opacity: 0.15 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
