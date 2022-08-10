import './counter.scss';

type CounterProps = {
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  value?: number;
  className?: string;
};

export default function Counter({ min = 1, max = 10, value = 1, onChange }: CounterProps) {
  return (
    <div className="counter">
      <button
        disabled={value <= min}
        onClick={() => value > min && onChange?.(value - 1)}
        className="counter__button button-minus"
      ></button>
<div className="counter__value">{value}</div>
      <button
        disabled={value >= max}
        onClick={() => value < max && onChange?.(value + 1)}
        className="counter__button button-plus"
      ></button>


    </div>
  );
}
