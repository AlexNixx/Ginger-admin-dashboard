import { Dropdown, Space } from "antd";

import { useTranslation } from "react-i18next";

import { LangIcon } from "./icon";

import type { MenuProps } from "antd";

import { FC } from "react";

interface LanguageSwitcherProps {
	short?: boolean;
	className?: string;
}

const items: MenuProps["items"] = [
	{
		label: "English",
		key: "en",
	},
	{
		label: "Українська",
		key: "ua",
	},
];

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
	short = false,
	className,
}) => {
	const { t, i18n } = useTranslation();

	const onClick: MenuProps["onClick"] = ({ key }) => {
		i18n.changeLanguage(key);
	};

	return (
		<Dropdown menu={{ items, onClick }} className={className}>
			<a onClick={(e) => e.preventDefault()} href="">
				<Space style={{ color: "#e1d8d8" }}>
					<LangIcon />
					{t(short ? "short-language" : "language")}
				</Space>
			</a>
		</Dropdown>
	);
};
