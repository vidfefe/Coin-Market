import { Card, Select } from "antd";
import { formatNumber } from "@/utils/formatNumberUtils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import React from "react";

const { Option } = Select;

type IntervalType = "h1" | "m30" | "m5";

type PriceChartProps = {
  data: { time: number; priceUsd: number }[];
  currentPrice: number;
  interval: IntervalType;
  onIntervalChange: (value: IntervalType) => void;
};

export default function PriceChart({
  data,
  interval,
  currentPrice,
  onIntervalChange,
}: PriceChartProps) {
  const minPrice = Math.min(...data.map((item) => item.priceUsd));
  const maxPrice = Math.max(...data.map((item) => item.priceUsd));
  const yDomainPadding = (maxPrice - minPrice) * 0.1;

  return (
    <Card
      title={
        <div>
          Price Chart
          <Select
            value={interval}
            onChange={onIntervalChange}
            className="interval-select"
          >
            <Option value="m5">1 Hour</Option>
            <Option value="m30">12 Hours</Option>
            <Option value="h1">1 Day</Option>
          </Select>
        </div>
      }
      bordered={false}
    >
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid opacity={0.3} vertical={false} />
          <XAxis
            dataKey="time"
            tickCount={24}
            tickFormatter={(timestamp) =>
              new Date(timestamp).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            }
          />
          <YAxis
            dataKey="priceUsd"
            tickFormatter={(item) => formatNumber(item)}
            domain={[minPrice - yDomainPadding, maxPrice + yDomainPadding]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#8450ca",
              borderRadius: "8px",
              borderColor: "transparent",
            }}
            itemStyle={{
              color: "fff",
            }}
            formatter={(value: number) => [`$${formatNumber(value)}`, "Price"]}
            labelFormatter={(label) =>
              new Date(label).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            }
          />
          <Line
            type="monotone"
            dataKey="priceUsd"
            stroke="#8450ca"
            strokeWidth={2}
            dot={false}
          />
          <ReferenceLine
            y={currentPrice}
            label={{
              value: "Current Price",
              position: "top",
              fill: "white",
              dy: -5,
            }}
            stroke="white"
            strokeDasharray="2 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
