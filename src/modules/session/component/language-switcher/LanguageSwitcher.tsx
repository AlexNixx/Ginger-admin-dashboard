import { Dropdown } from "antd";

import { useTranslation } from "react-i18next";

import type { MenuProps } from "antd";

import { FC } from "react";

interface LanguageSwitcherProps {
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

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ className }) => {
	const { t, i18n } = useTranslation();

	const onClick: MenuProps["onClick"] = ({ key }) => {
		i18n.changeLanguage(key);
	};

	return (
		<Dropdown menu={{ items, onClick }} className={className}>
			<a onClick={(e) => e.preventDefault()} href="">
				{t("language")}
			</a>
		</Dropdown>
	);
};
