import React from 'react';
import {createRoot} from 'react-dom/client';
import {BookOpen, ArrowRight, Check, Target, ChartNoAxesCombined, RotateCcw, Menu, X, Sparkles, ChevronRight, ArrowUp} from 'lucide-react';
import './style.css';
const courses=[{name:'CompTIA A+',code:'220-1201 / 220-1202',label:'IT Support',brand:'comptia',badge:'/images/comptia-a-plus-badge.png',badgeAlt:'CompTIA A+ certification badge'},{name:'Cisco CCST',code:'CCST',label:'Networking',brand:'cisco',badge:'/images/cisco-ccst-badge.png',badgeAlt:'Cisco CCST certification badge'},{name:'Microsoft Azure Fundamentals',code:'AZ-900',label:'IT Support',brand:'microsoft',badge:'/images/microsoft-azure-fundamentals-badge.jpg',badgeAlt:'Microsoft Azure Fundamentals certification badge'}];
function Logo(){return <a className="logo" href="#top" aria-label="Study Buddy home"><img className="brand-logo" src="/images/study-buddy-logo.png" alt="Study Buddy book mascot logo"/><span>study<span className="gradient-text">buddy</span><small>LEARN. PRACTICE. GROW.</small></span></a>}
function Phones(){return <div className="showcase" aria-label="Study Buddy iPhone app screenshots"><div className="showcase-halo"/><div className="device device-back"><div className="device-top"/><img src="/images/study-learn.jpeg" alt="Study Buddy Security+ learning path showing course modules and quick review"/></div><div className="device device-front"><div className="device-top"/><img src="/images/study-home.jpeg" alt="Study Buddy study plan dashboard with current track and start learning button"/></div><span className="showcase-caption">Real Study Buddy app screens</span></div>}
function MailerLiteForm(){
 const containerRef = React.useRef(null);
 const [status,setStatus] = React.useState('loading');
 React.useEffect(()=>{
  const container = containerRef.current;
  if(!container) return;
  container.innerHTML = '<div class="ml-embedded" data-form="200z0U"></div>';
  let timeoutId;
  const markReady = () => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      const hasIframe = !!container.querySelector('iframe');
      const hasMailerliteContent = container.innerText.trim().length > 0;
      setStatus(hasIframe || hasMailerliteContent ? 'ready' : 'fallback');
    }, 2500);
  };

  window.ml = window.ml || function(){(window.ml.q = window.ml.q || []).push(arguments)};
  window.ml('account','2763064');

  const existing = document.querySelector('script[data-studybuddy-mailerlite="true"]');
  if(existing){
    existing.remove();
  }
  const script = document.createElement('script');
  script.src = 'https://assets.mailerlite.com/js/universal.js';
  script.async = true;
  script.dataset.studybuddyMailerlite = 'true';
  script.onload = markReady;
  script.onerror = () => setStatus('fallback');
  document.body.appendChild(script);

  markReady();

  return () => { clearTimeout(timeoutId); };
 },[]);

 return <div className="mailerlite-signup">
   <div ref={containerRef} className="mailerlite-mount" />
   {status === 'fallback' && <div className="mailerlite-fallback">
      <p>The signup form didn't load automatically in this preview.</p>
      <p>Make sure MailerLite is published and script loading is allowed in your browser, then refresh the page.</p>
   </div>}
 </div>;
}
function App(){const [menu,setMenu]=React.useState(false);return <div id="top"><header className="header"><div className="container nav"><Logo/><nav className={menu?'nav-links open':'nav-links'}><a onClick={()=>setMenu(false)} href="#features">Features</a><a onClick={()=>setMenu(false)} href="#courses">Courses</a><a onClick={()=>setMenu(false)} href="#how">How it works</a><a onClick={()=>setMenu(false)} href="#early-access" className="nav-cta">Get updates <ArrowRight size={15}/></a></nav><button className="menu-toggle" onClick={()=>setMenu(!menu)} aria-label="Toggle menu">{menu?<X/>:<Menu/>}</button></div></header><main><section className="hero"><div className="hero-glow"/><div className="container hero-grid"><div className="hero-copy"><div className="eyebrow"><Sparkles size={14}/> YOUR STUDY JOURNEY, SIMPLIFIED</div><h1>Big goals.<br/>Better study habits.<br/><span className="gradient-text">Meet your Study Buddy.</span></h1><p className="hero-desc">Your personal space to learn, practice, and build confidence for your next IT certification. One lesson, one quiz, one win at a time.</p><div className="hero-actions"><a className="btn primary" href="#early-access">Get launch updates <ArrowRight size={18}/></a><a className="btn secondary" href="#how">See how it works <ChevronRight size={18}/></a></div><div className="hero-note"><span className="avatar-stack"><i>📘</i><i>⚡</i><i>🎯</i></span><span>Made for curious minds and future IT pros.</span></div></div><Phones/></div></section><section id="features" className="section features-section"><div className="container"><div className="section-intro"><span className="section-kicker">EVERYTHING YOU NEED</span><h2>Less stress. <span className="gradient-text">More progress.</span></h2><p>Powerful study tools, without the overwhelm. Stay focused on what matters most: learning.</p></div><div className="feature-grid"><article className="feature-card"><h3>Learn in bite-sized lessons</h3><p>Break complex IT topics into approachable lessons you can tackle at your own pace.</p><div className="mini-lines"><span/><span/><span/></div></article><article className="feature-card"><h3>Practice with purpose</h3><p>Test your understanding with quizzes and helpful explanations after each answer.</p><div className="answer-preview"><span><Check size={14}/> Correct answer</span><span>Keep it going!</span></div></article><article className="feature-card"><h3>See how far you've come</h3><p>Follow your learning progress and spot the topics that deserve another look.</p><div className="mini-bars"><i/><i/><i/><i/><i/><i/><i/></div></article><article className="feature-card"><h3>Review. Improve. Repeat.</h3><p>Revisit missed questions, strengthen weaker areas, and keep building confidence.</p><div className="review-tags"><span>Review topics</span><span>Try again ↗</span></div></article></div></div></section><section id="courses" className="section courses-section"><div className="container"><div className="section-intro"><span className="section-kicker">CHOOSE YOUR PATH</span><h2>Your next certification <span className="gradient-text">starts here.</span></h2><p>Explore study paths built around popular entry-level and foundational IT certifications.</p></div><div className="course-grid">{courses.map((c,i)=><article className={'course-card modern-course '+c.brand} key={c.code}><div className="course-top"><img className="course-badge" src={c.badge} alt={c.badgeAlt}/></div><div className="course-info"><span className="course-code">{c.code}</span><h3>{c.name}</h3><p>{c.label}</p></div></article>)}</div><p className="course-disclaimer">Course availability and content may evolve as Study Buddy prepares for launch.</p></div></section><section id="how" className="section how-section"><div className="container how-grid"><div className="how-left"><span className="section-kicker">SIMPLE BY DESIGN</span><figure className="adaptive-shot"><img loading="lazy" src="/images/study-buddy-phone-trio.png" alt="Three Study Buddy iPhone app screens: My Courses, Learn, and Progress"/><figcaption>Explore Study Buddy: Courses, Learn, and Progress.</figcaption></figure></div><div className="how-right"><h2>A better way to <span className="gradient-text">show up for yourself.</span></h2><p>Whether you have five minutes or a full study session, Study Buddy helps you make the most of it.</p><div className="steps"><div><span>01</span><div><h3>Pick your certification</h3><p>Choose a course that fits your goals.</p></div></div><div><span>02</span><div><h3>Learn and practice</h3><p>Read lessons, take quizzes, and review explanations.</p></div></div><div><span>03</span><div><h3>Track your growth</h3><p>See your progress and decide what to study next.</p></div></div></div><a href="#early-access" className="text-link">Stay in the loop <ArrowRight size={17}/></a></div></div></section><section className="cta-section" id="early-access"><div className="container"><div className="cta-box"><span className="section-kicker">COMING TO IPHONE</span><h2>Your future is worth<br/><span>studying for.</span></h2><p>Study Buddy is preparing for its iPhone debut. Be ready to start your next learning chapter.</p><MailerLiteForm/><small className="form-note">Sign up to receive Study Buddy launch and course updates. Unsubscribe at any time.</small></div></div></section></main><footer><div className="container footer-inner"><Logo/><span>Built for the journey, not just the exam.</span><span>© {new Date().getFullYear()} Study Buddy · Created by <a href="https://latoyyasmith.com" target="_blank" rel="noopener noreferrer">Latoyya Smith</a> · Houston, Texas</span></div></footer><a className="to-top" href="#top" aria-label="Return to top" title="Return to top"><ArrowUp size={22}/></a></div>};
createRoot(document.getElementById('root')).render(<App/>);
