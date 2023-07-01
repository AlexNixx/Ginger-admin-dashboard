import "./styles/index.scss";

import { Routing } from "./routes";
import { WithToaster } from "./hoc/withToaster";

const App = () => {
	return (
		<WithToaster>
			<Routing />
		</WithToaster>
	);
};

export default App;
