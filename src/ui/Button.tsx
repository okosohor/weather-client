interface Props {
  fullWidth?: boolean,
  text: string;
  type?: 'button' | 'submit';
  handleClick?: () => void;
}

export default function Button({ text, handleClick, type='button', fullWidth = false }: Props) {
  return (
    <button
    type={type}
      onClick={handleClick}
      className={"relative items-center min-w-[130px] flex justify-center  justify-cente  mx-auto px-8 py-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300 active:scale-95 active:brightness-90 select-none " + (fullWidth ? 'w-full' : 'w-max')}
    >
      {text}
    </button>
  );
}
