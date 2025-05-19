import clsx from "clsx";
import cls from "./Rating.module.css";

interface RatingProps {
  className?: string;
  rating: number;
}

export function Rating({ rating, className }: RatingProps) {
  return (
    <div className={clsx(cls.rating, className)}>
      {rating}
      <img src="/star-icon.svg" alt="Иконка звезды" />
    </div>
  );
}
