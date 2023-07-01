import { Toaster } from "react-hot-toast";
import { FC, PropsWithChildren } from "react";

export const WithToaster: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Toaster
				position="top-left"
				toastOptions={{
					duration: 800,
				}}
			/>
			{children}
		</>
	);
};
