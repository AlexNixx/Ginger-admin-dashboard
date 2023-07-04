import { createRoot } from "react-dom/client";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";

import "shared/config/i18n/i18n";
import { Suspense } from "react";
import { Loader } from "shared/ui/fullscreen-loader";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
	<BrowserRouter>
		<Suspense fallback={<Loader />}>
			<App />
		</Suspense>
	</BrowserRouter>
);
