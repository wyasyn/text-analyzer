export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="28"
        height="34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.45 6.65V2.4H2.05v29.2h13.4v-4.25a10.35 10.35 0 010-20.7zM15.45 6.65v20.7a10.35 10.35 0 000-20.7zM33.32 9.25h3V23.7h-3V9.25zM38 18.75A5.25 5.25 0 1143.22 24 5.178 5.178 0 0138 18.75zm7.52 0a2.28 2.28 0 10-2.28 2.34 2.218 2.218 0 002.26-2.34h.02z"
          className="prefix__ccustom fill-foreground"
        />
      </svg>
      <span className="text-lg font-medium">Character Counter</span>
    </div>
  );
}
