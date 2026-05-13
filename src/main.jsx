import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/globals.css'
import Landing from './landing.jsx'
import ProposalPage from './proposal.jsx'

function getRoute() {
  const hash = window.location.hash.replace(/^#/, '');
  if (hash === '/proposal') return 'proposal';
  return 'landing';
}

function Root() {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      window.scrollTo({ top: 0, behavior: 'instant' });
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
