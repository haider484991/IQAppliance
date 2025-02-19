'use client';

import * as React from 'react';
import { Dot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InputOTPProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({ className, value, onChange, maxLength = 6, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !value) {
        e.preventDefault();
        onChange('');
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/[^0-9]/g, '').slice(0, maxLength);
      onChange(newValue);
    };

    return (
      <div
        ref={ref}
        className={cn('relative flex items-center gap-2', className)}
        onClick={() => inputRef.current?.focus()}
      >
        <input
          ref={inputRef}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="one-time-code"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="absolute w-0 h-0 opacity-0"
          {...props}
        />
        <InputOTPGroup>
          {Array.from({ length: maxLength }).map((_, i) => (
            <InputOTPSlot
              key={i}
              char={value[i]}
              focused={focused && i === value.length}
            />
          ))}
        </InputOTPGroup>
      </div>
    );
  }
);
InputOTP.displayName = 'InputOTP';

const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center gap-2', className)}
    {...props}
  />
));
InputOTPGroup.displayName = 'InputOTPGroup';

interface InputOTPSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  char?: string;
  focused?: boolean;
}

const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ className, char, focused, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
          focused && 'z-10 ring-2 ring-ring ring-offset-background',
          className
        )}
        {...props}
      >
        {char || <Dot className="h-4 w-4 fill-current opacity-50" />}
        {focused && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-caret-blink bg-foreground duration-500" />
          </div>
        )}
      </div>
    );
  }
);
InputOTPSlot.displayName = 'InputOTPSlot';

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props} />
));
InputOTPSeparator.displayName = 'InputOTPSeparator';

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
