interface Props {
  label: string;
  handle?: (label: string) => void;
}
export const Badge = ({ label, handle }: Props) => {
  return (
    <div
      className="bg-app-green-800 inline-block whitespace-nowrap rounded-lg py-2 px-3.5 text-xs font-normal uppercase text-white cursor-pointer"
      onClick={(e) => handle && handle(label)}
    >
      <div className="mt-px">{label}</div>
    </div>
  );
};
