import { Routing } from "./routes";
import { InitAuth } from "./hoc/initAuth";

import "./styles/index.scss";

const App = () => {
	return (
		<InitAuth>
			<Routing />
		</InitAuth>
	);
};

export default App;
