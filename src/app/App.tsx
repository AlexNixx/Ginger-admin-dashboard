import { Routing } from "./routes";
import { WithToaster } from "./hoc/withToaster";
import { InitAuth } from "./hoc/initAuth";

import "./styles/index.scss";

const App = () => {
	return (
		<InitAuth>
			<WithToaster>
				<Routing />
			</WithToaster>
		</InitAuth>
	);
};

export default App;
