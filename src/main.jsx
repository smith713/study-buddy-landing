import React from 'react';
import {createRoot} from 'react-dom/client';
import {BookOpen, ArrowRight, Check, Target, ChartNoAxesCombined, RotateCcw, Menu, X, Sparkles, ChevronRight, ArrowUp} from 'lucide-react';
import './style.css';
const courses=[{name:'CompTIA A+',code:'220-1201 / 220-1202',label:'IT Support',brand:'comptia',badge:'images/comptia-a-plus-badge.png',badgeAlt:'CompTIA A+ certification badge'},{name:'Cisco CCST',code:'CCST',label:'Networking',brand:'cisco',badge:'images/cisco-ccst-badge.png',badgeAlt:'Cisco CCST certification badge'},{name:'Microsoft Azure Fundamentals',code:'AZ-900',label:'IT Support',brand:'microsoft',badge:'images/microsoft-azure-fundamentals-badge.jpg',badgeAlt:'Microsoft Azure Fundamentals certification badge'}];
function Logo(){return <a className="logo" href="#top" aria-label="Study Buddy home"><img className="brand-logo" src={`${import.meta.env.BASE_URL}images/study-buddy-logo.png`} alt="Study Buddy book mascot logo"/><span>study<span className="gradient-text">buddy</span><small>LEARN. PRACTICE. GROW.</small></span></a>}
function Phones(){return <div className="showcase" aria-label="Study Buddy iPhone app screenshots"><div className="showcase-halo"/><div className="device device-back"><div className="device-top"/><img src={`${import.meta.env.BASE_URL}images/study-learn.jpeg`} alt="Study Buddy Security+ learning path showing course modules and quick review"/></div><div className="device device-front"><div className="device-top"/><img src={`${import.meta.env.BASE_URL}images/study-home-public.png`} alt="Study Buddy study plan dashboard with current track and start learning button"/></div><span className="showcase-caption">Real Study Buddy app screens</span></div>}
function MailerLiteForm(){
 const frameRef = React.useRef(null);
 const [height,setHeight] = React.useState(330);
 React.useEffect(()=>{
  const resize = (event) => {
   if(event.origin !== window.location.origin || event.source !== frameRef.current?.contentWindow) return;
   if(event.data?.type === 'studybuddy-form-height' && Number.isFinite(event.data.height)) setHeight(Math.max(220,Math.min(1200,event.data.height)));
  };
  window.addEventListener('message',resize);
  return ()=>window.removeEventListener('message',resize);
 },[]);
 return <div className="mailerlite-signup"><iframe ref={frameRef} className="signup-frame" title="Study Buddy email signup" src={`${import.meta.env.BASE_URL}signup.html?v=collected-layout-4`} style={{height}} /></div>;
}
function FeatureCarousel(){
 const track=React.useRef(null);
 const [active,setActive]=React.useState(0);
 const activeRef=React.useRef(0);
 const dialogRef=React.useRef(null);
 const [expanded,setExpanded]=React.useState(null);
 const features=[
  {title:'Learn in bite-sized lessons',description:'Build your understanding one topic at a time, with clear lessons that fit your schedule.',image:'benefit-memory.jpeg',alt:'Study Buddy memory aid explaining shared responsibility across cloud service models.',view:'memory'},
  {title:'Practice with purpose',description:'Learn why an answer is right—not just whether you got it right.',image:'benefit-question.jpeg',alt:'A cloud service model practice question with PaaS selected and an explanation of the correct answer.',view:'question'},
  {title:'Pick up where you left off',description:'Fit studying into your day. Save your place and return when you’re ready.',image:'benefit-practice-center.jpeg',alt:'Study Buddy Practice Center showing a paused Cloud Concepts session, Adaptive Practice, and the AZ-900 simulator.',view:'practice-center'},
  {title:'Strengthen what you know',description:'Check your understanding with active recall, chapter checkpoints, and resources for further learning.',image:'benefit-active-recall.jpeg',alt:'Active recall questions about Azure costs, a Microsoft Learn resource, and a chapter checkpoint checklist.',view:'active-recall'}
 ];
 const labels=features.map(feature=>feature.title);
 const openPreview=(feature)=>{setExpanded(feature);dialogRef.current.showModal();};
 React.useEffect(()=>{
  if(!expanded)return;
  const previous=document.body.style.overflow;
  document.body.style.overflow='hidden';
  return()=>{document.body.style.overflow=previous;};
 },[expanded]);
 const goTo=(index)=>{
  const node=track.current;
  if(!node)return;
  node.scrollTo({left:index*node.clientWidth,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
 };
 React.useEffect(()=>{
  const node=track.current;
  const sync=()=>{activeRef.current=Math.max(0,Math.min(3,Math.round(node.scrollLeft/node.clientWidth)));setActive(activeRef.current);};
  const observer=new ResizeObserver(()=>node.scrollTo({left:activeRef.current*node.clientWidth,behavior:'instant'}));
  observer.observe(node);node.addEventListener('scroll',sync,{passive:true});
  return()=>{observer.disconnect();node.removeEventListener('scroll',sync);};
 },[]);
 return <div className="feature-carousel" role="region" aria-roledescription="carousel" aria-label="Study Buddy features">
  <div ref={track} className="feature-grid feature-slides" tabIndex={0} onKeyDown={event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();goTo(Math.max(0,Math.min(3,active+(event.key==='ArrowRight'?1:-1))));}}}>
{features.map((feature,index)=><article className="feature-card" key={feature.title} aria-label={`${index+1} of 4: ${feature.title}`}>
 <h3>{feature.title}</h3><p>{feature.description}</p>
 <button type="button" className="app-preview-button" onClick={()=>openPreview(feature)} aria-label={`Enlarge screenshot: ${feature.title}`}>
  <span className={`app-screenshot screenshot-${feature.view}`}><img src={`${import.meta.env.BASE_URL}images/${feature.image}`} alt={feature.alt} loading="lazy" /></span>
  <span className="enlarge-hint">Tap or click to enlarge</span>
 </button>
</article>)}
  </div><div className="feature-dots" aria-label="Choose a feature">{labels.map((label,index)=><button key={label} type="button" aria-label={`Show ${label}`} aria-current={index===active?'true':undefined} onClick={()=>goTo(index)}><span /></button>)}</div>
 <dialog ref={dialogRef} className="screenshot-dialog" aria-labelledby="screenshot-title" onClose={()=>setExpanded(null)} onClick={event=>{if(event.target===event.currentTarget)dialogRef.current.close();}}>
  {expanded&&<><div className="screenshot-dialog-header"><h3 id="screenshot-title">{expanded.title}</h3><button type="button" autoFocus onClick={()=>dialogRef.current.close()} aria-label="Close screenshot"><X size={24}/></button></div>
  <div className={`app-screenshot screenshot-${expanded.view}`}><img src={`${import.meta.env.BASE_URL}images/${expanded.image}`} alt={expanded.alt}/></div></>}
 </dialog>
 </div>;
}
function App(){const [menu,setMenu]=React.useState(false);return <div id="top"><header className="header"><div className="container nav"><Logo/><nav className={menu?'nav-links open':'nav-links'}><a onClick={()=>setMenu(false)} href="#features">Features</a><a onClick={()=>setMenu(false)} href="#courses">Courses</a><a onClick={()=>setMenu(false)} href="#how">How it works</a><a onClick={()=>setMenu(false)} href="#early-access" className="nav-cta">Get updates <ArrowRight size={15}/></a></nav><button className="menu-toggle" onClick={()=>setMenu(!menu)} aria-label="Toggle menu">{menu?<X/>:<Menu/>}</button></div></header><main><section className="hero"><div className="hero-glow"/><div className="container hero-grid"><div className="hero-copy"><div className="eyebrow"><Sparkles size={14}/> YOUR STUDY JOURNEY, SIMPLIFIED</div><h1>Big goals.<br/>Better study habits.<br/><span className="gradient-text">Meet your Study Buddy.</span></h1><p className="hero-desc">Your personal space to learn, practice, and build confidence for your next IT certification. One lesson, one quiz, one win at a time.</p><div className="hero-actions"><a className="btn primary" href="#early-access">Get launch updates <ArrowRight size={18}/></a><a className="btn secondary" href="#how">See how it works <ChevronRight size={18}/></a></div><div className="hero-note"><span className="avatar-stack"><i>📘</i><i>⚡</i><i>🎯</i></span><span>Made for curious minds and future IT pros.</span></div></div><Phones/></div></section><section id="features" className="section features-section"><div className="container"><div className="section-intro"><span className="section-kicker">EVERYTHING YOU NEED</span><h2>Less stress. <span className="gradient-text">More progress.</span></h2><p>Powerful study tools, without the overwhelm. Stay focused on what matters most: learning.</p></div><FeatureCarousel/></div></section><section id="courses" className="section courses-section"><div className="container"><div className="section-intro"><span className="section-kicker">CHOOSE YOUR PATH</span><h2>Your next certification <span className="gradient-text">starts here.</span></h2><p>Explore study paths built around popular entry-level and foundational IT certifications.</p></div><div className="course-grid">{courses.map((c,i)=><article className={'course-card modern-course '+c.brand} key={c.code}><div className="course-top"><img className="course-badge" src={`${import.meta.env.BASE_URL}${c.badge}`} alt={c.badgeAlt}/></div><div className="course-info"><span className="course-code">{c.code}</span><h3>{c.name}</h3><p>{c.label}</p></div></article>)}</div><p className="course-disclaimer">Course availability and content may evolve as Study Buddy prepares for launch.</p></div></section><section id="how" className="section how-section"><div className="container how-grid"><div className="how-left"><span className="section-kicker">SIMPLE BY DESIGN</span><figure className="adaptive-shot"><img loading="lazy" src={`${import.meta.env.BASE_URL}images/study-buddy-phone-trio.png`} alt="Three Study Buddy iPhone app screens: My Courses, Learn, and Progress"/><figcaption>Explore Study Buddy: Courses, Learn, and Progress.</figcaption></figure></div><div className="how-right"><h2>A better way to <span className="gradient-text">show up for yourself.</span></h2><p>Whether you have five minutes or a full study session, Study Buddy helps you make the most of it.</p><div className="steps"><div><span>01</span><div><h3>Pick your certification</h3><p>Choose a course that fits your goals.</p></div></div><div><span>02</span><div><h3>Learn and practice</h3><p>Read lessons, take quizzes, and review explanations.</p></div></div><div><span>03</span><div><h3>Track your growth</h3><p>See your progress and decide what to study next.</p></div></div></div><a href="#early-access" className="text-link">Stay in the loop <ArrowRight size={17}/></a></div></div></section><section className="cta-section" id="early-access"><div className="container"><div className="cta-box"><span className="section-kicker">COMING TO IPHONE</span><h2>Your future is worth<br/><span>studying for.</span></h2><p>Study Buddy is preparing for its iPhone debut. Be ready to start your next learning chapter.</p><MailerLiteForm/><small className="form-note">Sign up to receive Study Buddy launch and course updates. Unsubscribe at any time.</small></div></div></section></main><footer><div className="container footer-inner"><Logo/><span>Built for the journey, not just the exam.</span><span>© {new Date().getFullYear()} Study Buddy</span></div></footer><a className="to-top" href="#top" aria-label="Return to top" title="Return to top"><ArrowUp size={22}/></a></div>};
createRoot(document.getElementById('root')).render(<App/>);
