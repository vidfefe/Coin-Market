"use client";

import { Input } from "antd";
const { Search } = Input;

export type SearchBarProps = {
  onSearch: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  onSearch,
  placeholder = "Search coin by name",
}: SearchBarProps) {
  return <Search placeholder={placeholder} onSearch={onSearch} />;
}
