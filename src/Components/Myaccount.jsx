import React, { useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  FaHouse,
  FaBars,
  FaMagnifyingGlass,
  FaCircleUser,
  FaGear,
  FaBell,
  FaWifi,
  FaBuildingColumns,
  FaPaypal,
  FaPlus,
  FaPen,
  FaTrash,
  FaFilePdf,
  FaArrowDown,
  FaArrowUp,
  FaCalendarDays,
  FaXmark,
  FaCreditCard,
  FaWallet,
  FaRobot,
  FaPaperPlane,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaLockOpen,
  FaCircleCheck,
} from "react-icons/fa6";

/* =========================
   INDIGO & LAVENDER PALETTE
   Indigo: #4338CA
   Lavender: #A78BFA
   Dark Indigo: #312E81
   Background: #F5F3FF
========================= */

const initialInvoices = [
  { date: "March, 01, 2020", id: "#MS-415646", amount: 180 },
  { date: "February, 10, 2021", id: "#RV-126749", amount: 250 },
  { date: "April, 05, 2020", id: "#QW-103578", amount: 120 },
  { date: "June, 25, 2019", id: "#MS-415646", amount: 180 },
  { date: "March, 01, 2019", id: "#AR-803481", amount: 300 },
];

const initialBilling = [
  {
    id: 1,
    name: "Oliver Liam",
    company: "Viking Burrito",
    email: "oliver@burrito.com",
    vat: "FRB1235476",
  },
  {
    id: 2,
    name: "Lucas Harper",
    company: "Stone Tech Zone",
    email: "lucas@stone-tech.com",
    vat: "FRB1235476",
  },
  {
    id: 3,
    name: "Ethan James",
    company: "Fiber Nation",
    email: "ethan@fiber.com",
    vat: "FRB1235476",
  },
];

const initialTransactions = [
  {
    id: 1,
    title: "Food",
    date: "27 March 2020, at 12:30 PM",
    amount: 2500,
    type: "expense",
    group: "NEWEST",
  },
  {
    id: 2,
    title: "Medicine",
    date: "27 March 2020, at 04:30 AM",
    amount: 2000,
    type: "income",
    group: "NEWEST",
  },
  {
    id: 3,
    title: "Appointment",
    date: "26 March 2020, at 01:45 PM",
    amount: 750,
    type: "income",
    group: "YESTERDAY",
  },
  {
    id: 4,
    title: "MarketPlace",
    date: "26 March 2020, at 12:30 PM",
    amount: 1000,
    type: "income",
    group: "YESTERDAY",
  },
  {
    id: 5,
    title: "Pharmacy",
    date: "26 March 2020, at 08:30 AM",
    amount: 2500,
    type: "income",
    group: "YESTERDAY",
  },
  {
    id: 6,
    title: "Bookings",
    date: "26 March 2020, at 05:00 AM",
    amount: 0,
    type: "pending",
    group: "YESTERDAY",
  },
];

const initialCards = [
  { id: 1, brand: "mastercard", number: "7852", frozen: false, visible: false },
  { id: 2, brand: "visa", number: "5248", frozen: false, visible: false },
];

const money = (amount) => `$${Number(amount).toLocaleString("en-US")}`;

export default function Myaccount() {
  const { open, setOpen, onLogout } = useOutletContext();

  const [search, setSearch] = useState("");
  const [invoices] = useState(initialInvoices);
  const [billing, setBilling] = useState(initialBilling);
  const [cards, setCards] = useState(initialCards);
  const [transactions] = useState(initialTransactions);

  const [showAllInvoices, setShowAllInvoices] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardBrand, setCardBrand] = useState("visa");
  const [editingBilling, setEditingBilling] = useState(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantInput, setAssistantInput] = useState("");

  const [assistantMessages, setAssistantMessages] = useState([
    {
      role: "assistant",
      text: "Hello! 👋 Welcome to MyPatientHUB. I'm your personal financial assistant. Ask me about your sample transactions, expenses, invoices, or payment cards.",
    },
  ]);

  const query = search.trim().toLowerCase();

  const filteredInvoices = useMemo(
    () =>
      invoices.filter((item) =>
        `${item.date} ${item.id} ${item.amount}`.toLowerCase().includes(query),
      ),
    [invoices, query],
  );

  const filteredBilling = useMemo(
    () =>
      billing.filter((item) =>
        `${item.name} ${item.company} ${item.email} ${item.vat}`
          .toLowerCase()
          .includes(query),
      ),
    [billing, query],
  );

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((item) =>
        `${item.title} ${item.date} ${item.amount} ${item.type}`
          .toLowerCase()
          .includes(query),
      ),
    [transactions, query],
  );

  const filteredCards = useMemo(
    () =>
      cards.filter((card) =>
        `${card.brand} ${card.number}`.toLowerCase().includes(query),
      ),
    [cards, query],
  );

  const visibleInvoices = showAllInvoices
    ? filteredInvoices
    : filteredInvoices.slice(0, 5);
  const visibleTransactions = showAllTransactions
    ? filteredTransactions
    : filteredTransactions.slice(0, 6);

  /* CARD ACTIONS */

  const addCard = (event) => {
    event.preventDefault();
    const cleanedNumber = cardNumber.replace(/\s/g, "");

    if (!/^\d{4,19}$/.test(cleanedNumber)) {
      alert("Enter a card number containing 4–19 digits.");
      return;
    }

    setCards((previous) => [
      ...previous,
      {
        id: Date.now(),
        brand: cardBrand,
        number: cleanedNumber.slice(-4),
        frozen: false,
        visible: false,
      },
    ]);

    setCardNumber("");
    setShowCardForm(false);
  };

  const deleteCard = (id) => {
    if (window.confirm("Remove this payment card?")) {
      setCards((previous) => previous.filter((card) => card.id !== id));
    }
  };

  const toggleCardVisibility = (id) => {
    setCards((previous) =>
      previous.map((card) =>
        card.id === id ? { ...card, visible: !card.visible } : card,
      ),
    );
  };

  const toggleCardFreeze = (id) => {
    setCards((previous) =>
      previous.map((card) =>
        card.id === id ? { ...card, frozen: !card.frozen } : card,
      ),
    );
  };

  const editCard = (card) => {
    const updated = window.prompt(
      "Enter the last 4 digits of the card:",
      card.number,
    );
    if (updated === null) return;

    if (!/^\d{4}$/.test(updated.trim())) {
      alert("Please enter exactly 4 digits.");
      return;
    }

    setCards((previous) =>
      previous.map((item) =>
        item.id === card.id ? { ...item, number: updated.trim() } : item,
      ),
    );
  };

  /* BILLING ACTIONS */

  const saveBilling = (event) => {
    event.preventDefault();
    setBilling((previous) =>
      previous.map((item) =>
        item.id === editingBilling.id ? editingBilling : item,
      ),
    );
    setEditingBilling(null);
  };

  const deleteBilling = (id) => {
    if (window.confirm("Delete this billing information?")) {
      setBilling((previous) => previous.filter((item) => item.id !== id));
    }
  };

  /* FINANCIAL ASSISTANT */

  const sendAssistantMessage = (question) => {
    const text = question.trim();
    if (!text) return;

    const q = text.toLowerCase();

    const totalExpenses = transactions
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + item.amount, 0);

    const totalIncome = transactions
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + item.amount, 0);

    const frozenCount = cards.filter((card) => card.frozen).length;
    let answer;

    if (q.includes("expense") || q.includes("spend") || q.includes("مصرف")) {
      answer = `Your sample transactions show ${money(totalExpenses)} in expenses. This amount is calculated from the demo transactions currently displayed.`;
    } else if (
      q.includes("income") ||
      q.includes("received") ||
      q.includes("عواید")
    ) {
      answer = `Your sample transactions show ${money(totalIncome)} in income.`;
    } else if (
      q.includes("invoice") ||
      q.includes("bill") ||
      q.includes("فاکتور")
    ) {
      answer = `There are ${invoices.length} sample invoices in this account. Their actual payment status has not been provided.`;
    } else if (
      q.includes("card") ||
      q.includes("wallet") ||
      q.includes("کارت")
    ) {
      answer = `You have ${cards.length} sample payment cards. ${frozenCount} card(s) are marked as frozen in this demo.`;
    } else if (q.includes("transaction") || q.includes("تراکنش")) {
      answer = `There are ${transactions.length} sample transactions in your account.`;
    } else if (q.includes("hello") || q.includes("hi") || q.includes("سلام")) {
      answer =
        "Hello! 💜 I'm happy to help. Ask me about your expenses, income, invoices, cards, or transactions.";
    } else if (q.includes("help") || q.includes("چی") || q.includes("کمک")) {
      answer =
        "Here is what I can help with:\n\n• Show expenses\n• Show income\n• Show invoices\n• Show cards\n• Show transactions";
    } else {
      answer =
        "I can answer questions about the sample financial data in this page. Try asking about expenses, income, invoices, payment cards, or transactions.";
    }

    setAssistantMessages((previous) => [
      ...previous,
      { role: "user", text },
      { role: "assistant", text: answer },
    ]);
    setAssistantInput("");
  };

  /* INDIGO & LAVENDER SHARED STYLES */

  const cardStyle =
    "rounded-2xl border border-[#E9E5FF] bg-white shadow-[0_8px_30px_rgba(67,56,202,0.07)]";

  const sectionTitle = "text-lg font-bold tracking-tight text-[#312E81]";

  const inputStyle =
    "mt-2 w-full rounded-xl border border-[#DDD6FE] bg-white p-3 text-sm outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10";

  return (
    <div className="contentTwo min-h-screen bg-[#F5F3FF] font-[Merriweather,serif] text-[#312E81]">
      {/* HEADER */}

      <header className="m-2.5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white bg-white/95 px-5 py-4 shadow-sm">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-[#8B83B5]">
            <FaHouse className="text-[#4338CA]" />
            <span>/</span>
            <span>Myaccount</span>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle sidebar"
            className="rounded-xl p-2 transition hover:bg-[#EDE9FE] hover:text-[#4338CA]"
          >
            <FaBars />
          </button>
        </div>

        <div className="relative w-full sm:w-[230px]">
          <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A93BE]" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Type here..."
            aria-label="Search account information"
            className="w-full rounded-xl border border-[#DDD6FE] bg-[#FAF9FF] py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
          />
        </div>

        <div className="flex items-center gap-4 text-sm text-[#77719C]">
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Do you want to log out?")) onLogout();
            }}
            className="flex items-center gap-2 transition hover:text-[#4338CA]"
          >
            <FaCircleUser />
            <span>Log out</span>
          </button>

          <button
            type="button"
            aria-label="Settings"
            onClick={() => alert("Account settings")}
            className="transition hover:text-[#4338CA]"
          >
            <FaGear />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            onClick={() => alert("You have no new notifications.")}
            className="transition hover:text-[#4338CA]"
          >
            <FaBell />
          </button>
        </div>
      </header>

      <main className="space-y-6 px-3 pb-8 pt-3 sm:px-5 lg:px-6">
        {/* WELCOME BANNER */}

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#312E81] via-[#4338CA] to-[#8B5CF6] p-6 text-white shadow-xl shadow-indigo-900/10 sm:p-8">
          <div className="absolute -right-10 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-[-70px] right-[25%] h-48 w-48 rounded-full bg-[#C4B5FD]/25 blur-3xl" />

          <div className="relative flex flex-wrap items-center justify-between gap-5">
            <div className="max-w-xl">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-white/70">
                MYPATIENTHUB · PERSONAL SPACE
              </p>
              <h1 className="text-2xl font-bold sm:text-3xl">My Account</h1>
              <p className="mt-3 max-w-lg text-sm leading-7 text-white/80">
                Manage your payment methods, review transactions, and keep your
                account information organized.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setAssistantOpen(true)}
              className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm font-semibold backdrop-blur-md transition hover:bg-white/20"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-xl">
                <FaRobot />
              </span>
              <span className="text-left">
                <span className="block">Financial Assistant</span>
                <span className="mt-1 block text-xs text-white/70">
                  Ask about your account
                </span>
              </span>
            </button>
          </div>
        </section>

        {/* PAYMENT CARDS AND BALANCES */}

        <section className="grid grid-cols-1 items-stretch gap-6 2xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)]">
          <div className="space-y-6">
            <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-[minmax(280px,1.1fr)_minmax(0,0.8fr)_minmax(0,0.8fr)]">
              {/* FEATURED BANK CARD */}

              <div className="relative min-h-[225px] overflow-hidden rounded-3xl bg-gradient-to-br from-[#312E81] via-[#4338CA] to-[#1E1B4B] p-5 text-white shadow-xl shadow-indigo-950/20">
                <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[#A78BFA]/35 blur-2xl" />
                <div className="absolute -bottom-20 left-16 h-40 w-40 rounded-full bg-[#818CF8]/25 blur-2xl" />

                <div className="relative flex items-center justify-between">
                  <FaWifi className="text-2xl" />
                  <FaCreditCard className="text-xl text-white/70" />
                </div>

                <p className="relative mt-8 break-words text-lg font-bold tracking-[0.08em] sm:text-xl">
                  4562&nbsp; 1122&nbsp; 4594&nbsp; 7852
                </p>

                <div className="relative mt-8 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs text-white/65">Card Holder</p>
                    <p className="mt-1 text-sm font-bold">Jack Peterson</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/65">Expires</p>
                    <p className="mt-1 text-sm font-bold">11/22</p>
                  </div>
                  <div className="flex -space-x-2">
                    <span className="h-5 w-5 rounded-full bg-red-500/95" />
                    <span className="h-5 w-5 rounded-full bg-amber-400/95" />
                  </div>
                </div>

                <p className="relative mt-4 text-[10px] text-white/40">
                  SAMPLE CARD · DEMO ONLY
                </p>
              </div>

              {/* ACCOUNT BALANCE */}

              <div
                className={`${cardStyle} flex min-h-[210px] flex-col items-center justify-center p-5 text-center transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#818CF8] to-[#4338CA] text-xl text-white shadow-lg shadow-indigo-200/60">
                  <FaBuildingColumns />
                </div>
                <h3 className="font-bold">Account Balance</h3>
                <p className="mt-1 text-xs text-[#9690B5]">Payments</p>
                <p className="mt-6 text-2xl font-bold text-[#312E81]">+$2000</p>
                <span className="mt-3 rounded-full bg-[#E9F8F1] px-3 py-1 text-xs font-semibold text-[#27966C]">
                  <FaCircleCheck className="mr-1 inline" />
                  Demo balance
                </span>
              </div>

              {/* WALLET BALANCE */}

              <div
                className={`${cardStyle} flex min-h-[210px] flex-col items-center justify-center p-5 text-center transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#A78BFA] to-[#4338CA] text-xl text-white shadow-lg shadow-violet-200/60">
                  <FaPaypal />
                </div>
                <h3 className="font-bold">Wallet Bank Card</h3>
                <p className="mt-1 text-xs text-[#9690B5]">Payments</p>
                <p className="mt-6 text-2xl font-bold text-[#312E81]">
                  $455.00
                </p>
                <span className="mt-3 rounded-full bg-[#EDE9FE] px-3 py-1 text-xs font-semibold text-[#6D28D9]">
                  Demo wallet
                </span>
              </div>
            </div>

            {/* SMART CARD WALLET */}

            <section className={`${cardStyle} overflow-hidden`}>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EDE9FE] p-5 sm:p-6">
                <div>
                  <h2 className={sectionTitle}>Smart Card Wallet</h2>
                  <p className="mt-2 text-xs leading-5 text-[#9690B5]">
                    Manage your saved payment methods
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCardForm(!showCardForm)}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#4338CA] to-[#8B5CF6] px-4 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-200/60 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  {showCardForm ? <FaXmark /> : <FaPlus />}
                  {showCardForm ? "CANCEL" : "ADD NEW CARD"}
                </button>
              </div>
              {/* creat new card  */}
              {showCardForm && (
                <form
                  onSubmit={addCard}
                  className="m-5 grid grid-cols-1 gap-4 rounded-2xl border border-[#DDD6FE] bg-[#F5F3FF] p-4 sm:grid-cols-[1fr_1fr_auto]"
                >
                  <label className="text-sm font-semibold">
                    Card number
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      value={cardNumber}
                      onChange={(event) => setCardNumber(event.target.value)}
                      placeholder="Enter card number"
                      required
                      className={inputStyle}
                    />
                  </label>

                  <label className="text-sm font-semibold">
                    Card type
                    <select
                      value={cardBrand}
                      onChange={(event) => setCardBrand(event.target.value)}
                      className={inputStyle}
                    >
                      <option value="visa">Visa</option>
                      <option value="mastercard">Mastercard</option>
                    </select>
                  </label>

                  <button
                    type="submit"
                    className="self-end rounded-xl bg-[#4338CA] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#312E81]"
                  >
                    Save Card
                  </button>
                </form>
              )}

              <div className="grid grid-cols-1 gap-4 p-5 sm:p-6 lg:grid-cols-2">
                {filteredCards.map((card) => (
                  <article
                    key={card.id}
                    className={`relative overflow-hidden rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                      card.frozen
                        ? "border-red-200 bg-gradient-to-br from-[#FFF5F5] to-[#FFF0F3]"
                        : card.brand === "visa"
                          ? "border-[#DDD6FE] bg-gradient-to-br from-[#EEF2FF] via-white to-[#EDE9FE]"
                          : "border-[#DDD6FE] bg-gradient-to-br from-[#F5F3FF] via-white to-[#EDE9FE]"
                    }`}
                  >
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#A78BFA]/15 blur-2xl" />

                    <div className="relative flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {card.brand === "mastercard" ? (
                          <div className="flex -space-x-2">
                            <span className="h-6 w-6 rounded-full bg-red-500" />
                            <span className="h-6 w-6 rounded-full bg-amber-400/95" />
                          </div>
                        ) : (
                          <span className="font-extrabold italic text-[#4338CA]">
                            VISA
                          </span>
                        )}
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#8B83B5]">
                          {card.brand}
                        </span>
                      </div>

                      {card.frozen ? (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-[10px] font-bold text-red-600">
                          FROZEN
                        </span>
                      ) : (
                        <span className="rounded-full bg-[#E3F8EE] px-3 py-1 text-[10px] font-bold text-[#20885F]">
                          ACTIVE DEMO
                        </span>
                      )}
                    </div>

                    <div className="relative mt-7 flex items-center gap-3">
                      <FaCreditCard className="text-xl text-[#6D5BD0]" />
                      <p className="text-base font-bold tracking-[0.12em] text-[#312E81]">
                        {card.visible
                          ? `•••• •••• •••• ${card.number}`
                          : "•••• •••• •••• ••••"}
                      </p>
                    </div>

                    <div className="relative mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#DDD6FE] pt-4">
                      <button
                        type="button"
                        onClick={() => toggleCardVisibility(card.id)}
                        className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold text-[#6D5BD0] transition hover:bg-white"
                      >
                        {card.visible ? <FaEyeSlash /> : <FaEye />}
                        {card.visible ? "Hide digits" : "Show last 4"}
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => editCard(card)}
                          title="Edit card"
                          aria-label="Edit card"
                          className="rounded-lg p-2 text-[#6D5BD0] transition hover:bg-white"
                        >
                          <FaPen />
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleCardFreeze(card.id)}
                          title={
                            card.frozen
                              ? "Unfreeze demo card"
                              : "Freeze demo card"
                          }
                          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                            card.frozen
                              ? "bg-[#E3F8EE] text-[#20885F] hover:bg-[#D1F2E3]"
                              : "bg-white text-[#6B668B] hover:bg-[#EDE9FE]"
                          }`}
                        >
                          {card.frozen ? <FaLockOpen /> : <FaLock />}
                          {card.frozen ? "Unfreeze" : "Freeze"}
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteCard(card.id)}
                          title="Delete card"
                          aria-label="Delete card"
                          className="rounded-lg p-2 text-[#D34E6B] transition hover:bg-red-50"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>

                    <p className="relative mt-3 text-[10px] text-[#9690B5]">
                      DEMO CARD · NOT CONNECTED TO A BANK
                    </p>
                  </article>
                ))}

                {filteredCards.length === 0 && (
                  <p className="col-span-full py-8 text-center text-sm text-[#9690B5]">
                    No payment cards found.
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* INVOICES */}

          <section className={`${cardStyle} min-w-0 p-5 sm:p-6`}>
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <h2 className={sectionTitle}>Invoices</h2>
                <p className="mt-2 text-xs text-[#9690B5]">
                  Your billing history
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAllInvoices(!showAllInvoices)}
                className="rounded-xl border border-[#DDD6FE] px-4 py-2.5 text-xs font-bold text-[#6D5BD0] transition hover:bg-[#F5F3FF]"
              >
                {showAllInvoices ? "SHOW LESS" : "VIEW ALL"}
              </button>
            </div>

            <div className="space-y-5">
              {visibleInvoices.map((invoice, index) => (
                <div
                  key={`${invoice.id}-${index}`}
                  className="flex items-center justify-between gap-3 border-b border-[#F0EDFA] pb-4 last:border-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#433D70]">
                      {invoice.date}
                    </p>
                    <p className="mt-2 text-xs text-[#9690B5]">{invoice.id}</p>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-sm font-bold">
                      {money(invoice.amount)}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        alert(
                          `Invoice ${invoice.id}\nDate: ${invoice.date}\nAmount: ${money(invoice.amount)}\n\nPDF generation needs a PDF generator or backend.`,
                        )
                      }
                      className="flex items-center gap-1 text-xs font-bold text-[#6D5BD0] hover:text-[#4338CA]"
                    >
                      <FaFilePdf className="text-base" />
                      PDF
                    </button>
                  </div>
                </div>
              ))}

              {visibleInvoices.length === 0 && (
                <p className="py-8 text-center text-sm text-[#9690B5]">
                  No invoices found.
                </p>
              )}
            </div>
          </section>
        </section>

        {/* BILLING + TRANSACTIONS */}

        <section className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.9fr)]">
          {/* BILLING INFORMATION */}

          <section className={`${cardStyle} min-w-0 p-5 sm:p-6`}>
            <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className={sectionTitle}>Billing Information</h2>
                <p className="mt-2 text-xs text-[#9690B5]">
                  Manage your billing details
                </p>
              </div>
              <span className="rounded-xl bg-[#EDE9FE] px-3 py-2 text-xs font-semibold text-[#6D5BD0]">
                {filteredBilling.length} Records
              </span>
            </div>

            <div className="space-y-4">
              {filteredBilling.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-[#E9E5FF] bg-[#FCFBFF] p-4 transition duration-300 hover:border-[#C4B5FD] hover:shadow-lg hover:shadow-indigo-100/40 sm:p-5"
                >
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <h3 className="font-bold text-[#312E81]">{item.name}</h3>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => deleteBilling(item.id)}
                        className="flex items-center gap-1.5 text-[11px] font-bold text-[#D34E6B] transition hover:text-red-700"
                      >
                        <FaTrash /> DELETE
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingBilling({ ...item })}
                        className="flex items-center gap-1.5 text-[11px] font-bold text-[#6D5BD0] transition hover:text-[#4338CA]"
                      >
                        <FaPen /> EDIT
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-sm">
                    <p className="break-words">
                      <span className="mr-2 text-[#8B83B5]">Company Name:</span>
                      <span className="font-semibold">{item.company}</span>
                    </p>
                    <p className="break-all">
                      <span className="mr-2 text-[#8B83B5]">
                        Email Address:
                      </span>
                      <span className="font-semibold">{item.email}</span>
                    </p>
                    <p className="break-words">
                      <span className="mr-2 text-[#8B83B5]">VAT Number:</span>
                      <span className="font-semibold">{item.vat}</span>
                    </p>
                  </div>
                </article>
              ))}

              {filteredBilling.length === 0 && (
                <p className="py-8 text-center text-sm text-[#9690B5]">
                  No billing information found.
                </p>
              )}
            </div>
          </section>

          {/* TRANSACTIONS */}

          <section className={`${cardStyle} min-w-0 p-5 sm:p-6`}>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className={sectionTitle}>Your Transactions</h2>
                <p className="mt-2 text-xs text-[#9690B5]">
                  Recent account activity
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAllTransactions(!showAllTransactions)}
                className="flex items-center gap-2 rounded-xl bg-[#F5F3FF] px-3 py-2 text-xs font-semibold text-[#6D5BD0] transition hover:bg-[#EDE9FE]"
              >
                <FaCalendarDays />
                {showAllTransactions ? "SHOW LESS" : "VIEW ALL"}
              </button>
            </div>

            <div className="space-y-5">
              {visibleTransactions.map((transaction, index) => {
                const showGroup =
                  index === 0 ||
                  visibleTransactions[index - 1]?.group !== transaction.group;

                return (
                  <React.Fragment key={transaction.id}>
                    {showGroup && (
                      <p className="pt-1 text-xs font-bold tracking-wide text-[#9690B5]">
                        {transaction.group}
                      </p>
                    )}
                    <article className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          transaction.type === "expense"
                            ? "bg-[#FFF0F3] text-[#D35D76]"
                            : transaction.type === "income"
                              ? "bg-[#E8F9F1] text-[#35A77D]"
                              : "bg-[#EDE9FE] text-[#6D5BD0]"
                        }`}
                      >
                        {transaction.type === "expense" ? (
                          <FaArrowDown />
                        ) : transaction.type === "income" ? (
                          <FaArrowUp />
                        ) : (
                          <FaWallet />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold">
                          {transaction.title}
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-[#9690B5]">
                          {transaction.date}
                        </p>
                      </div>

                      <p
                        className={`shrink-0 text-sm font-bold ${
                          transaction.type === "expense"
                            ? "text-[#C75B79]"
                            : transaction.type === "income"
                              ? "text-[#35A77D]"
                              : "text-[#6D5BD0]"
                        }`}
                      >
                        {transaction.type === "expense"
                          ? "- "
                          : transaction.type === "income"
                            ? "+ "
                            : ""}
                        {transaction.type === "pending"
                          ? "Pending"
                          : money(transaction.amount)}
                      </p>
                    </article>
                  </React.Fragment>
                );
              })}

              {visibleTransactions.length === 0 && (
                <p className="py-8 text-center text-sm text-[#9690B5]">
                  No transactions found.
                </p>
              )}
            </div>
          </section>
        </section>

        {/* FOOTER */}

        <footer className="flex flex-col items-center justify-between gap-4 px-2 py-5 text-center text-xs text-[#9690B5] sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()}, made with{" "}
            <span className="text-[#8B5CF6]">♥</span> by MyPiHUB for a better
            web.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/" className="transition hover:text-[#4338CA]">
              MyPatientHUB
            </Link>
            <button
              type="button"
              onClick={() => alert("MyPatientHUB - About Us")}
              className="transition hover:text-[#4338CA]"
            >
              About Us
            </button>
          </div>
        </footer>
      </main>

      {/* FLOATING AI ASSISTANT */}

      <div className="fixed bottom-5 right-5 z-40 font-sans">
        {assistantOpen && (
          <div className="mb-4 flex h-[min(500px,70vh)] w-[min(365px,calc(100vw-32px))] flex-col overflow-hidden rounded-3xl border border-white/80 bg-white shadow-2xl shadow-indigo-950/25">
            <div className="relative overflow-hidden bg-gradient-to-r from-[#312E81] via-[#4338CA] to-[#8B5CF6] p-5 text-white">
              <div className="absolute -right-8 -top-12 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
              <div className="relative flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-xl backdrop-blur">
                    <FaRobot />
                  </div>
                  <div>
                    <h3 className="font-bold">MyPatient Assistant</h3>
                    <p className="mt-1 text-xs text-white/75">
                      Your financial companion
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-[10px] text-[#C9FFE4]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#6AF0B0]" />
                      Demo assistant online
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAssistantOpen(false)}
                  aria-label="Close assistant"
                  className="rounded-xl p-2 transition hover:bg-white/15"
                >
                  <FaXmark />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-[#F5F3FF] p-4">
              {assistantMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#4338CA] to-[#8B5CF6] text-xs text-white">
                      <FaRobot />
                    </div>
                  )}
                  <div
                    className={`max-w-[84%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "rounded-br-md bg-gradient-to-br from-[#4338CA] to-[#8B5CF6] text-white shadow-md shadow-indigo-200/50"
                        : "rounded-bl-md border border-[#E9E5FF] bg-white text-[#433D70] shadow-sm"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-[#E9E5FF] bg-white p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#9690B5]">
                Quick questions
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Show expenses",
                  "Show income",
                  "Show invoices",
                  "Show cards",
                  "Show transactions",
                ].map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => sendAssistantMessage(question)}
                    className="rounded-full border border-[#DDD6FE] bg-[#F5F3FF] px-3 py-2 text-[10px] font-semibold text-[#5145B5] transition hover:border-[#A78BFA] hover:bg-[#EDE9FE]"
                  >
                    {question}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  sendAssistantMessage(assistantInput);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={assistantInput}
                  onChange={(event) => setAssistantInput(event.target.value)}
                  placeholder="Ask about your account..."
                  className="min-w-0 flex-1 rounded-xl border border-[#DDD6FE] bg-[#FAF9FF] px-3 py-3 text-xs outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={!assistantInput.trim()}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#4338CA] to-[#8B5CF6] text-white shadow-md transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FaPaperPlane />
                </button>
              </form>
              <p className="text-center text-[9px] leading-4 text-[#9690B5]">
                Demo assistant · Uses sample account data only
              </p>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setAssistantOpen(!assistantOpen)}
          aria-label={
            assistantOpen
              ? "Close financial assistant"
              : "Open financial assistant"
          }
          className="ml-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-[#312E81] via-[#4338CA] to-[#A78BFA] text-2xl text-white shadow-xl shadow-indigo-900/30 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          {assistantOpen ? <FaXmark /> : <FaRobot />}
        </button>
      </div>

      {/* EDIT BILLING MODAL */}

      {editingBilling && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#1E1B4B]/55 p-4 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) setEditingBilling(null);
          }}
        >
          <form
            onSubmit={saveBilling}
            className="w-full max-w-lg rounded-3xl border border-white bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#7C3AED]">
                  ACCOUNT DETAILS
                </p>
                <h2 className="text-xl font-bold text-[#312E81]">
                  Edit Billing Information
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setEditingBilling(null)}
                aria-label="Close edit form"
                className="rounded-xl p-2 text-[#8B83B5] transition hover:bg-[#F5F3FF]"
              >
                <FaXmark />
              </button>
            </div>

            <div className="space-y-4">
              {[
                ["name", "Full Name"],
                ["company", "Company Name"],
                ["email", "Email Address"],
                ["vat", "VAT Number"],
              ].map(([field, label]) => (
                <label
                  key={field}
                  className="block text-sm font-semibold text-[#433D70]"
                >
                  {label}
                  <input
                    type={field === "email" ? "email" : "text"}
                    required
                    value={editingBilling[field]}
                    onChange={(event) =>
                      setEditingBilling((previous) => ({
                        ...previous,
                        [field]: event.target.value,
                      }))
                    }
                    className={inputStyle}
                  />
                </label>
              ))}
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingBilling(null)}
                className="rounded-xl border border-[#DDD6FE] px-5 py-3 text-sm font-bold transition hover:bg-[#F5F3FF]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-[#4338CA] to-[#8B5CF6] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200/50 transition hover:opacity-90"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
