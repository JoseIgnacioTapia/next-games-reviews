import { LinkIcon } from "@heroicons/react/20/solid";

function ShareLinkButton() {
  const handleClick = () => {
    console.log("Hi!");
  };

  return (
    <button
      onClick={handleClick}
      className="border flex gap-1 items-center px-2 py-1 rounded text-slate-500 text-sm hover:bg-orange-100 hover:text-slate-700"
    >
      <LinkIcon className="h-4 w-4" />
      Share Link
    </button>
  );
}

export default ShareLinkButton;
