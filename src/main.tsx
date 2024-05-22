import { ConvexProvider, ConvexReactClient } from "convex/react";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: '664e2e224e76741038916fba',
    context: {
      kind: 'user',
      key: 'example-user-key',
      name: 'Sandy',
    },
  });

  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <React.StrictMode>
      <LDProvider>
        {/* <ConvexProvider client={convex}> */}
            <App />
        {/* </ConvexProvider> */}
      </LDProvider>
    </React.StrictMode>,
  );
})();
