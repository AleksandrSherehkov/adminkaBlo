type Props = {
  children?: any;
};
export const ScrollableContent = ({ children }: Props) => {
  return <div className="flex-1 overflow-auto px-6">{children}</div>;
};
