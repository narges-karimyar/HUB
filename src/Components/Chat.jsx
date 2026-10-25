import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

import {
  FaHouse,
  FaBars,
  FaMagnifyingGlass,
  FaCircleUser,
  FaGear,
  FaBell,
  FaPaperPlane,
  FaPaperclip,
  FaFaceSmile,
  FaStar,
  FaThumbtack,
  FaTrash,
  FaEllipsisVertical,
  FaArrowLeft,
  FaXmark,
  FaCheck,
  FaFile,
  FaHeart,
  FaPhone,
  FaVideo,
} from "react-icons/fa6";

import henry from "../assets/henry.jpg";
import jk from "../assets/jk.jpg";
import joseph from "../assets/joseph morgan.jpg";
import leorenzo from "../assets/leorenzo.jpg";
import chico from "../assets/chico lachowski.jpg";

const STORAGE_KEY = "myapp_chat_messages_v1";
const CONTACTS_KEY = "myapp_chat_contacts_v1";

const initialContacts = [
  {
    id: "henry",
    name: "Henry",
    image: henry,
    favorite: true,
    pinned: true,
  },
  {
    id: "jk",
    name: "JK",
    image: jk,
    favorite: false,
    pinned: false,
  },
  {
    id: "joseph",
    name: "Joseph Morgan",
    image: joseph,
    favorite: false,
    pinned: false,
  },
  {
    id: "leorenzo",
    name: "Leorenzo",
    image: leorenzo,
    favorite: false,
    pinned: false,
  },
  {
    id: "chico",
    name: "Chico Lachowski",
    image: chico,
    favorite: false,
    pinned: false,
  },
];

const welcomeMessages = {
  henry: [
    {
      id: "h1",
      text: "Hello! I hope you are having a good day.",
      sender: "them",
      time: "09:15 AM",
    },
    {
      id: "h2",
      text: "Thank you! I hope your day is going well too.",
      sender: "me",
      time: "09:17 AM",
    },
  ],
  jk: [
    {
      id: "j1",
      text: "Hi! How is your day going?",
      sender: "them",
      time: "10:20 AM",
    },
  ],
  joseph: [
    {
      id: "jo1",
      text: "Hello! Did you finish your work for today?",
      sender: "them",
      time: "11:05 AM",
    },
  ],
  leorenzo: [
    {
      id: "l1",
      text: "Hi! I hope everything is going well.",
      sender: "them",
      time: "12:10 PM",
    },
  ],
  chico: [
    {
      id: "c1",
      text: "Hello! Have a productive day.",
      sender: "them",
      time: "01:25 PM",
    },
  ],
};
// maasege the send
const autoReplies = [
  "Thanks for your message!",
  "That sounds good. Thank you for letting me know.",
  "I understand. I'll get back to you soon.",
  "Thanks for the update. I appreciate it.",
  "Sure, no problem!",
];

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function getCurrentTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Chat() {
  const { open, setOpen, onLogout } = useOutletContext();

  const [contacts, setContacts] = useState(() => {
    const saved = readStorage(CONTACTS_KEY, null);

    if (!Array.isArray(saved)) return initialContacts;

    return initialContacts.map((contact) => {
      const stored = saved.find((item) => item.id === contact.id);

      return stored
        ? {
            ...contact,
            favorite: stored.favorite ?? contact.favorite,
            pinned: stored.pinned ?? contact.pinned,
          }
        : contact;
    });
  });

  const [messages, setMessages] = useState(() =>
    readStorage(STORAGE_KEY, welcomeMessages),
  );

  const [activeId, setActiveId] = useState("henry");
  const [messageText, setMessageText] = useState("");
  const [search, setSearch] = useState("");
  const [headerSearch, setHeaderSearch] = useState("");
  const [messageSearch, setMessageSearch] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [notice, setNotice] = useState("");

  const messageEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const replyCounter = useRef(0);

  const activeContact = contacts.find((contact) => contact.id === activeId);

  const activeMessages = messages[activeId] || [];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [activeMessages.length, activeId]);

  useEffect(() => {
    if (!notice) return;

    const timer = setTimeout(() => setNotice(""), 3000);

    return () => clearTimeout(timer);
  }, [notice]);

  const filteredContacts = useMemo(() => {
    const query = `${search} ${headerSearch}`.trim().toLowerCase();

    return [...contacts]
      .filter((contact) => {
        const matchesName = contact.name.toLowerCase().includes(query);

        const matchesMessage = (messages[contact.id] || []).some((message) =>
          message.text.toLowerCase().includes(query),
        );

        const matchesFavorite = !favoritesOnly || contact.favorite;

        return (!query || matchesName || matchesMessage) && matchesFavorite;
      })
      .sort((a, b) => Number(b.pinned) - Number(a.pinned));
  }, [contacts, messages, search, headerSearch, favoritesOnly]);

  const displayedMessages = useMemo(() => {
    const query = messageSearch.trim().toLowerCase();

    if (!query) return activeMessages;

    return activeMessages.filter((message) =>
      message.text.toLowerCase().includes(query),
    );
  }, [activeMessages, messageSearch]);

  function openConversation(contact) {
    setActiveId(contact.id);
    setMobileChatOpen(true);
    setMessageSearch("");
    setMessageText("");
    setAttachment(null);
    setShowMenu(false);
    setShowProfile(false);
  }

  function updateContact(id, property) {
    setContacts((previous) =>
      previous.map((contact) =>
        contact.id === id ? { ...contact, ...property } : contact,
      ),
    );
  }

  function sendMessage(event) {
    event?.preventDefault();

    const text = messageText.trim();

    if (!text && !attachment) return;

    const contactId = activeId;

    const newMessage = {
      id: `${Date.now()}-${Math.random()}`,
      text: text || `Attachment: ${attachment.name}`,
      sender: "me",
      time: getCurrentTime(),
      attachment: attachment
        ? {
            name: attachment.name,
            type: attachment.type,
            size: attachment.size,
          }
        : null,
    };

    setMessages((previous) => ({
      ...previous,
      [contactId]: [...(previous[contactId] || []), newMessage],
    }));

    setMessageText("");
    setAttachment(null);
    setShowEmoji(false);

    const reply = {
      id: `${Date.now()}-reply`,
      text: autoReplies[replyCounter.current % autoReplies.length],
      sender: "them",
      time: getCurrentTime(),
    };

    replyCounter.current += 1;

    setTimeout(() => {
      setMessages((previous) => ({
        ...previous,
        [contactId]: [
          ...(previous[contactId] || []),
          {
            ...reply,
            time: getCurrentTime(),
          },
        ],
      }));
    }, 1200);
  }

  function deleteMessage(messageId) {
    setMessages((previous) => ({
      ...previous,
      [activeId]: (previous[activeId] || []).filter(
        (message) => message.id !== messageId,
      ),
    }));

    setNotice("Message deleted.");
  }

  function clearConversation() {
    const confirmed = window.confirm(
      `Are you sure you want to clear the conversation with ${activeContact?.name}?`,
    );

    if (!confirmed) return;

    setMessages((previous) => ({
      ...previous,
      [activeId]: [],
    }));

    setShowMenu(false);
    setNotice("Conversation cleared.");
  }

  function handleAttachment(event) {
    const file = event.target.files?.[0];

    if (file) {
      setAttachment(file);
      setNotice("File attached. Press Send to add it to the chat.");
    }

    event.target.value = "";
  }

  function addEmoji(emoji) {
    setMessageText((previous) => previous + emoji);
    setShowEmoji(false);
  }

  function handleLogout() {
    const confirmed = window.confirm("Are you sure you want to log out?");

    if (confirmed) onLogout();
  }

  function getLastMessage(contactId) {
    const list = messages[contactId] || [];

    if (!list.length) return "Start a conversation";

    return list[list.length - 1].text;
  }

  function startCall(type) {
    const callType = type === "video" ? "Video call" : "Voice call";

    setNotice(`${callType} with ${activeContact.name} is a demo feature.`);
  }

  return (
    <div className="contentTwo min-h-screen bg-[#f5f3fc] font-[Merriweather,serif] text-[#302b45]">
      {/* HEADER */}
      <header className="mx-2.5 mb-4 flex items-center justify-between gap-3 rounded-2xl border border-[#e8e1fa] bg-white p-5 shadow-[0_5px_22px_rgba(104,78,170,0.08)] max-[700px]:flex-wrap">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            aria-label="Home"
            className="text-[#7961bc] transition hover:text-[#4f3697]"
          >
            <FaHouse size={18} />
          </Link>

          <span className="text-sm text-gray-400">/</span>

          <p className="text-sm text-gray-500">Chat</p>

          <button
            onClick={() => setOpen(!open)}
            className="ml-2 rounded-xl p-2 text-[#7961bc] transition hover:bg-[#f1ebff]"
            aria-label="Toggle sidebar"
          >
            <FaBars size={18} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#9276e8] to-[#c4a9fa] text-white shadow-md">
            <FaHeart />
          </span>

          <div>
            <h1 className="text-lg font-bold text-[#45336f]">My Chat</h1>
            <p className="text-xs text-gray-400">Your conversations</p>
          </div>
        </div>

        <div className="relative w-[230px] max-lg:w-[180px] max-[700px]:order-3 max-[700px]:w-full">
          <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={headerSearch}
            onChange={(event) => setHeaderSearch(event.target.value)}
            placeholder="Search contacts..."
            aria-label="Search contacts"
            className="w-full rounded-xl border border-[#e6def6] bg-[#faf9ff] py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[#a48ae7] focus:ring-2 focus:ring-[#eee7ff]"
          />
        </div>

        <div className="flex items-center gap-3 text-[#7961bc]">
          <Link
            to="/account"
            aria-label="My account"
            className="rounded-xl p-2 transition hover:bg-[#f1ebff]"
          >
            <FaCircleUser size={19} />
          </Link>

          <button
            onClick={handleLogout}
            className="rounded-lg px-2 py-2 text-sm text-gray-500 transition hover:bg-[#fff0f0] hover:text-red-500"
          >
            Log out
          </button>

          <button
            onClick={() =>
              setNotice("Settings are ready for future customization.")
            }
            aria-label="Settings"
            className="rounded-xl p-2 transition hover:bg-[#f1ebff]"
          >
            <FaGear size={17} />
          </button>

          <button
            onClick={() => setNotice("You are all caught up!")}
            aria-label="Notifications"
            className="rounded-xl p-2 transition hover:bg-[#f1ebff]"
          >
            <FaBell size={17} />
          </button>
        </div>
      </header>

      {/* NOTIFICATION */}
      {notice && (
        <div
          role="status"
          className="mx-4 mb-3 rounded-xl border border-[#e5dafd] bg-white px-4 py-3 text-sm text-[#684da7] shadow-sm"
        >
          {notice}
        </div>
      )}

      {/* CHAT APPLICATION */}
      <main className="mx-2.5 mb-5 grid min-h-[680px] grid-cols-[320px_minmax(0,1fr)] gap-4 max-[900px]:grid-cols-[270px_minmax(0,1fr)] max-[650px]:grid-cols-1">
        {/* CONTACT SIDEBAR */}
        <aside
          className={`overflow-hidden rounded-2xl border border-[#e8e1fa] bg-white shadow-[0_8px_28px_rgba(104,78,170,0.08)] ${
            mobileChatOpen ? "max-[650px]:hidden" : ""
          }`}
        >
          <div className="border-b border-[#eee9f8] bg-gradient-to-r from-[#f0eaff] to-[#fbf9ff] p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#493574]">Messages</h2>
                <p className="mt-1 text-xs text-gray-500">
                  {contacts.length} contacts
                </p>
              </div>

              <button
                onClick={() => {
                  setFavoritesOnly(!favoritesOnly);
                  setSearch("");
                  setHeaderSearch("");
                }}
                aria-label="Filter favorites"
                title="Show favorites"
                className={`rounded-xl p-3 transition ${
                  favoritesOnly
                    ? "bg-[#8064c7] text-white"
                    : "bg-white text-[#8064c7] hover:bg-[#e9e0ff]"
                }`}
              >
                <FaStar />
              </button>
            </div>

            <div className="relative">
              <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Find a contact..."
                className="w-full rounded-xl border border-[#e5ddf4] bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#a48ae7] focus:ring-2 focus:ring-[#f0eaff]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-4 pb-2 pt-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              All conversations
            </span>

            {favoritesOnly && (
              <button
                onClick={() => setFavoritesOnly(false)}
                className="text-xs text-[#8064c7] hover:underline"
              >
                Show all
              </button>
            )}
          </div>

          <div className="max-h-[570px] overflow-y-auto p-2">
            {filteredContacts.length === 0 && (
              <div className="p-6 text-center text-sm text-gray-400">
                No contacts found.
              </div>
            )}

            {filteredContacts.map((contact) => {
              const lastMessage = getLastMessage(contact.id);
              const selected = activeId === contact.id;

              return (
                <button
                  key={contact.id}
                  onClick={() => openConversation(contact)}
                  className={`mb-1 flex w-full items-center gap-3 rounded-2xl p-3 text-left transition duration-200 ${
                    selected
                      ? "bg-gradient-to-r from-[#eee7ff] to-[#f8f5ff] shadow-sm ring-1 ring-[#e3d8fc]"
                      : "hover:bg-[#faf8ff]"
                  }`}
                >
                  <div className="shrink-0">
                    <img
                      src={contact.image}
                      alt={contact.name}
                      className="h-[52px] w-[52px] rounded-2xl border-2 border-white object-cover shadow-md"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <p className="truncate text-sm font-bold text-[#44345f]">
                        {contact.name}
                      </p>

                      {contact.pinned && (
                        <FaThumbtack
                          size={10}
                          className="shrink-0 text-[#9275d6]"
                          title="Pinned"
                        />
                      )}

                      {contact.favorite && (
                        <FaStar
                          size={10}
                          className="shrink-0 text-amber-400"
                          title="Favorite"
                        />
                      )}
                    </div>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      {lastMessage}
                    </p>

                    <p className="mt-1 text-[10px] text-gray-400">
                      {messages[contact.id]?.at(-1)?.time || ""}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="border-t border-[#eee9f8] bg-[#fcfbff] p-4">
            <p className="text-center text-xs text-gray-400">
              Your conversations, all in one place
            </p>
          </div>
        </aside>

        {/* CHAT WINDOW */}
        <section
          className={`flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e8e1fa] bg-white shadow-[0_8px_28px_rgba(104,78,170,0.08)] ${
            !mobileChatOpen ? "max-[650px]:hidden" : ""
          }`}
        >
          {activeContact ? (
            <>
              {/* CHAT HEADER */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eee9f8] bg-gradient-to-r from-white to-[#faf7ff] p-4 sm:p-5">
                <div className="flex min-w-0 items-center gap-3">
                  <button
                    onClick={() => setMobileChatOpen(false)}
                    aria-label="Back to contacts"
                    className="hidden rounded-xl p-2 text-[#8064c7] hover:bg-[#f0eaff] max-[650px]:block"
                  >
                    <FaArrowLeft />
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowProfile(true)}
                    aria-label={`View ${activeContact.name}'s profile`}
                    className="shrink-0 rounded-2xl transition hover:scale-105"
                  >
                    <img
                      src={activeContact.image}
                      alt={activeContact.name}
                      className="h-12 w-12 rounded-2xl border-2 border-white object-cover shadow-md"
                    />
                  </button>

                  <div className="min-w-0">
                    <button
                      type="button"
                      onClick={() => setShowProfile(true)}
                      className="truncate text-left font-bold text-[#44345f] hover:text-[#8064c7]"
                    >
                      {activeContact.name}
                    </button>

                    <p className="mt-1 text-xs text-gray-400">Conversation</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* VOICE CALL */}
                  <button
                    type="button"
                    onClick={() => startCall("voice")}
                    title="Voice Call"
                    aria-label="Voice Call"
                    className="rounded-xl border border-[#eee7fa] bg-white p-3 text-[#8064c7] transition hover:scale-105 hover:bg-[#f0eaff]"
                  >
                    <FaPhone />
                  </button>

                  {/* VIDEO CALL */}
                  <button
                    type="button"
                    onClick={() => startCall("video")}
                    title="Video Call"
                    aria-label="Video Call"
                    className="rounded-xl border border-[#eee7fa] bg-white p-3 text-[#8064c7] transition hover:scale-105 hover:bg-[#f0eaff]"
                  >
                    <FaVideo />
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setShowMenu(!showMenu)}
                      aria-label="Conversation options"
                      className="rounded-xl border border-[#eee7fa] bg-white p-3 text-[#8064c7] transition hover:bg-[#f3edff]"
                    >
                      <FaEllipsisVertical />
                    </button>

                    {showMenu && (
                      <div className="absolute right-0 top-12 z-20 w-52 rounded-xl border border-[#e8e1fa] bg-white p-2 shadow-xl">
                        <button
                          onClick={() => {
                            updateContact(activeId, {
                              favorite: !activeContact.favorite,
                            });
                            setShowMenu(false);
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm hover:bg-[#f5f0ff]"
                        >
                          <FaStar className="text-amber-400" />
                          {activeContact.favorite
                            ? "Remove favorite"
                            : "Add to favorites"}
                        </button>

                        <button
                          onClick={() => {
                            updateContact(activeId, {
                              pinned: !activeContact.pinned,
                            });
                            setShowMenu(false);
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm hover:bg-[#f5f0ff]"
                        >
                          <FaThumbtack className="text-[#8064c7]" />
                          {activeContact.pinned
                            ? "Unpin conversation"
                            : "Pin conversation"}
                        </button>

                        <button
                          onClick={clearConversation}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-red-500 hover:bg-red-50"
                        >
                          <FaTrash />
                          Clear conversation
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setMessageSearch("")}
                    aria-label="Clear message search"
                    title="Clear message search"
                    className="rounded-xl border border-[#eee7fa] bg-white p-3 text-[#8064c7] transition hover:bg-[#f3edff]"
                  >
                    <FaMagnifyingGlass />
                  </button>
                </div>
              </div>

              {/* SEARCH MESSAGES */}
              <div className="border-b border-[#f0ebf8] bg-[#fdfcff] px-4 py-3">
                <div className="relative">
                  <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400" />

                  <input
                    value={messageSearch}
                    onChange={(event) => setMessageSearch(event.target.value)}
                    placeholder="Search messages in this conversation..."
                    className="w-full rounded-xl border border-[#eee7fa] bg-white py-2 pl-9 pr-9 text-xs outline-none focus:border-[#a48ae7]"
                  />

                  {messageSearch && (
                    <button
                      onClick={() => setMessageSearch("")}
                      aria-label="Clear search"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    >
                      <FaXmark />
                    </button>
                  )}
                </div>
              </div>

              {/* MESSAGES */}
              <div
                className="flex-1 space-y-5 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_#faf7ff_0%,_#ffffff_68%)] p-4 sm:p-6"
                onClick={() => {
                  if (showMenu) setShowMenu(false);
                }}
              >
                <div className="py-2 text-center">
                  <span className="rounded-full border border-[#eee7fa] bg-white px-4 py-2 text-[10px] text-gray-400 shadow-sm">
                    YOUR CONVERSATION
                  </span>
                </div>

                {displayedMessages.length === 0 && (
                  <div className="flex min-h-[250px] flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#f0eaff] text-2xl text-[#8064c7]">
                      <FaPaperPlane />
                    </div>

                    <h3 className="font-bold text-[#4a386f]">
                      {messageSearch
                        ? "No matching messages"
                        : "Start a conversation"}
                    </h3>

                    <p className="mt-2 max-w-xs text-sm text-gray-400">
                      {messageSearch
                        ? "Try another search term."
                        : `Send a message to ${activeContact.name}.`}
                    </p>
                  </div>
                )}

                {displayedMessages.map((message) => {
                  const mine = message.sender === "me";

                  return (
                    <div
                      key={message.id}
                      className={`group flex items-end gap-2.5 ${
                        mine ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!mine && (
                        <img
                          src={activeContact.image}
                          alt={activeContact.name}
                          className="h-8 w-8 shrink-0 rounded-xl object-cover shadow-sm"
                        />
                      )}

                      <div
                        className={`flex max-w-[82%] flex-col sm:max-w-[72%] ${
                          mine ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                            mine
                              ? "rounded-br-md bg-gradient-to-br from-[#8064c7] to-[#a58be8] text-white"
                              : "rounded-bl-md border border-[#eee8f9] bg-white text-[#48405a]"
                          }`}
                        >
                          <p className="whitespace-pre-wrap break-words">
                            {message.text}
                          </p>

                          {message.attachment && (
                            <div
                              className={`mt-3 flex items-center gap-2 rounded-xl p-3 ${
                                mine ? "bg-white/15" : "bg-[#f6f2ff]"
                              }`}
                            >
                              <FaFile />
                              <div className="min-w-0">
                                <p className="break-all text-xs font-semibold">
                                  {message.attachment.name}
                                </p>
                                <p className="text-[10px] opacity-75">
                                  {Math.max(
                                    1,
                                    Math.round(message.attachment.size / 1024),
                                  )}{" "}
                                  KB
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div
                          className={`mt-1 flex items-center gap-2 px-1 text-[10px] text-gray-400 ${
                            mine ? "justify-end" : "justify-start"
                          }`}
                        >
                          <span>{message.time}</span>

                          {mine && (
                            <FaCheck className="text-[#8b72d0]" title="Sent" />
                          )}

                          <button
                            onClick={() => deleteMessage(message.id)}
                            aria-label="Delete message"
                            title="Delete message"
                            className="ml-1 rounded-md p-1 opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 focus:opacity-100"
                          >
                            <FaTrash size={10} />
                          </button>
                        </div>
                      </div>

                      {mine && (
                        <div className="mb-5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#eee7ff] text-xs font-bold text-[#8064c7]">
                          S
                        </div>
                      )}
                    </div>
                  );
                })}

                <div ref={messageEndRef} />
              </div>

              {/* ATTACHMENT PREVIEW */}
              {attachment && (
                <div className="flex items-center justify-between border-t border-[#eee7fa] bg-[#faf8ff] px-4 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <FaPaperclip className="shrink-0 text-[#8064c7]" />

                    <div className="min-w-0">
                      <p className="break-all text-xs font-semibold text-[#4b3a70]">
                        {attachment.name}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        Ready to attach
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setAttachment(null)}
                    aria-label="Remove attachment"
                    className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <FaXmark />
                  </button>
                </div>
              )}

              {/* EMOJI PICKER */}
              {showEmoji && (
                <div className="flex flex-wrap gap-2 border-t border-[#eee7fa] bg-white p-3">
                  {[
                    "😀",
                    "😊",
                    "😂",
                    "🥰",
                    "👍",
                    "👏",
                    "❤️",
                    "✨",
                    "🌷",
                    "🎉",
                    "🙏",
                    "💜",
                  ].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => addEmoji(emoji)}
                      className="rounded-lg p-2 text-xl transition hover:bg-[#f0eaff]"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}

              {/* MESSAGE INPUT */}
              <form
                onSubmit={sendMessage}
                className="border-t border-[#eee7fa] bg-white p-3 sm:p-4"
              >
                <div className="flex items-end gap-2 rounded-2xl border border-[#e9e0f8] bg-[#faf9ff] p-2 shadow-inner focus-within:border-[#b19be9] focus-within:ring-2 focus-within:ring-[#f0eaff]">
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleAttachment}
                    className="hidden"
                    aria-label="Choose an attachment"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Attach file"
                    title="Attach file"
                    className="shrink-0 rounded-xl p-3 text-[#8064c7] transition hover:bg-[#eee7ff]"
                  >
                    <FaPaperclip />
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowEmoji(!showEmoji)}
                    aria-label="Choose emoji"
                    title="Emoji"
                    className={`shrink-0 rounded-xl p-3 transition hover:bg-[#eee7ff] ${
                      showEmoji
                        ? "bg-[#eee7ff] text-[#8064c7]"
                        : "text-gray-400"
                    }`}
                  >
                    <FaFaceSmile />
                  </button>

                  <textarea
                    rows={1}
                    value={messageText}
                    onChange={(event) => setMessageText(event.target.value)}
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" &&
                        !event.shiftKey &&
                        !event.nativeEvent.isComposing
                      ) {
                        event.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder={`Message ${activeContact.name}...`}
                    aria-label="Write a message"
                    className="max-h-32 min-h-[44px] flex-1 resize-y bg-transparent px-2 py-3 text-sm text-[#44345f] outline-none placeholder:text-gray-400"
                  />

                  <button
                    type="submit"
                    disabled={!messageText.trim() && !attachment}
                    aria-label="Send message"
                    title="Send message"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#8064c7] to-[#a68be8] text-white shadow-md transition hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                  >
                    <FaPaperPlane />
                  </button>
                </div>

                <div className="flex items-center justify-between px-2 pt-2">
                  <p className="text-[10px] text-gray-400">
                    Press Enter to send · Shift + Enter for a new line
                  </p>

                  <p className="text-[10px] text-[#9b89c5]">My Chat</p>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
              <FaCircleUser className="mb-4 text-5xl text-[#b6a2e8]" />
              <h2 className="text-xl font-bold text-[#493574]">
                Select a conversation
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                Choose a contact to start messaging.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* CONTACT PROFILE MODAL */}
      {showProfile && activeContact && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#211735]/50 p-4 backdrop-blur-sm"
          onClick={() => setShowProfile(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${activeContact.name}'s profile`}
            className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-[#e8e1fa] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="h-28 bg-gradient-to-r from-[#8064c7] to-[#c4a9fa]" />

            <button
              type="button"
              onClick={() => setShowProfile(false)}
              aria-label="Close profile"
              className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-[#624b98] transition hover:bg-white"
            >
              <FaXmark />
            </button>

            <div className="-mt-14 flex flex-col items-center px-6 pb-7">
              <img
                src={activeContact.image}
                alt={activeContact.name}
                className="h-28 w-28 rounded-3xl border-4 border-white object-cover shadow-lg"
              />

              <h2 className="mt-4 text-xl font-bold text-[#44345f]">
                {activeContact.name}
              </h2>

              <p className="mt-1 text-sm text-gray-400">Chat contact</p>

              <div className="mt-6 grid w-full grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[#f5f0ff] p-4 text-center">
                  <p className="text-2xl font-bold text-[#8064c7]">
                    {(messages[activeId] || []).length}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">Total messages</p>
                </div>

                <div className="rounded-2xl bg-[#f5f0ff] p-4 text-center">
                  <div className="flex justify-center">
                    <FaStar
                      className={
                        activeContact.favorite
                          ? "text-amber-400"
                          : "text-gray-300"
                      }
                      size={23}
                    />
                  </div>

                  <p className="mt-2 text-xs text-gray-500">
                    {activeContact.favorite ? "Favorite" : "Not a favorite"}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex w-full gap-3">
                <button
                  type="button"
                  onClick={() => {
                    updateContact(activeId, {
                      favorite: !activeContact.favorite,
                    });
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#e8e1fa] px-3 py-3 text-sm text-[#8064c7] transition hover:bg-[#f5f0ff]"
                >
                  <FaStar />
                  {activeContact.favorite ? "Unfavorite" : "Favorite"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowProfile(false);
                    setShowMenu(true);
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8064c7] to-[#a58be8] px-3 py-3 text-sm text-white shadow-md transition hover:shadow-lg"
                >
                  <FaEllipsisVertical />
                  More options
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowProfile(false)}
                className="mt-4 w-full rounded-xl bg-[#f5f3fc] py-3 text-sm font-semibold text-[#624b98] transition hover:bg-[#eee7ff]"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="mx-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#e7dff5] px-3 py-5 text-xs text-gray-400">
        <p>© 2026 My Chat. Made with care.</p>

        <div className="flex items-center gap-4">
          <Link to="/account" className="transition hover:text-[#8064c7]">
            My Account
          </Link>

          <span className="text-[#b6a2e8]">•</span>

          <span className="flex items-center gap-1">
            <FaHeart className="text-[#a68be8]" />
            Chat Dashboard
          </span>
        </div>
      </footer>
    </div>
  );
}
