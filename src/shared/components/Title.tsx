import { FC } from 'react';

interface TitleProps {
  text: string;
}

export const Title: FC<TitleProps> = ({ text }) => {
  return (
    <h1 className="w-full rounded-t-3xl bg-white px-6 text-lg font-semibold">
      {text}
    </h1>
  );
};
