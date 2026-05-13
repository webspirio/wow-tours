import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/globals.css'
import Landing from './landing.jsx'
import ProposalPage from './proposal.jsx'

function parseRoute(rawHash) {
  const hash = rawHash.replace(/^#/, '');
  if (hash.startsWith('/proposal')) return 'proposal';
  if (hash === '' || hash === '/') return 'landing';
  return null;
}

function Root() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash) ?? 'landing');
  const routeRef = useRef(route);
  routeRef.current = route;

  useEffect(() => {
    const onHashChange = () => {
      const next = parseRoute(window.location.hash);
      if (next === null || next === routeRef.current) return;
      window.scrollTo(0, 0);
      setRoute(next);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route === 'proposal' ? <ProposalPage /> : <Landing />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
