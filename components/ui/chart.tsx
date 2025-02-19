'use client';

import * as React from 'react';
import * as RechartsPrimitive from 'recharts';
import type { TooltipProps } from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

import { cn } from '@/lib/utils';

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: '', dark: '.dark' } as const;

export type ChartConfig = {
  theme?: keyof typeof THEMES;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  seriesNames?: Record<string, string>;
  seriesColors?: Record<string, string>;
  seriesTypes?: Record<string, 'line' | 'bar'>;
};

interface ChartContextProps {
  config: ChartConfig;
}

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }

  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    config: ChartConfig;
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >['children'];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = 'Chart';

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const { theme = 'light', colors = [] } = config;
  const themeSelector = THEMES[theme];

  return (
    <style>
      {`
        ${themeSelector} [data-style-id="${id}"] {
          ${colors
            .map((color, i) => {
              return `--chart-color-${i + 1}: ${color};`;
            })
            .join('\n')}
        }
      `}
    </style>
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  TooltipProps<ValueType, NameType> & {
    className?: string;
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: 'line' | 'dot' | 'dashed';
    nameKey?: string;
    labelKey?: string;
  }
>((props, ref) => {
  const { config } = useChart();
  const { valueFormatter } = config;

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border bg-background px-3 py-1.5 shadow-md',
        props.className
      )}
    >
      {props.payload?.map((item: any, index: number) => {
        const value = item.value !== undefined ? item.value : item.payload?.[props.labelKey || 'value'];
        const name = item.name !== undefined ? item.name : item.payload?.[props.nameKey || 'name'];
        const color = item.color || `var(--chart-color-${index + 1})`;
        const formattedValue = valueFormatter ? valueFormatter(value) : value;

        return (
          <div key={`${name}-${index}`} className="flex items-center gap-2">
            {!props.hideIndicator && (
              <div
                className="h-1 w-1 rounded-full"
                style={{ backgroundColor: color }}
              />
            )}
            {!props.hideLabel && (
              <div className="flex gap-2">
                <span className="font-medium">{name}</span>
                <span className="text-muted-foreground">{formattedValue}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});
ChartTooltipContent.displayName = 'ChartTooltipContent';

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    payload?: Array<{
      value: string;
      type?: string;
      color?: string;
      payload?: {
        value?: string;
        color?: string;
        type?: string;
        name?: string;
      };
    }>;
    hideIcon?: boolean;
    nameKey?: string;
  }
>(({ className, payload, hideIcon = false, nameKey, ...props }, ref) => {
  const { config } = useChart();

  if (!payload) {
    return null;
  }

  return (
    <div ref={ref} className={cn('grid gap-4', className)} {...props}>
      <div className="flex flex-wrap gap-4">
        {payload.map((item, index) => {
          const itemConfig = getPayloadConfigFromPayload(
            config,
            item,
            'seriesColors'
          );
          const itemName = getPayloadConfigFromPayload(
            config,
            item,
            'seriesNames'
          );

          return (
            <div key={index} className="flex items-center gap-1">
              {itemConfig || item.color ? (
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: itemConfig ?? item.color,
                  }}
                />
              ) : null}
              <span className="text-sm text-muted-foreground">
                {itemName ?? item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
});
ChartLegendContent.displayName = 'ChartLegendContent';

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
): string | undefined {
  if (!payload || typeof payload !== 'object') {
    return undefined;
  }

  const payloadKey = Object.keys(payload).find((k) => k === 'value' || k === 'name');
  if (!payloadKey) {
    return undefined;
  }

  const value = (payload as Record<string, unknown>)[payloadKey];
  if (typeof value !== 'string') {
    return undefined;
  }

  const configKey = key as keyof ChartConfig;
  const configValue = config[configKey];

  if (configValue && typeof configValue === 'object') {
    return (configValue as Record<string, string>)[value];
  }

  return undefined;
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  useChart,
};
